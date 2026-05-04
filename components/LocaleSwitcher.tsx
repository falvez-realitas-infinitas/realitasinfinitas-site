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
      className="flex items-center gap-1 rounded-lg border border-white/10 bg-slate-900/40 p-0.5"
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
              "rounded-md px-2 py-1 text-xs font-medium transition-colors",
              active
                ? "bg-white/10 text-sky-300"
                : "text-slate-500 hover:text-slate-300"
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
