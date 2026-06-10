"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Logo } from "@/components/ui/Logo";

const WORD = "ONCIERGATE".split("");
const SESSION_KEY = "kg_intro_seen";

/**
 * Intro screen premium : le monogramme « K. » apparaît, le mot
 * « ONCIERGATE » se révèle lettre à lettre, puis le rideau se lève.
 * Affiché une seule fois par session. Ignoré si mouvement réduit.
 */
export function IntroScreen() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen || reduce) return;

    setShow(true);
    document.documentElement.style.overflow = "hidden";

    // Durée totale : entrée des lettres (~1.6s) + temps de lecture.
    const timer = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      document.documentElement.style.overflow = "";
      setShow(false);
    }, 2600);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, [reduce]);

  const letter: Variants = {
    hidden: { y: "110%" },
    visible: (i: number) => ({
      y: "0%",
      transition: { delay: 0.55 + i * 0.045, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 1, ease: [0.85, 0, 0.15, 1] } }}
        >
          <div className="flex items-end gap-1 overflow-hidden px-6">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              <Logo framed tone="light" className="h-20 w-20 md:h-24 md:w-24" />
            </motion.div>

            <div className="flex overflow-hidden pb-2 md:pb-3">
              {WORD.map((char, i) => (
                <span key={`${char}-${i}`} className="inline-block overflow-hidden">
                  <motion.span
                    custom={i}
                    variants={letter}
                    initial="hidden"
                    animate="visible"
                    className="inline-block text-3xl font-light tracking-[0.18em] text-white md:text-5xl"
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
