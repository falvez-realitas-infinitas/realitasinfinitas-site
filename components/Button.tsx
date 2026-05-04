import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type BaseProps = {
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    /** Solid white on dark brown — fixed contrast for hero CTAs */
    | "darkPrimary"
    /** Outline / ghost on dark brown */
    | "darkOutline";
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
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition-[background-color,border-color,color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ri-copper disabled:pointer-events-none disabled:opacity-50";

  const styles = {
    primary:
      "bg-ri-brown text-white shadow-sm hover:bg-ri-copper active:scale-[0.99]",
    secondary:
      "border border-ri-border bg-ri-card text-ri-text shadow-sm hover:border-ri-copper/40 hover:bg-ri-bg-warm",
    ghost:
      "text-ri-muted hover:bg-ri-blue/20 hover:text-ri-text",
    darkPrimary:
      "bg-white text-ri-brown shadow-none hover:bg-ri-blue hover:text-ri-brown",
    darkOutline:
      "border border-white/50 bg-transparent text-white hover:border-white hover:bg-white/10",
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
