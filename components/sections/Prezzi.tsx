import { site } from "@/content/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import clsx from "clsx";

type Props = { dict: Dictionary; locale: Locale };

export function Prezzi({ dict, locale }: Props) {
  return (
    <Section
      id="prezzi"
      eyebrow={dict.prezzi.eyebrow}
      title={dict.prezzi.title}
      tone="schiuma"
    >
      <p className="max-w-prose text-lg text-pietra-700 leading-relaxed mb-12">
        {dict.prezzi.body}
      </p>

      <div className="grid gap-5 md:grid-cols-3">
        {site.pricing.map((p) => {
          const season = dict.prezzi.seasons[p.id as keyof typeof dict.prezzi.seasons];
          const isHigh = p.id === "high";
          return (
            <div
              key={p.id}
              className={clsx(
                "rounded-2xl p-7 flex flex-col ring-1 transition-shadow",
                isHigh
                  ? "bg-adriatico-900 text-schiuma-50 ring-adriatico-900 shadow-lg shadow-adriatico-900/15"
                  : "bg-white text-pietra-900 ring-pietra-200"
              )}
            >
              <p
                className={clsx(
                  "text-xs uppercase tracking-widest2 mb-1",
                  isHigh ? "text-schiuma-100/80" : "text-adriatico-700/80"
                )}
              >
                {season.label}
              </p>
              <p
                className={clsx(
                  "text-xs",
                  isHigh ? "text-schiuma-100/70" : "text-pietra-500"
                )}
              >
                {season.months}
              </p>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span
                  className={clsx(
                    "text-[11px] uppercase tracking-widest2",
                    isHigh ? "text-schiuma-100/70" : "text-pietra-500"
                  )}
                >
                  {dict.prezzi.from}
                </span>
              </div>
              <p
                className={clsx(
                  "font-serif text-5xl leading-none mt-1",
                  isHigh ? "text-schiuma-50" : "text-pietra-950"
                )}
              >
                €{p.priceFrom}
              </p>
              <p
                className={clsx(
                  "mt-2 text-sm",
                  isHigh ? "text-schiuma-100/70" : "text-pietra-500"
                )}
              >
                {dict.prezzi.perNight}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 items-start">
        <ul role="list" className="space-y-3 text-pietra-700">
          {dict.prezzi.advantages.map((a) => (
            <li key={a} className="flex gap-3 items-start">
              <span
                aria-hidden
                className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-sabbia-500 shrink-0"
              />
              <span>{a}</span>
            </li>
          ))}
        </ul>
        <div className="md:text-right">
          <p className="text-pietra-600 mb-4 max-w-md md:ml-auto">
            {dict.prezzi.ctaNote}
          </p>
          <Button href={`/${locale}#contatti`} size="lg">
            {dict.nav.ctaPrimary}
          </Button>
        </div>
      </div>
    </Section>
  );
}
