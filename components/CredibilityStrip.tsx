import { getTranslations } from "next-intl/server";

export async function CredibilityStrip() {
  const t = await getTranslations("HomePage");

  return (
    <div className="border-y border-ri-border bg-ri-bg-warm/60 py-10 sm:py-12">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-ri-copper">
          {t("clientsEyebrow")}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center font-display text-xl font-medium leading-snug text-ri-text sm:text-2xl">
          {t("clientsTitle")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-14 gap-y-6 sm:gap-x-20">
          <span className="font-display text-lg font-medium tracking-wide text-ri-brown/90 sm:text-xl">
            {t("clientVesta")}
          </span>
          <span
            className="hidden h-4 w-px bg-ri-border sm:block"
            aria-hidden
          />
          <span className="font-display text-lg font-medium tracking-wide text-ri-brown/90 sm:text-xl">
            {t("clientSI")}
          </span>
        </div>
        <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-ri-muted">
          {t("clientsFootnote")}
        </p>
      </div>
    </div>
  );
}
