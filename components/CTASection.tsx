import Image from "next/image";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

type CTASectionProps = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
  tone?: "light" | "brand";
};

export function CTASection({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  className,
  tone = "light",
}: CTASectionProps) {
  const isBrand = tone === "brand";

  return (
    <Section
      className={cn("py-16 sm:py-24", className)}
      innerClassName="max-w-5xl"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[2rem] px-8 py-14 text-center sm:px-14 sm:py-16",
          isBrand
            ? "border border-white/[0.08] bg-ri-brown text-white shadow-[0_24px_80px_-24px_rgba(42,27,22,0.45)]"
            : "glass-panel accent-gradient-border"
        )}
      >
        {!isBrand && (
          <>
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ri-blue/25 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-ri-peach/20 blur-3xl"
              aria-hidden
            />
          </>
        )}
        {isBrand && (
          <div className="relative mx-auto mb-10 flex justify-center">
            <Image
              src="/brand/ri-logo-horizontal-dark.png"
              alt="Realitas Infinitas logo"
              width={300}
              height={60}
              className="h-11 w-auto max-w-[min(100%,280px)] object-contain opacity-95 sm:h-12"
            />
          </div>
        )}
        <h2
          className={cn(
            "relative font-display text-3xl font-medium leading-[1.15] tracking-tight sm:text-4xl",
            isBrand ? "text-white" : "text-ri-text"
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "relative mx-auto mt-5 max-w-lg text-base leading-relaxed sm:text-[1.05rem]",
            isBrand ? "text-white/88" : "text-ri-muted"
          )}
        >
          {description}
        </p>
        <div className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Button href={primaryHref} variant={isBrand ? "darkPrimary" : "primary"}>
            {primaryLabel}
          </Button>
          {secondaryHref && secondaryLabel && (
            <Button
              href={secondaryHref}
              variant={isBrand ? "darkOutline" : "secondary"}
            >
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
