import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { asset, cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Image de fond optionnelle (sinon dégradé). */
  image?: string;
  imageAlt?: string;
  /** Hauteur du hero. */
  size?: "default" | "tall";
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "",
  size = "default",
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex items-end overflow-hidden bg-black",
        size === "tall" ? "h-[88svh] min-h-[600px]" : "h-[70svh] min-h-[460px]",
      )}
    >
      {image ? (
        <Image
          src={asset(image)}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="hero-gradient absolute inset-0" />
      )}
      <div className="scrim absolute inset-0" />

      <div className="shell relative z-10 pb-16 md:pb-24">
        <Reveal>
          <p className="text-eyebrow mb-5 text-gold-light">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg font-light text-white/80 md:text-xl">
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
