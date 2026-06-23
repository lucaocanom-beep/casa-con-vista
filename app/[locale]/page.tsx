import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

import { Hero } from "@/components/sections/Hero";
import { Luogo } from "@/components/sections/Luogo";
import { Galleria } from "@/components/sections/Galleria";
import { Servizi } from "@/components/sections/Servizi";
import { Casa } from "@/components/sections/Casa";
import { Posizione } from "@/components/sections/Posizione";
import { Prezzi } from "@/components/sections/Prezzi";
import { Recensioni } from "@/components/sections/Recensioni";
import { Faq } from "@/components/sections/Faq";
import { Contatti } from "@/components/sections/Contatti";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  return (
    <>
      <JsonLd locale={locale} dict={dict} />
      <Hero dict={dict} locale={locale} />
      <Luogo dict={dict} />
      <Galleria dict={dict} />
      <Servizi dict={dict} />
      <Casa dict={dict} />
      <Posizione dict={dict} />
      <Prezzi dict={dict} locale={locale} />
      <Recensioni dict={dict} />
      <Faq dict={dict} />
      <Contatti dict={dict} locale={locale} />
    </>
  );
}
