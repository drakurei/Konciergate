import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navRoutes, legalRoutes, siteConfig, whatsappUrl } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const tLegal = useTranslations("legal");
  const tPrivacy = useTranslations("privacy");
  const legalLabels: Record<string, string> = {
    legal: tLegal("title"),
    privacy: tPrivacy("title"),
  };
  const year = 2025;

  return (
    <footer className="border-t border-line-dark bg-black text-white">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Marque */}
          <div className="max-w-xs">
            <Link href="/" aria-label={siteConfig.name} className="inline-flex">
              <Logo framed tone="light" className="h-12 w-12" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-white/55">
              {tf("tagline")}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label={tf("navTitle")}>
            <h2 className="text-eyebrow mb-5 text-white/40">{tf("navTitle")}</h2>
            <ul className="space-y-3">
              {navRoutes.map((route) => (
                <li key={route.key}>
                  <Link
                    href={route.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {t(route.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-eyebrow mb-5 text-white/40">{tf("contactTitle")}</h2>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href={siteConfig.contact.phoneHref} className="transition-colors hover:text-gold">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-gold"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="text-white/55">
                {siteConfig.contact.address.street}
                <br />
                {siteConfig.contact.address.postalCode} {siteConfig.contact.address.city}
              </li>
            </ul>
          </div>

          {/* Légal + social */}
          <div>
            <h2 className="text-eyebrow mb-5 text-white/40">{tf("legalTitle")}</h2>
            <ul className="space-y-3">
              {legalRoutes.map((route) => (
                <li key={route.key}>
                  <Link
                    href={route.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {legalLabels[route.key]}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-4">
              <a
                href={siteConfig.social.instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-gold"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
              </a>
              <a
                href={siteConfig.social.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-gold"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C21.4 8.65 22 11 22 14.3V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4z" />
                </svg>
              </a>
              <a
                href={whatsappUrl("Bonjour Konciergate, je souhaite vous contacter.")}
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-gold"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.52 13.99c-.21.58-1.2 1.11-1.68 1.18-.43.06-.97.09-1.56-.1-.36-.11-.82-.26-1.41-.52-2.48-1.07-4.11-3.57-4.23-3.74-.12-.16-1.01-1.34-1.01-2.56 0-1.22.63-1.82.86-2.07.23-.25.49-.31.66-.31h.48c.15.01.36-.05.56.43.2.5.7 1.72.76 1.84.06.12.1.26.02.43-.08.16-.12.27-.25.41-.12.14-.26.32-.37.43-.12.13-.25.26-.11.51.15.25.64 1.06 1.38 1.72.94.84 1.74 1.11 1.99 1.23.25.13.4.11.54-.06.15-.16.63-.72.79-.97.17-.25.33-.21.56-.13.22.09 1.44.69 1.69.81.25.12.41.18.47.28.06.11.06.6-.15 1.18Z" />
                </svg>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                aria-label={siteConfig.contact.email}
                className="text-white/60 transition-colors hover:text-gold"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M4 7l8 5 8-5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </a>
              <a
                href={siteConfig.contact.phoneHref}
                aria-label={siteConfig.contact.phone}
                className="text-white/60 transition-colors hover:text-gold"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.5-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1l-2.1 2.3Z" />
                </svg>
              </a>
              <a
                href={siteConfig.maps}
                aria-label={siteConfig.contact.address.city}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-gold"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-line-dark pt-8 text-xs text-white/40 md:flex-row">
          <p>
            © {year} {siteConfig.name}. {tf("rights")}
          </p>
          <p>{tf("madeIn")}</p>
        </div>
      </div>
    </footer>
  );
}
