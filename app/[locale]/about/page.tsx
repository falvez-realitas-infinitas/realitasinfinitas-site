import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowDown, Sparkles } from "lucide-react";
import { LeadershipSection } from "@/components/LeadershipSection";
import { Section } from "@/components/Section";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildPageMetadata({
    locale: locale as "en" | "es",
    pathname: "/about",
    title: t("aboutTitle"),
    description: t("aboutDescription"),
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("AboutPage");
  const tmeta = await getTranslations("meta");

  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: tmeta("aboutTitle"),
    description: tmeta("aboutDescription"),
    url: `${siteConfig.url}/${locale}/about`,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageJsonLd),
        }}
      />
    <Section
      density="tight"
      className="relative overflow-hidden border-b border-ri-border/20 bg-gradient-to-b from-ri-bg-warm/30 via-ri-bg to-ri-bg pt-6 pb-14 sm:pt-8 sm:pb-16 lg:pb-20"
      innerClassName="relative max-w-[1200px] px-5 sm:px-8"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(52vh,420px)] bg-[radial-gradient(ellipse_90%_70%_at_50%_-15%,rgba(110,165,200,0.14),transparent)]"
        aria-hidden
      />

      <div className="relative z-[1] grid gap-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0 xl:gap-x-12">
        <div className="lg:col-span-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ri-copper">
            {t("eyebrow")}
          </p>
          <h1
            id="about-heading"
            className="mt-3 font-display text-[2.1rem] font-medium leading-[1.08] tracking-tight text-ri-brown sm:mt-4 sm:text-[2.45rem] lg:text-[2.65rem]"
          >
            {tmeta("aboutTitle")}
          </h1>
          <div className="mt-5 max-w-2xl space-y-4 text-[1.05rem] leading-relaxed text-ri-muted sm:mt-6 sm:max-w-none sm:text-lg">
            <p>
              {t.rich("p1", {
                name: siteConfig.name,
                m1: (chunks) => (
                  <strong className="font-medium text-ri-brown">{chunks}</strong>
                ),
                m2: (chunks) => (
                  <strong className="font-medium text-ri-brown">{chunks}</strong>
                ),
                m3: (chunks) => (
                  <strong className="font-medium text-ri-brown">{chunks}</strong>
                ),
              })}
            </p>
            <p className="rounded-2xl border border-ri-border/50 bg-ri-card/70 px-5 py-4 text-ri-muted shadow-[0_1px_0_rgba(255,255,255,0.65)_inset] sm:px-6 sm:py-5">
              {t("p2")}
            </p>
          </div>
        </div>

        <aside className="lg:col-span-5 lg:self-start">
          <div className="glass-panel accent-gradient-border relative overflow-hidden rounded-3xl p-6 sm:p-7 lg:sticky lg:top-24 xl:top-28">
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(166,107,73,0.12),transparent_68%)]"
              aria-hidden
            />
            <div className="relative flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ri-brown/[0.06] text-ri-copper ring-1 ring-ri-border/60">
                <Sparkles className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ri-copper">
                  {t("asideTitle")}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ri-muted sm:text-[0.9375rem]">
                  {t("p3")}
                </p>
                <Link
                  href="/about#leadership"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ri-copper underline decoration-ri-border/80 underline-offset-[5px] transition-colors hover:text-ri-brown"
                >
                  {t("asideCta")}
                  <ArrowDown className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <LeadershipSection
        embedded
        className="relative z-[1] mt-10 scroll-mt-28 border-t border-ri-border/25 pt-8 sm:mt-11 sm:scroll-mt-32 sm:pt-10"
      />
    </Section>
    </>
  );
}
