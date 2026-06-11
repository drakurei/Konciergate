import { Reveal } from "@/components/ui/Reveal";

type Section = { heading: string; body: string };

type LegalLayoutProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  sections: Section[];
  updated?: string;
};

/**
 * Mise en page premium pour les pages légales — fond blanc, texte sombre,
 * largeur max 900px, typographie aérée (inspiration Apple).
 */
export function LegalLayout({
  eyebrow,
  title,
  intro,
  sections,
  updated,
}: LegalLayoutProps) {
  return (
    <section className="min-h-screen bg-white pb-32 pt-36 md:pt-44">
      <div className="mx-auto w-full max-w-[900px] px-6 md:px-8">
        <Reveal>
          <p className="text-eyebrow mb-5">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {updated && (
          <Reveal delay={0.08}>
            <p className="mt-5 text-sm text-muted">{updated}</p>
          </Reveal>
        )}
        {intro && (
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-ink/80">{intro}</p>
          </Reveal>
        )}

        <div className="mt-12 h-px w-full bg-line" />

        <div className="mt-12 space-y-14">
          {sections.map((s, i) => (
            <Reveal key={s.heading} delay={Math.min(i * 0.04, 0.2)}>
              <article>
                <h2 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
                  {s.heading}
                </h2>
                <p className="mt-4 text-lg leading-[1.8] text-ink/70">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
