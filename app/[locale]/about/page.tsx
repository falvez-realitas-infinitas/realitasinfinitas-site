import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LeadershipSection } from "@/components/LeadershipSection";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    openGraph: {
      title: `${t("aboutTitle")} · ${siteConfig.name}`,
      description: t("aboutDescription"),
      url: "/about",
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("AboutPage");
  const tmeta = await getTranslations("meta");

  return (
    <>
      <Section
        className="pt-12 pb-10 sm:pt-16 sm:pb-12"
        innerClassName="max-w-3xl"
      >
        <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
          {tmeta("aboutTitle")}
        </h1>
        <div className="mt-10 space-y-6 text-base leading-relaxed text-slate-400 sm:text-lg">
          <p>
            {t.rich("p1", {
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
          <p>{t("p2")}</p>
          <p className="text-slate-500">{t("p3")}</p>
        </div>
      </Section>
      <LeadershipSection className="pb-24 sm:pb-32" />
    </>
  );
}
