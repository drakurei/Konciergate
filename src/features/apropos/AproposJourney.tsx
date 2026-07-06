"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { asset } from "@/lib/utils";

const TIMES = ["08:00", "10:00", "13:00", "18:00", "22:00"];
const IMAGES = [
  "/images/journey/airport.jpg",
  "/images/journey/transfert.jpg",
  "/images/journey/hotel.jpg",
  "/images/journey/vip.jpg",
  "/images/journey/retour.jpg",
];

/**
 * « Une journée avec Konciergate » — narration en IMAGES (sans vidéo).
 * Desktop : chaque moment plein écran (80svh), texte superposé.
 * Mobile : image en 16:9 entier + heure dessous.
 * Au scroll : léger zoom d'apparition sur l'image + reveal du texte (GSAP).
 */
export function AproposJourney({ title, items }: { title: string; items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const moments = el.querySelectorAll("[data-moment]");
    if (reduce) {
      moments.forEach((m) => {
        const img = m.querySelector("[data-img]");
        const content = m.querySelector("[data-content]");
        gsap.set([img, content], { opacity: 1, y: 0, scale: 1 });
      });
      return;
    }
    const done = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || done.has(e.target)) return;
          done.add(e.target);
          const img = e.target.querySelector("[data-img]");
          const content = e.target.querySelector("[data-content]");
          gsap.fromTo(
            img,
            { scale: 1.08, opacity: 0.6 },
            { scale: 1, opacity: 1, duration: 1.6, ease: "power2.out" },
          );
          gsap.fromTo(
            content,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.15 },
          );
        });
      },
      { threshold: 0.35 },
    );
    moments.forEach((m) => io.observe(m));
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-black">
      <div className="shell py-14 md:py-20">
        <h2 className="text-3xl font-light tracking-tight text-white md:text-5xl">{title}</h2>
      </div>
      <div ref={ref}>
        {items.map((label, i) => (
          <div
            data-moment
            key={label}
            className="border-t border-white/10 md:relative md:flex md:h-[80svh] md:min-h-[480px] md:items-end md:overflow-hidden"
          >
            {/* Image : 16:9 entier sur mobile, plein écran sur desktop */}
            <div className="relative aspect-video w-full overflow-hidden md:absolute md:inset-0 md:aspect-auto md:h-full">
              <div data-img className="absolute inset-0 will-change-transform">
                <Image
                  src={asset(IMAGES[i] ?? IMAGES[0]!)}
                  alt={label}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 hidden bg-gradient-to-t from-black/80 via-black/20 to-black/30 md:block" />
            </div>

            {/* Texte : sous l'image sur mobile, superposé sur desktop */}
            <div data-content className="shell relative z-10 py-7 md:py-0 md:pb-20">
              <span className="block text-4xl font-semibold tracking-tight text-white tabular-nums md:text-7xl">
                {TIMES[i]}
              </span>
              <span className="mt-2 block text-base uppercase tracking-[0.18em] text-white/75 md:mt-3 md:text-xl">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
