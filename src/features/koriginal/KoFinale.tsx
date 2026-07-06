"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { asset } from "@/lib/utils";

const WORD = "K.ORIGINAL".split("");

/**
 * Final signature K.ORIGINAL (fidèle au site d'origine) : panorama de stade
 * immersif avec la marque géante en superposition. Lettres révélées au scroll
 * (blur → net, stagger) + légère parallaxe d'échelle sur l'image.
 */
export function KoFinale() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.12, 1]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const letters = el.querySelectorAll("[data-ko-letter]");
    if (reduce) {
      gsap.set(letters, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }
    gsap.set(letters, { opacity: 0, y: 34, filter: "blur(8px)" });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            gsap.to(letters, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.07,
            });
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <section
      ref={ref}
      className="relative flex h-[70svh] min-h-[420px] items-center justify-center overflow-hidden bg-black md:h-[90svh]"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src={asset("/images/ko-match.jpg")}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/45" />
      <h2
        aria-label="K.ORIGINAL"
        className="relative z-10 flex items-baseline text-5xl font-semibold tracking-[0.08em] text-white sm:text-7xl md:text-8xl lg:text-9xl"
      >
        {WORD.map((ch, i) => (
          <span key={`${ch}-${i}`} data-ko-letter className="inline-block">
            {ch}
          </span>
        ))}
      </h2>
    </section>
  );
}
