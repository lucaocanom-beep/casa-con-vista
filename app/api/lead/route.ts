import { NextResponse } from "next/server";
import { Resend } from "resend";

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

  console.log("[lead] guida richiesta", { name, email, locale });

  // 1. Aggiungi a MailerLite
  const mlKey = (process.env.MAILERLITE_API_KEY ?? "").trim();
  const mlGroup = (process.env.MAILERLITE_GROUP_ID ?? "").trim();

  if (mlKey && mlGroup) {
    try {
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
        console.error("[lead] MailerLite error", subRes.status, await subRes.text());
      } else {
        console.log("[lead] MailerLite: subscriber aggiunto");
      }
    } catch (err) {
      console.error("[lead] MailerLite fetch failed", err);
    }
  } else {
    console.warn("[lead] MAILERLITE_API_KEY o MAILERLITE_GROUP_ID mancanti");
  }

  // 2. Email di conferma via Resend
  const resendKey = (process.env.RESEND_API_KEY ?? "").trim();
  const fromEmail = (process.env.CONTACT_FROM_EMAIL ?? "").trim();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://casaconvistaportorecanati.it").trim();

  if (resendKey && fromEmail) {
    try {
      const resend = new Resend(resendKey);
      const { error } = await resend.emails.send({
        from: fromEmail,
        to: email,
        replyTo: "luca@casaconvistaportorecanati.it",
        subject: locale === "it"
          ? "La tua guida di Porto Recanati e delle Marche"
          : "Your guide to Porto Recanati and the Marche",
        html: locale === "it"
          ? `<p>Ciao ${name},</p><p>grazie! Ecco la tua guida: <a href="${siteUrl}/guida">${siteUrl}/guida</a></p><p>A presto,<br>Luca — Casa con Vista</p>`
          : `<p>Hi ${name},</p><p>thanks! Here's your guide: <a href="${siteUrl}/guida">${siteUrl}/guida</a></p><p>See you soon,<br>Luca — Casa con Vista</p>`,
      });

      if (error) {
        console.error("[lead] Resend error", JSON.stringify(error));
      } else {
        console.log("[lead] email guida inviata a", email);
      }
    } catch (err) {
      console.error("[lead] Resend eccezione", err);
    }
  }

  return NextResponse.json({ ok: true });
}
