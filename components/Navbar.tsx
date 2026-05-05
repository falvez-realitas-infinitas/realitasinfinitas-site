"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LogoLockup } from "@/components/LogoLockup";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/products", label: t("products") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ] as const;

  return (
    <header className="sticky top-0 z-[100] border-b border-ri-border/30 bg-ri-bg/90 shadow-[0_1px_0_0_rgba(255,255,255,0.35)] backdrop-blur-md supports-[backdrop-filter]:bg-ri-bg/80">
      <div className="mx-auto flex min-h-[5rem] max-w-[1200px] items-center justify-between gap-4 px-5 py-2.5 sm:min-h-[5.75rem] sm:px-8">
        <Link
          href="/"
          className="relative flex min-w-0 shrink items-center py-0.5"
          aria-label={siteConfig.name}
          onClick={() => setOpen(false)}
        >
          <LogoLockup
            variant="light"
            wordmarkOnly
            priority
            textClassName="h-[1.85rem] w-auto max-w-[min(100%,72vw)] object-contain object-left sm:h-9 md:h-10 lg:h-11 lg:max-w-[min(100%,520px)]"
          />
        </Link>

        <nav
          className="hidden items-center gap-10 md:flex"
          aria-label={t("mainNav")}
        >
          {navLinks.map(({ href, label }) => {
            const active =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "border-b border-transparent pb-1 text-[13px] font-medium uppercase tracking-[0.18em] transition-colors",
                  active
                    ? "border-ri-brown text-ri-brown"
                    : "text-ri-muted hover:border-ri-border hover:text-ri-text"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2.5 text-ri-text hover:bg-ri-blue/25"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-ri-border bg-ri-bg/98 px-5 py-6 md:hidden"
        >
          <nav className="flex flex-col gap-2" aria-label={t("mobileNav")}>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em]",
                  pathname === href || pathname.startsWith(href + "/")
                    ? "bg-ri-brown text-white"
                    : "text-ri-text hover:bg-ri-bg-warm"
                )}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
