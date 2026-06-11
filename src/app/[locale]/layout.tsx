import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { asset } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { LuxuryIntro } from "@/components/intro/LuxuryIntro";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const base = await buildMetadata({ locale, namespace: "meta.home" });
  return {
    metadataBase: new URL(siteConfig.url),
    ...base,
    title: {
      default: "Konciergate — L'Europe comme vos clients la méritent",
      template: "%s",
    },
    icons: {
      icon: [{ url: asset("/icon.svg"), type: "image/svg+xml" }],
      apple: [{ url: asset("/apple-icon") }],
    },
    manifest: asset("/manifest.webmanifest"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const tCommon = await getTranslations("common");

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    founder: { "@type": "Person", name: siteConfig.founder },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      contactType: "customer service",
      areaServed: ["FR", "ES", "IT", "GB", "CH"],
      availableLanguage: ["fr", "en", "es", "zh", "de", "it"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      postalCode: siteConfig.contact.address.postalCode,
      addressLocality: siteConfig.contact.address.city,
      addressCountry: siteConfig.contact.address.country,
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-white"
          >
            {tCommon("skipToContent")}
          </a>
          <LuxuryIntro />
          <SmoothScroll>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
