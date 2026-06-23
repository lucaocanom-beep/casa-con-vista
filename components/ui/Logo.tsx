import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

// Logo placeholder testuale, isolato così da poter essere sostituito
// con un file immagine (svg/png) senza toccare l'header.

type Props = {
  locale: Locale;
  className?: string;
};

export function Logo({ locale, className = "" }: Props) {
  return (
    <Link
      href={`/${locale}#hero`}
      aria-label="Casa con Vista — home"
      className={`inline-flex items-baseline gap-2 leading-none ${className}`}
    >
      <span className="font-serif text-xl sm:text-2xl text-adriatico-900 tracking-wide">
        Casa con Vista
      </span>
      <span
        aria-hidden
        className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-sabbia-400"
      />
    </Link>
  );
}
