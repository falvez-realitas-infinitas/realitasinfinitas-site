import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Compass,
  HeartPulse,
  Layers2,
  UsersRound,
  Workflow,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/Section";
import { cn } from "@/lib/cn";

type ServicesSectionProps = {
  className?: string;
  innerClassName?: string;
};

type ItemKey =
  | "item1Title"
  | "item2Title"
  | "item3Title"
  | "item4Title"
  | "item5Title"
  | "item6Title";

type DescKey =
  | "item1Desc"
  | "item2Desc"
  | "item3Desc"
  | "item4Desc"
  | "item5Desc"
  | "item6Desc";

const ITEMS: ReadonlyArray<{
  icon: LucideIcon;
  titleKey: ItemKey;
  descKey: DescKey;
}> = [
  { icon: Code2, titleKey: "item1Title", descKey: "item1Desc" },
  { icon: HeartPulse, titleKey: "item2Title", descKey: "item2Desc" },
  { icon: Compass, titleKey: "item3Title", descKey: "item3Desc" },
  { icon: Workflow, titleKey: "item4Title", descKey: "item4Desc" },
  { icon: Layers2, titleKey: "item5Title", descKey: "item5Desc" },
  { icon: UsersRound, titleKey: "item6Title", descKey: "item6Desc" },
];

const ROW_ACCENTS = [
  {
    line: "border-t-[2px] border-t-ri-copper/70",
    iconWrap:
      "border-ri-copper/25 bg-[color-mix(in_srgb,var(--ri-blue)_28%,white)] text-ri-copper",
  },
  {
    line: "border-t-[2px] border-t-[color-mix(in_srgb,var(--ri-amber)_72%,var(--ri-copper)_28%)]",
    iconWrap:
      "border-[color-mix(in_srgb,var(--ri-amber)_35%,var(--ri-border))] bg-[color-mix(in_srgb,var(--ri-peach)_22%,white)] text-[color-mix(in_srgb,var(--ri-brown)_78%,var(--ri-copper)_22%)]",
  },
] as const;

export async function ServicesSection({
  className,
  innerClassName,
}: ServicesSectionProps) {
  const t = await getTranslations("services");

  return (
    <Section
      id="services"
      aria-labelledby="services-heading"
      className={cn(
        "relative overflow-hidden border-t border-ri-border/90 py-20 sm:py-28",
        "bg-gradient-to-b from-ri-bg-soft via-[color-mix(in_srgb,var(--ri-blue)_10%,var(--ri-bg-soft))] to-ri-bg-warm/45",
        className
      )}
      innerClassName={cn("relative max-w-[min(1120px,100%)]", innerClassName)}
    >
      <div
        className="pointer-events-none absolute -left-[15%] top-[8%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--ri-blue)_22%,transparent)_0%,transparent_68%)] opacity-90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[10%] bottom-[-18%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--ri-peach)_18%,transparent)_0%,transparent_65%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-[1.75rem] border border-ri-border/80",
          "bg-gradient-to-br from-white/95 via-ri-bg-soft/98 to-[color-mix(in_srgb,var(--ri-blue)_32%,var(--ri-bg-soft))]",
          "px-6 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] sm:px-10 sm:py-12"
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,color-mix(in_srgb,var(--ri-peach)_12%,transparent)_78%,transparent_100%)]"
          aria-hidden
        />
        <header className="relative max-w-3xl">
          <h2
            id="services-heading"
            className="font-display text-[2.05rem] font-medium leading-[1.1] tracking-tight text-ri-brown sm:text-[2.45rem] sm:leading-[1.06]"
          >
            {t("title")}
          </h2>
          <p className="mt-5 font-display text-xl font-medium leading-snug text-ri-text sm:text-[1.3rem] sm:leading-snug">
            {t("subtitle")}
          </p>
          <p className="mt-6 max-w-prose text-sm leading-relaxed text-ri-muted sm:text-[0.9375rem]">
            {t("intro")}
          </p>
        </header>
      </div>

      <ul className="relative mt-10 grid list-none gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
        {ITEMS.map(({ icon: Icon, titleKey, descKey }, index) => {
          const row = index < 3 ? 0 : 1;
          const accent = ROW_ACCENTS[row];

          return (
            <li key={titleKey} className="min-w-0">
              <article
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ri-border/78",
                  "bg-gradient-to-b from-ri-card to-ri-bg-soft/88",
                  "p-6 shadow-[0_2px_0_rgba(255,255,255,0.65)_inset] sm:p-7",
                  accent.line,
                  "motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-300 motion-reduce:transition-none",
                  "motion-safe:hover:-translate-y-1 motion-reduce:hover:translate-y-0",
                  "hover:border-ri-copper/30 hover:shadow-[0_22px_56px_-32px_rgba(89,42,25,0.28)]"
                )}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={cn(
                      "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
                      accent.iconWrap,
                      "motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transition-none",
                      "motion-safe:group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                    )}
                  >
                    <Icon
                      className="h-5 w-5 stroke-[1.35]"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[1.15rem] font-medium leading-snug tracking-tight text-ri-text sm:text-[1.28rem]">
                      {t(titleKey)}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.65] text-ri-muted sm:text-[0.9375rem]">
                      {t(descKey)}
                    </p>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
