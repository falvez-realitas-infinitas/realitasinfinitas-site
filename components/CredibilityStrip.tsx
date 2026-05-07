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
        <div className="mt-12 grid grid-cols-1 items-center justify-items-center gap-6 sm:mx-auto sm:max-w-4xl sm:grid-cols-2 sm:gap-8 md:mt-14 md:max-w-5xl md:gap-10">
          <a
            href={siteConfig.partnerUrls.vestacare}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-36 w-full max-w-[380px] items-center justify-center rounded-2xl border border-ri-border/70 bg-transparent px-6 py-5 shadow-[0_10px_30px_-24px_rgba(89,42,25,0.55)] transition hover:border-ri-copper/35 hover:bg-ri-bg-soft/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ri-copper sm:h-40 sm:px-9 sm:py-6"
          >
            <Image
              src="/brand/vestacare-partner.png"
              alt="VestaCare"
              width={836}
              height={1024}
              sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 330px"
              unoptimized
              className="h-auto max-h-[5.1rem] w-auto max-w-full object-contain object-center saturate-110 contrast-110 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] sm:max-h-[5.7rem]"
            />
          </a>
          <a
            href={siteConfig.partnerUrls.successfulImperatives}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-36 w-full max-w-[380px] items-center justify-center rounded-2xl border border-ri-copper/20 bg-transparent px-6 py-5 shadow-[0_12px_36px_-24px_rgba(89,42,25,0.65)] transition hover:border-ri-copper/40 hover:bg-ri-bg-soft/30 hover:shadow-[0_18px_46px_-28px_rgba(89,42,25,0.75)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ri-copper sm:h-40 sm:px-9 sm:py-6"
          >
            <Image
              src="/brand/partner-successful-imperatives.png"
              alt="Successful Imperatives"
              width={1024}
              height={445}
              sizes="(max-width: 640px) 250px, (max-width: 1024px) 290px, 320px"
              className="h-auto max-h-[4.4rem] w-auto max-w-full object-contain object-center contrast-125 saturate-120 drop-shadow-[0_1px_2px_rgba(0,0,0,0.24)] sm:max-h-[4.9rem]"
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
