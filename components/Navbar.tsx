"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/Button";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
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
    <header className="sticky top-0 z-[100] border-b border-ri-border/80 bg-ri-bg/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-[4.25rem] max-w-[1200px] items-center justify-between gap-4 px-5 sm:h-[4.5rem] sm:px-8">
        <Link
          href="/"
          className="relative flex min-w-0 shrink items-center py-1"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/ri-logo-horizontal.png"
            alt="Realitas Infinitas logo"
            width={280}
            height={56}
            priority
            className="h-[2.15rem] w-auto max-w-[min(100%,220px)] object-contain object-left sm:h-[2.35rem] sm:max-w-[260px]"
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

        <div className="hidden shrink-0 items-center gap-5 md:flex">
          <LocaleSwitcher />
          <Button href="/products/clinic" variant="primary" className="px-7">
            {t("exploreClinic")}
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <LocaleSwitcher />
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
            <div className="mt-4 border-t border-ri-border pt-5">
              <Button
                href="/products/clinic"
                variant="primary"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {t("exploreClinic")}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
