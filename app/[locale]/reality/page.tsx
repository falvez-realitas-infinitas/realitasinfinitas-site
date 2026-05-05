import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RealityBuilder } from "@/components/reality-builder/RealityBuilder";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("realityTitle"),
    description: t("realityDescription"),
    openGraph: {
      title: `${t("realityTitle")} · ${siteConfig.name}`,
      description: t("realityDescription"),
      url: "/reality",
    },
  };
}

export default async function RealityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RealityBuilder />;
}
