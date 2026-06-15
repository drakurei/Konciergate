"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { asset } from "@/lib/utils";

const TIMES = ["08:00", "10:00", "13:00", "18:00", "22:00"];
const MEDIA = [
  { video: "/videos/destinations/dubai.mp4", poster: "/videos/destinations/dubai.jpg" },
  { video: "/videos/hero.mp4", poster: "/videos/hero-poster.jpg" },
  { video: "/videos/loader.mp4", poster: "/videos/loader-poster.jpg" },
  { video: "/videos/destinations/madrid.mp4", poster: "/videos/destinations/madrid.jpg" },
  { video: "/videos/destinations/geneve.mp4", poster: "/videos/destinations/geneve.jpg" },
];

/**
 * « Une journée avec Konciergate » : narration immersive. Chaque moment occupe
 * l'écran, sa vidéo se lance quand il entre dans le viewport (lazy) et se met
 * en pause en sortie. Le texte apparaît au scroll.
 */
export function AproposJourney({ title, items }: { title: string; items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const moments = el.querySelectorAll("[data-moment]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target.querySelector("video") as HTMLVideoElement | null;
          const content = e.target.querySelector("[data-content]");
          if (e.isIntersecting) {
            if (v) v.play().catch(() => {});
            if (content && !reduce) {
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
      { threshold: 0.5 },
    );
    moments.forEach((m) => io.observe(m));
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-black">
      <div className="shell py-16 md:py-20">
        <h2 className="text-3xl font-light tracking-tight text-white md:text-5xl">{title}</h2>
      </div>
      <div ref={ref}>
        {items.map((label, i) => (
          <div
            data-moment
            key={label}
            className="relative flex h-[80svh] min-h-[480px] items-end overflow-hidden border-t border-white/10"
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              muted
              loop
              playsInline
              preload="none"
              poster={asset(MEDIA[i]?.poster ?? "/videos/hero-poster.jpg")}
            >
              <source src={asset(MEDIA[i]?.video ?? "/videos/hero.mp4")} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
            <div data-content className="shell relative z-10 pb-16 md:pb-20">
              <span className="block text-5xl font-semibold tracking-tight text-white tabular-nums md:text-7xl">
                {TIMES[i]}
              </span>
              <span className="mt-3 block text-lg uppercase tracking-[0.18em] text-white/75 md:text-xl">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
