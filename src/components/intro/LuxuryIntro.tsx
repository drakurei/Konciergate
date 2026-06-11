"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Logo } from "@/components/ui/Logo";
import { asset } from "@/lib/utils";

const SESSION_KEY = "introSeen";
/** Temps d'affichage avant la transition de sortie (2–3 s). */
const HOLD_MS = 2700;

/**
 * Écran d'arrivée premium : vidéo cinématique plein écran servant aussi
 * d'écran de chargement (aucun loader / spinner / flash blanc). Logo + texte
 * en apparition GSAP, puis transition fluide (opacity → 0, scale → 1.05)
 * révélant le site. Joué une seule fois par session.
 */
export function LuxuryIntro() {
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen || reduce) {
      if (!seen) sessionStorage.setItem(SESSION_KEY, "true");
      return; // on n'affiche pas l'intro
    }
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    document.documentElement.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      // Apparition progressive du logo + texte
      gsap.fromTo(
        contentRef.current?.children ?? [],
        { opacity: 0, y: 22, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.18,
          delay: 0.25,
        },
      );
    }, rootRef);

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      gsap.to(rootRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          sessionStorage.setItem(SESSION_KEY, "true");
          document.documentElement.style.overflow = "";
          setShow(false);
        },
      });
    };

    const timer = window.setTimeout(finish, HOLD_MS);

    return () => {
      window.clearTimeout(timer);
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
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={asset("/videos/intro-poster.jpg")}
        onEnded={() => {
          // sécurité : si la vidéo se termine avant le timer
          const el = rootRef.current;
          if (el && !finishedRef.current) {
            finishedRef.current = true;
            gsap.to(el, {
              opacity: 0,
              scale: 1.05,
              duration: 0.8,
              ease: "power2.inOut",
              onComplete: () => {
                sessionStorage.setItem(SESSION_KEY, "true");
                document.documentElement.style.overflow = "";
                setShow(false);
              },
            });
          }
        }}
      >
        <source src={asset("/videos/intro.mp4")} type="video/mp4" />
      </video>

      {/* Overlay noir très léger */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Logo + texte centrés */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <Logo framed tone="light" className="h-16 w-16 md:h-20 md:w-20" />
        <h1 className="mt-8 text-3xl font-light uppercase tracking-[0.4em] text-white md:text-5xl md:tracking-[0.5em]">
          Konciergate
        </h1>
        <p className="mt-5 text-xs uppercase tracking-[0.32em] text-white/70 md:text-sm">
          Agence de Conciergerie Européenne
        </p>
        <span className="mt-10 h-px w-12 bg-gold" />
      </div>
    </div>
  );
}
