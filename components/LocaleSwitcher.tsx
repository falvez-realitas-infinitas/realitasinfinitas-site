"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

type LocaleSwitcherProps = {
  /** `dark` for footers / brown backgrounds */
  variant?: "light" | "dark";
};

export function LocaleSwitcher({ variant = "light" }: LocaleSwitcherProps) {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full p-0.5",
        isDark
          ? "border border-white/25 bg-white/5"
          : "border border-ri-border bg-ri-card/80"
      )}
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
              "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              isDark
                ? active
                  ? "bg-white text-ri-brown"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
                : active
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
