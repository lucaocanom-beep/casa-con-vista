"use client";

import { useId, useState } from "react";
import clsx from "clsx";

// Accordion accessibile.
// - bottoni con aria-expanded + aria-controls
// - pannello region con aria-labelledby
// - animazione fluida via grid-template-rows 0fr → 1fr (niente JS misurazione)
// - mode "single" (default): un solo elemento aperto alla volta
// - mode "multi": più elementi aperti contemporaneamente

export type AccordionItem = {
  q: string;
  a: string;
};

type Props = {
  items: readonly AccordionItem[];
  /** "single": un solo aperto · "multi": apertura libera. Default "single". */
  mode?: "single" | "multi";
  /** indice aperto al mount (default: nessuno) */
  defaultOpen?: number | null;
  className?: string;
};

export function Accordion({
  items,
  mode = "single",
  defaultOpen = null,
  className,
}: Props) {
  const uid = useId();
  const [openSet, setOpenSet] = useState<Set<number>>(() => {
    const s = new Set<number>();
    if (defaultOpen !== null && defaultOpen >= 0) s.add(defaultOpen);
    return s;
  });

  function toggle(i: number) {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        if (mode === "single") next.clear();
        next.add(i);
      }
      return next;
    });
  }

  return (
    <ul
      role="list"
      className={clsx("divide-y divide-pietra-200 border-y border-pietra-200", className)}
    >
      {items.map((item, i) => {
        const isOpen = openSet.has(i);
        const btnId = `${uid}-btn-${i}`;
        const panelId = `${uid}-panel-${i}`;
        return (
          <li key={i}>
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full py-5 flex items-center justify-between gap-6 text-left cursor-pointer focus-visible:outline-none"
              >
                <span className="font-serif text-lg text-pietra-900 leading-snug">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={clsx(
                    "shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-200",
                    isOpen
                      ? "border-adriatico-700 text-adriatico-800 rotate-45"
                      : "border-pietra-300 text-pietra-600"
                  )}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              aria-hidden={!isOpen}
              className={clsx(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pr-12 text-pietra-700 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
