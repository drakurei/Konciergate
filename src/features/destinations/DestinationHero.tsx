"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { asset } from "@/lib/utils";
import { cityVideo, cityPoster } from "./cities";

/** Hero vidéo plein écran (100vh) d'une page destination + titre animé GSAP. */
export function DestinationHero({
  slug,
  eyebrow,
  name,
  tagline,
}: {
  slug: string;
  eyebrow: string;
  name: string;
  tagline: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll("[data-anim]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      targets,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.15, delay: 0.25 },
    );
  }, []);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={asset(cityPoster(slug))}
      >
        <source src={asset(cityVideo(slug))} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.65))",
        }}
      />
      <div className="shell relative z-10 flex h-full flex-col items-center justify-center text-center">
        <p data-anim className="text-eyebrow mb-5 text-white/70 opacity-0">
          {eyebrow}
        </p>
        <h1
          data-anim
          className="text-6xl font-semibold uppercase tracking-tight text-white opacity-0 md:text-8xl"
        >
          {name}
        </h1>
        <p data-anim className="mt-6 max-w-xl text-lg font-light text-white/80 opacity-0 md:text-xl">
          {tagline}
        </p>
      </div>
    </section>
  );
}
