// Configurazione lingue del sito.
// Per aggiungerne una nuova: aggiungi il codice qui e crea il file in lib/i18n/translations.

export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "it";

export const localeLabels: Record<Locale, string> = {
  it: "Italiano",
  en: "English",
};

export const localeShortLabels: Record<Locale, string> = {
  it: "IT",
  en: "EN",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
