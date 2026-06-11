import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { Manifesto } from "@/features/home/Manifesto";
import { Services } from "@/features/home/Services";
import { Stats } from "@/features/home/Stats";
import { CtaBand } from "@/components/layout/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, namespace: "meta.home", path: "" });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home.cta");

  return (
    <>
      <HeroVideo />
      <Manifesto />
      <Services />
      <Stats />
      <CtaBand title={t("title")} text={t("text")} buttonLabel={t("button")} />
    </>
  );
}
