import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { siteConfig, whatsappUrl } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { VehicleGallery } from "@/features/receptif/VehicleGallery";
import { fleet, fleetIndexBySlug } from "@/features/receptif/fleet";

type Vehicle = {
  name: string;
  tagline: string;
  description: string;
  passengers: string;
  features: string[];
};

export function generateStaticParams() {
  return fleet.map((f) => ({ vehicle: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; vehicle: string }>;
}): Promise<Metadata> {
  const { locale, vehicle } = await params;
  const idx = fleetIndexBySlug(vehicle);
  if (idx < 0) return {};
  const t = await getTranslations({ locale, namespace: "vehicules" });
  const items = t.raw("items") as Vehicle[];
  const v = items[idx]!;
  return {
    title: `${v.name} — Konciergate`,
    description: v.description,
    alternates: {
      canonical: `${siteConfig.url}${locale === "fr" ? "" : `/${locale}`}/receptif/${vehicle}`,
    },
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; vehicle: string }>;
}) {
  const { locale, vehicle } = await params;
  const idx = fleetIndexBySlug(vehicle);
  if (idx < 0) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("vehicules");
  const tc = await getTranslations("common");
  const items = t.raw("items") as Vehicle[];
  const subtitles = t.raw("subtitles") as string[];
  const v = items[idx]!;
  const images = [...fleet[idx]!.images];

  const reserveHref = whatsappUrl(
    `Bonjour Konciergate, je souhaite réserver la ${v.name}.`,
  );
  const quoteHref = whatsappUrl(
    `Bonjour Konciergate, je souhaite un devis pour la ${v.name}.`,
  );

  return (
    <>
      <PageHero
        size="tall"
        eyebrow={v.tagline}
        title={v.name}
        subtitle={subtitles[idx]}
        image={images[0]!}
        imageAlt={v.name}
      />

      <div className="bg-black">
        <div className="shell">
          <Reveal className="pt-10">
            <Link
              href="/receptif"
              className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {t("backToReceptif")}
            </Link>
          </Reveal>
        </div>

        {/* Présentation + caractéristiques */}
        <section className="py-20 md:py-28">
          <div className="shell grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="text-eyebrow mb-4">{t("presentationLabel")}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-3xl font-light leading-snug text-white md:text-4xl">
                  {v.name}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-lg leading-relaxed text-white/65">
                  {v.description}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 inline-flex items-baseline gap-3 border-y border-line-dark py-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                    {t("capacityLabel")}
                  </span>
                  <span className="text-lg font-medium text-white">{v.passengers}</span>
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <p className="text-eyebrow mb-5">{t("featuresLabel")}</p>
              </Reveal>
              <ul className="space-y-3">
                {v.features.map((f, i) => (
                  <Reveal as="li" key={f} delay={i * 0.05}>
                    <div className="flex items-center gap-3 border-b border-line-dark py-3 text-white/80">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                      {f}
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Galerie */}
        <section className="border-t border-line-dark py-20 md:py-28">
          <div className="shell">
            <Reveal>
              <p className="text-eyebrow mb-8">{t("galleryLabel")}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <VehicleGallery images={images} alt={v.name} />
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-line-dark py-24 text-center md:py-32">
          <div className="shell flex flex-col items-center">
            <Reveal>
              <h2 className="max-w-2xl text-balance text-3xl font-light tracking-tight text-white md:text-4xl">
                {v.name}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <Button href={reserveHref} variant="light" size="lg">
                  {t("reserve")}
                </Button>
                <Button href={quoteHref} variant="light" size="lg">
                  {tc("requestQuote")}
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
