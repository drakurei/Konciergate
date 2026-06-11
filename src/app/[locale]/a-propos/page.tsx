import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Logo } from "@/components/ui/Logo";
import { CtaBand } from "@/components/layout/CtaBand";

type Value = { title: string; text: string };

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
  const tc = await getTranslations("common");
  const values = t.raw("values.items") as Value[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/images/apropos-hero.jpg"
        imageAlt={t("hero.title")}
      />

      {/* Histoire */}
      <section className="bg-white py-24 md:py-36">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <Logo framed tone="dark" className="h-20 w-20" />
          </Reveal>
          <div className="space-y-8">
            <Reveal>
              <p className="text-balance text-2xl font-light leading-relaxed text-ink md:text-3xl">
                {t("story.p1")}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-muted">{t("story.p2")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Citation fondateur */}
      <section className="bg-black py-28 text-white md:py-40">
        <div className="shell">
          <Reveal>
            <div className="rule-gold mb-12 h-px w-16" />
          </Reveal>
          <Reveal delay={0.05}>
            <blockquote className="max-w-4xl text-balance text-3xl font-light leading-[1.2] tracking-tight md:text-5xl">
              “{t("quote.text")}”
            </blockquote>
          </Reveal>
          <Reveal delay={0.15}>
            <footer className="mt-10">
              <p className="text-lg font-medium text-white">{t("quote.author")}</p>
              <p className="text-sm uppercase tracking-[0.2em] text-gold-light">
                {t("quote.role")}
              </p>
            </footer>
          </Reveal>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-paper py-24 md:py-32">
        <div className="shell">
          <SectionHeading title={t("values.title")} align="center" />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.1}
                className="rounded-[var(--radius-lg)] border border-line bg-white p-10 text-center"
              >
                <h3 className="text-xl font-medium tracking-tight text-ink">
                  {v.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={t("hero.title")} buttonLabel={tc("contactUs")} />
    </>
  );
}
