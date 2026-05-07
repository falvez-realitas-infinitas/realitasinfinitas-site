import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LogoLockup } from "@/components/LogoLockup";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { siteConfig } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("footer");
  const tnav = await getTranslations("nav");

  const footerLinks = [
    { href: "/products", label: tnav("products") },
    { href: "/reality", label: tnav("experiment") },
    { href: "/about", label: tnav("about") },
    { href: "/contact", label: tnav("contact") },
  ] as const;

  return (
    <footer className="mt-auto text-white/85">
      <div
        className="h-16 w-full bg-gradient-to-b from-[var(--ri-bg)] from-0% via-ri-bg-warm/70 via-45% to-ri-brown to-100% sm:h-20"
        aria-hidden
      />
      <div className="border-t border-white/10 bg-ri-brown">
        <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 sm:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="max-w-md">
              <LogoLockup
                variant="dark"
                iconClassName="h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11"
                textClassName="h-7 w-auto max-w-[220px] object-contain object-left sm:h-8 sm:max-w-[280px] md:max-w-[320px]"
              />
              <p className="mt-4 max-w-sm text-sm leading-snug text-white/70">
                {t("tagline")}
              </p>
            </div>
            <nav aria-label={t("footerNav")}>
              <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3">
                {footerLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-5">
            <p className="text-xs text-white/55">
              © {new Date().getFullYear()} {siteConfig.name}. {t("copyright")}
            </p>
            <LocaleSwitcher variant="dark" />
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-xs text-white/60 transition-colors hover:text-white"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
