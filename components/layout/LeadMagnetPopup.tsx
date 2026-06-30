"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const STORAGE_KEY = "ccv-lead-magnet-dismissed";
const SHOW_DELAY_MS = 6000;
const GUIDA_PATH = "/guida";

const inputBase =
  "block w-full rounded-lg bg-white text-pietra-900 placeholder:text-pietra-400 ring-1 ring-pietra-300 focus:ring-2 focus:ring-adriatico-600 focus:outline-none transition-shadow h-11 px-3.5 text-[0.95rem] disabled:opacity-60";

export function LeadMagnetPopup({ locale, dict }: Props) {
  const t = dict.leadMagnet;

  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY)) return;

    const timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    window.localStorage.setItem(STORAGE_KEY, "1");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      locale,
    };

    setStatus("submitting");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Request failed");
      }
      setStatus("success");
      window.localStorage.setItem(STORAGE_KEY, "1");
      window.setTimeout(() => {
        window.location.href = GUIDA_PATH;
      }, 1200);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  }

  if (!visible) return null;

  const isSubmitting = status === "submitting";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-pietra-950/50 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-schiuma-50 text-pietra-900 p-7 sm:p-8 shadow-2xl ring-1 ring-black/5">
        <button
          type="button"
          onClick={dismiss}
          aria-label={t.close}
          className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-pietra-500 hover:bg-pietra-100 hover:text-pietra-900 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {status === "success" ? (
          <div role="status" aria-live="polite" className="flex flex-col items-start gap-3 pt-2">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-adriatico-50 text-adriatico-800">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l4.5 4.5L19 7" />
              </svg>
            </span>
            <p className="font-serif text-xl leading-snug text-pietra-950">{t.success}</p>
          </div>
        ) : (
          <>
            <p className="text-[11px] uppercase tracking-widest2 text-adriatico-700 mb-2">
              {t.eyebrow}
            </p>
            <h2 className="font-serif text-2xl sm:text-[1.7rem] leading-snug text-pietra-950 mb-3">
              {t.title}
            </h2>
            <p className="text-sm text-pietra-600 leading-relaxed mb-6">{t.body}</p>

            <form onSubmit={onSubmit} noValidate className="space-y-3">
              <label className="sr-only" htmlFor="lead-name">{t.name}</label>
              <input
                id="lead-name"
                name="name"
                type="text"
                required
                minLength={2}
                autoComplete="name"
                placeholder={t.namePlaceholder}
                disabled={isSubmitting}
                className={inputBase}
              />
              <label className="sr-only" htmlFor="lead-email">{t.email}</label>
              <input
                id="lead-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={t.emailPlaceholder}
                disabled={isSubmitting}
                className={inputBase}
              />

              <label className="flex items-start gap-2 text-xs text-pietra-600 pt-1">
                <input type="checkbox" name="consent" required disabled={isSubmitting} className="mt-0.5" />
                <span>{t.consent}</span>
              </label>

              <div className="flex items-center gap-4 pt-2">
                <Button type="submit" size="md" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? t.submitting : t.submit}
                </Button>
                <button
                  type="button"
                  onClick={dismiss}
                  className="text-sm text-pietra-500 hover:text-pietra-800 transition-colors"
                >
                  {t.dismiss}
                </button>
              </div>

              {status === "error" && (
                <p role="alert" className="rounded-md bg-red-50 ring-1 ring-red-200 px-4 py-3 text-sm text-red-800">
                  {t.error}
                  {errorMsg && <span className="block text-xs mt-1 text-red-700/80 font-mono">{errorMsg}</span>}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
