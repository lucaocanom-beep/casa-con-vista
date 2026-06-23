import { site } from "@/content/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Section } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";

export function Casa({ dict }: { dict: Dictionary }) {
  const labels = dict.casa.factsLabel;

  const stats = [
    { label: labels.bedrooms, value: String(site.facts.bedrooms) },
    { label: labels.bathrooms, value: String(site.facts.bathrooms) },
    { label: labels.sleeps, value: String(site.facts.sleeps) },
    { label: labels.size, value: `${site.facts.sizeSqm} ${labels.sqm}` },
    { label: labels.floor, value: String(site.facts.floor) },
  ];

  return (
    <Section
      id="casa"
      eyebrow={dict.casa.eyebrow}
      title={dict.casa.title}
      tone="schiuma"
    >
      <p className="max-w-prose text-lg text-pietra-700 leading-relaxed mb-10">
        {dict.casa.intro}
      </p>

      {/* Fatti chiave — riga di numeri ben visibile */}
      <dl className="mb-14 grid grid-cols-2 sm:grid-cols-5 gap-y-6 gap-x-4 border-y border-sabbia-200 py-6">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="text-[11px] uppercase tracking-widest2 text-pietra-500 mb-1.5">
              {s.label}
            </dt>
            <dd className="font-serif text-3xl text-pietra-950">{s.value}</dd>
          </div>
        ))}
      </dl>

      {/* Ambienti */}
      <ul role="list" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {site.rooms.map((room) => {
          const t = dict.casa.rooms[room.id as keyof typeof dict.casa.rooms];
          return (
            <li
              key={room.id}
              className="rounded-2xl bg-white p-6 ring-1 ring-sabbia-200 flex gap-4"
            >
              <div className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full bg-adriatico-50 text-adriatico-800">
                <Icon name={room.icon as IconName} size={22} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-pietra-950 leading-tight">
                  {t.label}
                </h3>
                <p className="mt-1.5 text-sm text-pietra-600 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
