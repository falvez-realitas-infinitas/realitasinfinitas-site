import type { Metadata } from "next";
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
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("clinicTitle"),
    description: t("clinicDescription"),
    openGraph: {
      title: `${t("clinicTitle")} · ${siteConfig.name}`,
      description: t("clinicDescription"),
      url: "/products/clinic",
    },
  };
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

  return (
    <>
      <Section className="pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ri-copper">
            {t("productEyebrow")}
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-ri-text sm:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ri-muted sm:text-lg">
            {tmeta("clinicDescription")}
          </p>
        </div>
      </Section>

      <Section className="py-12 sm:py-16">
        <h2 className="mb-10 text-center text-2xl font-semibold text-ri-text sm:text-3xl">
          {t("supportsTitle")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={ClipboardList}
            title={t("feat1Title")}
            description={t("feat1Desc")}
          />
          <FeatureCard
            icon={User}
            title={t("feat2Title")}
            description={t("feat2Desc")}
          />
          <FeatureCard
            icon={History}
            title={t("feat3Title")}
            description={t("feat3Desc")}
          />
          <FeatureCard
            icon={FileText}
            title={t("feat4Title")}
            description={t("feat4Desc")}
          />
          <FeatureCard
            icon={Stethoscope}
            title={t("feat5Title")}
            description={t("feat5Desc")}
          />
          <FeatureCard
            icon={Link2}
            title={t("feat6Title")}
            description={t("feat6Desc")}
          />
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

      <Section className="py-12 sm:py-20" innerClassName="max-w-3xl">
        <h2 className="text-2xl font-semibold text-ri-text sm:text-3xl">
          {t("audienceTitle")}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-ri-muted">
          {t("audienceBody")}
        </p>
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
