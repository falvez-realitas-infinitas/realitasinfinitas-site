import { NextResponse } from "next/server";
import { buildPollinationsImageUrl } from "@/lib/reality-builder/pollinationsImage";

/**
 * Proxies Pollinations image generation so the browser loads a **same-origin** image
 * (avoids flaky `<img>` hotlinking / referrer quirks to `image.pollinations.ai`).
 *
 * Optional: set `POLLINATIONS_API_KEY` in `.env.local` (server-only; **never** `NEXT_PUBLIC_*`).
 * Use a Pollinations-supported key (`sk_*` stays on the server — never send to the client).
 * If unset, the upstream request is unauthenticated (same as public image endpoint).
 */
export const runtime = "nodejs";

const MAX_NARRATIVE = 2000;
const UPSTREAM_TIMEOUT_MS = 120_000;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
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
    return NextResponse.json({ error: "empty_prompt" }, { status: 400 });
  }

  const imageUrl = buildPollinationsImageUrl(narrative, { seed });

  const headers: HeadersInit = {
    Accept: "image/*,*/*",
  };

  const key = process.env.POLLINATIONS_API_KEY?.trim();
  if (key) {
    headers.Authorization = `Bearer ${key}`;
  }

  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), UPSTREAM_TIMEOUT_MS);

  let upstream: Response;
  try {
    upstream = await fetch(imageUrl, {
      headers,
      cache: "no-store",
      signal: ctrl.signal,
    });
  } catch {
    clearTimeout(t);
    return NextResponse.json({ error: "upstream_unreachable" }, { status: 502 });
  }
  clearTimeout(t);

  if (!upstream.ok) {
    const errText = await upstream.text().catch(() => "");
    return NextResponse.json(
      { error: "upstream_failed", status: upstream.status, detail: errText.slice(0, 256) },
      { status: 502 },
    );
  }

  const contentType =
    upstream.headers.get("content-type")?.split(";")[0]?.trim() || "image/jpeg";
  if (!contentType.startsWith("image/")) {
    return NextResponse.json({ error: "not_image" }, { status: 502 });
  }

  const buf = await upstream.arrayBuffer();

  return new NextResponse(buf, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "private, no-store",
    },
  });
}
