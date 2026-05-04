"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/Button";

const fieldClass =
  "w-full rounded-xl border border-ri-border bg-ri-card px-4 py-2.5 text-sm text-ri-text placeholder:text-ri-muted/80 focus:border-ri-copper/50 focus:outline-none focus:ring-2 focus:ring-ri-copper/20";

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
            className="mb-1.5 block text-sm font-medium text-ri-text"
          >
            {t("name")}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={fieldClass}
            placeholder={t("placeholderName")}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium text-ri-text"
          >
            {t("email")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClass}
            placeholder={t("placeholderEmail")}
          />
        </div>
        <div>
          <label
            htmlFor="contact-company"
            className="mb-1.5 block text-sm font-medium text-ri-text"
          >
            {t("company")}
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            className={fieldClass}
            placeholder={t("placeholderCompany")}
          />
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="mb-1.5 block text-sm font-medium text-ri-text"
          >
            {t("message")}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            className={`${fieldClass} resize-y`}
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
          className="mt-4 text-sm text-ri-copper"
          role="status"
          aria-live="polite"
        >
          {t("success")}
        </p>
      )}
    </form>
  );
}
