import Image from "next/image";
import { Reveal } from "./Reveal";
import { asset, cn } from "@/lib/utils";

type MediaRowProps = {
  eyebrow?: string;
  title: string;
  text: string;
  image: string;
  imageAlt?: string;
  reverse?: boolean;
  tone?: "light" | "dark";
};

export function MediaRow({
  eyebrow,
  title,
  text,
  image,
  imageAlt = "",
  reverse = false,
  tone = "light",
}: MediaRowProps) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <Reveal
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)]",
          reverse && "md:order-2",
        )}
      >
        <Image
          src={asset(image)}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] hover:scale-105"
        />
      </Reveal>

      <div className={cn(reverse && "md:order-1")}>
        {eyebrow && (
          <Reveal>
            <p className="text-eyebrow mb-4">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h2
            className={cn(
              "text-balance text-3xl font-medium tracking-tight md:text-4xl",
              tone === "light" ? "text-ink" : "text-white",
            )}
          >
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-5 text-lg leading-relaxed",
              tone === "light" ? "text-muted" : "text-white/65",
            )}
          >
            {text}
          </p>
        </Reveal>
      </div>
    </div>
  );
}
