import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Mode export statique activé UNIQUEMENT par GitHub Actions (GitHub Pages).
 * Sur Vercel / en local, cette variable est absente → app Next.js complète
 * (middleware multilingue, route API Resend, rendu dynamique).
 */
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

/** Nom du dépôt = sous-chemin GitHub Pages (drakurei.github.io/Konciergate). */
const repoBasePath = "/Konciergate";

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
        basePath: repoBasePath,
        assetPrefix: `${repoBasePath}/`,
        trailingSlash: true,
      }
    : {}),
};

export default withNextIntl(nextConfig);
