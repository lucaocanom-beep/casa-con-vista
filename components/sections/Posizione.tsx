import { site } from "@/content/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Section } from "@/components/ui/Section";

export function Posizione({ dict }: { dict: Dictionary }) {
  return (
    <Section
      id="posizione"
      eyebrow={dict.posizione.eyebrow}
      title={dict.posizione.title}
      tone="white"
    >
      <p className="max-w-prose text-lg text-pietra-700 leading-relaxed mb-10">
        {dict.posizione.body}
      </p>

      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12 items-start">
        {/* Mappa */}
        <div className="lg:col-span-3 rounded-2xl overflow-hidden ring-1 ring-pietra-200 bg-pietra-100">
          <iframe
            title={dict.posizione.mapAria}
            src={site.mapEmbed}
            className="block w-full h-[360px] sm:h-[440px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        {/* Dintorni */}
        <ul role="list" className="lg:col-span-2 divide-y divide-sabbia-200">
          {site.nearby.map((spot) => {
            const t = dict.posizione.nearby[spot.id as keyof typeof dict.posizione.nearby];
            return (
              <li key={spot.id} className="py-4 flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-serif text-lg text-pietra-950 leading-tight">
                    {t.label}
                  </h3>
                  <p className="mt-1 text-sm text-pietra-600 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-mono text-sm text-adriatico-800">{spot.distance}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-widest2 text-pietra-500">
                    {dict.posizione.modes[spot.mode as keyof typeof dict.posizione.modes]}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
