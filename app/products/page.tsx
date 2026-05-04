import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ProductCard } from "@/components/ProductCard";
import { siteConfig, clinicProduct } from "@/lib/site";

const title = "Products";
const description = `${siteConfig.name} builds a family of products for structured workflows. Clinic is the first — more will follow.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} · ${siteConfig.name}`,
    description,
    url: "/products",
  },
};

export default function ProductsPage() {
  return (
    <Section className="pt-12 pb-20 sm:pt-16 sm:pb-28">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
          {siteConfig.name} will build a small family of products over time,
          each focused on clear workflows and structured information. The roadmap
          is intentional: depth first, then expansion.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-2">
        <ProductCard
          title={clinicProduct.name}
          description={clinicProduct.shortDescription}
          href="/products/clinic"
          status="available"
        />
        <ProductCard
          title="Future product"
          description="Additional product lines are planned as the company grows. Details will be shared when they are ready."
          status="coming"
          subtle
        />
        <ProductCard
          title="Another future line"
          description="A quiet placeholder for what comes next — we prefer shipping over promising."
          status="coming"
          subtle
        />
      </div>
    </Section>
  );
}
