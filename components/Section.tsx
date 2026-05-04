import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  as?: "section" | "div";
};

export function Section({
  id,
  children,
  className,
  innerClassName,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag id={id} className={cn("py-20 sm:py-24 lg:py-28", className)}>
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
