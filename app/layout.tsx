import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist_Mono, Outfit } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site";
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

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s · ${siteConfig.name}`,
    },
    description: t("description"),
    icons: {
      icon: [{ url: "/brand/ri-icon.png", type: "image/png", sizes: "any" }],
      apple: [{ url: "/brand/ri-icon.png", sizes: "180x180" }],
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: t("description"),
      url: siteConfig.url,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: t("description"),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  let locale: string;
  let messages: Awaited<ReturnType<typeof getMessages>>;
  try {
    locale = await getLocale();
    messages = await getMessages();
  } catch {
    locale = routing.defaultLocale;
    messages = (await import(`../messages/${routing.defaultLocale}.json`)).default;
  }

  return (
    <html
      lang={locale}
      className={`${outfit.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-ri-text">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
