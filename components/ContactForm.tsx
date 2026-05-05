"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/Button";

const fieldClass =
  "w-full rounded-xl border border-ri-border bg-ri-card px-4 py-2.5 text-sm text-ri-text placeholder:text-ri-muted/80 focus:border-ri-copper/50 focus:outline-none focus:ring-2 focus:ring-ri-copper/20";

const compactFieldClass =
  "w-full rounded-lg border border-ri-border bg-ri-card px-3.5 py-2.5 text-sm text-ri-text placeholder:text-ri-muted/80 focus:border-ri-copper/50 focus:outline-none focus:ring-2 focus:ring-ri-copper/20";

export type ContactFormProps = {
  compact?: boolean;
};

export function ContactForm({ compact = false }: ContactFormProps) {
  const t = useTranslations("ContactForm");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: Integrate email sending (e.g. Resend, SendGrid, or a server action)
    // via API route or third-party form backend. Wire `name`, `email`, `company`, `message`.
    setSubmitted(true);
  }

  const inputClass = compact ? compactFieldClass : fieldClass;
  const labelClass = compact
    ? "mb-1 block text-sm font-medium text-ri-text"
    : "mb-1.5 block text-sm font-medium text-ri-text";

  return (
    <form
      onSubmit={handleSubmit}
      className={
        compact
          ? "glass-panel accent-gradient-border mx-auto w-full max-w-none rounded-2xl p-4 sm:p-5"
          : "glass-panel accent-gradient-border mx-auto max-w-xl rounded-2xl p-6 sm:p-8"
      }
      noValidate
    >
      <div
        className={
          compact
            ? "grid grid-cols-1 gap-3 sm:grid-cols-2"
            : "space-y-5"
        }
      >
        <div className={compact ? "sm:col-span-1" : undefined}>
          <label htmlFor="contact-name" className={labelClass}>
            {t("name")}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={inputClass}
            placeholder={t("placeholderName")}
          />
        </div>
        <div className={compact ? "sm:col-span-1" : undefined}>
          <label htmlFor="contact-email" className={labelClass}>
            {t("email")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClass}
            placeholder={t("placeholderEmail")}
          />
        </div>
        <div className={compact ? "sm:col-span-2" : undefined}>
          <label htmlFor="contact-company" className={labelClass}>
            {t("company")}
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClass}
            placeholder={t("placeholderCompany")}
          />
        </div>
        <div className={compact ? "sm:col-span-2" : undefined}>
          <label htmlFor="contact-message" className={labelClass}>
            {t("message")}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={compact ? 3 : 5}
            required
            className={`${inputClass} resize-y`}
            placeholder={t("placeholderMessage")}
          />
        </div>
      </div>
      <div className={compact ? "mt-4" : "mt-8"}>
        <Button
          type="submit"
          variant="primary"
          className={compact ? "w-full text-sm sm:w-auto" : "w-full sm:w-auto"}
        >
          {t("submit")}
        </Button>
      </div>
      {submitted && (
        <p
          className={
            compact ? "mt-3 text-sm text-ri-copper" : "mt-4 text-sm text-ri-copper"
          }
          role="status"
          aria-live="polite"
        >
          {t("success")}
        </p>
      )}
    </form>
  );
}
