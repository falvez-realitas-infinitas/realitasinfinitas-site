import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type ProductCardProps = {
  title: string;
  description: string;
  href?: string;
  status?: "available" | "coming";
  subtle?: boolean;
};

export async function ProductCard({
  title,
  description,
  href,
  status = "available",
  subtle = false,
}: ProductCardProps) {
  const t = await getTranslations("ProductCard");
  const isComing = status === "coming";

  const content = (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-2xl p-6 sm:p-8",
        "glass-panel accent-gradient-border transition-all duration-300",
        subtle && "opacity-60 hover:opacity-80",
        !subtle &&
          "hover:border-sky-400/25 hover:shadow-lg hover:shadow-sky-950/20"
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight text-slate-100">
          {title}
        </h3>
        {isComing ? (
          <span className="shrink-0 rounded-full border border-slate-600/60 bg-slate-900/50 px-2.5 py-0.5 text-xs font-medium text-slate-400">
            {t("comingLater")}
          </span>
        ) : (
          href && (
            <ArrowUpRight
              className="h-5 w-5 shrink-0 text-sky-400/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          )
        )}
      </div>
      <p
        className={cn(
          "flex-1 text-sm leading-relaxed text-slate-400",
          subtle && "text-slate-500"
        )}
      >
        {description}
      </p>
    </div>
  );

  if (href && !isComing) {
    return (
      <Link
        href={href}
        className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-2xl"
      >
        {content}
      </Link>
    );
  }

  return (
    <article className="h-full" aria-label={title}>
      {content}
    </article>
  );
}
