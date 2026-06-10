import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ClubsMarquee } from "@/features/koriginal/ClubsMarquee";
import { CtaBand } from "@/components/layout/CtaBand";
import { asset } from "@/lib/utils";

type Item = { title: string; text: string };

const CATALOG_IMAGES = [
  "/images/tour-interactif.jpg",
  "/images/match-day-vip.jpg",
  "/images/saut-terrain.jpg",
  "/images/experiences-exclusives.jpg",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, namespace: "meta.koriginal", path: "/k-original" });
}

export default async function KOriginalPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("koriginal");

  const catalog = t.raw("catalog.items") as Item[];
  const experiences = t.raw("experiences.list") as string[];

  return (
    <>
      <PageHero
        size="tall"
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/images/saut-terrain.jpg"
        imageAlt={t("hero.title")}
      />

      {/* Clubs */}
      <section className="bg-black pt-24 text-white md:pt-32">
        <div className="shell text-center">
          <Reveal>
            <h2 className="text-balance text-3xl font-light tracking-tight md:text-5xl">
              {t("clubs.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-white/60">
              {t("clubs.text")}
            </p>
          </Reveal>
        </div>
        <div className="mt-16">
          <ClubsMarquee />
        </div>
      </section>

      {/* Catalogue */}
      <section className="bg-white py-24 md:py-32">
        <div className="shell">
          <SectionHeading
            eyebrow={t("catalog.eyebrow")}
            title={t("catalog.title")}
            align="center"
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {catalog.map((item, i) => (
              <Reveal
                key={item.title}
                delay={(i % 2) * 0.1}
                className="group relative overflow-hidden rounded-[var(--radius-lg)]"
              >
                <div className="relative aspect-[16/11]">
                  <Image
                    src={asset(CATALOG_IMAGES[i] ?? CATALOG_IMAGES[0]!)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                  <h3 className="text-2xl font-medium tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Expériences */}
      <section className="bg-paper py-24 md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionHeading title={t("experiences.title")} />
          <ul className="divide-y divide-line border-y border-line">
            {experiences.map((exp, i) => (
              <Reveal as="li" key={exp} delay={i * 0.06}>
                <div className="flex items-center gap-6 py-6">
                  <span className="text-sm font-medium tabular-nums text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xl font-light tracking-tight text-ink md:text-2xl">
                    {exp}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={t("hero.title")} buttonLabel={t("experiences.cta")} />
    </>
  );
}
