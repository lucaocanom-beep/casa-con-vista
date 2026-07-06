import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Popup guida — aggiunge subscriber a MailerLite e invia email di conferma via SMTP Aruba.
//
// Env var da impostare su Vercel:
//   SMTP_HOST              smtps.aruba.it
//   SMTP_PORT              465
//   SMTP_USER              luca@casaconvistaportorecanati.it
//   SMTP_PASS              (password casella Aruba)
//   MAILERLITE_API_KEY     token API MailerLite
//   MAILERLITE_GROUP_ID    ID gruppo MailerLite

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

  // 2. Email di conferma via SMTP Aruba
  const smtpHost = (process.env.SMTP_HOST ?? "").trim();
  const smtpUser = (process.env.SMTP_USER ?? "").trim();
  const smtpPass = (process.env.SMTP_PASS ?? "").trim();
  const smtpPort = parseInt(process.env.SMTP_PORT ?? "465");
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://casaconvistaportorecanati.it").trim();

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      const isIt = locale === "it";

      await transporter.sendMail({
        from: `"Casa con Vista" <${smtpUser}>`,
        to: email,
        replyTo: smtpUser,
        subject: isIt
          ? "La tua guida di Porto Recanati e delle Marche"
          : "Your guide to Porto Recanati and the Marche",
        html: isIt
          ? `
            <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;color:#1a1a2e">
              <h2 style="font-size:24px;margin-bottom:8px">Ciao ${name}!</h2>
              <p style="color:#555;line-height:1.6">Grazie per il tuo interesse. Ecco la tua guida su Porto Recanati e le Marche — scritta da chi la vive davvero.</p>
              <p style="margin:24px 0">
                <a href="${siteUrl}/guida" style="background:#1a3a5c;color:#fff;padding:12px 28px;border-radius:99px;text-decoration:none;font-size:15px">
                  Leggi la guida →
                </a>
              </p>
              <p style="color:#555;line-height:1.6">Se hai domande o vuoi sapere qualcosa su Casa con Vista, rispondi pure a questa email.</p>
              <p style="color:#555">A presto,<br><strong>Luca</strong></p>
              <hr style="margin:32px 0;border:none;border-top:1px solid #eee">
              <p style="color:#aaa;font-size:12px">Casa con Vista · Galleria Bitocchi 5, Porto Recanati (MC)</p>
            </div>
          `
          : `
            <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;color:#1a1a2e">
              <h2 style="font-size:24px;margin-bottom:8px">Hi ${name}!</h2>
              <p style="color:#555;line-height:1.6">Thanks for your interest. Here's your guide to Porto Recanati and the Marche — written by someone who truly knows the area.</p>
              <p style="margin:24px 0">
                <a href="${siteUrl}/guida" style="background:#1a3a5c;color:#fff;padding:12px 28px;border-radius:99px;text-decoration:none;font-size:15px">
                  Read the guide →
                </a>
              </p>
              <p style="color:#555;line-height:1.6">If you have any questions about Casa con Vista, just reply to this email.</p>
              <p style="color:#555">See you soon,<br><strong>Luca</strong></p>
              <hr style="margin:32px 0;border:none;border-top:1px solid #eee">
              <p style="color:#aaa;font-size:12px">Casa con Vista · Galleria Bitocchi 5, Porto Recanati (MC)</p>
            </div>
          `,
      });

      console.log("[lead] email guida inviata a", email);
    } catch (err) {
      console.error("[lead] SMTP error", err);
    }
  } else {
    console.warn("[lead] SMTP non configurato — email non inviata");
  }

  return NextResponse.json({ ok: true });
}
