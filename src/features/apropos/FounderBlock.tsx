"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { asset } from "@/lib/utils";

/**
 * Bloc fondateur — mise en page magazine de luxe : grand portrait éditorial
 * (parallaxe), nom en gros titre, citation. Style Rolex / Four Seasons.
 */
export function FounderBlock({
  quote,
  author,
  role,
  bio,
}: {
  quote: string;
  author: string;
  role: string;
  bio: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-10%", "10%"]);

  return (
    <section ref={ref} className="overflow-hidden bg-ink py-24 text-white md:py-36">
      <div className="shell grid items-center gap-12 md:grid-cols-12 md:gap-16">
        {/* Portrait grand format avec parallaxe */}
        <div className="md:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[var(--radius-lg)] md:max-w-none">
            <motion.div style={{ y }} className="absolute inset-[-12%]">
              <Image
                src={asset("/images/founder-nicolas.jpg")}
                alt={author}
                fill
                sizes="(max-width: 768px) 90vw, 42vw"
                className="object-cover"
                priority={false}
              />
            </motion.div>
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
        </div>

        {/* Texte magazine */}
        <div className="md:col-span-7 md:pl-6">
          <Reveal>
            <p className="text-eyebrow mb-6">{role}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
              {author}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-white/65">
              {bio}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 h-px w-16 bg-white/30" />
          </Reveal>
          <Reveal delay={0.2}>
            <blockquote className="mt-8 max-w-xl text-balance text-2xl font-light leading-[1.4] tracking-tight text-white/90 md:text-3xl">
              <span className="font-display text-white/40">“</span>
              {quote}
              <span className="font-display text-white/40">”</span>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
