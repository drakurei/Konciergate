"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";

/** Chemin de la vidéo de fond. Déposez le fichier ici pour l'activer. */
const HERO_VIDEO = "/video/hero.mp4";
const HERO_POSTER = "/video/hero-poster.jpg";

/**
 * Hero plein écran avec vidéo auto-détectée.
 * Déposez simplement votre fichier dans `public/video/hero.mp4`
 * (et un poster optionnel `public/video/hero-poster.jpg`) : la vidéo
 * s'active et apparaît en fondu. En son absence, un dégradé
 * cinématographique anime l'arrière-plan — jamais d'élément cassé.
 */
export function Hero() {
  const t = useTranslations("home.hero");
  const tc = useTranslations("common");
  const ref = useRef<HTMLElement>(null);

  const [hasVideo, setHasVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Vérifie la présence du fichier vidéo sans afficher d'élément cassé.
  useEffect(() => {
    let active = true;
    fetch(HERO_VIDEO, { method: "HEAD" })
      .then((res) => {
        if (active && res.ok) setHasVideo(true);
      })
      .catch(() => {
        /* pas de vidéo → on garde le dégradé */
      });
    return () => {
      active = false;
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden bg-black"
    >
      {/* Couche média : dégradé (fallback toujours présent) + vidéo en fondu */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="hero-gradient h-full w-full" />
        {hasVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-[var(--ease-luxe)]"
            style={{ opacity: videoReady ? 1 : 0 }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={HERO_POSTER}
            onCanPlay={() => setVideoReady(true)}
            onError={() => setHasVideo(false)}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Voile */}
      <div className="scrim absolute inset-0" />
      <div className="absolute inset-0 bg-black/30" />

      {/* Contenu */}
      <motion.div
        style={{ opacity }}
        className="shell relative z-10 flex flex-col items-center text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease }}
          className="text-eyebrow mb-6 text-gold-light"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease }}
          className="text-display font-semibold text-white"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1, ease }}
          className="mt-6 max-w-xl text-lg font-light text-white/85 md:text-2xl"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button href="/receptif" variant="light" size="lg">
            {t("ctaPrimary")}
          </Button>
          <Button href="/contact" variant="light" size="lg">
            {t("ctaSecondary")}
          </Button>
        </motion.div>
      </motion.div>

      {/* Indice de défilement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="sr-only">{tc("scroll")}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/40 p-1.5"
        >
          <span className="h-2 w-px bg-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
