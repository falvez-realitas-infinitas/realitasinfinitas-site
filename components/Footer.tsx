import Link from "next/link";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { href: "/products", label: "Products" },
  { href: "/products/clinic", label: "Clinic" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-slate-950/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight text-slate-100">
              {siteConfig.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Product-oriented software for clear workflows and systems built to
              evolve.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 transition-colors hover:text-sky-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-xs text-slate-500 transition-colors hover:text-sky-400"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
