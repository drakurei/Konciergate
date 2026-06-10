"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeMeta, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ tone = "light" }: { tone?: "light" | "dark" }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function change(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      // Conserve le chemin courant, change uniquement la langue.
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={isPending}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors",
          tone === "light"
            ? "text-white/80 hover:text-white"
            : "text-ink/70 hover:text-ink",
        )}
      >
        <span aria-hidden>{localeMeta[locale].flag}</span>
        {locale}
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="opacity-60">
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-[var(--radius-md)] border border-line bg-white py-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
        >
          {locales.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                role="option"
                aria-selected={loc === locale}
                onClick={() => change(loc)}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors hover:bg-stone",
                  loc === locale ? "text-gold" : "text-ink",
                )}
              >
                <span aria-hidden className="text-base">
                  {localeMeta[loc].flag}
                </span>
                <span>{localeMeta[loc].native}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
