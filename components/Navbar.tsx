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
    <header className="sticky top-0 z-50 border-b border-ri-border bg-ri-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-ri-bg/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.25rem] sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 shrink items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/ri-logo-horizontal.png"
            alt="Realitas Infinitas logo"
            width={260}
            height={52}
            priority
            className="h-8 w-auto max-w-[min(100%,200px)] object-contain object-left sm:h-9 sm:max-w-[240px]"
          />
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label={t("mainNav")}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === href || pathname.startsWith(href + "/")
                  ? "text-ri-brown"
                  : "text-ri-muted hover:text-ri-text"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <LocaleSwitcher />
          <Button href="/products/clinic" variant="primary">
            {t("exploreClinic")}
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <LocaleSwitcher />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-ri-text hover:bg-ri-blue/30"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-ri-border bg-ri-bg px-4 py-4 shadow-sm md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label={t("mobileNav")}>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm font-medium",
                  pathname === href || pathname.startsWith(href + "/")
                    ? "bg-ri-blue/30 text-ri-brown"
                    : "text-ri-text hover:bg-ri-blue/20"
                )}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="mt-3 border-t border-ri-border pt-3">
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
