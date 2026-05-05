import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("resetPasswordTitle"),
    description: t("resetPasswordDescription"),
  };
}

export default async function ResetPasswordPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ResetPasswordPage" });

  const clinicBase =
    process.env.NEXT_PUBLIC_CLINIC_APP_URL?.replace(/\/$/, "") ?? "";

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6 py-4 md:py-8">
      <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="text-ri-muted text-[15px] leading-relaxed">{t("intro")}</p>
      <p className="text-ri-muted text-[15px] leading-relaxed">{t("hint")}</p>
      {clinicBase ? (
        <p className="text-ri-muted text-sm">
          {t("appUrlLabel")}{" "}
          <span className="font-mono text-foreground">{clinicBase}</span>
        </p>
      ) : null}
      <div className="flex flex-wrap gap-3 pt-2">
        <Link
          href="/contact"
          className="bg-ri-brown inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ri-brown/92"
        >
          {t("contactCta")}
        </Link>
        <Link
          href="/"
          className="border-ri-brown/25 text-foreground hover:bg-ri-brown/06 inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
        >
          {t("homeCta")}
        </Link>
      </div>
      <p className="text-ri-muted text-xs leading-relaxed">
        {siteConfig.name} · {t("footerNote")}
      </p>
    </div>
  );
}
