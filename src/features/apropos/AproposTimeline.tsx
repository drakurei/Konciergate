"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { asset } from "@/lib/utils";

type Step = { step: string; text: string };

/** Timeline immersive : chaque étape = texte + photo, révélée au scroll (GSAP). */
export function AproposTimeline({
  title,
  items,
  images,
  years,
}: {
  title: string;
  items: Step[];
  images: string[];
  years: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rows = el.querySelectorAll("[data-row]");
    if (reduce) {
      gsap.set(rows, { opacity: 1, y: 0 });
      return;
    }
    rows.forEach((row) => {
      gsap.set(row, { opacity: 0, y: 48 });
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              gsap.to(row, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
              io.disconnect();
            }
          });
        },
        { threshold: 0.25 },
      );
      io.observe(row);
    });
  }, []);

  return (
    <section className="bg-black py-20 text-white md:py-28">
      <div className="shell">
        <h2 className="mb-16 text-3xl font-light tracking-tight md:text-5xl">{title}</h2>
        <div ref={ref} className="relative border-l border-white/15 pl-8 md:pl-0 md:border-l-0">
          <div className="space-y-16 md:space-y-24">
            {items.map((it, i) => {
              const reverse = i % 2 === 1;
              return (
                <div
                  data-row
                  key={it.step}
                  className="grid items-center gap-8 md:grid-cols-2 md:gap-16"
                >
                  <div
                    className={`relative aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] ${reverse ? "md:order-2" : ""}`}
                  >
                    <Image
                      src={asset(images[i] ?? images[0]!)}
                      alt={it.step}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <div className={reverse ? "md:order-1 md:pr-6" : "md:pl-6"}>
                    <span className="block text-5xl font-semibold tabular-nums tracking-tight text-white md:text-7xl">
                      {years[i] ?? String(i + 1)}
                    </span>
                    <h3 className="mt-3 text-xl font-medium uppercase tracking-[0.16em] text-white/80 md:text-2xl">
                      {it.step}
                    </h3>
                    <p className="mt-4 max-w-md text-lg font-light leading-relaxed text-white/65">
                      {it.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
