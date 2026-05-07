import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/Section";
import { ProductCard } from "@/components/ProductCard";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildPageMetadata({
    locale: locale as "en" | "es",
    pathname: "/products",
    title: t("productsTitle"),
    description: t("productsDescription"),
  });
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ProductsPage");
  const tmeta = await getTranslations("meta");
  const tclinic = await getTranslations("clinicProduct");
  const tfootx = await getTranslations("footxProduct");

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

      <div className="mt-14 flex max-w-3xl flex-col gap-10 sm:mt-16">
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
        <ProductCard
          title={tmeta("footxSchedulerTitle")}
          description={tfootx("shortDescription")}
          href="/products/footx-scheduler"
          status="available"
        />
      </div>
    </Section>
  );
}
