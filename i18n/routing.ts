import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  // "always" keeps unprefixed URLs (/ → redirect) and ensures /en and /es match app/[locale]
  // reliably with Next.js 16 + proxy (as-needed internal rewrites were resolving to 404).
  localePrefix: "always",
});
