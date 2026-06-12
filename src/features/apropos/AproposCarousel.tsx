"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "@/i18n/navigation";
import { asset, cn } from "@/lib/utils";

export type ExploreSlide = {
  href: string;
  image: string;
  title: string;
  text: string;
};

/** Carrousel immersif Embla présentant les univers Konciergate. */
export function AproposCarousel({ slides }: { slides: ExploreSlide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback(
    (i: number) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((s) => (
            <div
              key={s.href}
              className="min-w-0 flex-[0_0_85%] pl-4 md:flex-[0_0_55%] lg:flex-[0_0_42%]"
            >
              <Link
                href={s.href}
                className="group relative block overflow-hidden rounded-[var(--radius-lg)]"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={asset(s.image)}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 85vw, 42vw"
                    className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-luxe)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                  <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-white/75">{s.text}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-3">
        {slides.map((s, i) => (
          <button
            key={s.href}
            type="button"
            aria-label={s.title}
            onClick={() => scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              selected === i ? "w-10 bg-gold" : "w-2.5 bg-white/25 hover:bg-white/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}
