import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/layout/CtaBand";

type Item = { title: string; text: string };
type Testimonial = { quote: string; author: string; role: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, namespace: "meta.evenements", path: "/evenements" });
}

export default async function EvenementsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("evenements");

  const categories = t.raw("categories.items") as Item[];
  const advantages = t.raw("advantages.items") as Item[];
  const testimonials = t.raw("testimonials.items") as Testimonial[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/images/match-day-vip.jpg"
        imageAlt={t("hero.title")}
      />

      {/* Intro */}
      <section className="bg-black py-28 text-white md:py-36">
        <div className="shell text-center">
          <Reveal>
            <div className="rule-gold mx-auto mb-10 h-px w-16" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto max-w-3xl text-balance text-3xl font-light leading-tight md:text-5xl">
              {t("intro.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-8 max-w-2xl text-lg font-light text-white/65">
              {t("intro.text")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Catégories */}
      <section className="bg-white py-24 md:py-32">
        <div className="shell">
          <SectionHeading title={t("categories.title")} align="center" />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 0.1}
                className="rounded-[var(--radius-lg)] border border-line p-10 transition-colors duration-500 hover:border-gold/40"
              >
                <span className="text-eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-2xl font-medium tracking-tight text-ink">
                  {c.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="bg-paper py-24 md:py-32">
        <div className="shell">
          <SectionHeading title={t("advantages.title")} align="center" />
          <div className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a, i) => (
              <Reveal
                key={a.title}
                delay={i * 0.08}
                className="bg-paper p-8 md:p-10"
              >
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <span className="text-sm font-medium tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-medium tracking-tight text-ink">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="bg-white py-24 md:py-32">
        <div className="shell">
          <SectionHeading title={t("testimonials.title")} align="center" />
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {testimonials.map((item, i) => (
              <Reveal
                key={item.author}
                delay={i * 0.1}
                className="flex flex-col rounded-[var(--radius-lg)] bg-stone p-10"
              >
                <div className="mb-6 text-gold" aria-hidden>
                  ★★★★★
                </div>
                <blockquote className="flex-1 text-lg font-light leading-relaxed text-ink">
                  “{item.quote}”
                </blockquote>
                <footer className="mt-8 border-t border-line pt-5">
                  <p className="font-medium text-ink">{item.author}</p>
                  <p className="text-sm text-muted">{item.role}</p>
                </footer>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={t("cta.title")} buttonLabel={t("cta.button")} />
    </>
  );
}
