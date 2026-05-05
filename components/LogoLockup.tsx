import Image from "next/image";
import { cn } from "@/lib/cn";

export type LogoLockupVariant = "light" | "dark";

type LogoLockupProps = {
  variant: LogoLockupVariant;
  /** Solo la imagen del wordmark (sin ícono ri-icon). Útil en el header. */
  wordmarkOnly?: boolean;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  priority?: boolean;
};

export function LogoLockup({
  variant,
  wordmarkOnly,
  className,
  iconClassName,
  textClassName,
  priority,
}: LogoLockupProps) {
  const textSrc =
    variant === "light"
      ? "/brand/logo-text-transparent-brown.png"
      : "/brand/logo-text-transparent-white.png";

  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center",
        !wordmarkOnly && "gap-2.5 sm:gap-3.5",
        className
      )}
    >
      {!wordmarkOnly && (
        <Image
          src="/brand/ri-icon.png"
          alt=""
          width={322}
          height={315}
          sizes="(max-width: 768px) 44px, 52px"
          priority={priority}
          aria-hidden
          className={cn(
            "shrink-0 object-contain",
            iconClassName ?? "h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
          )}
        />
      )}
      <Image
        src={textSrc}
        alt="Realitas Infinitas"
        width={1518}
        height={132}
        sizes="(max-width: 640px) 75vw, (max-width: 1024px) 400px, 480px"
        priority={priority}
        className={cn(
          "min-h-0 min-w-0 object-contain object-left",
          textClassName ??
            "h-[1.65rem] w-auto max-w-[min(100%,54vw)] sm:h-8 md:h-9 lg:h-10 lg:max-w-[440px]"
        )}
      />
    </span>
  );
}
