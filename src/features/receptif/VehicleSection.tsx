"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/utils";

type VehicleSectionProps = {
  image: string;
  title: string;
  tagline: string;
  description: string;
  capacityLabel: string;
  capacity: string;
  featuresLabel: string;
  features: string[];
  reserveLabel: string;
  reserveHref: string;
};

/**
 * Section véhicule premium : grande image à gauche, contenu à droite (50/50
 * desktop, image puis contenu en mobile). Reveal GSAP au scroll + hover léger.
 */
export function VehicleSection({
  image,
  title,
  tagline,
  description,
  capacityLabel,
  capacity,
  featuresLabel,
  features,
  reserveLabel,
  reserveHref,
}: VehicleSectionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const targets = el.querySelectorAll("[data-anim]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }
    gsap.set(targets, { opacity: 0, y: 44 });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.1,
            });
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
    >
      {/* Image (gauche) */}
      <div
        data-anim
        className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-[0_20px_60px_rgba(0,0,0,0.10)]"
      >
        <Image
          src={asset(image)}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-luxe)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </div>

      {/* Contenu (droite) */}
      <div>
        <p data-anim className="text-eyebrow mb-4">
          {tagline}
        </p>
        <h3 data-anim className="text-3xl font-medium tracking-tight text-ink md:text-4xl">
          {title}
        </h3>
        <p data-anim className="mt-5 leading-relaxed text-muted">
          {description}
        </p>

        <div data-anim className="mt-7 flex items-baseline gap-3 border-y border-line py-4">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            {capacityLabel}
          </span>
          <span className="text-lg font-medium text-ink">{capacity}</span>
        </div>

        <p data-anim className="mt-6 text-xs uppercase tracking-[0.2em] text-gold">
          {featuresLabel}
        </p>
        <ul data-anim className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-ink/80">
              <span className="h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden />
              {f}
            </li>
          ))}
        </ul>

        <div data-anim className="mt-8">
          <Button href={reserveHref} variant="primary" size="lg">
            {reserveLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
