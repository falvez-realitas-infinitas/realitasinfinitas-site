import type { Metadata } from "next";
import {
  ClipboardList,
  FileText,
  History,
  Link2,
  Stethoscope,
  User,
} from "lucide-react";
import { Section } from "@/components/Section";
import { FeatureCard } from "@/components/FeatureCard";
import { CTASection } from "@/components/CTASection";
import { siteConfig, clinicProduct } from "@/lib/site";

const title = "Clinic";
const description =
  "Clinic helps healthcare professionals register patients, organize patient information, and manage medical histories through a simple and reliable digital workflow.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${clinicProduct.name} · ${siteConfig.name}`,
    description,
    url: "/products/clinic",
  },
};

const workflowSteps = [
  "Register patient",
  "Complete patient profile",
  "Record medical history",
  "Access and update clinical information",
  "Keep information organized over time",
];

export default function ClinicPage() {
  return (
    <>
      <Section className="pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-violet-400/90">
            Product
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-5xl">
            Clinic: a clean foundation for patient registration and clinical
            records.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-slate-400 sm:text-lg">
            {description}
          </p>
        </div>
      </Section>

      <Section className="py-12 sm:py-16">
        <h2 className="mb-10 text-center text-2xl font-semibold text-slate-100 sm:text-3xl">
          What Clinic supports
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={ClipboardList}
            title="Patient registration"
            description="Capture new patients with consistent fields and a clear entry path into your practice."
          />
          <FeatureCard
            icon={User}
            title="Patient profiles"
            description="Maintain patient identity and demographic detail in one structured profile."
          />
          <FeatureCard
            icon={History}
            title="Medical histories"
            description="Document history over time so context stays available when it matters."
          />
          <FeatureCard
            icon={FileText}
            title="Clinical records"
            description="Organize clinical notes and records in a calm, scannable structure."
          />
          <FeatureCard
            icon={Stethoscope}
            title="Secure, structured information"
            description="Information is grouped logically — less hunting, fewer inconsistent snapshots."
          />
          <FeatureCard
            icon={Link2}
            title="Built for future integrations"
            description="A foundation that can connect to other systems when you are ready to extend."
          />
        </div>
      </Section>

      <Section className="py-12 sm:py-16" innerClassName="max-w-4xl">
        <div className="glass-panel accent-gradient-border rounded-3xl p-8 sm:p-10">
          <h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">
            Example workflow
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            A straightforward sequence you can adapt to your practice.
          </p>
          <ol className="mt-8 space-y-4">
            {workflowSteps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-sm font-medium text-sky-300">
                  {i + 1}
                </span>
                <span className="pt-1 text-slate-300">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="py-12 sm:py-20" innerClassName="max-w-3xl">
        <h2 className="text-2xl font-semibold text-slate-100 sm:text-3xl">
          Who it is for
        </h2>
        <p className="mt-5 text-base leading-relaxed text-slate-400">
          Clinic is intended for independent healthcare professionals, small
          clinics, and medical practices that need a more organized way to manage
          patient information — without adopting an overloaded suite on day one.
        </p>
      </Section>

      <CTASection
        title="Interested in Clinic?"
        description="If you are evaluating tools for your practice or exploring a partnership, we would like to hear from you."
        primaryHref="/contact"
        primaryLabel="Contact Realitas Infinitas"
      />
    </>
  );
}
