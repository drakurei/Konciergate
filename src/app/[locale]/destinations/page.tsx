import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/layout/CtaBand";
import { DestinationCard } from "@/features/destinations/DestinationCard";
import { cities } from "@/features/destinations/cities";

type City = { name: string; text: string };

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
  const items = t.raw("items") as City[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <section className="bg-black py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((slug, i) => (
              <Reveal key={slug} delay={(i % 3) * 0.08}>
                <DestinationCard
                  slug={slug}
                  index={i}
                  name={items[i]?.name ?? slug}
                  tagline={items[i]?.text ?? ""}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={t("hero.title")} buttonLabel={tc("contactUs")} />
    </>
  );
}
