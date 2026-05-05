import { NextResponse } from "next/server";
import { buildPollinationsImageUrl } from "@/lib/reality-builder/pollinationsImage";

/**
 * Proxies Pollinations image generation so the browser loads a **same-origin** image.
 *
 * Optional `POLLINATIONS_API_KEY` (server-only). Public `image.pollinations.ai` often
 * works without auth; if Bearer is rejected or upstream 5xx under auth, we retry
 * anonymously (same behavior as pre-key deployments).
 */

export const runtime = "nodejs";

const MAX_NARRATIVE = 2000;
const UPSTREAM_TIMEOUT_MS = 55_000;

/** Only attach Bearer for keys shaped like Pollinations secrets/publishable keys. */
function bearerTokenFromEnv(): string | null {
  const k = process.env.POLLINATIONS_API_KEY?.trim();
  if (!k) return null;
  if (/^(sk_|pk_)/i.test(k)) return k;
  return null;
}

function jsonError(
  status: number,
  payload: { error: string; upstreamStatus?: number; detail?: string },
) {
  return NextResponse.json(payload, { status });
}

async function fetchUpstreamImage(
  imageUrl: string,
  useBearer: boolean,
  signal: AbortSignal,
): Promise<Response> {
  const headers: Record<string, string> = { Accept: "image/*,*/*" };
  const token = bearerTokenFromEnv();
  if (useBearer && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(imageUrl, {
    headers,
    cache: "no-store",
    signal,
  });
}

function proxyStatusForUpstream(upstreamStatus: number): number {
  if (upstreamStatus >= 500) return 502;
  if (upstreamStatus === 429) return 429;
  if (upstreamStatus >= 400) return 424;
  return 502;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError(400, { error: "invalid_json" });
  }

  if (!body || typeof body !== "object") {
    return jsonError(400, { error: "invalid_body" });
  }

  const narrative = typeof (body as { narrative?: unknown }).narrative === "string"
    ? (body as { narrative: string }).narrative.slice(0, MAX_NARRATIVE)
    : "";

  const rawSeed = (body as { seed?: unknown }).seed;
  const seed =
    typeof rawSeed === "number" && Number.isFinite(rawSeed)
      ? Math.floor(rawSeed)
      : undefined;

  if (!narrative.trim()) {
    return jsonError(400, { error: "empty_prompt" });
  }

  const imageUrl = buildPollinationsImageUrl(narrative, { seed });
  const couldUseBearer = Boolean(bearerTokenFromEnv());

  const tryOnce = async (useBearer: boolean): Promise<Response> => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), UPSTREAM_TIMEOUT_MS);
    try {
      return await fetchUpstreamImage(imageUrl, useBearer, ctrl.signal);
    } finally {
      clearTimeout(timer);
    }
  };

  try {
    /** 1) Prefer Bearer when env key is eligible (Pollinations-shaped). */
    let upstream = await tryOnce(couldUseBearer);

    /** 2) Bearer often breaks on `image.pollinations.ai` — fall back to anonymous after auth/5xx failures only. */
    if (
      couldUseBearer &&
      !upstream.ok &&
      (upstream.status === 401 ||
        upstream.status === 403 ||
        upstream.status >= 500)
    ) {
      console.error(
        "[reality-image] retrying without Bearer; first status:",
        upstream.status,
      );
      upstream = await tryOnce(false);
    }

    /** 3) One anonymous retry on 5xx (transient gateway errors). */
    if (!upstream.ok && upstream.status >= 500) {
      console.error("[reality-image] 5xx retry:", upstream.status);
      upstream = await tryOnce(false);
    }

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => "");
      console.error(
        "[reality-image] upstream failed:",
        upstream.status,
        detail.slice(0, 160),
      );
      return jsonError(proxyStatusForUpstream(upstream.status), {
        error: "upstream_failed",
        upstreamStatus: upstream.status,
        detail: detail.slice(0, 256),
      });
    }

    const contentType =
      upstream.headers.get("content-type")?.split(";")[0]?.trim() || "image/jpeg";
    if (!contentType.startsWith("image/")) {
      const peek = await upstream
        .clone()
        .text()
        .then((t) => t.slice(0, 200))
        .catch(() => "");
      console.error("[reality-image] not image body:", contentType, peek);
      return jsonError(502, {
        error: "not_image",
        detail: peek.slice(0, 256),
      });
    }

    const buf = await upstream.arrayBuffer();

    return new NextResponse(buf, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (e) {
    const name = e instanceof Error ? e.name : "";
    if (name === "AbortError") {
      console.error("[reality-image] aborted after", UPSTREAM_TIMEOUT_MS, "ms");
      return jsonError(504, { error: "upstream_timeout" });
    }
    console.error("[reality-image] fetch error:", e);
    return jsonError(503, { error: "upstream_unreachable" });
  }
}
