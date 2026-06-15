"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { asset } from "@/lib/utils";

/**
 * Hero cinématographique : vidéo plein écran + révélation séquentielle de
 * 3 phrases (effet Apple storytelling).
 */
export function AproposHero({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll("[data-line]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    gsap.set(items, { opacity: 0, y: 30, filter: "blur(8px)" });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.7,
      delay: 0.5,
    });
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[620px] items-center justify-center overflow-hidden bg-black"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={asset("/videos/hero-poster.jpg")}
      >
        <source src={asset("/videos/hero.mp4")} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.40), rgba(0,0,0,0.70))",
        }}
      />
      <div className="shell relative z-10 text-center">
        {lines.map((line, i) => (
          <p
            key={i}
            data-line
            className={
              i === lines.length - 1
                ? "mt-2 text-3xl font-medium tracking-tight text-white md:text-5xl"
                : "text-2xl font-light leading-snug tracking-tight text-white/85 md:text-4xl"
            }
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
