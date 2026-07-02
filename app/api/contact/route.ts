import { NextResponse } from "next/server";

// Form contatti — invia la richiesta a luca@casaconvistaportorecanati.it via Resend.
//
// Env var da impostare su Vercel (Project → Settings → Environment Variables):
//   RESEND_API_KEY       — API key di Resend (resend.com → API Keys)
//   CONTACT_FROM_EMAIL   — mittente verificato su Resend, es. noreply@casaconvistaportorecanati.it
//   CONTACT_TO_EMAIL     — destinatario, es. luca@casaconvistaportorecanati.it

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

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();
  const dates = String(data.dates ?? "").trim();
  const guests = data.guests ? String(data.guests).trim() : "";

  if (!name || name.length < 2) return bad("Name is required");
  if (!email || !EMAIL_RE.test(email)) return bad("Valid email is required");

  console.log("[contact] new request", { name, email, dates, guests, message, locale: data.locale, at: new Date().toISOString() });

  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "luca@casaconvistaportorecanati.it";

  if (resendKey && fromEmail) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: email,
        subject: `Nuova richiesta da ${name} — Casa con Vista`,
        html: `
          <h2>Nuova richiesta dal sito</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${dates ? `<p><strong>Date:</strong> ${dates}</p>` : ""}
          ${guests ? `<p><strong>Ospiti:</strong> ${guests}</p>` : ""}
          ${message ? `<p><strong>Messaggio:</strong><br>${message.replace(/\n/g, "<br>")}</p>` : ""}
          <hr>
          <p style="color:#888;font-size:12px">Puoi rispondere direttamente a questa email: la reply andrà a ${email}</p>
        `,
      });
    } catch (err) {
      console.error("[contact] Resend failed", err);
      // Non blocchiamo l'utente se l'email fallisce: loghiamo e restituiamo ok
    }
  } else {
    console.warn("[contact] RESEND_API_KEY o CONTACT_FROM_EMAIL non impostati — email non inviata");
  }

  return NextResponse.json({ ok: true });
}
