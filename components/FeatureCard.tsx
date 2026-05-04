import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-ri-border bg-ri-card p-6 shadow-sm transition-colors duration-200 hover:border-ri-copper/25 sm:p-7",
        className
      )}
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-ri-border bg-ri-blue/40 text-ri-copper">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mb-2 text-base font-semibold text-ri-text">{title}</h3>
      <p className="text-sm leading-relaxed text-ri-muted">{description}</p>
    </div>
  );
}
