import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

const localizedPaths = [
  "/",
  "/about",
  "/products",
  "/products/clinic",
  "/contact",
  "/reality",
  "/reset-password",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routing.locales.flatMap((locale) =>
    localizedPaths.map((path) => {
      const localizedPath = path === "/" ? `/${locale}` : `/${locale}${path}`;

      return {
        url: `${siteConfig.url}${localizedPath}`,
        lastModified: now,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((lang) => [
              lang,
              `${siteConfig.url}${path === "/" ? `/${lang}` : `/${lang}${path}`}`,
            ]),
          ),
        },
      };
    }),
  );
}
