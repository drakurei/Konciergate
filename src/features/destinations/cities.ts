/**
 * Destinations Konciergate (international). L'ordre correspond à l'index de
 * `destinations.items` dans les messages i18n (nom + tagline).
 * Pour ajouter une ville : déposer la vidéo dans public/videos/destinations/,
 * ajouter le slug ici et l'entrée i18n correspondante.
 */
export const cities = [
  "paris",
  "madrid",
  "milan",
  "londres",
  "geneve",
  "dubai",
] as const;

export type CitySlug = (typeof cities)[number];

export function cityIndex(slug: string): number {
  return (cities as readonly string[]).indexOf(slug);
}

export const cityVideo = (slug: string) => `/videos/destinations/${slug}.mp4`;
export const cityPoster = (slug: string) => `/videos/destinations/${slug}.jpg`;
