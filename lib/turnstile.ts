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

function normalizeHostname(hostname: string): string {
  return hostname.trim().toLowerCase().replace(/^["']|["']$/g, "");
}

/** Include apex/www pairs so either production host passes siteverify. */
function expandHostnames(hosts: Iterable<string>): Set<string> {
  const out = new Set<string>();
  for (const raw of hosts) {
    const host = normalizeHostname(raw);
    if (!host) continue;
    out.add(host);
    if (host.startsWith("www.")) out.add(host.slice(4));
    else if (host !== "localhost" && host !== "127.0.0.1") out.add(`www.${host}`);
  }
  return out;
}

export function getTurnstileHostnames(): Set<string> {
  const fromEnv = (process.env.TURNSTILE_HOSTNAMES ?? "")
    .split(",")
    .map(normalizeHostname)
    .filter(Boolean);

  if (fromEnv.length > 0) return expandHostnames(fromEnv);

  const siteHost = normalizeHostname(new URL(siteConfig.url).hostname);
  if (process.env.NODE_ENV === "production") {
    return expandHostnames([siteHost]);
  }
  return expandHostnames([siteHost, "localhost", "127.0.0.1"]);
}

/** True when the server secret is available (site key + hostnames have defaults). */
export function isTurnstileConfigured(): boolean {
  return Boolean(getTurnstileSiteKey() && getTurnstileSecret());
}

type TurnstileVerifyResponse = {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export type TurnstileVerifyResult =
  | { ok: true }
  | {
      ok: false;
      reason:
        | "missing_token"
        | "not_configured"
        | "verify_failed"
        | "action_mismatch"
        | "hostname_mismatch";
    };

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

  if (!secret) {
    return { ok: false, reason: "not_configured" };
  }
  if (
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > MAX_TOKEN_LENGTH
  ) {
    return { ok: false, reason: "missing_token" };
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
    if (!result.success) {
      return { ok: false, reason: "verify_failed" };
    }
    if (result.action !== expectedAction) {
      console.warn("[turnstile] action mismatch", {
        expected: expectedAction,
        got: result.action ?? null,
      });
      return { ok: false, reason: "action_mismatch" };
    }
    const hostname = result.hostname ? normalizeHostname(result.hostname) : "";
    if (!hostname || !expectedHostnames.has(hostname)) {
      console.warn("[turnstile] hostname mismatch", {
        got: hostname || null,
        allowed: [...expectedHostnames],
      });
      return { ok: false, reason: "hostname_mismatch" };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "verify_failed" };
  }
}
