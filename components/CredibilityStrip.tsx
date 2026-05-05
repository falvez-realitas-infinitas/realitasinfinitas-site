import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site";

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
        <div className="mt-12 grid grid-cols-1 items-center justify-items-center gap-12 sm:mx-auto sm:max-w-4xl sm:grid-cols-2 sm:gap-x-16 sm:gap-y-10 md:gap-x-24">
          <a
            href={siteConfig.partnerUrls.vestacare}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[5.5rem] w-full max-w-[240px] items-center justify-center transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ri-copper sm:h-28 sm:max-w-[260px]"
          >
            <Image
              src="/brand/vestacare-partner.png"
              alt="VestaCare"
              width={836}
              height={1024}
              sizes="(max-width: 640px) 200px, 240px"
              unoptimized
              className="max-h-full w-auto max-w-full object-contain object-center"
            />
          </a>
          <a
            href={siteConfig.partnerUrls.successfulImperatives}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[5.5rem] w-full max-w-[min(100%,340px)] items-center justify-center transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ri-copper sm:h-28 sm:max-w-[380px]"
          >
            <Image
              src="/brand/partner-successful-imperatives.png"
              alt="Successful Imperatives"
              width={1024}
              height={445}
              sizes="(max-width: 640px) 90vw, 380px"
              className="max-h-full w-auto max-w-full object-contain object-center"
            />
          </a>
        </div>
        <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-ri-muted">
          {t("clientsFootnote")}
        </p>
      </div>
    </div>
  );
}
