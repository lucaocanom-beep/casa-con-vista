import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";

type Props = { dict: Dictionary; locale: Locale };

export function Hero({ dict, locale }: Props) {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-end overflow-hidden"
    >
      {/* Placeholder vista mare — sostituire con <Image src="/images/hero-vista-mare.jpg" fill priority /> */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-adriatico-400 via-adriatico-700 to-adriatico-950"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.18),_transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"
      />

      <div className="relative mx-auto max-w-content w-full px-5 sm:px-8 pb-16 sm:pb-24 pt-32 text-schiuma-50">
        <p className="text-xs uppercase tracking-widest2 mb-4 text-schiuma-100/85">
          {dict.hero.eyebrow}
        </p>
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
          {dict.hero.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg sm:text-xl text-schiuma-50/90">
          {dict.hero.subtitle}
        </p>
        <p className="mt-3 text-sm text-schiuma-100/75 tracking-wide">
          {dict.hero.facts}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={`/${locale}#contatti`} size="lg" variant="primary">
            {dict.hero.cta}
          </Button>
          <Button
            href={`/${locale}#casa`}
            size="lg"
            variant="ghost"
            className="text-schiuma-50 ring-1 ring-white/30 hover:bg-white/10 hover:text-schiuma-50"
          >
            {dict.hero.ctaSecondary}
          </Button>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-schiuma-50/70 text-[10px] uppercase tracking-widest2 flex flex-col items-center gap-2"
      >
        <span>{dict.hero.scrollHint}</span>
        <span className="h-8 w-px bg-schiuma-50/40" />
      </div>
    </section>
  );
}
