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
  /** Calm dark band with light-on-brown contrast and wordmark for closing CTAs */
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
      className={cn("py-16 sm:py-20", className)}
      innerClassName="max-w-4xl"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl px-8 py-12 text-center sm:px-12 sm:py-14",
          isBrand
            ? "border border-white/10 bg-ri-brown text-white shadow-md"
            : "glass-panel accent-gradient-border"
        )}
      >
        {!isBrand && (
          <>
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-ri-blue/30 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-ri-peach/25 blur-3xl"
              aria-hidden
            />
          </>
        )}
        {isBrand && (
          <div className="relative mx-auto mb-8 flex justify-center">
            <Image
              src="/brand/ri-logo-horizontal-dark.png"
              alt="Realitas Infinitas logo"
              width={280}
              height={56}
              className="h-10 w-auto max-w-[min(100%,260px)] object-contain sm:h-11"
            />
          </div>
        )}
        <h2
          className={cn(
            "relative text-2xl font-semibold tracking-tight sm:text-3xl",
            isBrand ? "text-white" : "text-ri-text"
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "relative mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base",
            isBrand ? "text-white/85" : "text-ri-muted"
          )}
        >
          {description}
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            href={primaryHref}
            variant="primary"
            className={cn(isBrand && "bg-white text-ri-brown hover:bg-ri-blue")}
          >
            {primaryLabel}
          </Button>
          {secondaryHref && secondaryLabel && (
            <Button
              href={secondaryHref}
              variant="secondary"
              className={cn(
                isBrand &&
                  "border-white/35 bg-transparent text-white hover:border-white/50 hover:bg-white/10"
              )}
            >
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
