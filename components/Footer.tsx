import Image from "next/image";
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
    <footer className="mt-auto border-t border-ri-border bg-ri-bg-soft">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="mx-auto max-w-sm text-center lg:mx-0 lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/brand/ri-logo-vertical.png"
                alt="Realitas Infinitas logo"
                width={220}
                height={200}
                className="h-40 w-auto object-contain"
              />
            </div>
            <p className="mt-4 text-sm font-medium text-ri-muted">
              {t("tagline")}
            </p>
          </div>
          <nav
            className="flex flex-1 flex-wrap justify-center gap-x-10 gap-y-4 lg:justify-end"
            aria-label={t("footerNav")}
          >
            <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm font-medium text-ri-muted transition-colors hover:text-ri-copper"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-ri-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs text-ri-muted sm:text-left">
            © {new Date().getFullYear()} {siteConfig.name}. {t("copyright")}
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-center text-xs text-ri-muted transition-colors hover:text-ri-copper sm:text-right"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
