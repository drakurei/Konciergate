"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { navRoutes, siteConfig } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const solid = scrolled || menuOpen;

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-500 ease-[var(--ease-luxe)]",
        solid
          ? "border-b border-line bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="shell flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          aria-label={siteConfig.name}
          className="relative z-10 flex items-center gap-2.5"
        >
          <Logo
            framed
            tone={solid ? "dark" : "light"}
            className="h-9 w-9 transition-colors md:h-10 md:w-10"
          />
          <span
            className={cn(
              "hidden text-sm font-medium uppercase tracking-[0.22em] transition-colors sm:block",
              solid ? "text-ink" : "text-white",
            )}
          >
            Konciergate
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navRoutes.map((route) => {
            const active = pathname === route.href;
            return (
              <li key={route.key}>
                <Link
                  href={route.href}
                  className={cn(
                    "relative text-sm tracking-tight transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300",
                    active ? "after:w-full" : "after:w-0 hover:after:w-full",
                    solid
                      ? active
                        ? "text-gold"
                        : "text-ink/80 hover:text-ink"
                      : active
                        ? "text-white"
                        : "text-white/80 hover:text-white",
                  )}
                >
                  {t(route.key)}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:block">
            <LanguageSwitcher tone={solid ? "dark" : "light"} />
          </div>

          <button
            type="button"
            aria-label={menuOpen ? tc("close") : tc("openMenu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-10 flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <span className="sr-only">{tc("menu")}</span>
            <div className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-px w-6 transition-all duration-300",
                  solid ? "bg-ink" : "bg-white",
                  menuOpen && "translate-y-[7px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-6 transition-all duration-300",
                  solid ? "bg-ink" : "bg-white",
                  menuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-px w-6 transition-all duration-300",
                  solid ? "bg-ink" : "bg-white",
                  menuOpen && "-translate-y-[7px] -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </nav>
    </header>

      {/* Menu mobile — rendu hors du <header> : son backdrop-filter créerait
          un bloc conteneur qui ferait collapser ce calque fixed. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 top-16 z-[90] bg-white lg:hidden"
          >
            <div className="shell flex h-full flex-col justify-between pb-12 pt-8">
              <ul className="flex flex-col gap-1">
                {navRoutes.map((route, i) => (
                  <motion.li
                    key={route.key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.5 }}
                  >
                    <Link
                      href={route.href}
                      className="block border-b border-line py-4 text-2xl font-light tracking-tight text-ink"
                    >
                      {t(route.key)}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <a
                  href={siteConfig.contact.phoneHref}
                  className="text-sm text-muted"
                >
                  {siteConfig.contact.phone}
                </a>
                <LanguageSwitcher tone="dark" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
