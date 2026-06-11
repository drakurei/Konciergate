import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaRow } from "@/components/ui/MediaRow";
import { TransportCarousel } from "@/features/receptif/TransportCarousel";
import { CtaBand } from "@/components/layout/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, namespace: "meta.receptif", path: "/receptif" });
}

export default async function ReceptifPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("receptif");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/images/mercedes-classe-v.jpg"
        imageAlt="Mercedes Classe V"
      />

      {/* Transport */}
      <section className="bg-white py-24 md:py-32">
        <div className="shell">
          <SectionHeading
            eyebrow={t("transport.eyebrow")}
            title={t("transport.title")}
            lead={t("transport.lead")}
          />
        </div>
        <div className="mt-16">
          <TransportCarousel />
        </div>
      </section>

      {/* Réservation */}
      <section className="bg-paper py-24 md:py-32">
        <div className="shell">
          <MediaRow
            eyebrow={t("reservation.eyebrow")}
            title={t("reservation.title")}
            text={t("reservation.text")}
            image="/images/receptif-reservation.jpg"
            imageAlt={t("reservation.title")}
          />
        </div>
      </section>

      {/* Billetterie */}
      <section className="bg-white py-24 md:py-32">
        <div className="shell">
          <MediaRow
            reverse
            eyebrow={t("billetterie.eyebrow")}
            title={t("billetterie.title")}
            text={t("billetterie.text")}
            image="/images/receptif-concierge.jpg"
            imageAlt={t("billetterie.title")}
          />
        </div>
      </section>

      <CtaBand
        title={t("destinationsTeaser.title")}
        text={t("destinationsTeaser.text")}
        buttonLabel={t("destinationsTeaser.cta")}
        href="/destinations"
      />
    </>
  );
}
