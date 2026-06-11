import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, whatsappUrl } from "@/lib/site";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/features/contact/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, namespace: "meta.contact", path: "/contact" });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tc = await getTranslations("common");

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      postalCode: siteConfig.contact.address.postalCode,
      addressLocality: siteConfig.contact.address.city,
      addressCountry: siteConfig.contact.address.country,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "18:00",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <section className="bg-white py-24 md:py-32">
        <div className="shell grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          {/* Carte de contact premium */}
          <Reveal>
            <div className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
              <a
                href={whatsappUrl("Bonjour Konciergate, je souhaite vous contacter.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-ink px-7 py-6 text-white transition-colors hover:bg-gold"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.52 13.99c-.21.58-1.2 1.11-1.68 1.18-.43.06-.97.09-1.56-.1-.36-.11-.82-.26-1.41-.52-2.48-1.07-4.11-3.57-4.23-3.74-.12-.16-1.01-1.34-1.01-2.56 0-1.22.63-1.82.86-2.07.23-.25.49-.31.66-.31h.48c.15.01.36-.05.56.43.2.5.7 1.72.76 1.84.06.12.1.26.02.43-.08.16-.12.27-.25.41-.12.14-.26.32-.37.43-.12.13-.25.26-.11.51.15.25.64 1.06 1.38 1.72.94.84 1.74 1.11 1.99 1.23.25.13.4.11.54-.06.15-.16.63-.72.79-.97.17-.25.33-.21.56-.13.22.09 1.44.69 1.69.81.25.12.41.18.47.28.06.11.06.6-.15 1.18Z" />
                </svg>
                <span>
                  <span className="block text-[0.7rem] uppercase tracking-[0.2em] text-white/60">
                    {t("info.whatsappLabel")}
                  </span>
                  <span className="text-lg font-medium">{tc("reserveWhatsapp")}</span>
                </span>
              </a>

              <dl className="divide-y divide-line px-7">
                <div className="flex items-start gap-4 py-5">
                  <span className="mt-0.5 text-gold" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.5-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1l-2.1 2.3Z" /></svg>
                  </span>
                  <div>
                    <dt className="text-[0.7rem] uppercase tracking-[0.2em] text-muted">{t("info.phoneLabel")}</dt>
                    <dd>
                      <a href={siteConfig.contact.phoneHref} className="text-lg text-ink transition-colors hover:text-gold">
                        {siteConfig.contact.phone}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-5">
                  <span className="mt-0.5 text-gold" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M4 7l8 5 8-5" stroke="currentColor" strokeWidth="1.6" /></svg>
                  </span>
                  <div>
                    <dt className="text-[0.7rem] uppercase tracking-[0.2em] text-muted">{t("info.emailLabel")}</dt>
                    <dd>
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-lg text-ink transition-colors hover:text-gold">
                        {siteConfig.contact.email}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-5">
                  <span className="mt-0.5 text-gold" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" /></svg>
                  </span>
                  <div>
                    <dt className="text-[0.7rem] uppercase tracking-[0.2em] text-muted">{t("info.addressLabel")}</dt>
                    <dd className="leading-relaxed text-ink">
                      <a href={siteConfig.maps} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                        {siteConfig.contact.address.street}
                        <br />
                        {siteConfig.contact.address.postalCode} {siteConfig.contact.address.city}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="py-5">
                  <dt className="mb-2 text-[0.7rem] uppercase tracking-[0.2em] text-muted">{t("info.hoursLabel")}</dt>
                  <dd className="text-muted">
                    <div className="flex justify-between gap-8 py-1">
                      <span>{t("info.hoursWeekdays")}</span>
                      <span className="text-ink">{siteConfig.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between gap-8 py-1">
                      <span>{t("info.hoursWeekend")}</span>
                      <span>{siteConfig.hours.weekend}</span>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={0.1} className="rounded-[var(--radius-lg)] bg-stone p-8 md:p-12">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
