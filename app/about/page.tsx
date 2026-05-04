import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/site";

const title = "About";
const description = `${siteConfig.name} is a product-oriented software company focused on precision, usability, and maintainability.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} · ${siteConfig.name}`,
    description,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <Section className="pt-12 pb-24 sm:pt-16 sm:pb-32" innerClassName="max-w-3xl">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
        {title}
      </h1>
      <div className="mt-10 space-y-6 text-base leading-relaxed text-slate-400 sm:text-lg">
        <p>
          {siteConfig.name} is a product-oriented software company. We focus on
          building systems that combine{" "}
          <strong className="font-medium text-slate-300">
            technical precision
          </strong>
          , <strong className="font-medium text-slate-300">usability</strong>,
          and{" "}
          <strong className="font-medium text-slate-300">
            long-term maintainability
          </strong>
          — so the software you rely on today can still make sense years from now.
        </p>
        <p>
          Our work starts with healthcare: Clinic is the first product, centered
          on patient registration, profiles, medical histories, and clinical
          records. Over time, we expect to introduce additional product lines that
          share the same commitment to structured information and clear
          workflows.
        </p>
        <p className="text-slate-500">
          We avoid hype and overstated claims. We prefer calm interfaces,
          explicit data models, and software that earns trust through
          consistency — built to evolve alongside your organization.
        </p>
      </div>
    </Section>
  );
}
