import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";
import {
  isTurnstileConfigured,
  verifyTurnstileToken,
} from "@/lib/turnstile";

const MAX = { name: 200, email: 320, company: 200, message: 10000 };
/** Reject submissions faster than this (typical bots fire instantly). */
const MIN_FILL_MS = 2500;
const TURNSTILE_ACTION = "contact";

function trimField(v: unknown, max: number): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim().slice(0, max);
  return t.length ? t : undefined;
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

/** Silent success so bots don't learn which check failed. */
function fakeOk() {
  return NextResponse.json({ ok: true });
}

/**
 * Catches common contact-form spam: a single random alphanumeric token
 * with no spaces (e.g. "aZpvQYEdmmEDKEMA").
 */
function looksLikeGibberishToken(message: string): boolean {
  if (/\s/.test(message)) return false;
  if (message.length < 10 || message.length > 40) return false;
  return /^[A-Za-z0-9]+$/.test(message);
}

function clientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || undefined;
}

function turnstileTokenFromBody(raw: Record<string, unknown>): unknown {
  return raw["cf-turnstile-response"] ?? raw.turnstileToken;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;

  // Honeypot: real users never fill this; bots often do.
  const honeypot = typeof raw.website === "string" ? raw.website.trim() : "";
  if (honeypot) {
    return fakeOk();
  }

  const startedAt =
    typeof raw.formStartedAt === "number"
      ? raw.formStartedAt
      : typeof raw.formStartedAt === "string"
        ? Number(raw.formStartedAt)
        : NaN;
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return fakeOk();
  }

  if (!isTurnstileConfigured()) {
    return NextResponse.json(
      { error: "not_configured", code: "CAPTCHA_NOT_CONFIGURED" },
      { status: 503 }
    );
  }

  const captcha = await verifyTurnstileToken({
    token: turnstileTokenFromBody(raw),
    expectedAction: TURNSTILE_ACTION,
    remoteIp: clientIp(request),
  });
  if (!captcha.ok) {
    return NextResponse.json(
      { error: "captcha", code: "CAPTCHA_FAILED" },
      { status: 403 }
    );
  }

  const name = trimField(raw.name, MAX.name);
  const email = trimField(raw.email, MAX.email)?.toLowerCase();
  const company = trimField(raw.company, MAX.company);
  const message = trimField(raw.message, MAX.message);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }
  if (looksLikeGibberishToken(message)) {
    return fakeOk();
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO ?? siteConfig.email;

  if (!apiKey || !from) {
    return NextResponse.json(
      { error: "not_configured", code: "EMAIL_NOT_CONFIGURED" },
      { status: 503 }
    );
  }

  const lines = [`Name: ${name}`, `Email: ${email}`];
  if (company) lines.push(`Company / Practice: ${company}`);
  lines.push("", message);
  const text = lines.join("\n");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Website contact: ${name}`,
    text,
  });

  if (error) {
    console.error("[contact]", error.message);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
