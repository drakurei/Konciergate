"use client";

import { asset } from "@/lib/utils";

/** Clubs partenaires — logos officiels + nom. */
const CLUBS = [
  { name: "PSG", file: "psg.svg" },
  { name: "Real Madrid", file: "real-madrid.svg" },
  { name: "FC Barcelona", file: "barcelona.png" },
  { name: "Manchester City", file: "man-city.png" },
  { name: "Bayern Munich", file: "bayern.png" },
  { name: "AC Milan", file: "ac-milan.png" },
  { name: "Inter Milan", file: "inter.png" },
  { name: "Arsenal", file: "arsenal.png" },
  { name: "Liverpool", file: "liverpool.svg" },
  { name: "Chelsea", file: "chelsea.svg" },
];

function ClubCard({ name, file }: { name: string; file: string }) {
  return (
    <div className="group/card flex w-36 shrink-0 flex-col items-center rounded-[var(--radius-md)] border border-white/10 bg-white/[0.04] px-6 py-7 transition-all duration-500 ease-[var(--ease-luxe)] hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.08] md:w-40">
      <div className="flex h-16 w-16 items-center justify-center md:h-20 md:w-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(`/images/clubs/${file}`)}
          alt={name}
          className="max-h-full max-w-full object-contain opacity-90 transition-opacity duration-500 group-hover/card:opacity-100"
          loading="lazy"
        />
      </div>
      <span className="mt-5 text-center text-[0.7rem] uppercase tracking-[0.16em] text-white/65 transition-colors duration-500 group-hover/card:text-white">
        {name}
      </span>
    </div>
  );
}

/** Bandeau défilant infini des clubs partenaires (pause au survol). */
export function ClubsMarquee() {
  const row = [...CLUBS, ...CLUBS];
  return (
    <div className="group relative flex overflow-hidden">
      <div className="kg-marquee flex shrink-0 items-stretch gap-5 pr-5">
        {row.map((c, i) => (
          <ClubCard key={`a-${c.name}-${i}`} name={c.name} file={c.file} />
        ))}
      </div>
      <div className="kg-marquee flex shrink-0 items-stretch gap-5 pr-5" aria-hidden>
        {row.map((c, i) => (
          <ClubCard key={`b-${c.name}-${i}`} name={c.name} file={c.file} />
        ))}
      </div>
    </div>
  );
}
