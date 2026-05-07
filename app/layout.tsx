import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist_Mono, Outfit } from "next/font/google";
import { getLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site";
import { getLocaleAlternates } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import "./globals.css";

/** Geometric sans — pairs with the logo wordmark */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#592A19",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  let locale: string;
  try {
    locale = await getLocale();
  } catch {
    locale = routing.defaultLocale;
  }
  const t = await getTranslations({ locale, namespace: "site" });

  const currentLocale = routing.locales.includes(
    locale as (typeof routing.locales)[number],
  )
    ? (locale as (typeof routing.locales)[number])
    : routing.defaultLocale;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s · ${siteConfig.name}`,
    },
    description: t("description"),
    applicationName: siteConfig.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: getLocaleAlternates("/", currentLocale),
    icons: {
      icon: [{ url: "/brand/ri-icon.png", type: "image/png", sizes: "512x512" }],
      apple: [{ url: "/brand/ri-icon.png", sizes: "180x180" }],
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      type: "website",
      locale: currentLocale === "es" ? "es_ES" : "en_US",
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: t("description"),
      url: `${siteConfig.url}/${currentLocale}`,
      images: [{ url: "/globe.svg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: t("description"),
      images: ["/globe.svg"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  let locale: string;
  try {
    locale = await getLocale();
  } catch {
    locale = routing.defaultLocale;
  }

  return (
    <html
      lang={locale}
      className={`${outfit.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-ri-text">
        {children}
      </body>
    </html>
  );
}
