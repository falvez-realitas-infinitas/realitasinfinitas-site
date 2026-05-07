import Image from "next/image";
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
  /** Logo opcional; si existe, la tarjeta usa layout horizontal en desktop. */
  logo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** Skip optimizer for crisp transparent PNG logos */
    unoptimized?: boolean;
  };
};

export async function ProductCard({
  title,
  description,
  href,
  status = "available",
  subtle = false,
  logo,
}: ProductCardProps) {
  const t = await getTranslations("ProductCard");
  const isComing = status === "coming";

  const titleRow = (
    <div className="flex items-start justify-between gap-4">
      {!logo && (
        <h3 className="text-lg font-semibold tracking-tight text-ri-text">
          {title}
        </h3>
      )}
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
  );

  const descriptionBlock = (
    <p
      className={cn(
        "flex-1 text-sm leading-relaxed text-ri-muted",
        logo && "text-[0.9375rem] leading-relaxed sm:text-base",
        subtle && "text-ri-muted/80",
      )}
    >
      {description}
    </p>
  );

  const content = (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-2xl p-6 sm:p-8",
        "glass-panel accent-gradient-border transition-all duration-300",
        subtle && "opacity-60 hover:opacity-80",
        !subtle &&
          "hover:border-ri-copper/20 hover:shadow-md hover:shadow-ri-brown/5",
      )}
    >
      {logo ? (
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="flex shrink-0 justify-center lg:justify-start">
            <div className="inline-flex w-fit max-w-full items-center justify-center rounded-2xl border border-ri-border/45 bg-gradient-to-br from-white via-ri-bg-soft/95 to-ri-bg-warm/45 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.88)] sm:px-5 sm:py-4 lg:w-[min(100%,300px)] lg:py-5">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                sizes="(max-width: 1024px) 90vw, 300px"
                unoptimized={logo.unoptimized}
                className="h-auto w-full max-w-[min(100%,280px)] object-contain object-center sm:max-w-[300px]"
              />
            </div>
          </div>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:justify-between lg:py-0.5">
            {titleRow}
            <div className="mt-5 lg:mt-6">{descriptionBlock}</div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4">{titleRow}</div>
          {descriptionBlock}
        </>
      )}
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
