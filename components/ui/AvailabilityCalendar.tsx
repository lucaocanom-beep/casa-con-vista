"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Props = { dict: Dictionary };

type BusyRange = { start: string; end: string };
type FetchState = "loading" | "ok" | "error";

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function isoOf(year: number, month: number, day: number): string {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function isBusy(iso: string, busy: BusyRange[]): boolean {
  return busy.some((r) => iso >= r.start && iso <= r.end);
}

// Griglia di un singolo mese: celle vuote per l'offset + una per ogni giorno.
function buildMonthCells(year: number, month: number): (number | null)[] {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // lun=0..dom=6
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array.from({ length: firstWeekday }, () => null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function MonthGrid({
  year,
  month,
  busy,
  today,
  dict,
}: {
  year: number;
  month: number;
  busy: BusyRange[];
  today: string;
  dict: Dictionary;
}) {
  const cells = buildMonthCells(year, month);
  const cal = dict.disponibilita.calendar;

  return (
    <div className="flex-1 min-w-0">
      <p className="text-center font-serif text-xl text-pietra-950 mb-4">
        {cal.months[month]} {year}
      </p>
      <table className="w-full border-collapse" aria-label={`${cal.months[month]} ${year}`}>
        <thead>
          <tr>
            {cal.weekdays.map((w) => (
              <th
                key={w}
                scope="col"
                className="text-[11px] uppercase tracking-widest2 text-pietra-500 font-normal pb-2"
              >
                {w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(cells.length / 7) }, (_, row) => (
            <tr key={row}>
              {cells.slice(row * 7, row * 7 + 7).map((day, i) => {
                if (day === null) return <td key={i} className="p-1" />;
                const iso = isoOf(year, month, day);
                const past = iso < today;
                const busyDay = isBusy(iso, busy);
                const status = past ? cal.legendPast : busyDay ? cal.legendBusy : cal.legendFree;

                return (
                  <td key={i} className="p-1 text-center">
                    <span
                      className={clsx(
                        "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm",
                        past && "text-pietra-300",
                        !past && busyDay && "bg-pietra-200 text-pietra-400",
                        !past && !busyDay && "bg-white ring-1 ring-pietra-200 text-pietra-900"
                      )}
                    >
                      <span aria-hidden>{day}</span>
                      <span className="sr-only"> — {status}</span>
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AvailabilityCalendar({ dict }: Props) {
  const [state, setState] = useState<FetchState>("loading");
  const [busy, setBusy] = useState<BusyRange[]>([]);
  const [offset, setOffset] = useState(0); // mesi di scorrimento da oggi

  useEffect(() => {
    let cancelled = false;
    fetch("/api/availability")
      .then((res) => res.json())
      .then((data: { ok: boolean; busy: BusyRange[] }) => {
        if (cancelled) return;
        if (data.ok) {
          setBusy(data.busy);
          setState("ok");
        } else {
          setState("error");
        }
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const cal = dict.disponibilita.calendar;
  const today = todayIso();
  const now = new Date();
  const baseYear = now.getFullYear();
  const baseMonth = now.getMonth();

  function shiftedMonth(add: number) {
    const total = baseMonth + offset + add;
    const year = baseYear + Math.floor(total / 12);
    const month = ((total % 12) + 12) % 12;
    return { year, month };
  }

  const first = shiftedMonth(0);
  const second = shiftedMonth(1);

  if (state === "error") {
    return (
      <p className="text-pietra-600 text-center py-8" role="status">
        {cal.unavailableMessage}
      </p>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => setOffset((o) => o - 1)}
          disabled={offset === 0}
          aria-label={cal.prevMonth}
          className="h-9 w-9 rounded-full ring-1 ring-pietra-200 flex items-center justify-center text-pietra-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-pietra-50 transition-colors"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => setOffset((o) => o + 1)}
          aria-label={cal.nextMonth}
          className="h-9 w-9 rounded-full ring-1 ring-pietra-200 flex items-center justify-center text-pietra-700 hover:bg-pietra-50 transition-colors"
        >
          ›
        </button>
      </div>

      {state === "loading" ? (
        <div className="py-16 text-center text-pietra-400 text-sm" role="status">
          …
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-6">
          <MonthGrid year={first.year} month={first.month} busy={busy} today={today} dict={dict} />
          <div className="hidden sm:block">
            <MonthGrid year={second.year} month={second.month} busy={busy} today={today} dict={dict} />
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs text-pietra-500">
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-3 w-3 rounded-full bg-white ring-1 ring-pietra-200" />
          {cal.legendFree}
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-3 w-3 rounded-full bg-pietra-200" />
          {cal.legendBusy}
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-3 w-3 rounded-full bg-pietra-100" />
          {cal.legendPast}
        </span>
      </div>
    </div>
  );
}
