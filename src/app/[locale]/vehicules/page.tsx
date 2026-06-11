import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/site";
import { asset } from "@/lib/utils";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/layout/CtaBand";

type Vehicle = {
  name: string;
  tagline: string;
  description: string;
  passengers: string;
  features: string[];
};

const VEHICLE_IMAGES = [
  "/images/mercedes-classe-v.jpg",
  "/images/mercedes-sprinter.jpg",
  "/images/mercedes-autocar.jpg",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, namespace: "meta.vehicules", path: "/vehicules" });
}

export default async function VehiculesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("vehicules");
  const tc = await getTranslations("common");
  const vehicles = t.raw("items") as Vehicle[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/images/mercedes-classe-v.jpg"
        imageAlt="Mercedes Classe V"
      />

      <section className="bg-white py-24 md:py-32">
        <div className="shell space-y-24 md:space-y-32">
          {vehicles.map((v, i) => {
            const reverse = i % 2 === 1;
            const reserveHref = whatsappUrl(
              `Bonjour Konciergate, je souhaite réserver la ${v.name}.`,
            );
            return (
              <div
                key={v.name}
                className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
              >
                <Reveal
                  className={`relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] ${reverse ? "md:order-2" : ""}`}
                >
                  <Image
                    src={asset(VEHICLE_IMAGES[i] ?? VEHICLE_IMAGES[0]!)}
                    alt={v.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] hover:scale-105"
                  />
                </Reveal>

                <div className={reverse ? "md:order-1" : ""}>
                  <Reveal>
                    <p className="text-eyebrow mb-4">{v.tagline}</p>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <h2 className="text-3xl font-medium tracking-tight text-ink md:text-4xl">
                      {v.name}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="mt-5 leading-relaxed text-muted">{v.description}</p>
                  </Reveal>

                  <Reveal delay={0.15}>
                    <div className="mt-8 flex items-baseline gap-3 border-y border-line py-4">
                      <span className="text-xs uppercase tracking-[0.2em] text-muted">
                        {t("capacityLabel")}
                      </span>
                      <span className="text-lg font-medium text-ink">
                        {v.passengers} {t("passengersUnit")}
                      </span>
                    </div>
                  </Reveal>

                  <Reveal delay={0.2}>
                    <p className="mt-6 text-xs uppercase tracking-[0.2em] text-gold">
                      {t("featuresLabel")}
                    </p>
                    <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {v.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-sm text-ink/80"
                        >
                          <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  <Reveal delay={0.25}>
                    <div className="mt-8">
                      <Button href={reserveHref} variant="primary" size="lg">
                        {t("reserve")}
                      </Button>
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CtaBand title={t("hero.title")} buttonLabel={tc("reserveWhatsapp")} />
    </>
  );
}
