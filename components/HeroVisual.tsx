import Image from "next/image";

type HeroVisualProps = {
  caption: string;
};

export function HeroVisual({ caption }: HeroVisualProps) {
  return (
    <div className="relative flex w-full max-w-[440px] justify-center lg:max-w-none lg:justify-end">
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] h-[min(72vw,340px)] w-[min(72vw,340px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-ri-blue/30 via-ri-peach/15 to-transparent blur-3xl lg:left-auto lg:right-0 lg:translate-x-0 lg:translate-y-[-45%]"
        aria-hidden
      />
      <figure className="relative z-[1] flex w-full flex-col items-center lg:max-w-[400px] lg:items-end">
        <Image
          src="/brand/ri-icon.png"
          alt=""
          width={322}
          height={315}
          sizes="(max-width: 1024px) 42vw, 300px"
          priority
          aria-hidden
          className="h-44 w-auto max-w-full object-contain sm:h-52 md:h-56 lg:h-[15rem]"
        />
        <figcaption className="mt-6 max-w-[34ch] text-center text-[13px] leading-relaxed text-ri-muted sm:text-sm lg:max-w-[36ch] lg:text-right">
          {caption}
        </figcaption>
      </figure>
    </div>
  );
}
