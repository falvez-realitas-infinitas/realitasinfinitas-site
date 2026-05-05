"use client";

import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";
import { buildNarrativeEn, buildNarrativeEs } from "@/lib/reality-builder/compose";
import { REALITY_BUILDER_OPTIONS_EN } from "@/lib/reality-builder/options.en";
import { REALITY_BUILDER_OPTIONS_ES } from "@/lib/reality-builder/options.es";
import {
  STEP_IDS,
  type RealityPicks,
  type StepId,
} from "@/lib/reality-builder/types";
import { Copy, ImageIcon, Loader2, RefreshCw, Sparkles } from "lucide-react";

/** Fisher–Yates shuffle, then take up to three distinct options for the card row. */
function shufflePickThree<T>(pool: readonly T[]): T[] {
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy.slice(0, Math.min(3, copy.length));
}

function pickRandom<T>(pool: readonly T[]): T {
  return pool[Math.floor(Math.random() * pool.length)]!;
}

type Phase = "intro" | "pick" | "result";

type OptionPools =
  | typeof REALITY_BUILDER_OPTIONS_EN
  | typeof REALITY_BUILDER_OPTIONS_ES;

type IllustrationState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; objectUrl: string }
  | { status: "error"; hint?: string };

const ILLUSTRATION_LOAD_MS = 90_000;

/**
 * Reality Builder — five-step choice game. State is entirely client-side.
 * Option text lives in `lib/reality-builder/options.*.ts`; final prose in `compose.ts`.
 * Optional illustration uses Pollinations image URLs (see `pollinationsImage.ts`).
 */
