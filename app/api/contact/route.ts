import { NextResponse } from "next/server";

// Endpoint del form contatti.
//
// Comportamento attuale: validazione del payload + log a console (mock).
// Per attivare l'invio reale: vedi il blocco "TODO: invio email" in fondo.
//
// Opzioni consigliate per inviare la mail:
//   A) Resend (https://resend.com)  — il più semplice, free tier generoso
//      npm i resend
//      const resend = new Resend(process.env.RESEND_API_KEY);
//      await resend.emails.send({ from, to, subject, html });
//   B) SMTP via nodemailer (host classico, es. server di posta del dominio)
//   C) Formspree / Getform — niente codice server, basta cambiare l'action del form
//
// Imposta le env var su Vercel (Project → Settings → Environment Variables):
//   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  dates?: string;
  guests?: string | number;
  message?: string;
  consent?: boolean;
  locale?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return bad("Invalid JSON body");
  }

  // Validazione minima (server-side, indipendente dal client)
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();
  const dates = String(data.dates ?? "").trim();
  const guests = data.guests ? String(data.guests).trim() : "";

  if (!name || name.length < 2) return bad("Name is required");
  if (!email || !EMAIL_RE.test(email)) return bad("Valid email is required");
  // message può essere vuoto: alcuni utenti scrivono solo le date

  // Honeypot opzionale: ignorare richieste con campi inattesi
  // (lasciato libero per ora — aggiungere se compaiono spam)

  // Log mock — sostituire con invio reale
  console.log("[contact] new request", {
    name,
    email,
    dates,
    guests,
    message,
    locale: data.locale,
    at: new Date().toISOString(),
  });

  // TODO: invio email reale.
  // Esempio Resend:
  //   const { Resend } = await import("resend");
  //   const resend = new Resend(process.env.RESEND_API_KEY!);
  //   await resend.emails.send({
  //     from: process.env.CONTACT_FROM_EMAIL!,
  //     to: process.env.CONTACT_TO_EMAIL!,
  //     replyTo: email,
  //     subject: `Richiesta info — ${name}`,
  //     text: `Nome: ${name}\nEmail: ${email}\nDate: ${dates}\nOspiti: ${guests}\n\n${message}`,
  //   });

  return NextResponse.json({ ok: true });
}
