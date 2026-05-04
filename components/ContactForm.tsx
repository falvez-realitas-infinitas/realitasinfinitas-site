"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/Button";

export function ContactForm() {
  const t = useTranslations("ContactForm");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: Integrate email sending (e.g. Resend, SendGrid, or a server action)
    // via API route or third-party form backend. Wire `name`, `email`, `company`, `message`.
    setSubmitted(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel accent-gradient-border mx-auto max-w-xl rounded-2xl p-6 sm:p-8"
      noValidate
    >
      <div className="space-y-5">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium text-slate-300"
          >
            {t("name")}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="w-full rounded-lg border border-slate-700/60 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            placeholder={t("placeholderName")}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium text-slate-300"
          >
            {t("email")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-lg border border-slate-700/60 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            placeholder={t("placeholderEmail")}
          />
        </div>
        <div>
          <label
            htmlFor="contact-company"
            className="mb-1.5 block text-sm font-medium text-slate-300"
          >
            {t("company")}
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            className="w-full rounded-lg border border-slate-700/60 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            placeholder={t("placeholderCompany")}
          />
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="mb-1.5 block text-sm font-medium text-slate-300"
          >
            {t("message")}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            className="w-full resize-y rounded-lg border border-slate-700/60 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            placeholder={t("placeholderMessage")}
          />
        </div>
      </div>
      <div className="mt-8">
        <Button type="submit" variant="primary" className="w-full sm:w-auto">
          {t("submit")}
        </Button>
      </div>
      {submitted && (
        <p
          className="mt-4 text-sm text-sky-300/90"
          role="status"
          aria-live="polite"
        >
          {t("success")}
        </p>
      )}
    </form>
  );
}
