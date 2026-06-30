import { NextResponse } from "next/server";

// Endpoint del popup "guida gratuita" (lead magnet).
//
// Comportamento attuale: validazione del payload + log a console (mock).
// Per attivare l'invio reale della guida via email: vedi il blocco
// "TODO: invio email" in fondo (stesso pattern di app/api/contact/route.ts).

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

  if (!name || name.length < 2) return bad("Name is required");
  if (!email || !EMAIL_RE.test(email)) return bad("Valid email is required");

  console.log("[lead] guida richiesta", {
    name,
    email,
    locale: data.locale,
    at: new Date().toISOString(),
  });

  // TODO: invio email reale con il link alla guida + aggiunta a una mailing list.
  // Esempio Resend:
  //   const { Resend } = await import("resend");
  //   const resend = new Resend(process.env.RESEND_API_KEY!);
  //   await resend.emails.send({
  //     from: process.env.CONTACT_FROM_EMAIL!,
  //     to: email,
  //     subject: "La tua guida di Porto Recanati e delle Marche",
  //     text: `Ciao ${name}, ecco la guida: ${process.env.NEXT_PUBLIC_SITE_URL}/guida`,
  //   });

  return NextResponse.json({ ok: true });
}
