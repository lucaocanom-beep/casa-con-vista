import { site } from "@/content/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { Section } from "@/components/ui/Section";
import { AvailabilityCalendar } from "@/components/ui/AvailabilityCalendar";

type Props = { dict: Dictionary; locale: Locale };

export function Disponibilita({ dict, locale }: Props) {
  const phone = site.contact.whatsappNumber.replace(/[^\d+]/g, "").replace(/^\+/, "");
  const text = encodeURIComponent(site.contact.whatsappPrefilled[locale]);
  const whatsappHref = `https://wa.me/${phone}?text=${text}`;

  const [before, linkLabel, after] = splitCtaText(
    dict.disponibilita.ctaText,
    dict.disponibilita.ctaLink
  );

  return (
    <Section
      id="disponibilita"
      eyebrow={dict.disponibilita.eyebrow}
      title={dict.disponibilita.title}
      tone="white"
    >
      <p className="max-w-prose text-lg text-pietra-700 leading-relaxed mb-10">
        {dict.disponibilita.body}
      </p>

      <AvailabilityCalendar dict={dict} />

      <p className="mt-8 text-center text-sm text-pietra-500">
        {before}
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="underline text-adriatico-700 hover:text-adriatico-900">
          {linkLabel}
        </a>
        {after}
      </p>
    </Section>
  );
}

// Divide il testo della CTA nel punto in cui compare la parola-link (es. "scrivimi"),
// per renderla cliccabile mantenendo la frase tradotta intatta.
function splitCtaText(full: string, linkWord: string): [string, string, string] {
  const idx = full.indexOf(linkWord);
  if (idx === -1) return [full, linkWord, ""];
  return [full.slice(0, idx), linkWord, full.slice(idx + linkWord.length)];
}
