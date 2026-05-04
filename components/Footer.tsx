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
    <footer className="mt-auto border-t border-white/10 bg-ri-brown text-white/85">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-md">
            <Image
              src="/brand/ri-logo-horizontal-dark.png"
              alt="Realitas Infinitas logo"
              width={300}
              height={56}
              className="h-11 w-auto max-w-[260px] object-contain opacity-95 sm:h-12"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              {t("tagline")}
            </p>
          </div>
          <nav aria-label={t("footerNav")}>
            <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-12 sm:gap-y-4">
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
        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/55">
            © {new Date().getFullYear()} {siteConfig.name}. {t("copyright")}
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-xs text-white/60 transition-colors hover:text-white"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
