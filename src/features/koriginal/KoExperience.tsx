"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/utils";

type KoExperienceProps = {
  index: number;
  image: string;
  title: string;
  text: string;
  reserveLabel: string;
  quoteLabel: string;
  reserveHref: string;
  quoteHref: string;
  reverse?: boolean;
};

/** Fiche d'expérience K.ORIGINAL : grande image immersive + reveal GSAP + CTA. */
export function KoExperience({
  index,
  image,
  title,
  text,
  reserveLabel,
  quoteLabel,
  reserveHref,
  quoteHref,
  reverse = false,
}: KoExperienceProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const targets = el.querySelectorAll("[data-anim]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }
    gsap.set(targets, { opacity: 0, y: 42 });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.12,
            });
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
    >
      <div
        data-anim
        className={`group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] ${reverse ? "md:order-2" : ""}`}
      >
        <Image
          src={asset(image)}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className={reverse ? "md:order-1" : ""}>
        <p data-anim className="text-eyebrow mb-4">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 data-anim className="text-3xl font-medium tracking-tight text-ink md:text-4xl">
          {title}
        </h3>
        <p data-anim className="mt-5 leading-relaxed text-muted">
          {text}
        </p>
        <div data-anim className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button href={reserveHref} variant="primary" size="lg">
            {reserveLabel}
          </Button>
          <Button href={quoteHref} variant="secondary" size="lg">
            {quoteLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
