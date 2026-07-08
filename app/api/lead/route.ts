import { NextResponse } from "next/server";

// Popup guida — aggiunge subscriber a MailerLite.
// L'invio email è gestito interamente da MailerLite Automations.
//
// Env var da impostare su Vercel:
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

  if (!name || name.length < 2) return bad("Name is required");
  if (!email || !EMAIL_RE.test(email)) return bad("Valid email is required");

  console.log("[lead] guida richiesta", { name, email });

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

  return NextResponse.json({ ok: true });
}
