import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/Section";
import { cn } from "@/lib/cn";

type LeadershipSectionProps = {
  className?: string;
  innerClassName?: string;
  /** When true, skips the outer Section wrapper (use inside a parent Section, e.g. About). */
  embedded?: boolean;
};

const HIGHLIGHT_KEYS = [
  "highlight1",
  "highlight2",
  "highlight3",
  "highlight4",
  "highlight5",
] as const;

const AI_PARTNER_KEYS = ["cursor", "chatgpt"] as const;
type AIPartnerKey = (typeof AI_PARTNER_KEYS)[number];

const AI_PARTNER_IMAGES: Record<AIPartnerKey, { src: string }> = {
  cursor: { src: "/brand/cursor-logo.png" },
  chatgpt: { src: "/brand/chatgpt-logo.png" },
};

export async function LeadershipSection({
  className,
  innerClassName,
  embedded = false,
}: LeadershipSectionProps) {
  const t = await getTranslations("Leadership");

  const inner = (
    <>
      <h2
        id="leadership-heading"
        className="font-display text-2xl font-medium tracking-tight text-ri-brown sm:text-3xl"
      >
        {t("title")}
      </h2>
      <p className="mt-3 max-w-4xl text-pretty text-[1.05rem] leading-relaxed text-ri-muted sm:text-lg">
        {t("intro")}
      </p>

      <article className="mt-6 sm:mt-7">
        <div className="glass-panel accent-gradient-border rounded-3xl p-6 sm:p-8 lg:p-9">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="flex justify-center lg:shrink-0 lg:justify-start">
              <Image
                src="/brand/facundo-alvez.png"
                alt={t("avatarAriaLabel")}
                width={300}
                height={300}
                sizes="(max-width: 1024px) 160px, 176px"
                className="h-40 w-40 rounded-full object-cover shadow-md ring-2 ring-white/90 sm:h-44 sm:w-44"
              />
            </div>

            <div className="min-w-0 flex-1">
              <header>
                <h3 className="text-xl font-semibold tracking-tight text-ri-text sm:text-2xl">
                  {t("profileName")}
                </h3>
                <p className="mt-1.5 text-sm font-medium uppercase tracking-wide text-ri-copper">
                  {t("profileRole")}
                </p>
              </header>

              <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-ri-muted sm:text-base">
                <p>{t("bioP1")}</p>
                <p>{t("bioP2")}</p>
              </div>

              <div className="mt-6 border-t border-ri-border pt-6">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-ri-muted">
                  {t("highlightsLabel")}
                </p>
                <ul className="mt-3 grid gap-x-6 gap-y-2.5 text-sm text-ri-text sm:grid-cols-2 sm:text-[0.9375rem]">
                  {HIGHLIGHT_KEYS.map((key) => (
                    <li key={key} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ri-copper"
                        aria-hidden
                      />
                      <span className="text-ri-muted">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className="mt-10 sm:mt-11" aria-labelledby="leadership-ai-partners-heading">
        <h3
          id="leadership-ai-partners-heading"
          className="font-display text-lg font-medium tracking-tight text-ri-brown sm:text-xl"
        >
          {t("aiPartnersHeading")}
        </h3>
        <p className="mt-2 max-w-4xl text-pretty text-sm leading-relaxed text-ri-muted sm:text-base">
          {t("aiPartnersIntro")}
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {AI_PARTNER_KEYS.map((key) => {
            const img = AI_PARTNER_IMAGES[key];
            return (
              <div
                key={key}
                className="glass-panel flex h-full flex-col rounded-3xl border border-ri-border/35 p-5 sm:p-6"
              >
                <div className="flex flex-1 flex-col gap-5 sm:flex-row sm:items-start sm:gap-5">
                  <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-white shadow-md ring-2 ring-white/90 sm:mx-0 sm:h-32 sm:w-32">
                    <Image
                      src={img.src}
                      alt={t(`${key}LogoAlt`)}
                      fill
                      sizes="(max-width: 640px) 112px, 128px"
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <h4 className="text-lg font-semibold tracking-tight text-ri-text sm:text-xl">
                      {t(`${key}Name`)}
                    </h4>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ri-copper sm:text-sm">
                      {t(`${key}Role`)}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ri-muted sm:text-base">
                      {t(`${key}Bio`)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  if (embedded) {
    return (
      <div
        id="leadership"
        aria-labelledby="leadership-heading"
        className={cn("relative", className)}
      >
        {inner}
      </div>
    );
  }

  return (
    <Section
      id="leadership"
      aria-labelledby="leadership-heading"
      density="tight"
      className={cn(
        "relative border-t border-ri-border/20 bg-gradient-to-b from-ri-bg-warm/25 via-transparent to-transparent pb-14 sm:pb-16 lg:pb-18",
        className
      )}
      innerClassName={cn("max-w-[1200px] px-5 sm:px-8", innerClassName)}
    >
      {inner}
    </Section>
  );
}
