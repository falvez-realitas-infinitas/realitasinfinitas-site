import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { FeatureCard } from "@/components/FeatureCard";
import { CTASection } from "@/components/CTASection";
import { InfinityGraphic } from "@/components/InfinityGraphic";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} · Home`,
    description: siteConfig.description,
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Section
        className="pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20"
        innerClassName="max-w-6xl"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-sky-400/80">
              Software company
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-5xl lg:text-[2.75rem] lg:leading-[1.1]">
              <span className="text-gradient">
                Software systems for realities that keep evolving.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              {siteConfig.description}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/products/clinic" variant="primary">
                Explore Clinic
              </Button>
              <Button href="/contact" variant="secondary">
                Contact us
              </Button>
            </div>
          </div>
          <InfinityGraphic />
        </div>
      </Section>

      <Section
        className="py-16 sm:py-20"
        innerClassName="max-w-3xl"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
          How we work
        </h2>
        <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
          {siteConfig.name} creates software products designed for{" "}
          <strong className="font-medium text-slate-300">clarity</strong>,{" "}
          <strong className="font-medium text-slate-300">reliability</strong>,
          and{" "}
          <strong className="font-medium text-slate-300">
            long-term evolution
          </strong>
          . We architect structured information and clear workflows so teams can
          rely on a digital foundation that grows with their operations.
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate-500">
          The first product line focuses on healthcare: from patient registration
          to clinical history management, with a calm interface and a path toward
          future integrations.
        </p>
      </Section>

      <Section className="py-12 sm:py-16" innerClassName="max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
            First product: Clinic
          </h2>
          <p className="mt-3 text-slate-400">
            A reliable digital foundation for patient registration, medical
            history, and clinical records — designed for healthcare professionals.
          </p>
        </div>
        <div className="glass-panel accent-gradient-border grid gap-8 rounded-3xl p-8 sm:grid-cols-2 sm:p-10">
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
              Patient registration
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
              Medical history management
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
              Clinical record organization
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
              Simple, secure, scalable foundation
            </li>
          </ul>
          <div className="flex flex-col justify-center gap-4 border-t border-white/10 pt-8 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
            <p className="text-sm leading-relaxed text-slate-400">
              Clinic is not a generic template — it is structured information and
              clear workflows for practices that need organization without noise.
            </p>
            <Link
              href="/products/clinic"
              className="inline-flex w-fit text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
            >
              Read more about Clinic →
            </Link>
          </div>
        </div>
      </Section>

      <Section className="py-12 sm:py-20">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
            Product principles
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Values that guide how we design and ship software.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={Sparkles}
            title="Clarity over complexity"
            description="Interfaces and data models that stay understandable as your workflows grow."
          />
          <FeatureCard
            icon={Layers}
            title="Reliable workflows"
            description="Predictable paths for daily operations — fewer surprises, clearer handoffs."
          />
          <FeatureCard
            icon={Activity}
            title="Human-centered design"
            description="Built for the people using the system: calm, precise, and respectful of context."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Built to evolve"
            description="A foundation you can extend — integrations and products over time, not dead ends."
          />
        </div>
      </Section>

      <CTASection
        title="Learn more about Clinic"
        description="See how Clinic supports patient registration, profiles, and clinical records — or reach out to discuss partnerships and early access."
        primaryHref="/products/clinic"
        primaryLabel="Explore Clinic"
        secondaryHref="/contact"
        secondaryLabel="Contact us"
      />
    </>
  );
}
