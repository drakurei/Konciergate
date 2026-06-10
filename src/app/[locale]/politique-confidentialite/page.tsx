import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/ui/Reveal";

type Section = { heading: string; body: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    namespace: "meta.privacy",
    path: "/politique-confidentialite",
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const sections = t.raw("sections") as Section[];

  return (
    <section className="bg-white pb-28 pt-36 md:pt-44">
      <div className="shell max-w-3xl">
        <Reveal>
          <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            {t("title")}
          </h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 text-lg leading-relaxed text-muted">{t("intro")}</p>
        </Reveal>
        <div className="mt-14 space-y-12">
          {sections.map((s, i) => (
            <Reveal key={s.heading} delay={i * 0.04}>
              <h2 className="text-xl font-medium tracking-tight text-ink">
                {s.heading}
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
