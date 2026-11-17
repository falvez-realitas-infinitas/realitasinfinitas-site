export const siteConfig = {
  name: "Realitas Infinitas",
  url: "https://realitasinfinitas.com",
  /** Google Analytics 4 measurement ID */
  googleAnalyticsId: "G-2FMVC7XHLJ",
  /**
   * Cloudflare Turnstile site key (public). Prefer NEXT_PUBLIC_TURNSTILE_SITE_KEY
   * when set at build time; this fallback keeps production builds working if the
   * public env var was missing during deploy.
   */
  turnstileSiteKey: "0x4AAAAAAF-uArFpRFzXe45y",
  /** Credibility strip partner sites */
  partnerUrls: {
    vestacare: "https://vestacare.com",
    successfulImperatives: "https://successfulimperatives.com",
  },
  email: "contact@realitasinfinitas.com",
  /** E.164-style dial string for tel: links */
  phoneTel: "+5491170741401",
  /** Human-readable (Argentina) */
  phoneDisplay: "+54 9 11 7074 1401",
} as const;
