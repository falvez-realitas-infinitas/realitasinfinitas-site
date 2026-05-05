import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RealityBuilder } from "@/components/reality-builder/RealityBuilder";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildPageMetadata({
    locale: locale as "en" | "es",
    pathname: "/reality",
    title: t("realityTitle"),
    description: t("realityDescription"),
  });
}

export default async function RealityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RealityBuilder />;
}
