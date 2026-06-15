"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Stat = { value: string; label: string };

/** Parse "15+" -> {num:15, suffix:"+"}, "100%" -> {num:100, suffix:"%"} */
function parse(value: string): { num: number; suffix: string } {
  const m = value.match(/^(\d+)(.*)$/);
  if (!m) return { num: 0, suffix: value };
  return { num: parseInt(m[1]!, 10), suffix: m[2] ?? "" };
}

function AnimatedNumber({ value }: { value: string }) {
  const { num, suffix } = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(num);
      return;
    }
    let raf = 0;
    let started = false;
    const animate = (start: number) => {
      const dur = 1300;
      const step = (t: number) => {
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(eased * num));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            requestAnimationFrame((t) => animate(t));
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [num]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  const t = useTranslations("home.stats");
  const items = t.raw("items") as Stat[];

  return (
    <section className="border-y border-line bg-white py-20 md:py-24">
      <div className="shell">
        <p className="mb-14 text-center text-xs uppercase tracking-[0.28em] text-muted">
          {t("eyebrow")}
        </p>
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {items.map((stat) => (
            <div key={stat.label} className="px-4 text-center">
              <div className="text-5xl font-semibold tracking-[-0.04em] text-ink md:text-6xl lg:text-7xl">
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
