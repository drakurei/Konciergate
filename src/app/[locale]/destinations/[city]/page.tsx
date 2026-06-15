import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { siteConfig, whatsappUrl } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { DestinationHero } from "@/features/destinations/DestinationHero";
import { cities, cityIndex } from "@/features/destinations/cities";

type City = { name: string; text: string };

export function generateStaticParams() {
  return cities.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; city: string }>;
}): Promise<Metadata> {
  const { locale, city } = await params;
  const idx = cityIndex(city);
  if (idx < 0) return {};
  const t = await getTranslations({ locale, namespace: "destinations" });
  const items = t.raw("items") as City[];
  const c = items[idx]!;
  return {
    title: `${c.name} — Konciergate`,
    description: c.text,
    alternates: {
      canonical: `${siteConfig.url}${locale === "fr" ? "" : `/${locale}`}/destinations/${city}`,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ locale: Locale; city: string }>;
}) {
  const { locale, city } = await params;
  const idx = cityIndex(city);
  if (idx < 0) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("destinations");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const items = t.raw("items") as City[];
  const c = items[idx]!;

  return (
    <>
      <DestinationHero
        slug={city}
        eyebrow={tn("destinations")}
        name={c.name}
        tagline={c.text}
      />

      <section className="bg-black py-24 text-white md:py-32">
        <div className="shell max-w-3xl text-center">
          <Reveal>
            <p className="text-balance text-2xl font-light leading-relaxed md:text-3xl">
              {c.text}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href={whatsappUrl(
                  `Bonjour Konciergate, je souhaite organiser une expérience à ${c.name}.`,
                )}
                variant="light"
                size="lg"
              >
                {tc("contactUs")}
              </Button>
              <Link
                href="/destinations"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                ← {tn("destinations")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
