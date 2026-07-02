import { NextResponse } from "next/server";

// Popup "guida gratuita" — lead magnet.
// Al submit:
//   1. Aggiunge il contatto al gruppo MailerLite → parte l'automation di nurturing
//   2. (Opzionale) Invia email transazionale via Resend come backup immediato
//
// Env var da impostare su Vercel (Project → Settings → Environment Variables):
//   MAILERLITE_API_KEY      — API key v2 di MailerLite (Account → Integrations → API)
//   MAILERLITE_GROUP_ID     — ID del gruppo "Guida Porto Recanati" creato in MailerLite
//   RESEND_API_KEY          — (opzionale) per email transazionale di backup
//   CONTACT_FROM_EMAIL      — mittente verificato su Resend, es. noreply@casaconvistaportorecanati.it

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
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
  const locale = String(data.locale ?? "it");

  if (!name || name.length < 2) return bad("Name is required");
  if (!email || !EMAIL_RE.test(email)) return bad("Valid email is required");

  console.log("[lead] guida richiesta", { name, email, locale, at: new Date().toISOString() });

  // 1. Aggiungi a MailerLite
  const mlKey = process.env.MAILERLITE_API_KEY;
  const mlGroup = process.env.MAILERLITE_GROUP_ID;

  if (mlKey && mlGroup) {
    try {
      // Crea/aggiorna il subscriber
      const subRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${mlKey}`,
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email,
          fields: { name, last_name: "" },
          groups: [mlGroup],
          status: "active",
        }),
      });

      if (!subRes.ok) {
        const err = await subRes.text();
        console.error("[lead] MailerLite error", subRes.status, err);
      } else {
        console.log("[lead] MailerLite: subscriber aggiunto al gruppo", mlGroup);
      }
    } catch (err) {
      console.error("[lead] MailerLite fetch failed", err);
    }
  } else {
    console.warn("[lead] MAILERLITE_API_KEY o MAILERLITE_GROUP_ID non impostati — subscriber non aggiunto");
  }

  // 2. Email transazionale di backup via Resend (opzionale)
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://casaconvistaportorecanati.it";

  if (resendKey && fromEmail) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: fromEmail,
        to: email,
        replyTo: "luca@casaconvistaportorecanati.it",
        subject: locale === "it"
          ? "La tua guida di Porto Recanati e delle Marche"
          : "Your guide to Porto Recanati and the Marche",
        html: locale === "it"
          ? `<p>Ciao ${name},</p><p>grazie per il tuo interesse! Ecco la tua guida: <a href="${siteUrl}/guida">${siteUrl}/guida</a></p><p>A presto,<br>Luca — Casa con Vista</p>`
          : `<p>Hi ${name},</p><p>thanks for your interest! Here's your guide: <a href="${siteUrl}/guida">${siteUrl}/guida</a></p><p>See you soon,<br>Luca — Casa con Vista</p>`,
      });
    } catch (err) {
      console.error("[lead] Resend failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
