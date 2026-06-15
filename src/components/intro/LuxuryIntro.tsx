"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Logo } from "@/components/ui/Logo";
import { asset } from "@/lib/utils";

const SESSION_KEY = "introSeen";

/**
 * Écran de chargement premium (style lancement de marque de luxe) :
 * vidéo Pinterest (Mercedes Classe V) en fond + overlay, logo blanc en
 * apparition, barre de progression 0→100 %, puis le logo s'agrandit (×1.8),
 * temps de pause, et fondu fluide vers la page d'accueil. ~7 s, une fois/session.
 */
export function LuxuryIntro() {
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barWrapRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(false);

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
      if (doneRef.current) return;
      doneRef.current = true;
      sessionStorage.setItem(SESSION_KEY, "true");
      document.documentElement.style.overflow = "";
      setShow(false);
    };

    const ctx = gsap.context(() => {
      gsap.set(logoRef.current, { opacity: 0, y: 16, scale: 1 });
      gsap.set(barFillRef.current, { scaleX: 0, transformOrigin: "left center" });

      const progress = { v: 0 };
      const tl = gsap.timeline({ onComplete: finish });

      // 1. Apparition du logo
      tl.to(logoRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0.2);

      // 2. Barre de progression 0 → 100 %
      tl.to(barFillRef.current, { scaleX: 1, duration: 4.8, ease: "power1.inOut" }, 0.6);
      tl.to(
        progress,
        {
          v: 100,
          duration: 4.8,
          ease: "power1.inOut",
          onUpdate: () => {
            if (pctRef.current) pctRef.current.textContent = `${Math.round(progress.v)}%`;
          },
        },
        0.6,
      );

      // 3. À 100 % : la barre s'efface, le logo s'agrandit (×1.8)
      tl.to(barWrapRef.current, { opacity: 0, duration: 0.4, ease: "power2.out" }, 5.4);
      tl.to(logoRef.current, { scale: 1.8, duration: 0.7, ease: "power3.out" }, 5.5);

      // 4. Pause ~1 s puis fondu de sortie → révélation de l'accueil
      tl.to(rootRef.current, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, 7.2);
    }, rootRef);

    return () => {
      ctx.revert();
      document.documentElement.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[300] overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={asset("/videos/loader-poster.jpg")}
      >
        <source src={asset("/videos/loader.mp4")} type="video/mp4" />
      </video>

      {/* Overlay noir léger */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Logo + barre de progression, centrés */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div ref={logoRef} className="will-change-transform">
          <Logo framed tone="light" className="h-20 w-20 md:h-24 md:w-24" />
        </div>

        <div ref={barWrapRef} className="mt-12 flex w-56 flex-col items-center md:w-64">
          <span className="h-px w-full overflow-hidden bg-white/20">
            <span ref={barFillRef} className="block h-full w-full bg-white" />
          </span>
          <span
            ref={pctRef}
            className="mt-4 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-white/80 tabular-nums"
          >
            0%
          </span>
        </div>
      </div>
    </div>
  );
}
