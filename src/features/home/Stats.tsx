import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

type Stat = { value: string; label: string };

export function Stats() {
  const t = useTranslations("home.stats");
  const items = t.raw("items") as Stat[];

  return (
    <section className="border-y border-line bg-paper py-24 md:py-32">
      <div className="shell">
        <Reveal className="mb-16 text-center">
          <p className="text-eyebrow mb-3">{t("eyebrow")}</p>
          <h2 className="text-3xl font-light tracking-tight text-ink md:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-y-14 lg:grid-cols-4">
          {items.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.1}
              className="flex flex-col items-center text-center"
            >
              <span className="bg-gradient-to-b from-ink to-ink/70 bg-clip-text text-5xl font-semibold tracking-tight text-transparent md:text-7xl">
                {stat.value}
              </span>
              <span className="mt-3 text-xs uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
