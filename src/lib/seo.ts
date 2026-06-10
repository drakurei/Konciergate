import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "./site";
import { locales, type Locale } from "@/i18n/routing";

/**
 * Construit l'objet Metadata d'une page avec Open Graph, Twitter Cards,
 * canonical et alternates hreflang. (Metadata API native — recommandée
 * par Next.js App Router, supérieure à next-seo dans ce contexte.)
 */
export async function buildMetadata({
  locale,
  namespace,
  path = "",
}: {
  locale: Locale;
  namespace: string;
  /** Chemin relatif sans locale, ex: "/k-original". "" = accueil. */
  path?: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const title = t("title");
  const description = t("description");

  const buildUrl = (loc: Locale) =>
    `${siteConfig.url}${loc === "fr" ? "" : `/${loc}`}${path}`;

  const canonical = buildUrl(locale);

  const languages: Record<string, string> = {};
  for (const loc of locales) languages[loc] = buildUrl(loc);
  languages["x-default"] = buildUrl("fr");

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      locale,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
