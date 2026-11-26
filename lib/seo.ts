import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

type Locale = (typeof routing.locales)[number];

const DEFAULT_OG_IMAGE = "/globe.svg";

function toLocalePath(locale: string, pathname: string) {
  if (pathname === "/") return `/${locale}`;
  return `/${locale}${pathname}`;
}

/** English homepage is `/` (rewritten), not `/en`, so Meta does not follow a path redirect. */
function publicPath(locale: string, pathname: string) {
  if (pathname === "/" && locale === routing.defaultLocale) return "/";
  return toLocalePath(locale, pathname);
}

export function getPublicUrl(locale: string, pathname: string) {
  const path = publicPath(locale, pathname);
  if (path === "/") return `${siteConfig.publicOrigin}/`;
  return `${siteConfig.publicOrigin}${path}`;
}

export function getLocaleAlternates(pathname: string, locale: Locale) {
  const languages = Object.fromEntries(
    routing.locales.map((currentLocale) => [
      currentLocale,
      getPublicUrl(currentLocale, pathname),
    ]),
  );

  return {
    canonical: getPublicUrl(locale, pathname),
    languages: {
      ...languages,
      "x-default": getPublicUrl(routing.defaultLocale, pathname),
    },
  };
}

type BuildPageMetadataParams = {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  image?: string;
};

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
}: BuildPageMetadataParams): Metadata {
  const url = getPublicUrl(locale, pathname);
  const localeCode = locale === "es" ? "es_ES" : "en_US";

  return {
    title,
    description,
    alternates: getLocaleAlternates(pathname, locale),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: localeCode,
      url,
      title: `${title} · ${siteConfig.name}`,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${siteConfig.name}`,
      description,
      images: [image],
    },
  };
}
