"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher() {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className="flex items-center gap-1 rounded-lg border border-ri-border bg-ri-card/80 p-0.5"
      role="group"
      aria-label={t("label")}
    >
      {routing.locales.map((loc) => {
        const active = locale === loc;
        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            className={cn(
              "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
              active
                ? "bg-ri-blue/60 text-ri-brown"
                : "text-ri-muted hover:text-ri-text"
            )}
            hrefLang={loc}
          >
            {t(loc as "en" | "es")}
          </Link>
        );
      })}
    </div>
  );
}
