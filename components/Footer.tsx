import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("footer");
  const tnav = await getTranslations("nav");
  const tmeta = await getTranslations("meta");

  const footerLinks = [
    { href: "/products", label: tnav("products") },
    { href: "/products/clinic", label: tmeta("clinicTitle") },
    { href: "/about", label: tnav("about") },
    { href: "/contact", label: tnav("contact") },
  ] as const;

  return (
    <footer className="mt-auto border-t border-white/5 bg-slate-950/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight text-slate-100">
              {siteConfig.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {t("tagline")}
            </p>
          </div>
          <nav aria-label={t("footerNav")}>
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
            © {new Date().getFullYear()} {siteConfig.name}. {t("copyright")}
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
