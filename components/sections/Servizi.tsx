import { site } from "@/content/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Section } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";
import clsx from "clsx";

export function Servizi({ dict }: { dict: Dictionary }) {
  return (
    <Section
      id="servizi"
      eyebrow={dict.servizi.eyebrow}
      title={dict.servizi.title}
      tone="sabbia"
    >
      <p className="max-w-prose text-lg text-pietra-700 leading-relaxed mb-12">
        {dict.servizi.body}
      </p>

      <ul
        role="list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {site.services.map((svc) => {
          const t = dict.servizi.items[svc.id as keyof typeof dict.servizi.items];
          return (
            <li
              key={svc.id}
              className={clsx(
                "rounded-2xl p-6 ring-1 transition-colors h-full flex flex-col gap-3",
                svc.highlight
                  ? "bg-adriatico-900 text-schiuma-50 ring-adriatico-900"
                  : "bg-white/80 ring-sabbia-200"
              )}
            >
              <div
                className={clsx(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full",
                  svc.highlight
                    ? "bg-white/10 text-schiuma-50"
                    : "bg-adriatico-50 text-adriatico-800"
                )}
              >
                <Icon name={svc.icon as IconName} size={20} />
              </div>
              <h3
                className={clsx(
                  "font-serif text-xl leading-tight",
                  svc.highlight ? "text-schiuma-50" : "text-pietra-950"
                )}
              >
                {t.label}
              </h3>
              <p
                className={clsx(
                  "text-sm leading-relaxed",
                  svc.highlight ? "text-schiuma-100/85" : "text-pietra-600"
                )}
              >
                {t.desc}
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
