"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Logo } from "@/components/ui/Logo";
import { asset } from "@/lib/utils";

const SESSION_KEY = "introSeen";

/**
 * Écran d'arrivée premium (~6 s) piloté par une timeline GSAP :
 *
 *  0.0s  vidéo cinématique plein écran (loading + intro)
 *  0.8s  logo + « KONCIERGATE » en fondu
 *  1.8s  sous-titre « Agence de Conciergerie Européenne »
 *  3.0s  ligne dorée animée
 *  4.0s  « Réceptif • Événements • Football VIP »
 *  5.0s  fondu progressif vers le noir
 *  5.5s  révélation du Hero (opacity → 0, scale → 1.05)
 *  6.0s  accueil totalement visible
 *
 * Joué une seule fois par session (sessionStorage "introSeen").
 */
export function LuxuryIntro() {
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const tagsRef = useRef<HTMLParagraphElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen || reduce) {
      if (!seen) sessionStorage.setItem(SESSION_KEY, "true");
      return;
    }
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    document.documentElement.style.overflow = "hidden";

    const finish = () => {
      sessionStorage.setItem(SESSION_KEY, "true");
      document.documentElement.style.overflow = "";
      setShow(false);
    };

    const ctx = gsap.context(() => {
      gsap.set([logoRef.current, subtitleRef.current, tagsRef.current], {
        opacity: 0,
        y: 22,
      });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center" });
      gsap.set(blackRef.current, { opacity: 0 });

      const tl = gsap.timeline({ onComplete: finish });
      tl.to(logoRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 0.8)
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 1.8)
        .to(lineRef.current, { scaleX: 1, duration: 0.9, ease: "power2.out" }, 3.0)
        .to(tagsRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 4.0)
        .to(blackRef.current, { opacity: 1, duration: 0.6, ease: "power1.inOut" }, 5.0)
        .to(rootRef.current, { opacity: 0, scale: 1.05, duration: 0.6, ease: "power2.inOut" }, 5.5);
    }, rootRef);

    return () => {
      ctx.revert();
      document.documentElement.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Vidéo cinématique */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={asset("/videos/intro-poster.jpg")}
      >
        <source src={asset("/videos/intro.mp4")} type="video/mp4" />
      </video>

      {/* Overlay noir léger permanent */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Logo + textes centrés */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div ref={logoRef} className="flex flex-col items-center">
          <Logo framed tone="light" className="h-16 w-16 md:h-20 md:w-20" />
          <h1 className="mt-8 text-3xl font-light uppercase tracking-[0.4em] text-white md:text-5xl md:tracking-[0.5em]">
            Konciergate
          </h1>
        </div>
        <p
          ref={subtitleRef}
          className="mt-5 text-xs uppercase tracking-[0.32em] text-white/75 md:text-sm"
        >
          Agence de Conciergerie Européenne
        </p>
        <span ref={lineRef} className="mt-9 h-px w-16 bg-gold" />
        <p
          ref={tagsRef}
          className="mt-9 text-[0.7rem] uppercase tracking-[0.28em] text-gold-light md:text-xs"
        >
          Réceptif • Événements • Football VIP
        </p>
      </div>

      {/* Calque de fondu vers le noir (étape 5.0s) */}
      <div ref={blackRef} className="absolute inset-0 z-20 bg-black" />
    </div>
  );
}
