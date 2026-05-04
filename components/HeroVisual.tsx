import Image from "next/image";

type HeroVisualProps = {
  caption: string;
};

export function HeroVisual({ caption }: HeroVisualProps) {
  return (
    <div className="relative flex w-full justify-center lg:justify-end lg:pr-4">
      <div
        className="pointer-events-none absolute -right-8 top-1/2 h-[min(90vw,420px)] w-[min(90vw,420px)] -translate-y-1/2 rounded-full bg-gradient-to-br from-ri-blue/50 via-ri-peach/15 to-transparent blur-3xl"
        aria-hidden
      />
      <figure className="relative w-full max-w-[340px]">
        <div className="relative rotate-[1.5deg] rounded-[2rem] border border-ri-border/80 bg-ri-card p-10 shadow-[0_28px_90px_-30px_rgba(89,42,25,0.28)] sm:p-12">
          <div className="absolute -left-3 -top-3 h-16 w-16 rounded-2xl border border-ri-border/40 bg-ri-bg-warm/90 shadow-sm" />
          <Image
            src="/brand/ri-icon.png"
            alt="Realitas Infinitas icon"
            width={128}
            height={128}
            className="relative mx-auto h-28 w-28 object-contain sm:h-32 sm:w-32"
            priority
          />
        </div>
        <figcaption className="mt-6 max-w-[34ch] text-left text-xs leading-relaxed text-ri-muted sm:text-[13px]">
          {caption}
        </figcaption>
      </figure>
    </div>
  );
}
