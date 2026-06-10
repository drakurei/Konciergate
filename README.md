# Konciergate — Site officiel

Site premium « luxe discret européen » — réceptif, événements et expériences football **K.ORIGINAL**.
Inspirations : Apple · Aman · Rolex · Four Seasons · Bentley.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript strict**
- **Tailwind CSS 4** (config CSS-first)
- **GSAP** · **Framer Motion** · **Lenis** (smooth scroll premium)
- **next-intl** — 6 langues : FR · EN · ES · ZH · DE · IT (détection auto, conservation du chemin)
- **React Hook Form** + **Zod** — formulaire de contact validé
- **Embla Carousel** — carrousel véhicules
- **Resend** — envoi des e-mails de contact
- **SEO** — Metadata API native (Open Graph, Twitter Cards, JSON-LD, hreflang, sitemap, robots)

## Démarrage

```bash
npm install
npm run dev
```

→ http://localhost:3000

### Scripts

| Commande | Rôle |
|----------|------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |

## Variables d'environnement

Copier `.env.example` → `.env.local` et renseigner :

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | URL canonique (SEO, sitemap, OG) |
| `RESEND_API_KEY` | Clé API Resend (formulaire de contact) |
| `CONTACT_FROM_EMAIL` | Expéditeur vérifié dans Resend |
| `CONTACT_TO_EMAIL` | Destinataire des demandes |

> Sans `RESEND_API_KEY`, le formulaire fonctionne en mode dev (journalisation serveur, aucun e-mail réel).

## Architecture

```
src/
├── app/[locale]/        Pages (accueil, réceptif, événements, k-original,
│                        destinations, à propos, contact, mentions, confidentialité)
├── app/api/contact/     Route API Resend
├── components/
│   ├── layout/          Navbar, Footer, PageHero, CtaBand, LanguageSwitcher
│   ├── providers/       SmoothScroll (Lenis), IntroScreen
│   └── ui/              Logo, Button, Reveal, SectionHeading, MediaRow
├── features/            Sections par page (home, receptif, koriginal, contact…)
├── i18n/                Configuration next-intl (routing, navigation, request)
├── lib/                 site, seo, validation, utils
├── services/            Appels API côté client
└── types/
messages/                fr.json · en.json · es.json · zh.json · de.json · it.json
public/
├── brand/               Logo source
└── images/              Visuels (Mercedes, clubs, expériences…)
```

## Assets à fournir (placeholders prêts)

- `public/video/hero.mp4` + `public/video/hero-poster.jpg` → vidéo plein écran de l'accueil (structure `<video>` déjà en place dans `Hero.tsx`).
- `public/images/destination-*.jpg` → grandes images immersives des destinations.

## Déploiement Vercel

1. Importer le dépôt dans Vercel (framework détecté automatiquement).
2. Renseigner les variables d'environnement.
3. Deploy. Aucune configuration supplémentaire requise.

## Identité

- **Logo** : monogramme « K. » (recréé en SVG vectoriel, point doré). Favicon, apple-touch-icon, OG image et icône PWA générés dynamiquement.
- **Couleurs** : `#FFFFFF` · `#000000` · texte `#1D1D1F` / `#6E6E73` · or `#B8925A` / `#D4A96A`.
- **Typographie** : SF Pro Display (police système Apple) + fallbacks.

---

© 2025 Konciergate. Tous droits réservés.
