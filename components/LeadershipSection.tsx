import { getTranslations } from "next-intl/server";
import { Section } from "@/components/Section";
import { cn } from "@/lib/cn";

type LeadershipSectionProps = {
  className?: string;
  innerClassName?: string;
};

const HIGHLIGHT_KEYS = [
  "highlight1",
  "highlight2",
  "highlight3",
  "highlight4",
  "highlight5",
] as const;

export async function LeadershipSection({
  className,
  innerClassName,
}: LeadershipSectionProps) {
  const t = await getTranslations("Leadership");

  return (
    <Section
      id="leadership"
      aria-labelledby="leadership-heading"
      className={cn("pt-8 pb-20 sm:pt-12 sm:pb-28", className)}
      innerClassName={cn("max-w-5xl", innerClassName)}
    >
      <h2
        id="leadership-heading"
        className="text-2xl font-semibold tracking-tight text-ri-text sm:text-3xl"
      >
        {t("title")}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-ri-muted sm:text-lg">
        {t("intro")}
      </p>

      <article className="mt-12">
        <div className="glass-panel accent-gradient-border rounded-3xl p-8 sm:p-10">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
            <div className="flex justify-center md:shrink-0 md:justify-start">
              <div
                className="relative flex h-32 w-32 items-center justify-center rounded-full border border-ri-border bg-gradient-to-br from-ri-blue/50 via-ri-card to-ri-peach/40 shadow-md sm:h-36 sm:w-36"
                role="img"
                aria-label={t("avatarAriaLabel")}
              >
                <span
                  className="select-none text-3xl font-semibold tracking-tight text-ri-brown sm:text-4xl"
                  aria-hidden
                >
                  {t("initials")}
                </span>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <header>
                <h3 className="text-xl font-semibold tracking-tight text-ri-text sm:text-2xl">
                  {t("profileName")}
                </h3>
                <p className="mt-1.5 text-sm font-medium uppercase tracking-wide text-ri-copper">
                  {t("profileRole")}
                </p>
              </header>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-ri-muted sm:text-base">
                <p>{t("bioP1")}</p>
                <p>{t("bioP2")}</p>
              </div>

              <div className="mt-8 border-t border-ri-border pt-8">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-ri-muted">
                  {t("highlightsLabel")}
                </p>
                <ul className="mt-4 space-y-3 text-sm text-ri-text sm:text-[0.9375rem]">
                  {HIGHLIGHT_KEYS.map((key) => (
                    <li key={key} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ri-copper"
                        aria-hidden
                      />
                      <span className="text-ri-muted">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Section>
  );
}
