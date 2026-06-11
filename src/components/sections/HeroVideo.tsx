"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/utils";

/**
 * Hero principal avec fond vidéo Konciergate (autoplay, muted, loop,
 * playsInline) + overlay dégradé. Branding animé en fadeUp (GSAP).
 */
export function HeroVideo() {
  const t = useTranslations("home.hero");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-item]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.2,
        },
      );
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex h-[100svh] min-h-[640px] items-end justify-center overflow-hidden bg-black">
      {/* Fond vidéo */}
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

      {/* Overlay dégradé */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.20), rgba(0,0,0,0.70))",
        }}
      />

      {/* Contenu : uniquement les CTA, positionnés en bas */}
      <div
        ref={contentRef}
        className="shell relative z-10 flex flex-col items-center pb-14 text-center md:pb-16"
      >
        <div
          data-hero-item
          className="flex flex-col items-center gap-4 opacity-0 sm:flex-row"
        >
          <Button href="/receptif" variant="light" size="lg">
            {t("ctaPrimary")}
          </Button>
          <Button href="/contact" variant="light" size="lg">
            {t("ctaSecondary")}
          </Button>
        </div>
      </div>
    </section>
  );
}
