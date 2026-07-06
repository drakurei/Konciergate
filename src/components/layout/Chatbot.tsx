"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { whatsappUrl } from "@/lib/site";

type QA = { q: string; a: string; href?: string };

type Message = { from: "bot" | "user"; text: string; href?: string };

/**
 * Assistant Konciergate — chatbot guidé (sans backend, compatible export
 * statique) : questions rapides → réponses scriptées, avec bascule WhatsApp
 * pour toute demande réelle. Style premium noir & blanc.
 */
export function Chatbot() {
  const t = useTranslations("chatbot");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  const questions = t.raw("questions") as QA[];
  const routes = ["/receptif", "/k-original", "/destinations", "/evenements", "/contact"];

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ from: "bot", text: t("intro") }]);
    }
  }, [open, messages.length, t]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function ask(qa: QA, i: number) {
    setMessages((m) => [
      ...m,
      { from: "user", text: qa.q },
      { from: "bot", text: qa.a, href: routes[i] },
    ]);
  }

  return (
    <>
      {/* Bouton flottant (gauche — WhatsApp occupe la droite) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("close") : t("open")}
        aria-expanded={open}
        className="fixed bottom-6 left-6 z-[150] flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#1d1d1f] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-500 ease-[var(--ease-luxe)] hover:scale-105 hover:bg-white hover:text-ink md:bottom-8 md:left-8"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M21 12a8 8 0 0 1-8 8H4l1.6-3.2A8 8 0 1 1 21 12Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="12" r="1" fill="currentColor" />
            <circle cx="13" cy="12" r="1" fill="currentColor" />
            <circle cx="17" cy="12" r="1" fill="currentColor" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 left-4 z-[150] flex max-h-[70svh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white shadow-[0_30px_80px_rgba(0,0,0,0.3)] md:bottom-28 md:left-8"
            role="dialog"
            aria-label={t("title")}
          >
            {/* En-tête */}
            <div className="flex items-center gap-3 border-b border-line bg-ink px-5 py-4 text-white">
              <span className="flex h-8 w-8 items-center justify-center border border-white/40 text-sm font-medium">
                K.
              </span>
              <div>
                <p className="text-sm font-medium">{t("title")}</p>
                <p className="text-[0.7rem] uppercase tracking-[0.14em] text-white/60">
                  {t("subtitle")}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={m.from === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={
                      m.from === "user"
                        ? "max-w-[85%] rounded-[14px] rounded-br-[4px] bg-ink px-4 py-2.5 text-sm text-white"
                        : "max-w-[85%] rounded-[14px] rounded-bl-[4px] bg-stone px-4 py-2.5 text-sm leading-relaxed text-ink"
                    }
                  >
                    {m.text}
                    {m.from === "bot" && m.href && (
                      <Link
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        href={m.href as any}
                        className="mt-2 block text-xs font-medium underline underline-offset-4 hover:text-muted"
                      >
                        {t("learnMore")} →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Questions rapides */}
            <div className="border-t border-line px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {questions.map((qa, i) => (
                  <button
                    key={qa.q}
                    type="button"
                    onClick={() => ask(qa, i)}
                    className="rounded-full border border-line px-3.5 py-1.5 text-xs text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                  >
                    {qa.q}
                  </button>
                ))}
              </div>
              <a
                href={whatsappUrl(t("whatsappMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-sm font-medium text-white transition-colors hover:bg-black"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z" />
                </svg>
                {t("whatsapp")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
