/**
 * Constantes globales de la marque Konciergate.
 * Source : maquettes du site actuel + coordonnées officielles.
 */
export const siteConfig = {
  name: "Konciergate",
  legalName: "Konciergate",
  tagline: "L'Europe comme vos clients la méritent.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://www.konciergate.com",
  founder: "Nicolas Dufau",
  founderRole: "Cofondateur",
  contact: {
    phone: "+33 6 74 14 66 49",
    phoneHref: "tel:+33674146649",
    email: "konciergate@gmail.com",
    address: {
      street: "79 avenue des Champs-Élysées, bureau 326",
      postalCode: "75008",
      city: "Paris",
      country: "FR",
    },
  },
  hours: {
    weekdays: "08:30 – 18:00",
    weekend: "Fermé",
  },
  social: {
    instagram: "https://www.instagram.com/konciergate",
    linkedin: "https://www.linkedin.com/company/konciergate",
  },
  whatsapp: {
    // Numéro officiel Konciergate (format wa.me : indicatif + numéro, sans + ni 0).
    number: "33674146649",
    display: "+33 6 74 14 66 49",
  },
  maps: "https://maps.google.com/?q=79+avenue+des+Champs-Élysées+75008+Paris",
} as const;

/** Construit un lien WhatsApp (avec message pré-rempli optionnel). */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Routes principales (les chemins sont localisés par next-intl). */
export const navRoutes = [
  { href: "/", key: "home" },
  { href: "/receptif", key: "receptif" },
  { href: "/evenements", key: "evenements" },
  { href: "/k-original", key: "koriginal" },
  { href: "/destinations", key: "destinations" },
  { href: "/a-propos", key: "apropos" },
  { href: "/contact", key: "contact" },
] as const;

export const legalRoutes = [
  { href: "/mentions-legales", key: "legal" },
  { href: "/politique-confidentialite", key: "privacy" },
] as const;
