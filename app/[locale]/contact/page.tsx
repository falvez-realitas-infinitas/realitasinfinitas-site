import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildPageMetadata({
    locale: locale as "en" | "es",
    pathname: "/contact",
    title: t("contactTitle"),
    description: t("contactDescription"),
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ContactPage");
  const tmeta = await getTranslations("meta");

  return (
    <Section className="pt-12 pb-24 sm:pt-16 sm:pb-32">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-medium tracking-tight text-ri-brown sm:text-5xl">
          {tmeta("contactTitle")}
        </h1>
        <p className="mt-4 text-ri-muted">{t("intro")}</p>
        <div className="mt-8 flex w-full flex-col items-center gap-4 sm:mt-10">
          <div className="flex w-full max-w-xl flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex min-h-[2.75rem] w-full max-w-md items-center justify-center rounded-xl border border-ri-border/70 bg-white/90 px-5 py-2.5 text-center text-base font-semibold text-ri-brown shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_4px_14px_-6px_rgba(42,27,22,0.12)] transition-[color,box-shadow,border-color] hover:border-ri-copper/45 hover:text-ri-copper sm:w-auto sm:min-w-[min(100%,20rem)] sm:text-[1.0625rem]"
            >
              {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="inline-flex min-h-[2.75rem] w-full max-w-md items-center justify-center rounded-xl border border-ri-border/70 bg-white/90 px-5 py-2.5 text-center text-base font-semibold text-ri-brown shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_4px_14px_-6px_rgba(42,27,22,0.12)] transition-[color,box-shadow,border-color] hover:border-ri-copper/45 hover:text-ri-copper sm:w-auto sm:min-w-[min(100%,14rem)] sm:text-[1.0625rem]"
            >
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
      <div className="mt-14">
        <ContactForm />
      </div>
    </Section>
  );
}
