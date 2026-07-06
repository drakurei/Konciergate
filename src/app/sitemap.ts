import type { MetadataRoute } from "next";
import { siteConfig, navRoutes, legalRoutes } from "@/lib/site";
import { locales } from "@/i18n/routing";
import { fleet } from "@/features/receptif/fleet";
import { cities } from "@/features/destinations/cities";

export const dynamic = "force-static";

const paths = [
  ...navRoutes.map((r) => r.href),
  ...legalRoutes.map((r) => r.href),
  // Pages dédiées (véhicules + destinations)
  ...fleet.map((f) => `/receptif/${f.slug}`),
  ...cities.map((c) => `/destinations/${c}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const build = (loc: string, path: string) =>
    `${siteConfig.url}${loc === "fr" ? "" : `/${loc}`}${path === "/" ? "" : path}`;

  return paths.flatMap((path) =>
    locales.map((loc) => ({
      url: build(loc, path),
      lastModified: new Date("2026-06-16"),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, build(l, path)])),
      },
    })),
  );
}
