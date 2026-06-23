"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Lightbox modale accessibile.
// - ESC chiude, ← → navigano
// - focus trap entro i controlli
// - blocca lo scroll del body quando aperto
// - i contenuti dell'immagine sono passati come render-prop così
//   da supportare sia placeholder che <Image> reali quando arriveranno

export type LightboxItem = {
  id: string;
  caption: string;
};

type Props = {
  items: readonly LightboxItem[];
  /** indice attivo (null = chiuso) */
  index: number | null;
  onClose: () => void;
  onChange: (next: number) => void;
  /** etichette i18n */
  labels: {
    prev: string;
    next: string;
    close: string;
  };
  /** Render dell'immagine per un dato indice — restituisce qualcosa di renderizzabile (placeholder/Image) */
  renderItem: (item: LightboxItem, index: number) => React.ReactNode;
};

export function Lightbox({ items, index, onClose, onChange, labels, renderItem }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const isOpen = index !== null;
  const current = isOpen ? items[index] : null;

  const goPrev = useCallback(() => {
    if (index === null) return;
    onChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onChange]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onChange((index + 1) % items.length);
  }, [index, items.length, onChange]);

  // Tastiera globale quando aperto
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, goPrev, goNext]);

  // Body scroll lock + focus iniziale
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // focus sul pulsante chiudi all'apertura
    requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !current) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={current.caption}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm animate-fade-in-up"
      onClick={(e) => {
        // click sullo sfondo (non sul contenuto) chiude
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Chiudi */}
      <button
        ref={closeBtnRef}
        type="button"
        onClick={onClose}
        aria-label={labels.close}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 h-11 w-11 inline-flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:bg-white/20 transition-colors"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {/* Prev */}
      <button
        type="button"
        onClick={goPrev}
        aria-label={labels.prev}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 inline-flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:bg-white/20 transition-colors"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={goNext}
        aria-label={labels.next}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 inline-flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:bg-white/20 transition-colors"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      {/* Contenuto */}
      <figure className="relative w-full max-w-5xl mx-auto px-4 sm:px-12">
        <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-2xl">
          {renderItem(current, index!)}
        </div>
        <figcaption className="mt-4 text-center text-sm text-white/80">
          {current.caption}
          <span className="ml-3 text-white/40 font-mono">
            {index! + 1} / {items.length}
          </span>
        </figcaption>
      </figure>
    </div>,
    document.body
  );
}
