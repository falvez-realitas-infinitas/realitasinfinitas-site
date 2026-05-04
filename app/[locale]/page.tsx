import type { Metadata } from "next";
import {
  Activity,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { FeatureCard } from "@/components/FeatureCard";
import { CTASection } from "@/components/CTASection";
import { InfinityGraphic } from "@/components/InfinityGraphic";
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
  const tsite = await getTranslations("site");

  return (
    <>
      <Section
        className="pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20"
        innerClassName="max-w-6xl"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-sky-400/80">
              {t("heroEyebrow")}
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-5xl lg:text-[2.75rem] lg:leading-[1.1]">
              <span className="text-gradient">{t("heroTitle")}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              {tsite("description")}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/products/clinic" variant="primary">
                {tnav("exploreClinic")}
              </Button>
              <Button href="/contact" variant="secondary">
                {tnav("contactUs")}
              </Button>
            </div>
          </div>
          <InfinityGraphic />
        </div>
      </Section>

      <Section className="py-16 sm:py-20" innerClassName="max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
          {t("howWeWorkTitle")}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
          {t.rich("howWeWorkP1", {
            name: siteConfig.name,
            m1: (chunks) => (
              <strong className="font-medium text-slate-300">{chunks}</strong>
            ),
            m2: (chunks) => (
              <strong className="font-medium text-slate-300">{chunks}</strong>
            ),
            m3: (chunks) => (
              <strong className="font-medium text-slate-300">{chunks}</strong>
            ),
          })}
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate-500">
          {t("howWeWorkP2")}
        </p>
      </Section>

      <Section className="py-12 sm:py-16" innerClassName="max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
            {t("clinicSectionTitle")}
          </h2>
          <p className="mt-3 text-slate-400">{t("clinicSectionIntro")}</p>
        </div>
        <div className="glass-panel accent-gradient-border grid gap-8 rounded-3xl p-8 sm:grid-cols-2 sm:p-10">
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
              {t("clinicBullet1")}
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
              {t("clinicBullet2")}
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
              {t("clinicBullet3")}
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
              {t("clinicBullet4")}
            </li>
          </ul>
          <div className="flex flex-col justify-center gap-4 border-t border-white/10 pt-8 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
            <p className="text-sm leading-relaxed text-slate-400">
              {t("clinicAside")}
            </p>
            <Link
              href="/products/clinic"
              className="inline-flex w-fit text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
            >
              {t("clinicReadMore")}
            </Link>
          </div>
        </div>
      </Section>

      <Section className="py-12 sm:py-20">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
            {t("principlesTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            {t("principlesIntro")}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={Sparkles}
            title={t("principle1Title")}
            description={t("principle1Desc")}
          />
          <FeatureCard
            icon={Layers}
            title={t("principle2Title")}
            description={t("principle2Desc")}
          />
          <FeatureCard
            icon={Activity}
            title={t("principle3Title")}
            description={t("principle3Desc")}
          />
          <FeatureCard
            icon={ShieldCheck}
            title={t("principle4Title")}
            description={t("principle4Desc")}
          />
        </div>
      </Section>

      <CTASection
        title={t("ctaTitle")}
        description={t("ctaDescription")}
        primaryHref="/products/clinic"
        primaryLabel={tnav("exploreClinic")}
        secondaryHref="/contact"
        secondaryLabel={tnav("contactUs")}
      />
    </>
  );
}
