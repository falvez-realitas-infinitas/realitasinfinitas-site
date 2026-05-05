import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/Section";
import { ProductCard } from "@/components/ProductCard";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("productsTitle"),
    description: t("productsDescription"),
    openGraph: {
      title: `${t("productsTitle")} · ${siteConfig.name}`,
      description: t("productsDescription"),
      url: "/products",
    },
  };
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ProductsPage");
  const tmeta = await getTranslations("meta");
  const tclinic = await getTranslations("clinicProduct");

  return (
    <Section className="pt-12 pb-20 sm:pt-16 sm:pb-28">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-medium tracking-tight text-ri-brown sm:text-5xl">
          {tmeta("productsTitle")}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ri-muted sm:text-lg">
          {t("intro")}
        </p>
      </div>

      <div className="mt-14 max-w-3xl sm:mt-16">
        <ProductCard
          logo={{
            src: "/brand/clinic-logo-edit-2.png",
            alt: tmeta("clinicTitle"),
            width: 1024,
            height: 161,
            unoptimized: true,
          }}
          title={tmeta("clinicTitle")}
          description={tclinic("shortDescription")}
          href="/products/clinic"
          status="available"
        />
      </div>
    </Section>
  );
}
