"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  locale: Locale;
  dict: Dictionary;
  whatsappHref: string;
};

const inputBase =
  "block w-full rounded-lg bg-white text-pietra-900 placeholder:text-pietra-400 ring-1 ring-pietra-300 focus:ring-2 focus:ring-adriatico-600 focus:outline-none transition-shadow px-3.5 text-[0.95rem] disabled:opacity-60";

export function ContactForm({ locale, dict, whatsappHref }: Props) {
  const f = dict.contatti.form;
  const ch = dict.contatti.channels;

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      dates: String(fd.get("dates") ?? ""),
      guests: String(fd.get("guests") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      locale,
    };

    setStatus("submitting");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Request failed");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  }

  // Stato di successo: rimpiazza il form per dare risalto alla conferma
  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="lg:col-span-3 rounded-2xl bg-schiuma-50 text-pietra-900 p-8 sm:p-10 ring-1 ring-white/10 flex flex-col items-start gap-4"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-adriatico-50 text-adriatico-800">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l4.5 4.5L19 7" />
          </svg>
        </span>
        <p className="font-serif text-2xl leading-snug text-pietra-950 max-w-md">
          {f.success}
        </p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-adriatico-800 hover:text-adriatico-900 underline-offset-4 hover:underline"
        >
          {ch.whatsappAction} →
        </a>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="lg:col-span-3 rounded-2xl bg-schiuma-50 text-pietra-900 p-7 sm:p-8 ring-1 ring-white/10"
      aria-label={dict.contatti.title}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={f.name} required>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            disabled={isSubmitting}
            className={`${inputBase} h-11`}
          />
        </Field>
        <Field id="email" label={f.email} required>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={isSubmitting}
            className={`${inputBase} h-11`}
          />
        </Field>
        <Field id="dates" label={f.dates}>
          <input
            id="dates"
            name="dates"
            type="text"
            placeholder={f.datesPlaceholder}
            disabled={isSubmitting}
            className={`${inputBase} h-11`}
          />
        </Field>
        <Field id="guests" label={f.guests}>
          <input
            id="guests"
            name="guests"
            type="number"
            min={1}
            max={10}
            defaultValue={2}
            disabled={isSubmitting}
            className={`${inputBase} h-11`}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field id="message" label={f.message}>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder={f.messagePlaceholder}
              disabled={isSubmitting}
              className={`${inputBase} py-3 min-h-[120px] resize-y`}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-start gap-2 text-xs text-pietra-600">
            <input
              type="checkbox"
              name="consent"
              required
              disabled={isSubmitting}
              className="mt-0.5"
            />
            <span>{f.consentLabel}</span>
          </label>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap gap-3 items-center">
        <Button type="submit" size="md" disabled={isSubmitting}>
          {isSubmitting ? f.submitting : f.submit}
        </Button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-adriatico-800 hover:text-adriatico-900 underline-offset-4 hover:underline"
        >
          {ch.whatsappAction} →
        </a>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-5 rounded-md bg-red-50 ring-1 ring-red-200 px-4 py-3 text-sm text-red-800"
        >
          {f.error}
          {errorMsg && <span className="block text-xs mt-1 text-red-700/80 font-mono">{errorMsg}</span>}
        </p>
      )}
    </form>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-widest2 text-pietra-500 mb-1.5"
      >
        {label}
        {required && <span aria-hidden className="text-adriatico-700"> *</span>}
      </label>
      {children}
    </div>
  );
}
