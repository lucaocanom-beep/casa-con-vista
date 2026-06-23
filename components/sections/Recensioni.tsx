import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Section } from "@/components/ui/Section";

export function Recensioni({ dict }: { dict: Dictionary }) {
  return (
    <Section
      id="recensioni"
      eyebrow={dict.recensioni.eyebrow}
      title={dict.recensioni.title}
      tone="sabbia"
    >
      <p className="max-w-prose text-lg text-pietra-700 leading-relaxed mb-12">
        {dict.recensioni.body}
      </p>

      <ul role="list" className="grid gap-5 md:grid-cols-3">
        {dict.recensioni.items.map((r, i) => (
          <li key={i}>
            <figure className="h-full rounded-2xl bg-white p-7 ring-1 ring-sabbia-200 flex flex-col">
              <span
                aria-hidden
                className="font-serif text-5xl leading-none text-adriatico-300 mb-3"
              >
                “
              </span>
              <blockquote className="font-serif text-lg text-pietra-800 leading-snug flex-1">
                {r.quote}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-sabbia-200">
                <p className="text-sm font-medium text-pietra-900">{r.author}</p>
                <p className="mt-0.5 text-xs uppercase tracking-widest2 text-pietra-500">
                  {r.location} · {r.date}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
