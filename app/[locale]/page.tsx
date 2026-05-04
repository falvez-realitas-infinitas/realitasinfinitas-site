import type { Metadata } from "next";
import { Layers, Sparkles, Users, Workflow } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { FeatureCard } from "@/components/FeatureCard";
import { CTASection } from "@/components/CTASection";
import { CredibilityStrip } from "@/components/CredibilityStrip";
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

  const why = [
    { icon: Workflow, titleKey: "why1Title", descKey: "why1Desc" },
    { icon: Sparkles, titleKey: "why2Title", descKey: "why2Desc" },
    { icon: Layers, titleKey: "why3Title", descKey: "why3Desc" },
    { icon: Users, titleKey: "why4Title", descKey: "why4Desc" },
  ] as const;

  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 lg:min-h-[min(92vh,920px)] lg:pt-20 lg:pb-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 sm:gap-16 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:gap-y-16">
          <div className="lg:col-span-6 xl:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-ri-copper">
              {siteConfig.name}
            </p>
            <h1 className="mt-5 font-display text-[2.75rem] font-medium leading-[1.08] tracking-tight text-ri-brown sm:text-5xl lg:text-[3.35rem] xl:text-[3.65rem]">
              {t("heroTitle")}
            </h1>
            <p className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-ri-muted sm:text-lg">
              {t("heroSubhead")}
            </p>
            <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href="/products/clinic" variant="primary" className="px-8">
                {tnav("exploreClinic")}
              </Button>
              <Button href="/products" variant="secondary" className="px-8">
                {tnav("viewProducts")}
              </Button>
              <Button href="/contact" variant="ghost" className="px-2 sm:ml-1">
                {tnav("contactUs")}
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6 xl:col-span-5">
            <HeroVisual caption={t("heroVisualCaption")} />
          </div>
        </div>
      </section>

      <CredibilityStrip />

      <Section
        className="border-t border-ri-border py-20 sm:py-28"
        innerClassName="max-w-[840px]"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ri-copper">
          {t("brandEyebrow")}
        </p>
        <h2 className="mt-5 font-display text-3xl font-medium leading-[1.2] text-ri-text sm:text-[2.15rem]">
          {t("brandTitle")}
        </h2>
        <div className="mt-8 border-l-[3px] border-ri-copper pl-8">
          <p className="text-[1.05rem] leading-relaxed text-ri-muted sm:text-lg">
            {t("brandBody")}
          </p>
        </div>
      </Section>

      <Section className="bg-ri-bg-warm/35 py-20 sm:py-28" innerClassName="max-w-[1200px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium text-ri-text sm:text-[2.25rem]">
              {t("productsSectionTitle")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ri-muted sm:text-[1.05rem]">
              {t("productsSectionIntro")}
            </p>
          </div>
        </div>

        <div className="mt-14">
          <div className="overflow-hidden rounded-[2rem] border border-ri-border/90 bg-ri-card shadow-[0_32px_100px_-48px_rgba(89,42,25,0.35)]">
            <div className="grid gap-10 p-10 sm:p-12 lg:grid-cols-[1fr_minmax(12rem,auto)] lg:gap-14 lg:p-14">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-ri-copper">
                  {t("clinicEyebrow")}
                </p>
                <h3 className="mt-4 font-display text-3xl font-medium text-ri-brown sm:text-[2.15rem]">
                  {t("clinicCardTitle")}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-ri-muted">
                  {t("clinicCardDesc")}
                </p>
              </div>
              <div className="flex flex-col justify-center gap-4 border-t border-ri-border pt-10 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
                <Button href="/products/clinic" variant="primary" className="w-full px-8">
                  {t("clinicLearnMore")}
                </Button>
                <Button href="/products" variant="secondary" className="w-full px-8">
                  {t("viewAllProducts")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-20 sm:py-28" innerClassName="max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-medium text-ri-text sm:text-[2.35rem]">
            {t("whyTitle")}
          </h2>
          <p className="mt-4 text-[1.05rem] text-ri-muted">{t("whyIntro")}</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-10">
          {why.map((item, i) => (
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

      <CTASection
        tone="brand"
        title={t("ctaTitle")}
        description={t("ctaDescription")}
        primaryHref="/contact"
        primaryLabel={tnav("contactUs")}
        secondaryHref="/products/clinic"
        secondaryLabel={tnav("exploreClinic")}
        className="pb-28 sm:pb-36"
      />
    </>
  );
}
