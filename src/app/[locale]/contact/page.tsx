import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
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
          {/* Coordonnées */}
          <div>
            <Reveal>
              <dl className="space-y-10">
                <div>
                  <dt className="text-eyebrow mb-2">{t("info.phoneLabel")}</dt>
                  <dd>
                    <a
                      href={siteConfig.contact.phoneHref}
                      className="text-xl text-ink transition-colors hover:text-gold"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-eyebrow mb-2">{t("info.emailLabel")}</dt>
                  <dd>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-xl text-ink transition-colors hover:text-gold"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-eyebrow mb-2">{t("info.addressLabel")}</dt>
                  <dd className="text-lg leading-relaxed text-muted">
                    {siteConfig.contact.address.street}
                    <br />
                    {siteConfig.contact.address.postalCode}{" "}
                    {siteConfig.contact.address.city}
                  </dd>
                </div>
                <div>
                  <dt className="text-eyebrow mb-2">{t("info.hoursLabel")}</dt>
                  <dd className="text-lg text-muted">
                    <div className="flex justify-between gap-8 border-b border-line py-2">
                      <span>{t("info.hoursWeekdays")}</span>
                      <span className="text-ink">{siteConfig.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between gap-8 py-2">
                      <span>{t("info.hoursWeekend")}</span>
                      <span>{siteConfig.hours.weekend}</span>
                    </div>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Formulaire */}
          <Reveal delay={0.1} className="rounded-[var(--radius-lg)] bg-stone p-8 md:p-12">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
