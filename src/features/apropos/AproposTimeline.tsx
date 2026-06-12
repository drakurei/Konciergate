"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Step = { step: string; text: string };

/** Timeline verticale premium, révélée progressivement au scroll (GSAP). */
export function AproposTimeline({ title, items }: { title: string; items: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const entries = el.querySelectorAll("[data-step]");
    const line = el.querySelector("[data-line]");
    if (reduce) {
      gsap.set([...entries], { opacity: 1, y: 0 });
      gsap.set(line, { scaleY: 1 });
      return;
    }
    gsap.set(entries, { opacity: 0, y: 40 });
    gsap.set(line, { scaleY: 0, transformOrigin: "top" });
    const io = new IntersectionObserver(
      (obs) => {
        obs.forEach((e) => {
          if (e.isIntersecting) {
            gsap.to(line, { scaleY: 1, duration: 1.4, ease: "power2.out" });
            gsap.to(entries, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.25,
            });
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-black py-24 text-white md:py-36">
      <div className="shell">
        <h2 className="mb-16 text-3xl font-light tracking-tight md:text-5xl">
          {title}
        </h2>
        <div ref={ref} className="relative pl-10 md:pl-16">
          {/* Ligne verticale animée */}
          <span
            data-line
            className="absolute left-[6px] top-2 h-[calc(100%-1rem)] w-px bg-gold/60 md:left-3"
          />
          <ol className="space-y-14 md:space-y-20">
            {items.map((it, i) => (
              <li data-step key={it.step} className="relative">
                <span className="absolute -left-10 top-1.5 flex h-3.5 w-3.5 items-center justify-center md:-left-[3.7rem]">
                  <span className="h-3.5 w-3.5 rounded-full border border-gold bg-black" />
                  <span className="absolute h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                <p className="text-sm font-medium tabular-nums tracking-[0.2em] text-gold-light">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-2xl font-medium tracking-tight md:text-3xl">
                  {it.step}
                </h3>
                <p className="mt-3 max-w-2xl text-lg font-light leading-relaxed text-white/65">
                  {it.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
