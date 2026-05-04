import Image from "next/image";

type HeroVisualProps = {
  caption: string;
};

export function HeroVisual({ caption }: HeroVisualProps) {
  return (
    <div className="relative mx-auto flex w-full max-w-lg justify-center lg:mx-0 lg:justify-end">
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-ri-blue/35 blur-3xl"
        aria-hidden
      />
      <div className="relative w-full max-w-sm">
        <div
          className="absolute -bottom-2 left-4 right-4 h-24 rounded-2xl border border-ri-border/50 bg-ri-peach/25 sm:h-28"
          aria-hidden
        />
        <div className="glass-panel accent-gradient-border relative rounded-3xl p-6 shadow-sm sm:p-8">
          <div className="rounded-2xl border border-ri-border bg-ri-card px-6 py-8 sm:px-8 sm:py-10">
            <Image
              src="/brand/ri-icon.png"
              alt="Realitas Infinitas icon"
              width={112}
              height={112}
              className="mx-auto h-24 w-24 object-contain sm:h-28 sm:w-28"
              priority
            />
          </div>
        </div>
        <p className="mt-4 text-center text-xs leading-relaxed text-ri-muted lg:text-left">
          {caption}
        </p>
      </div>
    </div>
  );
}
