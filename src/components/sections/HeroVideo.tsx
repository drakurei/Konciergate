"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { SmartVideo } from "@/components/ui/SmartVideo";
import { whatsappUrl } from "@/lib/site";

/**
 * Hero principal avec fond vidéo Konciergate (autoplay, muted, loop,
 * playsInline) + overlay dégradé. Branding animé en fadeUp (GSAP).
 */
export function HeroVideo() {
  const t = useTranslations("home.hero");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        // Mouvement réduit : on affiche le contenu sans animation (pas d'éléments invisibles).
        gsap.set("[data-hero-item]", { opacity: 1, y: 0 });
        return;
      }
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
      {/* Fond vidéo (480p servie sur mobile) */}
      <SmartVideo
        src="/videos/hero.mp4"
        poster="/videos/hero-poster.jpg"
        autoPlay
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay dégradé */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.20), rgba(0,0,0,0.70))",
        }}
      />

      {/* Contenu : marque discrète + CTA, positionnés en bas */}
      <div
        ref={contentRef}
        className="shell relative z-10 flex flex-col items-center pb-14 text-center md:pb-16"
      >
        {/* h1 accessible + SEO (marque), visuellement discret */}
        <h1 data-hero-item className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-white/90 opacity-0 md:text-base">
          {t("title")}
        </h1>
        <p
          data-hero-item
          className="mb-7 max-w-md text-base font-light text-white/70 opacity-0 md:text-lg"
        >
          {t("subtitle")}
        </p>
        <div
          data-hero-item
          className="flex flex-col items-center gap-4 opacity-0 sm:flex-row"
        >
          <Button href="/receptif" variant="light" size="lg">
            {t("ctaPrimary")}
          </Button>
          <Button
            href={whatsappUrl("Bonjour Konciergate, je souhaite vous contacter.")}
            variant="light"
            size="lg"
          >
            {t("ctaSecondary")}
          </Button>
        </div>
      </div>
    </section>
  );
}
