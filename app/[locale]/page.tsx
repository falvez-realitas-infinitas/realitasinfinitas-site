import type { Metadata } from "next";
import Image from "next/image";
import { Layers, Sparkles, Users, Workflow } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/Section";
import { FeatureCard } from "@/components/FeatureCard";
import { ServicesSection } from "@/components/ServicesSection";
import { CTASection } from "@/components/CTASection";
import { CredibilityStrip } from "@/components/CredibilityStrip";
import { HeroVisual } from "@/components/HeroVisual";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildPageMetadata({
    locale: locale as "en" | "es",
    pathname: "/",
    title: t("homeTitle"),
    description: t("homeDescription"),
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  const why = [
    { icon: Workflow, titleKey: "why1Title", descKey: "why1Desc" },
    { icon: Sparkles, titleKey: "why2Title", descKey: "why2Desc" },
    { icon: Layers, titleKey: "why3Title", descKey: "why3Desc" },
    { icon: Users, titleKey: "why4Title", descKey: "why4Desc" },
  ] as const;

  const stackTech = [
    { key: "stackTech1", logo: "/tech-logos/nextdotjs.svg" },
    { key: "stackTech2", logo: "/tech-logos/react.svg" },
    { key: "stackTech3", logo: "/tech-logos/typescript.svg" },
    { key: "stackTech4", logo: "/tech-logos/tailwindcss.svg" },
    { key: "stackTech5", logo: "/tech-logos/nextintl.svg" },
    { key: "stackTech6", logo: "/tech-logos/lucide.svg" },
    { key: "stackTech7", logo: "/tech-logos/prisma.svg" },
    { key: "stackTech8", logo: "/tech-logos/postgresql.svg" },
    { key: "stackTech9", logo: "/tech-logos/nextauth.svg" },
    { key: "stackTech10", logo: "/tech-logos/zod.svg" },
    { key: "stackTech11", logo: "/tech-logos/vercel.svg" },
    { key: "stackTech12", logo: "/tech-logos/github.svg" },
  ] as const;

  return (
    <>
      <section className="relative overflow-hidden border-b border-ri-border/40 bg-gradient-to-b from-ri-bg-warm/25 via-ri-bg to-ri-bg pt-10 pb-14 sm:pt-12 sm:pb-16 lg:py-[clamp(3rem,11vh,5.25rem)]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[42%] bg-[radial-gradient(ellipse_85%_65%_at_50%_-10%,rgba(110,165,200,0.16),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-5 sm:gap-12 sm:px-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
          <div className="flex flex-col justify-center lg:col-span-6 xl:col-span-7 lg:min-h-[min(52vh,440px)] xl:min-h-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ri-copper">
              {t("heroEyebrow")}
            </p>
            <h1 className="mt-4 font-display text-[2.6rem] font-medium leading-[1.06] tracking-tight text-ri-brown sm:text-[2.75rem] lg:mt-5 lg:text-[3.15rem] xl:text-[3.45rem]">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ri-muted sm:mt-7 sm:text-lg">
              {t("heroSubhead")}
            </p>
          </div>
          <div className="flex items-center justify-center lg:col-span-6 xl:col-span-5 lg:justify-end">
            <HeroVisual caption={t("heroVisualCaption")} />
          </div>
        </div>
      </section>

      <CredibilityStrip />

      <ServicesSection />

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

        <div className="mt-14 max-w-3xl space-y-10">
          <div className="overflow-hidden rounded-[2rem] border border-ri-border/90 bg-ri-card shadow-[0_32px_100px_-48px_rgba(89,42,25,0.35)]">
            <div className="p-10 sm:p-12 lg:p-14">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
                <div className="flex shrink-0 justify-center lg:justify-start">
                  <div className="inline-flex w-fit max-w-full items-center justify-center rounded-2xl border border-ri-border/45 bg-gradient-to-br from-white via-ri-bg-soft/95 to-ri-bg-warm/45 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.88)] sm:px-5 sm:py-4 lg:w-[min(100%,300px)] lg:py-5">
                    <Image
                      src="/brand/clinic-logo-edit-2.png"
                      alt=""
                      width={1024}
                      height={161}
                      unoptimized
                      sizes="(max-width: 1024px) 85vw, 300px"
                      className="h-auto w-full max-w-[min(100%,280px)] object-contain object-center sm:max-w-[300px]"
                      aria-hidden
                    />
                  </div>
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-ri-copper">
                    {t("clinicEyebrow")}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-medium text-ri-brown sm:text-[2.15rem]">
                    {t("clinicCardTitle")}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-ri-muted">
                    {t("clinicCardDesc")}
                  </p>
                  <div className="mt-10 border-t border-ri-border pt-10">
                    <Link
                      href="/products/clinic"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-ri-brown px-8 py-2.5 text-sm font-semibold tracking-wide text-white shadow-sm transition-[background-color] duration-300 hover:bg-ri-copper"
                    >
                      {t("clinicLearnMore")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-ri-border/90 bg-ri-card shadow-[0_32px_100px_-48px_rgba(89,42,25,0.35)]">
            <div className="p-10 sm:p-12 lg:p-14">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-ri-copper">
                {t("footxEyebrow")}
              </p>
              <h3 className="mt-4 font-display text-3xl font-medium text-ri-brown sm:text-[2.15rem]">
                {t("footxCardTitle")}
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ri-muted">
                {t("footxCardDesc")}
              </p>
              <div className="mt-10 border-t border-ri-border pt-10">
                <Link
                  href="/products/footx-scheduler"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ri-brown px-8 py-2.5 text-sm font-semibold tracking-wide text-white shadow-sm transition-[background-color] duration-300 hover:bg-ri-copper"
                >
                  {t("footxLearnMore")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-ri-border py-20 sm:py-28" innerClassName="max-w-[1200px]">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ri-copper">
            {t("stackEyebrow")}
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium text-ri-text sm:text-[2.2rem]">
            {t("stackTitle")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ri-muted sm:text-[1.05rem]">
            {t("stackIntro")}
          </p>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stackTech.map(({ key, logo }) => (
            <li
              key={key}
              aria-label={t(key)}
              className="group relative overflow-hidden rounded-2xl border border-ri-border/70 bg-gradient-to-br from-white/95 via-ri-bg-soft/75 to-ri-bg-warm/30 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] transition-all duration-300 hover:-translate-y-0.5 hover:border-ri-copper/45 hover:shadow-[0_16px_32px_-24px_rgba(89,42,25,0.45)]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/70 to-transparent opacity-80" aria-hidden />
              <div className="relative flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ri-border/60 bg-white/90 p-1.5 transition-colors duration-300 group-hover:border-ri-copper/35 group-hover:bg-ri-bg-warm/50">
                  <Image
                    src={logo}
                    alt={`${t(key)} logo`}
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain"
                  />
                </span>
                <span className="block truncate text-sm font-semibold tracking-[0.01em] text-ri-text">
                  {t(key)}
                </span>
              </div>
            </li>
          ))}
        </ul>
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
        primaryLabel={t("ctaPrimary")}
        secondaryHref="/products/clinic"
        secondaryLabel={t("ctaSecondary")}
        className="pb-28 sm:pb-36"
      />
    </>
  );
}
