import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/site";
import { asset } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { AproposHero } from "@/features/apropos/AproposHero";
import { AproposTimeline } from "@/features/apropos/AproposTimeline";
import { FounderBlock } from "@/features/apropos/FounderBlock";
import {
  AproposCarousel,
  type ExploreSlide,
} from "@/features/apropos/AproposCarousel";

type Step = { step: string; text: string };
type Value = { title: string; text: string };
type Explore = { title: string; text: string };

const EXPLORE_META = [
  { href: "/receptif", image: "/images/mercedes-classe-v.jpg" },
  { href: "/evenements", image: "/images/event-hero.jpg" },
  { href: "/k-original", image: "/images/ko-hero.jpg" },
  { href: "/destinations", image: "/images/destination-france.jpg" },
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
  const values = t.raw("values.items") as Value[];
  const explore = t.raw("explore.items") as Explore[];

  const slides: ExploreSlide[] = explore.map((e, i) => ({
    href: EXPLORE_META[i]?.href ?? "/",
    image: EXPLORE_META[i]?.image ?? "/images/ko-hero.jpg",
    title: e.title,
    text: e.text,
  }));

  return (
    <>
      {/* SECTION 1 — Hero vidéo */}
      <AproposHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      {/* Intro narrative */}
      <section className="bg-black pb-8 pt-24 text-white md:pt-32">
        <div className="shell max-w-3xl">
          <Reveal>
            <p className="text-balance text-2xl font-light leading-relaxed md:text-3xl">
              {t("story.p1")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-white/60">{t("story.p2")}</p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2 — Timeline */}
      <AproposTimeline title={t("timeline.title")} items={timeline} />

      {/* SECTION 3 — Fondateur */}
      <FounderBlock
        quote={t("quote.text")}
        author={t("quote.author")}
        role={t("quote.role")}
      />

      {/* SECTION 4 — Carrousel des univers */}
      <section className="bg-black py-24 text-white md:py-32">
        <div className="shell">
          <Reveal>
            <h2 className="mb-14 text-3xl font-light tracking-tight md:text-5xl">
              {t("explore.title")}
            </h2>
          </Reveal>
        </div>
        <div className="shell">
          <AproposCarousel slides={slides} />
        </div>
      </section>

      {/* SECTION 5 — Engagements */}
      <section className="bg-paper py-24 md:py-32">
        <div className="shell">
          <Reveal>
            <h2 className="mb-16 text-center text-3xl font-light tracking-tight text-ink md:text-5xl">
              {t("values.title")}
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.1}
                className="rounded-[var(--radius-lg)] border border-line bg-white p-10 text-center"
              >
                <span className="text-sm font-medium tabular-nums text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl font-medium tracking-tight text-ink">
                  {v.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — Vidéo immersive plein écran */}
      <section className="relative h-[70svh] min-h-[440px] overflow-hidden bg-black">
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
        <div className="absolute inset-0 bg-black/40" />
        <div className="shell relative z-10 flex h-full items-center justify-center">
          <Reveal>
            <p className="text-center text-2xl font-light tracking-tight text-white md:text-4xl">
              {t("hero.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 7 — CTA final */}
      <section className="bg-black py-24 text-white md:py-32">
        <div className="shell flex flex-col items-center text-center">
          <Reveal>
            <h2 className="max-w-2xl text-balance text-3xl font-light tracking-tight md:text-5xl">
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
