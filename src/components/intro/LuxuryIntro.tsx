"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { asset } from "@/lib/utils";

const SESSION_KEY = "introSeen";
/** Durée d'affichage de la vidéo avant la transition de sortie (4–5 s). */
const HOLD_MS = 4500;

/**
 * Écran de chargement premium : UNIQUEMENT la vidéo (Mercedes Classe V noir),
 * aucun texte / logo / branding. Léger zoom cinématique, puis fondu élégant
 * vers la page d'accueil. Joué une seule fois par session.
 */
export function LuxuryIntro() {
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
      gsap.to(rootRef.current, {
        opacity: 0,
        duration: 0.9,
        ease: "power2.inOut",
        onComplete: () => {
          sessionStorage.setItem(SESSION_KEY, "true");
          document.documentElement.style.overflow = "";
          setShow(false);
        },
      });
    };

    const ctx = gsap.context(() => {
      // Zoom cinématique lent et continu (push-in discret).
      gsap.fromTo(
        videoRef.current,
        { scale: 1.04 },
        { scale: 1.12, duration: 5.4, ease: "none" },
      );
    }, rootRef);

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
      className="fixed inset-0 z-[300] overflow-hidden bg-black"
      aria-hidden
    >
      <video
        ref={videoRef}
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
      {/* Voile très léger pour la profondeur, aucun texte */}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}
