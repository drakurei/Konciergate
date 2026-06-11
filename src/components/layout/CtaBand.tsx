import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { whatsappUrl } from "@/lib/site";

type CtaBandProps = {
  title: string;
  text?: string;
  buttonLabel: string;
  href?: string;
};

export function CtaBand({
  title,
  text,
  buttonLabel,
  href = whatsappUrl("Bonjour Konciergate, je souhaite obtenir des informations."),
}: CtaBandProps) {
  return (
    <section className="bg-black py-24 text-white md:py-32">
      <div className="shell flex flex-col items-center text-center">
        <Reveal>
          <h2 className="max-w-2xl text-balance text-3xl font-light tracking-tight md:text-5xl">
            {title}
          </h2>
        </Reveal>
        {text && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg font-light text-white/65">{text}</p>
          </Reveal>
        )}
        <Reveal delay={0.18}>
          <div className="mt-10">
            <Button href={href} variant="light" size="lg">
              {buttonLabel}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
