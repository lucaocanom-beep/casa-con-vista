import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Section } from "@/components/ui/Section";

export function Luogo({ dict }: { dict: Dictionary }) {
  return (
    <Section
      id="luogo"
      eyebrow={dict.luogo.eyebrow}
      title={dict.luogo.title}
      tone="schiuma"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        <div className="lg:col-span-7 space-y-6">
          <p className="font-serif text-2xl sm:text-3xl leading-snug text-pietra-900 max-w-2xl">
            {dict.luogo.lead}
          </p>
          {dict.luogo.body.map((p, i) => (
            <p
              key={i}
              className="max-w-prose text-base sm:text-lg text-pietra-700 leading-relaxed"
            >
              {p}
            </p>
          ))}
        </div>

        <aside className="lg:col-span-5 lg:pl-8 lg:border-l border-sabbia-200">
          <blockquote className="font-serif text-2xl sm:text-3xl text-adriatico-800 leading-tight italic">
            “{dict.luogo.pull}”
          </blockquote>
          <div className="mt-8 aspect-[4/5] rounded-lg bg-gradient-to-br from-adriatico-200 via-adriatico-100 to-sabbia-100 ring-1 ring-sabbia-200" />
        </aside>
      </div>
    </Section>
  );
}
