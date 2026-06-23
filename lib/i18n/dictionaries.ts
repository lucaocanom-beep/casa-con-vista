import "server-only";
import type { Locale } from "./config";
import { it } from "./translations/it";
import { en } from "./translations/en";

// Dizionari caricati staticamente (no dynamic import: contenuti piccoli,
// uniche due lingue). Garantisce type-safety completa col tipo Dictionary.

export type Dictionary = typeof it;

const dictionaries: Record<Locale, Dictionary> = { it, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
