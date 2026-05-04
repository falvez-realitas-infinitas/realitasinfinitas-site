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
          "hover:border-ri-copper/20 hover:shadow-md hover:shadow-ri-brown/5"
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight text-ri-text">
          {title}
        </h3>
        {isComing ? (
          <span className="shrink-0 rounded-full border border-ri-border bg-ri-bg-soft px-2.5 py-0.5 text-xs font-medium text-ri-muted">
            {t("comingLater")}
          </span>
        ) : (
          href && (
            <ArrowUpRight
              className="h-5 w-5 shrink-0 text-ri-copper transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          )
        )}
      </div>
      <p
        className={cn(
          "flex-1 text-sm leading-relaxed text-ri-muted",
          subtle && "text-ri-muted/80"
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
        className="block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ri-copper/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ri-bg"
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
