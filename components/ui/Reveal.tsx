"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Reveal: wrapper che applica un fade/slide leggero quando l'elemento
// entra nel viewport. Discreto, niente over-animation.
//
// - usa IntersectionObserver (no ascolto continuo dello scroll)
// - osserva una sola volta poi si disconnette
// - rispetta prefers-reduced-motion (utility motion-reduce di Tailwind)
// - delay opzionale per stagger su liste

type Props = {
  children: React.ReactNode;
  className?: string;
  /** millisecondi di delay sul fade — utile per stagger */
  delay?: number;
  /** offset di trigger: -10% = parte quando manca il 10% perché sia centrato */
  rootMargin?: string;
  /** se true, mantiene l'animazione anche dopo lo scroll out */
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  rootMargin = "0px 0px -8% 0px",
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Se l'utente ha richiesto reduced motion, niente animazione: mostra subito.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          setShown(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold: 0.12, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, once]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={clsx(
        "transition-all duration-700 ease-out will-change-transform",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        "motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100",
        className
      )}
    >
      {children}
    </div>
  );
}
