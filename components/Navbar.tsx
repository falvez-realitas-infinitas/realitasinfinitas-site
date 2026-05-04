"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex shrink-0 items-baseline gap-1 text-lg font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="text-slate-100 transition-colors group-hover:text-white">
            Realitas
          </span>
          <span className="bg-gradient-to-r from-sky-300 to-violet-300 bg-clip-text text-transparent">
            Infinitas
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === href || pathname.startsWith(href + "/")
                  ? "text-sky-300"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 md:block">
          <Button href="/products/clinic" variant="primary">
            Explore Clinic
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 hover:bg-white/5 hover:text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-white/5 bg-slate-950/95 px-4 py-4 backdrop-blur-xl md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm font-medium",
                  pathname === href || pathname.startsWith(href + "/")
                    ? "bg-white/5 text-sky-300"
                    : "text-slate-300 hover:bg-white/5"
                )}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-white/10">
              <Button
                href="/products/clinic"
                variant="primary"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Explore Clinic
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