export function RealityBuilder() {
  const t = useTranslations("RealityBuilder");
  const locale = useLocale();
  const pools: OptionPools =
    locale === "es" ? REALITY_BUILDER_OPTIONS_ES : REALITY_BUILDER_OPTIONS_EN;

  const [phase, setPhase] = useState<Phase>("intro");
  /** 0..4 matching STEP_IDS (world → twist). */
  const [stepIndex, setStepIndex] = useState(0);
  /** Filled as the visitor taps cards; complete when all five keys are set. */
  const [picks, setPicks] = useState<Partial<Record<StepId, string>>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [illustration, setIllustration] = useState<IllustrationState>({
    status: "idle",
  });
  const illustrationLoadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const currentStepId = STEP_IDS[stepIndex]!;

  /**
   * Three random options for the current step. Depends on `phase` so “Start building”
   * reshuffles even when `currentStepId` stays `world` (step 0).
   */
  const choiceCards = useMemo(() => {
    if (phase !== "pick") return [];
    return shufflePickThree(pools[currentStepId]);
  }, [phase, pools, currentStepId]);

  const narrative = useMemo(() => {
    const complete = isComplete(picks);
    if (!complete) return "";
    const full = picks as RealityPicks;
    return locale === "es" ? buildNarrativeEs(full) : buildNarrativeEn(full);
  }, [locale, picks]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const clearIllustrationTimer = useCallback(() => {
    if (illustrationLoadTimerRef.current != null) {
      clearTimeout(illustrationLoadTimerRef.current);
      illustrationLoadTimerRef.current = null;
    }
  }, []);

  useEffect(
    () => () => {
      clearIllustrationTimer();
    },
    [clearIllustrationTimer],
  );

  /** Drop blob URL and timer when leaving the result flow or starting a new fetch. */
  const resetIllustration = useCallback(() => {
    clearIllustrationTimer();
    setIllustration((prev) => {
      if (prev.status === "ready") {
        URL.revokeObjectURL(prev.objectUrl);
      }
      return { status: "idle" };
    });
  }, [clearIllustrationTimer]);

  /** Map API JSON + status to toast copy (server returns structured errors from `/api/reality-image`). */
  const illustrationToastForFailedResponse = useCallback(
    async (res: Response) => {
      const status = res.status;
      try {
        const ct = res.headers.get("content-type") ?? "";
        if (ct.includes("application/json")) {
          const data = (await res.json()) as {
            error?: string;
            upstreamStatus?: number;
          };
          if (
            data.error === "upstream_timeout" ||
            status === 504
          ) {
            return t("imageTimeout");
          }
          if (
            data.error === "upstream_unreachable" ||
            status === 503
          ) {
            return t("imageErrorUnavailable");
          }
          if (
            status === 429 ||
            status === 424 ||
            status === 502 ||
            data.error === "upstream_failed" ||
            data.error === "not_image"
          ) {
            return t("imageErrorUpstream");
          }
        }
      } catch {
        /* ignore malformed error bodies */
      }
      return t("imageError");
    },
    [t],
  );

  const requestIllustration = useCallback(async () => {
    if (!narrative) return;
    clearIllustrationTimer();

    setIllustration((prev) => {
      if (prev.status === "ready") {
        URL.revokeObjectURL(prev.objectUrl);
      }
      return { status: "loading" };
    });

    const seed = Math.floor(Math.random() * 2_147_483_647);
    const ctrl = new AbortController();
    illustrationLoadTimerRef.current = setTimeout(() => ctrl.abort(), ILLUSTRATION_LOAD_MS);

    try {
      const res = await fetch("/api/reality-image", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "image/*" },
        body: JSON.stringify({ narrative, seed }),
        signal: ctrl.signal,
      });
      clearIllustrationTimer();
      if (!res.ok) {
        const toastMsg = await illustrationToastForFailedResponse(res.clone());
        const hintParts: string[] = [`HTTP ${res.status}`];
        try {
          const ct = res.headers.get("content-type") ?? "";
          if (ct.includes("application/json")) {
            const data = (await res.json()) as {
              error?: string;
              upstreamStatus?: number;
            };
            if (data.error) hintParts.push(data.error);
            if (data.upstreamStatus != null)
              hintParts.push(`upstream ${data.upstreamStatus}`);
          }
        } catch {
          /* ignore */
        }
        setIllustration({
          status: "error",
          hint: hintParts.filter(Boolean).join(" · "),
        });
        showToast(toastMsg);
        return;
      }
      const blob = await res.blob();
      if (!blob.type.startsWith("image/")) throw new Error("not_image");
      const objectUrl = URL.createObjectURL(blob);
      setIllustration({ status: "ready", objectUrl });
    } catch (e) {
      clearIllustrationTimer();
      setIllustration({
        status: "error",
        hint: e instanceof Error ? e.message : undefined,
      });
      if (e instanceof Error && e.name === "AbortError") {
        showToast(t("imageTimeout"));
      } else {
        showToast(t("imageError"));
      }
    }
  }, [
    clearIllustrationTimer,
    illustrationToastForFailedResponse,
    narrative,
    showToast,
    t,
  ]);

  const onIllustrationDecodeError = useCallback(() => {
    clearIllustrationTimer();
    setIllustration((prev) => {
      if (prev.status === "ready") {
        URL.revokeObjectURL(prev.objectUrl);
      }
      return { status: "error", hint: undefined };
    });
    showToast(t("imageError"));
  }, [clearIllustrationTimer, showToast, t]);

  const stepLabels = useMemo(() => {
    switch (currentStepId) {
      case "world":
        return { heading: t("steps.world.heading"), hint: t("steps.world.hint") };
      case "rule":
        return { heading: t("steps.rule.heading"), hint: t("steps.rule.hint") };
      case "character":
        return {
          heading: t("steps.character.heading"),
          hint: t("steps.character.hint"),
        };
      case "problem":
        return {
          heading: t("steps.problem.heading"),
          hint: t("steps.problem.hint"),
        };
      case "twist":
        return { heading: t("steps.twist.heading"), hint: t("steps.twist.hint") };
      default: {
        const _n: never = currentStepId;
        return { heading: String(_n), hint: "" };
      }
    }
  }, [currentStepId, t]);

  const begin = useCallback(() => {
    resetIllustration();
    setPhase("pick");
    setStepIndex(0);
    setPicks({});
  }, [resetIllustration]);

  const chooseCard = useCallback(
    (text: string) => {
      const id = STEP_IDS[stepIndex]!;
      setPicks((prev) => ({ ...prev, [id]: text }));
      if (stepIndex >= 4) {
        setPhase("result");
      } else {
        setStepIndex((s) => s + 1);
      }
    },
    [stepIndex],
  );

  const createAnother = useCallback(() => {
    resetIllustration();
    setPhase("intro");
    setStepIndex(0);
    setPicks({});
  }, [resetIllustration]);

  /** Picks one random option from every pool and skips straight to the reveal. */
  const surpriseMe = useCallback(() => {
    resetIllustration();
    const roll: RealityPicks = {
      world: pickRandom(pools.world),
      rule: pickRandom(pools.rule),
      character: pickRandom(pools.character),
      problem: pickRandom(pools.problem),
      twist: pickRandom(pools.twist),
    };
    setPicks(roll);
    setPhase("result");
  }, [pools, resetIllustration]);

  const copyReality = useCallback(async () => {
    if (!narrative) return;
    try {
      await navigator.clipboard.writeText(narrative);
      showToast(t("copied"));
    } catch {
      showToast(t("copyFailed"));
    }
  }, [narrative, showToast, t]);

  return (
    <div className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-[#07080d] text-white">
      <div
        className="ri-infinity-bg pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(196,229,242,0.1),transparent_55%),radial-gradient(ellipse_55%_45%_at_100%_30%,rgba(166,107,73,0.12),transparent_50%)]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto flex max-w-2xl flex-col gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:max-w-3xl">
        <header className="text-center sm:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c4e5f2]/75">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
            {t("title")}
          </h1>
        </header>

        {phase === "intro" && (
          <div className="mx-auto flex w-full max-w-lg flex-col items-center rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-11 text-center shadow-[0_0_70px_-36px_rgba(196,229,242,0.35)] backdrop-blur-md">
            <Sparkles
              className="h-9 w-9 text-[#c4e5f2]/85"
              strokeWidth={1.2}
              aria-hidden
            />
            <p className="mt-7 whitespace-pre-line text-base leading-relaxed text-white/88 sm:text-lg">
              {t("intro")}
            </p>
            <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                variant="darkPrimary"
                className="px-8"
                onClick={begin}
                type="button"
              >
                {t("begin")}
              </Button>
              <button
                type="button"
                onClick={surpriseMe}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-semibold tracking-wide text-white/90 transition hover:border-[#c4e5f2]/40 hover:bg-white/10"
              >
                <Sparkles className="h-4 w-4" aria-hidden />
                {t("surpriseMe")}
              </button>
            </div>
          </div>
        )}

        {phase === "pick" && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p
                className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45 sm:text-left"
                aria-live="polite"
              >
                {t("stepProgress", { current: stepIndex + 1, total: STEP_IDS.length })}
              </p>
              <div
                className="flex justify-center gap-1.5 sm:justify-end"
                aria-hidden
              >
                {STEP_IDS.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 w-8 rounded-full transition-colors duration-300 sm:w-10",
                      i <= stepIndex ? "bg-[#c4e5f2]/75" : "bg-white/15",
                    )}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl font-medium text-white sm:text-2xl">
                {stepLabels.heading}
              </h2>
              <p className="mt-2 text-sm text-white/55">{stepLabels.hint}</p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-3">
              {choiceCards.map((text) => (
                <li key={text}>
                  <button
                    type="button"
                    onClick={() => chooseCard(text)}
                    className={cn(
                      "group relative flex min-h-[120px] w-full flex-col justify-center rounded-2xl border border-white/12",
                      "bg-gradient-to-br from-white/[0.08] to-white/[0.02] px-5 py-5 text-left",
                      "shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]",
                      "transition-[transform,box-shadow,border-color] duration-300",
                      "hover:-translate-y-0.5 hover:border-[#c4e5f2]/35 hover:shadow-[0_24px_48px_-28px_rgba(196,229,242,0.35)]",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9985f]",
                      "active:scale-[0.99]",
                    )}
                  >
                    <span className="text-[15px] font-medium leading-snug text-white/92 sm:text-base">
                      {text}
                    </span>
                    <span className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d9985f]/80 opacity-0 transition group-hover:opacity-100">
                      {t("choose")}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {phase === "result" && isComplete(picks) && (
          <div className="flex flex-col gap-8">
            <div
              className="accent-gradient-border relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0e14]/90 p-8 shadow-[0_40px_100px_-48px_rgba(0,0,0,0.85)] backdrop-blur-md sm:p-10"
              aria-live="polite"
            >
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#c4e5f2]/10 blur-3xl"
                aria-hidden
              />
              <h2 className="relative font-display text-2xl font-medium tracking-tight text-white sm:text-[1.65rem]">
                {t("finalTitle")}
              </h2>
              <p className="relative mt-6 text-base leading-relaxed text-white/82 sm:text-lg">
                {narrative}
              </p>
            </div>

            {narrative ? (
              <section
                className="rounded-3xl border border-white/10 bg-[#0a0c12]/80 p-6 backdrop-blur-md sm:p-7"
                aria-label={t("imageAlt")}
              >
                <p className="text-center text-xs leading-relaxed text-white/40 sm:text-left">
                  {t("imageHint")}
                </p>
                {illustration.status === "idle" && (
                  <div className="mt-4 flex justify-center sm:justify-start">
                    <button
                      type="button"
                      onClick={() => void requestIllustration()}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:border-[#c4e5f2]/35 hover:bg-white/10"
                    >
                      <ImageIcon className="h-4 w-4" aria-hidden />
                      {t("generateImage")}
                    </button>
                  </div>
                )}

                {illustration.status === "error" && (
                  <div className="mt-4 space-y-3 text-center sm:text-left">
                    <p className="text-sm text-amber-200/90">{t("imageError")}</p>
                    {illustration.hint ? (
                      <p className="text-[11px] leading-snug text-white/35">
                        {illustration.hint}
                      </p>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => void requestIllustration()}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:border-[#c4e5f2]/35 hover:bg-white/10"
                    >
                      <ImageIcon className="h-4 w-4" aria-hidden />
                      {t("generateImage")}
                    </button>
                  </div>
                )}

                {illustration.status === "loading" && (
                  <div className="relative mt-4 flex min-h-[14rem] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-[#05060a]">
                    <Loader2
                      className="h-9 w-9 animate-spin text-[#c4e5f2]"
                      aria-hidden
                    />
                    <p className="text-sm text-white/70">{t("imageLoading")}</p>
                  </div>
                )}

                {illustration.status === "ready" && (
                  <>
                    <div className="relative mt-4 min-h-[12rem] overflow-hidden rounded-2xl border border-white/10 bg-[#05060a] ring-1 ring-white/5">
                      {/* Blob URL from same-origin `/api/reality-image` proxy */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        key={illustration.objectUrl}
                        src={illustration.objectUrl}
                        alt={t("imageAlt")}
                        width={1024}
                        height={576}
                        decoding="async"
                        className="h-auto w-full object-cover"
                        onError={onIllustrationDecodeError}
                      />
                    </div>
                    <div className="mt-4 flex justify-center sm:justify-start">
                      <button
                        type="button"
                        onClick={() => void requestIllustration()}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-transparent px-5 py-2.5 text-sm font-semibold text-white/75 transition hover:border-[#c4e5f2]/35 hover:text-white"
                      >
                        <RefreshCw className="h-4 w-4" aria-hidden />
                        {t("regenerateImage")}
                      </button>
                    </div>
                  </>
                )}
              </section>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <Button
                variant="darkPrimary"
                className="gap-2 px-6"
                type="button"
                onClick={copyReality}
              >
                <Copy className="h-4 w-4" aria-hidden />
                {t("copy")}
              </Button>
              <button
                type="button"
                onClick={createAnother}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/5 px-6 py-2.5 text-sm font-semibold tracking-wide text-white/90 transition hover:border-white/28 hover:bg-white/10"
              >
                <RefreshCw className="h-4 w-4" aria-hidden />
                {t("createAnother")}
              </button>
              <button
                type="button"
                onClick={surpriseMe}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-transparent px-6 py-2.5 text-sm font-semibold tracking-wide text-white/75 transition hover:border-[#c4e5f2]/35 hover:text-white"
              >
                <Sparkles className="h-4 w-4" aria-hidden />
                {t("surpriseMe")}
              </button>
            </div>
          </div>
        )}

        {toast && (
          <output
            className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 rounded-full border border-white/15 bg-[#12141c]/95 px-5 py-2.5 text-xs font-medium text-white/90 shadow-lg backdrop-blur-md"
            aria-live="polite"
          >
            {toast}
          </output>
        )}
      </div>
    </div>
  );
}

function isComplete(p: Partial<Record<StepId, string>>): p is RealityPicks {
  return STEP_IDS.every((id) => Boolean(p[id]?.trim()));
}
