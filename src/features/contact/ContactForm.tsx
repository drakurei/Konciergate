"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { sendContact } from "@/services/contact";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Sur GitHub Pages (export statique), aucune route API → on passe par mailto. */
const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");

  // Schéma avec messages traduits.
  const schema = z.object({
    name: z.string().trim().min(2, t("errors.name")),
    email: z.string().trim().email(t("errors.email")),
    message: z.string().trim().min(10, t("errors.message")),
    consent: z.literal(true, {
      errorMap: () => ({ message: t("errors.consent") }),
    }),
    company: z.string().max(0).optional().or(z.literal("")),
  });
  type FormValues = z.input<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  async function onSubmit(values: FormValues) {
    setStatus("submitting");

    // Mode statique : ouvre le client mail pré-rempli.
    if (IS_STATIC) {
      const subject = encodeURIComponent(`Contact site — ${values.name}`);
      const body = encodeURIComponent(
        `Nom : ${values.name}\nE-mail : ${values.email}\n\n${values.message}`,
      );
      window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      reset();
      return;
    }

    const res = await sendContact({
      name: values.name,
      email: values.email,
      message: values.message,
      consent: true,
      company: values.company,
    });
    if (res.ok) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  }

  const fieldBase =
    "w-full rounded-[var(--radius-sm)] border bg-white px-4 py-3.5 text-ink transition-colors placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/30";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Honeypot anti-spam (caché) */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
            {t("name")} <span className="text-gold">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder={t("namePlaceholder")}
            className={cn(fieldBase, errors.name ? "border-red-400" : "border-line")}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1.5 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
            {t("email")} <span className="text-gold">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            className={cn(fieldBase, errors.email ? "border-red-400" : "border-line")}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          {t("message")} <span className="text-gold">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder={t("messagePlaceholder")}
          className={cn(
            fieldBase,
            "resize-none",
            errors.message ? "border-red-400" : "border-line",
          )}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#1d1d1f]"
            {...register("consent")}
          />
          <span>{t("consent")}</span>
        </label>
        {errors.consent && (
          <p className="mt-1.5 text-sm text-red-500">
            {errors.consent.message as string}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex h-13 items-center justify-center rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-white transition-all duration-500 ease-[var(--ease-luxe)] hover:bg-gold disabled:opacity-50"
        >
          {status === "submitting" ? t("sending") : t("submit")}
        </button>
        <p className="text-xs text-muted">
          <span className="text-gold">*</span> {t("required")}
        </p>
      </div>

      {status === "success" && (
        <p className="rounded-[var(--radius-sm)] border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-ink">
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p className="rounded-[var(--radius-sm)] border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
          {t("error")}
        </p>
      )}
    </form>
  );
}
