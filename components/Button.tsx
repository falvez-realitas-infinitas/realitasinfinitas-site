import Link from "next/link";
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
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/80 disabled:pointer-events-none disabled:opacity-50";

  const styles = {
    primary:
      "bg-gradient-to-r from-sky-500/90 to-violet-500/85 text-white shadow-lg shadow-sky-950/40 hover:from-sky-400 hover:to-violet-400 hover:shadow-sky-900/50 active:scale-[0.98]",
    secondary:
      "glass-panel text-slate-100 hover:border-sky-400/30 hover:bg-slate-800/50 active:scale-[0.98]",
    ghost:
      "text-slate-300 hover:bg-white/5 hover:text-white active:scale-[0.98]",
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
