import type { Metadata } from "next";
import Image from "next/image";
import {
  ClipboardList,
  FileText,
  History,
  Link2,
  Stethoscope,
  User,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/Section";
import { FeatureCard } from "@/components/FeatureCard";
import { CTASection } from "@/components/CTASection";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildPageMetadata({
    locale: locale as "en" | "es",
    pathname: "/products/clinic",
    title: t("clinicTitle"),
    description: t("clinicDescription"),
  });
}

export default async function ClinicPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ClinicPage");
  const tmeta = await getTranslations("meta");

  const workflowSteps = [
    t("workflowStep1"),
    t("workflowStep2"),
    t("workflowStep3"),
    t("workflowStep4"),
    t("workflowStep5"),
  ];

  const features = [
    { icon: ClipboardList, titleKey: "feat1Title" as const, descKey: "feat1Desc" as const },
    { icon: User, titleKey: "feat2Title" as const, descKey: "feat2Desc" as const },
    { icon: History, titleKey: "feat3Title" as const, descKey: "feat3Desc" as const },
    { icon: FileText, titleKey: "feat4Title" as const, descKey: "feat4Desc" as const },
    { icon: Stethoscope, titleKey: "feat5Title" as const, descKey: "feat5Desc" as const },
    { icon: Link2, titleKey: "feat6Title" as const, descKey: "feat6Desc" as const },
  ];

  return (
    <>
      <Section className="border-b border-ri-border/35 pt-12 pb-18 sm:pt-16 sm:pb-22">
        <div className="mx-auto flex max-w-[40rem] flex-col items-center text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ri-copper">
            {t("productEyebrow")}
          </p>
          <span
            className="mt-5 block h-px w-10 bg-ri-copper/35 sm:mt-6"
            aria-hidden
          />
          <div className="mt-8 w-full max-w-[min(100%,28rem)] sm:mt-10">
            <Image
              src="/brand/clinic-logo-edit-2.png"
              alt={tmeta("clinicTitle")}
              width={1024}
              height={161}
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, 448px"
              className="mx-auto h-auto w-full object-contain object-center"
            />
          </div>
          <h1 className="mt-10 max-w-[34rem] font-display text-[2.15rem] font-medium leading-[1.14] tracking-tight text-ri-brown sm:mt-12 sm:text-4xl sm:leading-[1.12] lg:text-[2.75rem]">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 max-w-[32rem] text-base leading-relaxed text-ri-muted sm:mt-7 sm:text-lg">
            {tmeta("clinicDescription")}
          </p>
          <div className="mt-8 sm:mt-9">
            <a
              href="https://clinic.realitasinfinitas.com/login"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ri-brown px-6 py-2.5 text-sm font-semibold tracking-wide text-white shadow-sm transition-[background-color,border-color,color,box-shadow] duration-300 hover:bg-ri-copper active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ri-copper"
            >
              {t("loginCta")}
            </a>
          </div>
        </div>
      </Section>

      <Section className="py-14 sm:py-18">
        <h2 className="mb-12 text-center font-display text-2xl font-medium text-ri-text sm:mb-14 sm:text-3xl">
          {t("supportsTitle")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, i) => (
            <FeatureCard
              key={item.titleKey}
              icon={item.icon}
              title={t(item.titleKey)}
              description={t(item.descKey)}
              index={i}
            />
          ))}
        </div>
      </Section>

      <Section className="py-12 sm:py-16" innerClassName="max-w-4xl">
        <div className="glass-panel accent-gradient-border rounded-3xl p-8 sm:p-10">
          <h2 className="text-xl font-semibold text-ri-text sm:text-2xl">
            {t("workflowTitle")}
          </h2>
          <p className="mt-2 text-sm text-ri-muted">{t("workflowSubtitle")}</p>
          <ol className="mt-8 space-y-4">
            {workflowSteps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ri-copper/35 bg-ri-blue/50 text-sm font-semibold text-ri-brown">
                  {i + 1}
                </span>
                <span className="pt-1 text-ri-text">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="py-12 sm:py-20" innerClassName="max-w-2xl">
        <div className="mx-auto text-center">
          <h2 className="font-display text-2xl font-medium text-ri-text sm:text-3xl">
            {t("audienceTitle")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ri-muted sm:mt-6">
            {t("audienceBody")}
          </p>
        </div>
      </Section>

      <CTASection
        tone="brand"
        title={t("ctaTitle")}
        description={t("ctaDescription")}
        primaryHref="/contact"
        primaryLabel={t("ctaPrimary")}
      />
    </>
  );
}
