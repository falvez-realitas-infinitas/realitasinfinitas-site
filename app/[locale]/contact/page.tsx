import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildPageMetadata({
    locale: locale as "en" | "es",
    pathname: "/contact",
    title: t("contactTitle"),
    description: t("contactDescription"),
  });
}

const contactCardShell =
  "relative flex h-full min-h-[7.25rem] min-w-0 flex-col overflow-hidden rounded-2xl border border-ri-border/80 bg-white/95 p-3 shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_12px_28px_-16px_rgba(42,27,22,0.26)] sm:min-h-[7.5rem] sm:p-4 lg:min-h-[7.75rem] lg:p-3.5";

const contactCardInner =
  "relative flex min-h-0 min-w-0 flex-1 items-start gap-2.5 sm:gap-3";

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ContactPage");
  const tmeta = await getTranslations("meta");
  const contactMethods = [
    {
      href: `mailto:${siteConfig.email}`,
      label: t("emailLabel"),
      value: siteConfig.email,
      icon: (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6" />
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      href: `tel:${siteConfig.phoneTel}`,
      label: t("phoneLabel"),
      value: siteConfig.phoneDisplay,
      icon: (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.9 3.9a2 2 0 0 1 2.2-.43l2.22.9a2 2 0 0 1 1.2 1.67l.1 2.2a2 2 0 0 1-.58 1.5l-1.1 1.1a14.72 14.72 0 0 0 6.22 6.21l1.09-1.09a2 2 0 0 1 1.5-.59l2.2.1a2 2 0 0 1 1.67 1.21l.9 2.2a2 2 0 0 1-.43 2.2l-1 1a3 3 0 0 1-2.78.8A19.07 19.07 0 0 1 3.1 6.67a3 3 0 0 1 .8-2.78l1-1Z"
          />
        </svg>
      ),
    },
  ];

  const originIcon = (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s-6.25-5.52-6.25-10.25a6.25 6.25 0 1 1 12.5 0C18.25 15.48 12 21 12 21Z"
      />
      <circle cx="12" cy="10.75" r="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <Section
      className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden py-7 pb-9 sm:py-8 sm:pb-10 lg:min-h-0 lg:flex-1 lg:justify-center lg:py-5 lg:pb-6"
      innerClassName="flex min-h-0 w-full min-w-0 max-w-6xl flex-1 flex-col"
    >
      <div className="grid w-full min-h-0 min-w-0 grid-cols-1 gap-x-8 gap-y-0 overflow-x-hidden lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-10 lg:gap-y-5 xl:gap-x-12 xl:gap-y-10">
        <header className="min-h-0 min-w-0 text-center lg:col-start-1 lg:row-start-1 lg:text-left">
          <h1 className="font-display text-[2.125rem] font-medium leading-tight tracking-tight text-ri-brown sm:text-[2.45rem] lg:text-[2.05rem] xl:text-[2.5rem]">
            {tmeta("contactTitle")}
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-base leading-snug text-ri-muted lg:mx-0 lg:text-[1.05rem]">
            {t("intro")}
          </p>
        </header>

        <div className="mt-5 grid min-h-0 min-w-0 grid-cols-1 items-stretch gap-2 text-left sm:gap-2.5 lg:col-start-1 lg:row-start-2 lg:mt-0">
          {contactMethods.map((method) => (
            <a
              key={method.href}
              href={method.href}
              className={`group ${contactCardShell} transition-[border-color,box-shadow,transform,color] hover:-translate-y-0.5 hover:border-ri-copper/45 hover:shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_18px_36px_-18px_rgba(42,27,22,0.32)] focus-visible:-translate-y-0.5 focus-visible:border-ri-copper/55 focus-visible:shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_18px_36px_-18px_rgba(42,27,22,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ri-copper/25`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(205,136,86,0.08),transparent_58%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
              <div className={contactCardInner}>
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ri-copper/25 bg-ri-copper/8 text-ri-copper transition-colors group-hover:border-ri-copper/35 group-hover:bg-ri-copper/12 sm:h-8 sm:w-8">
                  {method.icon}
                </span>
                <span className="min-w-0 flex-1 overflow-hidden">
                  <span className="block break-words text-xs font-medium uppercase tracking-[0.12em] text-ri-muted/85 sm:text-[0.8rem]">
                    {method.label}
                  </span>
                  <span className="mt-0.5 block break-words text-base font-semibold text-ri-brown transition-colors group-hover:text-ri-copper sm:text-[1.05rem]">
                    {method.value}
                  </span>
                </span>
              </div>
            </a>
          ))}
          <div className={`${contactCardShell} border-ri-border/70`}>
            <div className={contactCardInner}>
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ri-copper/20 bg-ri-copper/8 text-ri-copper sm:h-8 sm:w-8">
                {originIcon}
              </span>
              <span className="min-w-0 flex-1 overflow-hidden">
                <span className="block break-words text-xs font-medium uppercase tracking-[0.12em] text-ri-muted/85 sm:text-[0.8rem]">
                  {t("originLabel")}
                </span>
                <span className="mt-0.5 block text-sm leading-snug text-ri-brown sm:text-[0.95rem]">
                  {t("origin")}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 min-h-0 min-w-0 w-full lg:col-start-2 lg:row-start-2 lg:mt-0 lg:self-start">
          <ContactForm compact />
        </div>
      </div>
    </Section>
  );
}
