import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

const title = "Contact";
const description = `Reach ${siteConfig.name} about Clinic, partnerships, or general inquiries.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} · ${siteConfig.name}`,
    description,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <Section className="pt-12 pb-24 sm:pt-16 sm:pb-32">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-slate-400">
          Send a message using the form below, or email us directly.
        </p>
        <p className="mt-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
          >
            {siteConfig.email}
          </a>
        </p>
      </div>
      <div className="mt-14">
        <ContactForm />
      </div>
    </Section>
  );
}
