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
};

export function CTASection({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  className,
}: CTASectionProps) {
  return (
    <Section
      className={cn("py-16 sm:py-20", className)}
      innerClassName="max-w-4xl"
    >
      <div className="glass-panel accent-gradient-border relative overflow-hidden rounded-3xl px-8 py-12 text-center sm:px-12 sm:py-14">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl"
          aria-hidden
        />
        <h2 className="relative text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          {title}
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {description}
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button href={primaryHref} variant="primary">
            {primaryLabel}
          </Button>
          {secondaryHref && secondaryLabel && (
            <Button href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
