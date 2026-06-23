import { site } from "@/content/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/sections/ContactForm";

type Props = { dict: Dictionary; locale: Locale };

export function Contatti({ dict, locale }: Props) {
  const ch = dict.contatti.channels;

  const phoneDigits = site.contact.whatsappNumber.replace(/[^\d+]/g, "");
  const whatsappText = encodeURIComponent(site.contact.whatsappPrefilled[locale]);
  const whatsappHref = `https://wa.me/${phoneDigits.replace(/^\+/, "")}?text=${whatsappText}`;
  const phoneHref = `tel:${site.contact.phone.replace(/\s/g, "")}`;
  const emailHref = `mailto:${site.contact.email}`;

  return (
    <Section
      id="contatti"
      eyebrow={dict.contatti.eyebrow}
      title={dict.contatti.title}
      tone="adriatico"
    >
      <p className="max-w-prose text-lg text-schiuma-100/90 leading-relaxed mb-12">
        {dict.contatti.body}
      </p>

      <div className="grid gap-10 lg:grid-cols-5">
        <ContactForm locale={locale} dict={dict} whatsappHref={whatsappHref} />

        <aside className="lg:col-span-2 space-y-6 text-schiuma-100">
          <Channel
            label={ch.whatsappLabel}
            value={site.contact.phone}
            href={whatsappHref}
            action={ch.whatsappAction}
            external
          />
          <Channel
            label={ch.emailLabel}
            value={site.contact.email}
            href={emailHref}
          />
          <Channel
            label={ch.phoneLabel}
            value={site.contact.phone}
            href={phoneHref}
          />
          <div>
            <p className="text-[11px] uppercase tracking-widest2 text-schiuma-100/60 mb-1.5">
              {ch.hoursLabel}
            </p>
            <p className="font-serif text-xl text-schiuma-50">{ch.hoursValue}</p>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function Channel({
  label,
  value,
  href,
  action,
  external,
}: {
  label: string;
  value: string;
  href: string;
  action?: string;
  external?: boolean;
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-widest2 text-schiuma-100/60 mb-1.5">
        {label}
      </p>
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="font-serif text-xl sm:text-2xl text-schiuma-50 hover:text-sabbia-200 transition-colors break-all"
      >
        {value}
      </a>
      {action && <p className="mt-1 text-xs text-schiuma-100/60">{action} →</p>}
    </div>
  );
}
