import { NextResponse } from "next/server";

// Disponibilità — legge il feed iCal di Airbnb lato server e restituisce
// gli intervalli occupati. L'URL del feed (con token) resta solo in env,
// non deve mai raggiungere il client.
//
// Env var da impostare su Vercel:
//   AIRBNB_ICAL_URL   URL del feed .ics esportato da Airbnb (Calendario → Esporta)

export const runtime = "nodejs";

type BusyRange = { start: string; end: string }; // date pure "YYYY-MM-DD", end incluso (ultima notte)

// Estrae un singolo campo DTSTART/DTEND da un blocco VEVENT.
// Il feed Airbnb usa sempre date pure: DTSTART;VALUE=DATE:20260801
function extractDate(block: string, field: "DTSTART" | "DTEND"): string | null {
  const re = new RegExp(`${field}(?:;[^:\\r\\n]*)?:(\\d{8})`);
  const match = block.match(re);
  if (!match) return null;
  const raw = match[1];
  return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
}

function addDays(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function parseIcal(raw: string): BusyRange[] {
  const ranges: BusyRange[] = [];
  const blocks = raw.split("BEGIN:VEVENT").slice(1);

  for (const block of blocks) {
    const dtstart = extractDate(block, "DTSTART");
    const dtend = extractDate(block, "DTEND");
    if (!dtstart || !dtend) continue;

    // DTEND in iCal è esclusivo: l'ultima notte occupata è il giorno prima.
    const lastNight = addDays(dtend, -1);
    ranges.push({ start: dtstart, end: lastNight });
  }

  return ranges;
}

export async function GET() {
  const icalUrl = (process.env.AIRBNB_ICAL_URL ?? "").trim();

  if (!icalUrl) {
    console.warn("[availability] AIRBNB_ICAL_URL non configurato");
    return NextResponse.json({ ok: false, busy: [] }, { status: 200 });
  }

  try {
    const res = await fetch(icalUrl, { next: { revalidate: 21600 } }); // 6h

    if (!res.ok) {
      console.error("[availability] fetch feed fallito", res.status);
      return NextResponse.json({ ok: false, busy: [] }, { status: 200 });
    }

    const raw = await res.text();
    const busy = parseIcal(raw);

    return NextResponse.json({ ok: true, busy });
  } catch (err) {
    console.error("[availability] errore parsing feed", err);
    return NextResponse.json({ ok: false, busy: [] }, { status: 200 });
  }
}
