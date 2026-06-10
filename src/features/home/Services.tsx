import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type ServiceItem = { title: string; text: string };

export function Services() {
  const t = useTranslations("home.services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section className="bg-white py-24 md:py-36">
      <div className="shell">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              className="group flex flex-col bg-white p-8 transition-colors duration-500 hover:bg-stone md:p-10"
            >
              <span className="text-sm font-medium tabular-nums text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-auto pt-16">
                <h3 className="text-xl font-medium tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
