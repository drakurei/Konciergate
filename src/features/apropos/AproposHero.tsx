"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { asset } from "@/lib/utils";

/** Hero vidéo plein écran de la page À propos, texte animé GSAP. */
export function AproposHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
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
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.18, delay: 0.3 },
    );
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
            "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.65))",
        }}
      />
      <div className="shell relative z-10 text-center">
        <p data-anim className="text-eyebrow mb-6 text-gold-light opacity-0">
          {eyebrow}
        </p>
        <h1
          data-anim
          className="text-display font-semibold text-white opacity-0"
        >
          {title}
        </h1>
        <p
          data-anim
          className="mx-auto mt-6 max-w-2xl text-lg font-light text-white/85 opacity-0 md:text-2xl"
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
