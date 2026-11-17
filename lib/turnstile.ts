import { siteConfig } from "@/lib/site";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const MAX_TOKEN_LENGTH = 2048;

export function getTurnstileSiteKey(): string | undefined {
  const key =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ||
    siteConfig.turnstileSiteKey;
  return key || undefined;
}

export function getTurnstileSecret(): string | undefined {
  const key =
    process.env.TURNSTILE_SECRET?.trim() ||
    process.env.TURNSTILE_SECRET_KEY?.trim();
  return key || undefined;
}

export function getTurnstileHostnames(): Set<string> {
  return new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean)
  );
}

/** True when site key, secret, and at least one allowed hostname are set. */
export function isTurnstileConfigured(): boolean {
  return Boolean(
    getTurnstileSiteKey() && getTurnstileSecret() && getTurnstileHostnames().size > 0
  );
}

type TurnstileVerifyResponse = {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export type TurnstileVerifyResult =
  | { ok: true }
  | { ok: false; reason: "missing_token" | "not_configured" | "verify_failed" };

/**
 * Canonical Turnstile siteverify: require success, expected action, and an
 * allowlisted frontend hostname.
 */
export async function verifyTurnstileToken(options: {
  token: unknown;
  expectedAction: string;
  remoteIp?: string | null;
}): Promise<TurnstileVerifyResult> {
  const secret = getTurnstileSecret();
  const expectedHostnames = getTurnstileHostnames();
  const { token, expectedAction, remoteIp } = options;

  if (
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > MAX_TOKEN_LENGTH ||
    !secret ||
    expectedHostnames.size === 0
  ) {
    return { ok: false, reason: !secret || expectedHostnames.size === 0 ? "not_configured" : "missing_token" };
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    });
    if (remoteIp) body.set("remoteip", remoteIp);

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body,
    });
    if (!res.ok) return { ok: false, reason: "verify_failed" };

    const result = (await res.json()) as TurnstileVerifyResponse;
    if (
      !result.success ||
      result.action !== expectedAction ||
      !result.hostname ||
      !expectedHostnames.has(result.hostname)
    ) {
      return { ok: false, reason: "verify_failed" };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "verify_failed" };
  }
}
