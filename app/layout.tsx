import type { Metadata, Viewport } from "next";
import { Fraunces, Geist_Mono, Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  const locale = await getLocale();
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${fraunces.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-ri-text">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="relative z-[1] flex flex-1 flex-col">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
