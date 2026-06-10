import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

export function Manifesto() {
  const t = useTranslations("home.manifesto");
  return (
    <section className="bg-black py-28 text-white md:py-40">
      <div className="shell flex flex-col items-center text-center">
        <Reveal>
          <div className="rule-gold mb-12 h-px w-16" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-4xl text-balance text-3xl font-light leading-[1.15] tracking-tight md:text-5xl lg:text-6xl">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-10 max-w-2xl text-lg font-light leading-relaxed text-white/65 md:text-xl">
            {t("body")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
