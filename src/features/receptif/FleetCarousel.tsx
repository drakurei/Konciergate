"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "@/i18n/navigation";
import { asset, cn } from "@/lib/utils";

export type FleetCard = {
  slug: string;
  image: string;
  name: string;
  subtitle: string;
};

/** Carrousel Embla de la flotte — chaque carte est cliquable vers sa page dédiée. */
export function FleetCarousel({
  cards,
  discoverLabel,
}: {
  cards: FleetCard[];
  discoverLabel: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
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
          {cards.map((c) => (
            <div
              key={c.slug}
              className="min-w-0 flex-[0_0_88%] pl-4 sm:flex-[0_0_60%] lg:flex-[0_0_40%]"
            >
              <Link
                href={`/receptif/${c.slug}`}
                className="group block overflow-hidden rounded-[var(--radius-lg)] bg-stone"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={asset(c.image)}
                    alt={c.name}
                    fill
                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 60vw, 40vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                    <h3 className="text-2xl font-medium tracking-tight text-white">
                      {c.name}
                    </h3>
                    <p className="mt-2 text-sm text-white/75">{c.subtitle}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold-light">
                      {discoverLabel}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-3">
        {cards.map((c, i) => (
          <button
            key={c.slug}
            type="button"
            aria-label={c.name}
            onClick={() => scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              selected === i ? "w-10 bg-gold" : "w-2.5 bg-line hover:bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}
