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
        "rounded-2xl border border-slate-700/40 bg-slate-900/30 p-6 transition-colors duration-300 hover:border-sky-500/20 hover:bg-slate-900/50 sm:p-7",
        className
      )}
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-sky-500/20 bg-gradient-to-br from-sky-500/15 to-violet-500/10 text-sky-300">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mb-2 text-base font-semibold text-slate-100">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}
