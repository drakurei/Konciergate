/**
 * Flotte Konciergate — slugs (pages dédiées sous /receptif) et galeries.
 * L'ordre correspond à l'index de `vehicules.items` dans les messages i18n.
 */
export const fleet = [
  {
    slug: "mercedes-classe-v",
    images: [
      "/images/mercedes-classe-v.jpg",
      "/images/veh-classe-v-2.jpg",
      "/images/veh-classe-v-3.jpg",
    ],
  },
  {
    slug: "mercedes-sprinter-vip",
    images: [
      "/images/mercedes-sprinter.jpg",
      "/images/veh-sprinter-3.jpg",
      "/images/veh-sprinter-2.jpg",
    ],
  },
  {
    slug: "autocar",
    images: [
      "/images/mercedes-autocar.jpg",
      "/images/veh-autocar-3.jpg",
      "/images/veh-autocar-2.jpg",
    ],
  },
] as const;

export type FleetEntry = (typeof fleet)[number];

export function fleetIndexBySlug(slug: string): number {
  return fleet.findIndex((f) => f.slug === slug);
}
