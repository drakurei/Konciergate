import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ClubsMarquee } from "@/features/koriginal/ClubsMarquee";
import { KoExperience } from "@/features/koriginal/KoExperience";
import { KoFinale } from "@/features/koriginal/KoFinale";
import { CtaBand } from "@/components/layout/CtaBand";
import { whatsappUrl } from "@/lib/site";

/** Icônes des billets/expériences (ticket, guide officiel, immersif, match day). */
const EXPERIENCE_ICONS = [
  <svg key="ticket" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M4 8a2 2 0 0 0 2-2h12a2 2 0 0 0 2 2v2a2 2 0 1 0 0 4v2a2 2 0 0 0-2 2H6a2 2 0 0 0-2-2v-2a2 2 0 1 0 0-4V8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M14 7v2M14 11v2M14 15v2" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  <svg key="guide" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 20c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M17 4v9M17 4h4l-1.4 2L21 8h-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>,
  <svg key="vr" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-3.2a2 2 0 0 1-1.6-.8l-.9-1.2a1.6 1.6 0 0 0-2.6 0l-.9 1.2a2 2 0 0 1-1.6.8H5a2 2 0 0 1-2-2V9Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>,
  <svg key="matchday" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 16c0-4 4-7 9-7s9 3 9 7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 16h18M7 16v3M12 16v3M17 16v3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
];

type Item = { title: string; text: string };

const CATALOG_IMAGES = [
  "/images/ko-tour.jpg",
  "/images/ko-vip.jpg",
  "/images/ko-tunnel.jpg",
  "/images/ko-match.jpg",
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
  const tc = await getTranslations("common");

  const catalog = t.raw("catalog.items") as Item[];
  const experiences = t.raw("experiences.list") as string[];

  return (
    <>
      <PageHero
        size="tall"
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/images/ko-hero.jpg"
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
          <div className="mt-20 space-y-24 md:space-y-32">
            {catalog.map((item, i) => (
              <KoExperience
                key={item.title}
                index={i}
                image={CATALOG_IMAGES[i] ?? CATALOG_IMAGES[0]!}
                title={item.title}
                text={item.text}
                reverse={i % 2 === 1}
                reserveLabel={tc("reserve")}
                quoteLabel={tc("requestQuote")}
                reserveHref={whatsappUrl(
                  `Bonjour Konciergate, je souhaite réserver l'expérience « ${item.title} » (K.ORIGINAL).`,
                )}
                quoteHref={whatsappUrl(
                  `Bonjour Konciergate, je souhaite un devis pour l'expérience « ${item.title} » (K.ORIGINAL).`,
                )}
              />
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
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink">
                    {EXPERIENCE_ICONS[i] ?? EXPERIENCE_ICONS[0]}
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

      {/* Final signature — panorama stade + marque géante (fidèle à l'original) */}
      <KoFinale />
    </>
  );
}
