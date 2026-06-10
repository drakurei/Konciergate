import { defineRouting } from "next-intl/routing";

export const locales = ["fr", "en", "es", "zh", "de", "it"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

/** Métadonnées d'affichage par langue (sélecteur, hreflang). */
export const localeMeta: Record<Locale, { label: string; native: string; flag: string }> = {
  fr: { label: "Français", native: "Français", flag: "🇫🇷" },
  en: { label: "English", native: "English", flag: "🇬🇧" },
  es: { label: "Español", native: "Español", flag: "🇪🇸" },
  zh: { label: "Chinese", native: "中文", flag: "🇨🇳" },
  de: { label: "German", native: "Deutsch", flag: "🇩🇪" },
  it: { label: "Italian", native: "Italiano", flag: "🇮🇹" },
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});
