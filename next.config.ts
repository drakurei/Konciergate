import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Mode export statique activé UNIQUEMENT par GitHub Actions (GitHub Pages).
 * Sur Vercel / en local, cette variable est absente → app Next.js complète
 * (middleware multilingue, route API Resend, rendu dynamique).
 */
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

/**
 * Sous-chemin de déploiement. Par défaut "/Konciergate" (GitHub Pages).
 * Pour un export à la racine d'un domaine (hébergement classique) :
 * NEXT_PUBLIC_BASE_PATH="" lors du build.
 */
const repoBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/Konciergate";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // GitHub Pages ne peut pas optimiser les images à la volée.
    unoptimized: isStaticExport,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
  },
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        ...(repoBasePath
          ? { basePath: repoBasePath, assetPrefix: `${repoBasePath}/` }
          : {}),
      }
    : {}),
};

export default withNextIntl(nextConfig);
