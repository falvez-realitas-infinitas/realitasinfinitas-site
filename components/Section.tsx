import { cn } from "@/lib/cn";

const SECTION_Y_PADDING = {
  /** Standard marketing sections */
  default: "py-20 sm:py-24 lg:py-28",
  /** Denser pages (e.g. About) — override with className `pt-*` / `pb-*` as needed */
  tight: "py-8 sm:py-10 lg:py-12",
} as const;

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  as?: "section" | "div";
  density?: keyof typeof SECTION_Y_PADDING;
};

export function Section({
  id,
  children,
  className,
  innerClassName,
  as: Tag = "section",
  density = "default",
}: SectionProps) {
  return (
    <Tag id={id} className={cn(SECTION_Y_PADDING[density], className)}>
      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
          innerClassName
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
