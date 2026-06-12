"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/utils";

/** Bloc fondateur — mise en page magazine, grande photo avec parallaxe légère. */
export function FounderBlock({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section ref={ref} className="overflow-hidden bg-ink py-24 text-white md:py-32">
      <div className="shell grid items-center gap-12 md:grid-cols-2 md:gap-20">
        {/* Photo avec parallaxe */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[var(--radius-lg)]">
          <motion.div style={{ y }} className="absolute inset-[-10%]">
            <Image
              src={asset("/images/founder-nicolas.jpg")}
              alt={author}
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>

        {/* Citation magazine */}
        <div>
          <span className="block font-display text-7xl leading-none text-gold">“</span>
          <blockquote className="-mt-6 text-balance text-2xl font-light leading-[1.4] tracking-tight md:text-4xl">
            {quote}
          </blockquote>
          <div className="mt-10 border-t border-line-dark pt-6">
            <p className="text-lg font-medium">{author}</p>
            <p className="text-sm uppercase tracking-[0.2em] text-gold-light">{role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
