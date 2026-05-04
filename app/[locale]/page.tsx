import type { Metadata } from "next";
import { Layers, Sparkles, Users, Workflow } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { FeatureCard } from "@/components/FeatureCard";
import { CTASection } from "@/components/CTASection";
import { HeroVisual } from "@/components/HeroVisual";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    openGraph: {
      title: `${siteConfig.name} · ${t("homeTitle")}`,
      description: t("homeDescription"),
      url: "/",
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");
  const tnav = await getTranslations("nav");

  return (
    <>
      <Section
        className="pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16"
        innerClassName="max-w-6xl"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ri-copper">
              {siteConfig.name}
            </p>
            <h1 className="text-4xl font-semibold leading-[1.15] tracking-tight text-ri-brown sm:text-5xl lg:text-[2.65rem]">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ri-muted sm:text-lg">
              {t("heroSubhead")}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href="/products/clinic" variant="primary">
                {tnav("exploreClinic")}
              </Button>
              <Button href="/products" variant="secondary">
                {tnav("viewProducts")}
              </Button>
              <Button href="/contact" variant="ghost">
                {tnav("contactUs")}
              </Button>
            </div>
          </div>
          <HeroVisual caption={t("heroVisualCaption")} />
        </div>
      </Section>

      <Section
        className="border-t border-ri-border bg-ri-blue/25 py-16 sm:py-20"
        innerClassName="max-w-3xl"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-ri-text sm:text-3xl">
          {t("brandTitle")}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-ri-muted sm:text-lg">
          {t("brandBody")}
        </p>
      </Section>

      <Section className="py-16 sm:py-20" innerClassName="max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-ri-text sm:text-3xl">
            {t("productsSectionTitle")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ri-muted sm:text-lg">
            {t("productsSectionIntro")}
          </p>
        </div>

        <div className="mt-10">
          <div className="glass-panel accent-gradient-border rounded-3xl p-8 sm:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-semibold text-ri-text sm:text-2xl">
                  {t("clinicCardTitle")}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ri-muted sm:text-base">
                  {t("clinicCardDesc")}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <Button href="/products/clinic" variant="primary">
                  {t("clinicLearnMore")}
                </Button>
                <Button href="/products" variant="secondary">
                  {t("viewAllProducts")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-ri-text sm:text-3xl">
            {t("whyTitle")}
          </h2>
          <p className="mt-3 text-ri-muted">{t("whyIntro")}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={Workflow}
            title={t("why1Title")}
            description={t("why1Desc")}
          />
          <FeatureCard
            icon={Sparkles}
            title={t("why2Title")}
            description={t("why2Desc")}
          />
          <FeatureCard
            icon={Layers}
            title={t("why3Title")}
            description={t("why3Desc")}
          />
          <FeatureCard
            icon={Users}
            title={t("why4Title")}
            description={t("why4Desc")}
          />
        </div>
      </Section>

      <CTASection
        tone="brand"
        title={t("ctaTitle")}
        description={t("ctaDescription")}
        primaryHref="/contact"
        primaryLabel={tnav("contactUs")}
        secondaryHref="/products/clinic"
        secondaryLabel={tnav("exploreClinic")}
        className="pb-24 sm:pb-32"
      />
    </>
  );
}
