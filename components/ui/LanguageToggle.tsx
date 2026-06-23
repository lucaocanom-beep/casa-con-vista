"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeShortLabels, type Locale } from "@/lib/i18n/config";
import clsx from "clsx";

type Props = {
  currentLocale: Locale;
  ariaLabel: string;
  className?: string;
};

export function LanguageToggle({ currentLocale, ariaLabel, className }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    if (next === currentLocale) return;
    // Sostituisci solo il primo segmento di path e preserva l'ancora corrente,
    // così l'utente resta sulla stessa sezione dopo il cambio lingua.
    const segments = pathname.split("/").filter(Boolean);
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (segments.length === 0) {
      router.push(`/${next}${hash}`);
      return;
    }
    segments[0] = next;
    router.push("/" + segments.join("/") + hash);
  }

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={clsx(
        "inline-flex items-center rounded-full bg-schiuma-100 p-0.5 ring-1 ring-adriatico-100",
        className
      )}
    >
      {locales.map((loc) => {
        const active = loc === currentLocale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            aria-pressed={active}
            className={clsx(
              "px-2.5 py-1 text-xs font-medium tracking-wider rounded-full transition-colors",
              active
                ? "bg-adriatico-800 text-schiuma-50"
                : "text-pietra-700 hover:text-adriatico-800"
            )}
          >
            {localeShortLabels[loc]}
          </button>
        );
      })}
    </div>
  );
}
