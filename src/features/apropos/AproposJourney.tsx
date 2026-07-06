"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SmartVideo } from "@/components/ui/SmartVideo";

const TIMES = ["08:00", "10:00", "13:00", "18:00", "22:00"];
const MEDIA = [
  { video: "/videos/journey/airport.mp4", poster: "/videos/journey/airport.jpg" },
  { video: "/videos/journey/vclass.mp4", poster: "/videos/journey/vclass.jpg" },
  { video: "/videos/loader.mp4", poster: "/videos/loader-poster.jpg" },
  { video: "/videos/journey/vip.mp4", poster: "/videos/journey/vip.jpg" },
  { video: "/videos/hero.mp4", poster: "/videos/hero-poster.jpg" },
];

/**
 * « Une journée avec Konciergate » — narration immersive.
 * Desktop : chaque moment plein écran (80svh), texte superposé.
 * Mobile : vidéo en 16:9 ENTIER (aucun recadrage destructeur) + heure dessous.
 * Les vidéos se lancent à l'entrée dans le viewport (lazy) et se mettent en pause.
 */
export function AproposJourney({ title, items }: { title: string; items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const moments = el.querySelectorAll("[data-moment]");
    const animated = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target.querySelector("video") as HTMLVideoElement | null;
          const content = e.target.querySelector("[data-content]");
          if (e.isIntersecting) {
            if (v) v.play().catch(() => {});
            if (content && !reduce && !animated.has(e.target)) {
              animated.add(e.target);
              gsap.fromTo(
                content,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
              );
            }
          } else if (v) {
            v.pause();
          }
        });
      },
      { threshold: 0.4 },
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
            {/* Média : ratio 16:9 complet sur mobile, plein écran sur desktop */}
            <div className="relative aspect-video w-full md:absolute md:inset-0 md:aspect-auto md:h-full">
              <SmartVideo
                src={MEDIA[i]?.video ?? "/videos/hero.mp4"}
                poster={MEDIA[i]?.poster ?? "/videos/hero-poster.jpg"}
                preload="none"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 hidden bg-gradient-to-t from-black/80 via-black/20 to-black/30 md:block" />
            </div>

            {/* Texte : sous la vidéo sur mobile, superposé sur desktop */}
            <div
              data-content
              className="shell relative z-10 py-7 md:py-0 md:pb-20"
            >
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
