import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Form contatti — invia la richiesta a luca@casaconvistaportorecanati.it via SMTP Aruba.
//
// Env var da impostare su Vercel (Project → Settings → Environment Variables):
//   SMTP_HOST      smtps.aruba.it
//   SMTP_PORT      465
//   SMTP_USER      luca@casaconvistaportorecanati.it
//   SMTP_PASS      (la password della casella email Aruba)

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

  console.log("[contact] new request", { name, email, dates, guests, locale: data.locale });

  const smtpHost = (process.env.SMTP_HOST ?? "").trim();
  const smtpUser = (process.env.SMTP_USER ?? "").trim();
  const smtpPass = (process.env.SMTP_PASS ?? "").trim();
  const smtpPort = parseInt(process.env.SMTP_PORT ?? "465");

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn("[contact] SMTP non configurato — email non inviata");
    return NextResponse.json({ ok: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"Casa con Vista" <${smtpUser}>`,
      to: smtpUser,
      replyTo: email,
      subject: `Nuova richiesta da ${name} — Casa con Vista`,
      html: `
        <h2 style="font-family:Georgia,serif;color:#1a1a2e">Nuova richiesta dal sito</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${dates ? `<p><strong>Date:</strong> ${dates}</p>` : ""}
        ${guests ? `<p><strong>Ospiti:</strong> ${guests}</p>` : ""}
        ${message ? `<p><strong>Messaggio:</strong><br>${message.replace(/\n/g, "<br>")}</p>` : ""}
        <hr style="margin:24px 0;border:none;border-top:1px solid #eee">
        <p style="color:#888;font-size:12px">Rispondi a questa email: la reply va direttamente a ${email}</p>
      `,
    });

    console.log("[contact] email inviata a", smtpUser);
  } catch (err) {
    console.error("[contact] SMTP error", err);
  }

  return NextResponse.json({ ok: true });
}
