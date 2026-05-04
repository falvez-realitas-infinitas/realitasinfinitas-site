import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Zero-based index for editorial numbering */
  index: number;
  className?: string;
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
  className,
}: FeatureCardProps) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-[1.35rem] border border-ri-border/80 bg-gradient-to-b from-ri-card to-ri-bg-soft/90 p-8 shadow-[0_2px_0_rgba(255,255,255,0.65)_inset] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-ri-copper/25 hover:shadow-[0_28px_70px_-34px_rgba(89,42,25,0.22)] sm:p-9",
        className
      )}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <span
          className="font-display text-4xl font-medium tabular-nums leading-none text-ri-peach/85 transition-colors group-hover:text-ri-copper sm:text-[2.75rem]"
          aria-hidden
        >
          {num}
        </span>
        <Icon
          className="mt-1 h-5 w-5 shrink-0 stroke-[1.35] text-ri-copper"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        />
      </div>
      <h3 className="font-display text-[1.25rem] font-medium leading-snug tracking-tight text-ri-text sm:text-[1.35rem]">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ri-muted sm:text-[0.9375rem]">
        {description}
      </p>
    </article>
  );
}
