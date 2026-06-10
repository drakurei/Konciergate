"use client";

const CLUBS = [
  "Real Madrid",
  "FC Barcelona",
  "Atlético Madrid",
  "Real Sociedad",
  "Athletic Bilbao",
  "Girona FC",
  "Valencia CF",
  "RCD Mallorca",
];

/** Bandeau défilant infini des clubs partenaires. */
export function ClubsMarquee() {
  const row = [...CLUBS, ...CLUBS];
  return (
    <div className="group relative flex overflow-hidden border-y border-line-dark bg-black py-8">
      <div className="kg-marquee flex shrink-0 items-center gap-12 pr-12">
        {row.map((club, i) => (
          <span key={`${club}-${i}`} className="flex items-center gap-12">
            <span className="whitespace-nowrap text-xl font-light tracking-tight text-white/55 transition-colors md:text-2xl">
              {club}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
          </span>
        ))}
      </div>
      <div
        className="kg-marquee flex shrink-0 items-center gap-12 pr-12"
        aria-hidden
      >
        {row.map((club, i) => (
          <span key={`dup-${club}-${i}`} className="flex items-center gap-12">
            <span className="whitespace-nowrap text-xl font-light tracking-tight text-white/55 md:text-2xl">
              {club}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
