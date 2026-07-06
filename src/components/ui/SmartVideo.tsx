"use client";

import { forwardRef, useEffect, useRef } from "react";
import { asset } from "@/lib/utils";

type SmartVideoProps = {
  /** Chemin du mp4 desktop (sans basePath) — la variante `-480.mp4` est servie sur mobile. */
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  /** preload une fois la source choisie (défaut: metadata). */
  preload?: "auto" | "metadata" | "none";
};

/**
 * Vidéo adaptative : sur écran ≤ 768px, charge la variante 480p (~5× plus
 * légère) au lieu de la 1080p. La source n'est attachée qu'après montage,
 * donc mobile ne télécharge JAMAIS la version lourde.
 */
export const SmartVideo = forwardRef<HTMLVideoElement, SmartVideoProps>(
  function SmartVideo(
    { src, poster, className, autoPlay = false, loop = true, preload = "auto" },
    outerRef,
  ) {
    const innerRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      const v = innerRef.current;
      if (!v) return;
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      const chosen = mobile ? src.replace(/\.mp4$/, "-480.mp4") : src;
      v.src = asset(chosen);
      v.load();
      if (autoPlay) v.play().catch(() => {});
    }, [src, autoPlay]);

    return (
      <video
        ref={(node) => {
          innerRef.current = node;
          if (typeof outerRef === "function") outerRef(node);
          else if (outerRef) outerRef.current = node;
        }}
        className={className}
        muted
        loop={loop}
        playsInline
        preload={preload}
        poster={poster ? asset(poster) : undefined}
      />
    );
  },
);
