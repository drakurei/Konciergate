"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * Fine barre de progression de lecture sous la navbar — repère discret
 * sur les pages longues (storytelling). Masquée si mouvement réduit.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed inset-x-0 top-16 z-[99] h-px bg-ink/50 mix-blend-difference md:top-20"
    />
  );
}
