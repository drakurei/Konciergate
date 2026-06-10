import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navRoutes, legalRoutes, siteConfig } from "@/lib/site";
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
