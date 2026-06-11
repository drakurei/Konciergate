import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { asset } from "@/lib/utils";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/layout/CtaBand";

type Country = { name: string; text: string };

/** Visuels par pays (ordre : France, Espagne, Italie, Royaume-Uni, Suisse). */
const DEST_IMAGES = [
  "/images/destination-france.jpg",
  "/images/destination-espagne.jpg",
  "/images/destination-italie.jpg",
  "/images/destination-uk.jpg",
  "/images/destination-suisse.jpg",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    namespace: "meta.destinations",
    path: "/destinations",
  });
}

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("destinations");
  const tc = await getTranslations("common");
  const countries = t.raw("items") as Country[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <section className="bg-black">
        {countries.map((c, i) => (
          <Reveal
            as="article"
            key={c.name}
            className="group relative flex h-[70svh] min-h-[440px] items-end overflow-hidden border-b border-line-dark"
          >
            <Image
              src={asset(DEST_IMAGES[i] ?? DEST_IMAGES[0]!)}
              alt={c.name}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-[2s] ease-[var(--ease-luxe)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
            <div className="shell relative z-10 flex w-full items-end justify-between pb-14">
              <div className="max-w-xl">
                <span className="text-sm font-medium tabular-nums text-gold-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-5xl font-semibold tracking-tight text-white md:text-7xl">
                  {c.name}
                </h2>
                <p className="mt-5 text-lg font-light text-white/75">{c.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <CtaBand title={t("hero.title")} buttonLabel={tc("contactUs")} />
    </>
  );
}
