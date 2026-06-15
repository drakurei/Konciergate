"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { asset } from "@/lib/utils";

const SESSION_KEY = "introSeen";
const LETTERS = "KONCIERGATE".split("");

/**
 * Écran de chargement signature : sur fond vidéo Mercedes, le logo KONCIERGATE
 * se construit progressivement (point → K → lettres), puis s'agrandit (×3) et
 * devient la transition vers la page d'accueil. Aucune barre. Une fois/session.
 * Inspirations : Apple, Netflix, Mercedes-Benz, Rolex.
 */
export function LuxuryIntro() {
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
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
      const dot = "[data-dot]";
      const letters = "[data-letter]";
      gsap.set(dot, { opacity: 0, scale: 0.3 });
      gsap.set(letters, { opacity: 0, y: 10, filter: "blur(6px)" });

      const tl = gsap.timeline({ onComplete: finish });

      // 0 % — le point seul apparaît
      tl.to(dot, { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" }, 0.3);

      // 25 % → 75 % — le K puis les lettres se construisent progressivement
      tl.to(
        letters,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.16,
        },
        1.2,
      );

      // 100 % — pause, puis le logo s'agrandit (×3) et ouvre le site
      tl.to(markRef.current, { scale: 1.04, duration: 0.6, ease: "power1.inOut" }, ">+0.5");
      tl.to(
        markRef.current,
        { scale: 3, opacity: 0, duration: 1.2, ease: "power2.in" },
        ">",
      );
      // léger fondu du fond en parallèle de la fin du zoom
      tl.to(rootRef.current, { opacity: 0, duration: 0.7, ease: "power2.inOut" }, "<0.5");
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
      <div className="absolute inset-0 bg-black/40" />

      {/* Construction du logo, centrée */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={markRef}
          className="flex items-baseline will-change-transform"
          aria-label="Konciergate"
        >
          {LETTERS.map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              data-letter
              className="text-4xl font-light uppercase tracking-[0.22em] text-white md:text-6xl"
            >
              {ch}
            </span>
          ))}
          <span
            data-dot
            className="ml-1 inline-block h-2 w-2 rounded-full bg-white md:ml-1.5 md:h-2.5 md:w-2.5"
          />
        </div>
      </div>
    </div>
  );
}
