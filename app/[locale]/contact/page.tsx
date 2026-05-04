import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
    openGraph: {
      title: `${t("contactTitle")} · ${siteConfig.name}`,
      description: t("contactDescription"),
      url: "/contact",
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ContactPage");
  const tmeta = await getTranslations("meta");

  return (
    <Section className="pt-12 pb-24 sm:pt-16 sm:pb-32">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-ri-text sm:text-5xl">
          {tmeta("contactTitle")}
        </h1>
        <p className="mt-4 text-ri-muted">{t("intro")}</p>
        <p className="mt-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm font-semibold text-ri-copper transition-colors hover:text-ri-brown"
          >
            {siteConfig.email}
          </a>
        </p>
      </div>
      <div className="mt-14">
        <ContactForm />
      </div>
    </Section>
  );
}
