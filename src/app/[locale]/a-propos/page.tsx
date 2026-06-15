import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/site";
import { asset } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Stats } from "@/features/home/Stats";
import { AproposHero } from "@/features/apropos/AproposHero";
import { AproposTimeline } from "@/features/apropos/AproposTimeline";
import { FounderBlock } from "@/features/apropos/FounderBlock";
import {
  AproposCarousel,
  type ExploreSlide,
} from "@/features/apropos/AproposCarousel";

type Step = { step: string; text: string };
type Explore = { title: string; text: string };

const TIMELINE_IMAGES = [
  "/images/apropos-hero.jpg",
  "/images/receptif-concierge.jpg",
  "/images/event-hero.jpg",
  "/videos/destinations/dubai.jpg",
];

const COULISSES = [
  "/images/mercedes-classe-v.jpg",
  "/images/receptif-concierge.jpg",
  "/images/ko-vip.jpg",
  "/images/event-hero.jpg",
  "/images/ko-hero.jpg",
];

const EXPLORE_META = [
  { href: "/receptif", image: "/images/mercedes-classe-v.jpg", video: "/videos/hero.mp4" },
  { href: "/evenements", image: "/images/event-hero.jpg" },
  { href: "/k-original", image: "/images/ko-hero.jpg" },
  {
    href: "/destinations",
    image: "/videos/destinations/paris.jpg",
    video: "/videos/destinations/paris.mp4",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, namespace: "meta.apropos", path: "/a-propos" });
}

export default async function AProposPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("apropos");

  const timeline = t.raw("timeline.items") as Step[];
  const explore = t.raw("explore.items") as Explore[];
  const coulisses = t.raw("coulisses.items") as string[];

  const slides: ExploreSlide[] = explore.map((e, i) => ({
    href: EXPLORE_META[i]?.href ?? "/",
    image: EXPLORE_META[i]?.image ?? "/images/ko-hero.jpg",
    video: EXPLORE_META[i]?.video,
    title: e.title,
    text: e.text,
  }));

  return (
    <>
      {/* S1 — Hero vidéo */}
      <AproposHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      {/* S2 — L'origine (storytelling magazine) */}
      <section className="bg-black py-20 text-white md:py-28">
        <div className="shell">
          <Reveal>
            <p className="text-eyebrow mb-5">{t("origin.eyebrow")}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-3xl text-balance text-4xl font-light leading-[1.1] tracking-tight md:text-6xl">
              {t("origin.title")}
            </h2>
          </Reveal>
          <div className="mt-12 grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)]">
              <Image
                src={asset("/images/apropos-hero.jpg")}
                alt={t("origin.title")}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
            <div className="space-y-6">
              <Reveal>
                <p className="text-2xl font-light leading-relaxed md:text-3xl">
                  {t("story.p1")}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-white/60">{t("story.p2")}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* S3 — Timeline immersive */}
      <AproposTimeline title={t("timeline.title")} items={timeline} images={TIMELINE_IMAGES} />

      {/* S4 — Les coulisses */}
      <section className="bg-ink py-20 text-white md:py-28">
        <div className="shell">
          <Reveal>
            <h2 className="text-3xl font-light tracking-tight md:text-5xl">
              {t("coulisses.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-2xl text-lg font-light text-white/60">
              {t("coulisses.lead")}
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {coulisses.map((label, i) => (
              <Reveal
                key={label}
                delay={(i % 5) * 0.06}
                className="group relative aspect-[3/4] overflow-hidden rounded-[var(--radius-md)]"
              >
                <Image
                  src={asset(COULISSES[i] ?? COULISSES[0]!)}
                  alt={label}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-sm font-medium uppercase tracking-[0.12em] text-white">
                  {label}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* S5 — Le fondateur */}
      <FounderBlock
        quote={t("quote.text")}
        author={t("quote.author")}
        role={t("quote.role")}
        bio={t("founderBio")}
      />

      {/* S6 — Nos chiffres */}
      <Stats />

      {/* S7 — Vidéo immersive plein écran (aucun texte) */}
      <section className="relative h-[70svh] min-h-[420px] overflow-hidden bg-black">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={asset("/videos/hero-poster.jpg")}
        >
          <source src={asset("/videos/hero.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* S8 — Nos univers */}
      <section className="bg-black py-20 text-white md:py-28">
        <div className="shell">
          <Reveal>
            <h2 className="mb-12 text-3xl font-light tracking-tight md:text-5xl">
              {t("explore.title")}
            </h2>
          </Reveal>
          <AproposCarousel slides={slides} />
        </div>
      </section>

      {/* S9 — CTA final */}
      <section className="bg-ink py-24 text-white md:py-32">
        <div className="shell flex flex-col items-center text-center">
          <Reveal>
            <h2 className="max-w-3xl text-balance text-4xl font-light tracking-tight md:text-6xl">
              {t("cta.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Button href="/contact" variant="light" size="lg">
                {t("cta.contact")}
              </Button>
              <Button
                href={whatsappUrl("Bonjour Konciergate, je souhaite vous contacter.")}
                variant="light"
                size="lg"
              >
                {t("cta.whatsapp")}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
