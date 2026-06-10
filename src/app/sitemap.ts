import type { MetadataRoute } from "next";
import { siteConfig, navRoutes, legalRoutes } from "@/lib/site";
import { locales } from "@/i18n/routing";

const paths = [
  ...navRoutes.map((r) => r.href),
  ...legalRoutes.map((r) => r.href),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const build = (loc: string, path: string) =>
    `${siteConfig.url}${loc === "fr" ? "" : `/${loc}`}${path === "/" ? "" : path}`;

  return paths.flatMap((path) =>
    locales.map((loc) => ({
      url: build(loc, path),
      lastModified: new Date("2025-01-01"),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, build(l, path)]),
        ),
      },
    })),
  );
}
