"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type Vehicle = { name: string; text: string };

const IMAGES = [
  "/images/mercedes-classe-v.jpg",
  "/images/mercedes-sprinter.jpg",
  "/images/mercedes-autocar.jpg",
];

export function TransportCarousel() {
  const t = useTranslations("receptif.transport");
  const vehicles = t.raw("vehicles") as Vehicle[];
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
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
          {vehicles.map((v, i) => (
            <div
              key={v.name}
              className="min-w-0 flex-[0_0_88%] pl-4 md:flex-[0_0_62%] lg:flex-[0_0_52%]"
            >
              <article className="overflow-hidden rounded-[var(--radius-lg)] bg-stone">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={IMAGES[i] ?? IMAGES[0]!}
                    alt={v.name}
                    fill
                    sizes="(max-width: 768px) 88vw, 52vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-luxe)] hover:scale-105"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <h3 className="text-2xl font-medium tracking-tight text-ink">
                    {v.name}
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">
                    {v.text}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-3">
        {vehicles.map((v, i) => (
          <button
            key={v.name}
            type="button"
            aria-label={v.name}
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
