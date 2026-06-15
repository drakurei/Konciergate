"use client";

import { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { asset } from "@/lib/utils";
import { cityVideo, cityPoster } from "./cities";

/**
 * Carte destination : poster premium + aperçu vidéo au survol (desktop).
 * La vidéo (preload="none") n'est téléchargée qu'au survol → lazy, jamais
 * toutes chargées en même temps.
 */
export function DestinationCard({
  slug,
  index,
  name,
  tagline,
}: {
  slug: string;
  index: number;
  name: string;
  tagline: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const onEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  };
  const onLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <Link
      href={`/destinations/${slug}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative block overflow-hidden rounded-[var(--radius-lg)]"
    >
      <div className="relative aspect-[3/4] md:aspect-[4/5]">
        <Image
          src={asset(cityPoster(slug))}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-105"
        />
        {/* Aperçu vidéo (desktop) — chargé uniquement au survol */}
        <video
          ref={videoRef}
          className="absolute inset-0 hidden h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100 md:block"
          muted
          loop
          playsInline
          preload="none"
          poster={asset(cityPoster(slug))}
        >
          <source src={asset(cityVideo(slug))} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
          <span className="text-xs font-medium tabular-nums text-white/60">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="mt-1 text-3xl font-medium tracking-tight text-white md:text-4xl">
            {name}
          </h2>
          <p className="mt-1 max-w-xs text-sm text-white/75">{tagline}</p>
        </div>
      </div>
    </Link>
  );
}
