"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { sections } from "@/content/site";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

// Sezioni mostrate nel menu (skip "hero": l'utente non clicca "Home" sul logo).
const navSections = sections.filter((s) => s.id !== "hero");

export function Header({ locale, dict }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Header diventa "solido" dopo qualche px di scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver per evidenziare la sezione attiva nel menu
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        // Considera "attiva" la sezione che attraversa la fascia centrale
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Blocca lo scroll del body quando il menu mobile è aperto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-40 transition-colors duration-300",
        scrolled || mobileOpen
          ? "bg-schiuma-50/95 backdrop-blur border-b border-schiuma-200"
          : "bg-transparent"
      )}
      style={{ height: "var(--header-height)" }}
    >
      <div className="mx-auto max-w-content h-full px-5 sm:px-8 flex items-center justify-between gap-4">
        <Logo locale={locale} />

        {/* Nav desktop */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-6 text-sm"
        >
          {navSections.map((s) => {
            const label = dict.nav[s.navKey];
            const active = activeId === s.id;
            return (
              <Link
                key={s.id}
                href={`/${locale}#${s.id}`}
                className={clsx(
                  "relative py-1 transition-colors",
                  active
                    ? "text-adriatico-900"
                    : "text-pietra-700 hover:text-adriatico-800"
                )}
              >
                {label}
                <span
                  aria-hidden
                  className={clsx(
                    "absolute -bottom-0.5 left-0 h-px bg-adriatico-700 transition-all",
                    active ? "w-full" : "w-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle
            currentLocale={locale}
            ariaLabel={dict.langToggle.aria}
          />
          {/* CTA primario: visibile a tutte le breakpoint (mobile usa label compatto). */}
          <Button
            href={`/${locale}#contatti`}
            size="sm"
            className="hidden sm:inline-flex"
          >
            {dict.nav.ctaPrimary}
          </Button>
          <Button
            href={`/${locale}#contatti`}
            size="sm"
            className="sm:hidden px-3 text-xs"
            aria-label={dict.nav.ctaPrimary}
          >
            {dict.nav.ctaPrimaryShort}
          </Button>

          {/* Burger mobile */}
          <button
            type="button"
            aria-label={mobileOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-pietra-900 hover:bg-schiuma-100"
          >
            <span className="sr-only">Menu</span>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden
            >
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Pannello mobile */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="lg:hidden absolute top-full inset-x-0 bg-schiuma-50 border-b border-schiuma-200 shadow-sm"
        >
          <nav
            aria-label="Mobile"
            className="px-5 py-6 flex flex-col gap-1 max-h-[calc(100vh-var(--header-height))] overflow-y-auto"
          >
            {navSections.map((s) => (
              <Link
                key={s.id}
                href={`/${locale}#${s.id}`}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "py-3 px-2 text-base border-b border-schiuma-200 last:border-b-0",
                  activeId === s.id
                    ? "text-adriatico-900 font-medium"
                    : "text-pietra-800"
                )}
              >
                {dict.nav[s.navKey]}
              </Link>
            ))}
            <Button
              href={`/${locale}#contatti`}
              className="mt-4 self-start"
              onClick={() => setMobileOpen(false)}
            >
              {dict.nav.ctaPrimary}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
