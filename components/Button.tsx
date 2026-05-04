import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type BaseProps = {
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: never };

type ButtonAsLink = BaseProps &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", className, children, ...rest } = props;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ri-copper disabled:pointer-events-none disabled:opacity-50";

  const styles = {
    primary:
      "bg-ri-copper text-white shadow-sm hover:bg-ri-brown active:bg-ri-brown",
    secondary:
      "border border-ri-border bg-ri-card text-ri-text shadow-sm hover:border-ri-copper/35 hover:bg-ri-bg-soft",
    ghost:
      "text-ri-muted hover:bg-ri-blue/25 hover:text-ri-text",
  } as const;

  const cls = cn(base, styles[variant], className);

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest;
    return (
      <Link href={href} className={cls} {...linkRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ComponentProps<"button">;
  const { type = "button", ...btn } = buttonRest;
  return (
    <button type={type} className={cls} {...btn}>
      {children}
    </button>
  );
}
