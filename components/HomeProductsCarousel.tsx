"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export type HomeProductSlide = {
  href: string;
  eyebrow: string;
  description: string;
  learnMore: string;
  logo: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
};

type HomeProductsCarouselProps = {
  products: HomeProductSlide[];
};

export function HomeProductsCarousel({ products }: HomeProductsCarouselProps) {
  const t = useTranslations("HomePage");
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const count = products.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 7000);
    return () => window.clearInterval(id);
  }, [paused, count]);

  return (
    <div
      className="mt-12 sm:mt-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        aria-labelledby={labelId}
        className="relative"
      >
        <p id={labelId} className="sr-only">
          {t("productsCarouselLabel")}
        </p>

        <div
          className="relative overflow-hidden rounded-[1.75rem] border border-ri-border/70 bg-gradient-to-br from-ri-bg-soft via-white to-ri-bg-warm/55 shadow-[0_28px_80px_-48px_rgba(89,42,25,0.45)]"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current == null) return;
            const delta =
              (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(delta) < 48) return;
            if (delta > 0) goPrev();
            else goNext();
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_0%,rgba(196,229,242,0.35),transparent_55%),radial-gradient(ellipse_70%_50%_at_100%_100%,rgba(242,200,162,0.22),transparent_50%)]"
            aria-hidden
          />

          <div className="relative min-h-[28rem] sm:min-h-[26rem] lg:min-h-[24rem]">
            {products.map((product, i) => {
              const isActive = i === index;
              return (
                <div
                  key={product.href}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${count}`}
                  aria-hidden={!isActive}
                  className={cn(
                    "absolute inset-0 grid items-center gap-10 px-6 py-10 transition-all duration-500 ease-out sm:px-10 sm:py-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 lg:px-14 lg:py-14",
                    isActive
                      ? "z-10 translate-y-0 opacity-100"
                      : "pointer-events-none z-0 translate-y-3 opacity-0"
                  )}
                >
                  <div className="flex justify-center lg:justify-start">
                    <div className="flex w-full max-w-[22rem] items-center justify-center rounded-[1.35rem] border border-ri-border/40 bg-white/70 px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[2px] sm:max-w-[24rem] sm:px-8 sm:py-10">
                      <Image
                        src={product.logo.src}
                        alt={product.logo.alt}
                        width={product.logo.width}
                        height={product.logo.height}
                        unoptimized
                        sizes="(max-width: 1024px) 85vw, 380px"
                        className="h-auto max-h-[5.5rem] w-full object-contain object-center sm:max-h-[6.25rem]"
                        priority={i === 0}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col text-center lg:text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ri-copper">
                      {product.eyebrow}
                    </p>
                    <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ri-muted sm:text-[1.05rem] lg:mx-0">
                      {product.description}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-ri-border/70 pt-8 sm:mt-10 sm:pt-10 lg:justify-start">
                      <Link
                        href={product.href}
                        tabIndex={isActive ? 0 : -1}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-ri-brown px-8 py-2.5 text-sm font-semibold tracking-wide text-white shadow-sm transition-[background-color,transform] duration-300 hover:bg-ri-copper active:scale-[0.99]"
                      >
                        {product.learnMore}
                      </Link>
                      <span className="text-xs font-medium tracking-[0.18em] text-ri-muted/80 uppercase">
                        {i + 1} / {count}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 sm:mt-7">
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label={t("productsCarouselLabel")}
          >
            {products.map((product, i) => (
              <button
                key={product.href}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={product.logo.alt}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ri-copper",
                  i === index
                    ? "w-8 bg-ri-brown"
                    : "w-2 bg-ri-copper/30 hover:bg-ri-copper/55"
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label={t("productsPrev")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ri-border/80 bg-white/80 text-ri-brown transition-colors hover:border-ri-copper/40 hover:bg-ri-bg-warm/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ri-copper"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={t("productsNext")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ri-border/80 bg-white/80 text-ri-brown transition-colors hover:border-ri-copper/40 hover:bg-ri-bg-warm/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ri-copper"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
