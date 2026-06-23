import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Logo } from "@/components/ui/Logo";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: Props) {
  const cin = site.cin || dict.footer.cinPlaceholder;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-adriatico-950 text-schiuma-100">
      <div className="mx-auto max-w-content px-5 sm:px-8 py-16 grid gap-10 md:grid-cols-3">
        <div>
          <Logo locale={locale} className="[&>span:first-child]:text-schiuma-50" />
          <p className="mt-4 max-w-xs text-sm text-schiuma-100/80">
            {dict.footer.tagline}
          </p>
        </div>

        <div className="text-sm space-y-2">
          <p className="text-schiuma-100/60 uppercase tracking-widest2 text-xs mb-3">
            {dict.nav.contatti}
          </p>
          <p>
            <a
              href={`mailto:${site.contact.email}`}
              className="hover:text-sabbia-300 transition-colors"
            >
              {site.contact.email}
            </a>
          </p>
          <p>
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
              className="hover:text-sabbia-300 transition-colors"
            >
              {site.contact.phone}
            </a>
          </p>
          <p>
            {site.city} ({site.province}) — {site.region}
          </p>
        </div>

        <div className="text-sm space-y-4">
          <div>
            <p className="text-schiuma-100/60 uppercase tracking-widest2 text-xs mb-2">
              {dict.footer.cinLabel}
            </p>
            <p className="font-mono text-schiuma-50 break-all">{cin}</p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-schiuma-100/80">
            <li>
              <a href="#" className="hover:text-sabbia-300 transition-colors">
                {dict.footer.legal.privacy}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-sabbia-300 transition-colors">
                {dict.footer.legal.cookies}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-6 text-xs text-schiuma-100/60 flex flex-wrap items-center justify-between gap-2">
          <p>
            © {year} {site.name}. {dict.footer.rights}
          </p>
          <p className="font-mono">{locale.toUpperCase()}</p>
        </div>
      </div>
    </footer>
  );
}
