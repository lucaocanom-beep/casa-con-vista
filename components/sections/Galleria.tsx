"use client";

import { useState } from "react";
import { site } from "@/content/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Section } from "@/components/ui/Section";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import clsx from "clsx";

const aspectClass: Record<string, string> = {
  wide: "aspect-[4/3] sm:row-span-1 sm:col-span-2",
  tall: "aspect-[3/4] sm:row-span-2",
  square: "aspect-square",
};

// Placeholder visivo: finché non ci sono le foto, ogni immagine usa una
// combinazione di gradient deterministica per dare varietà visiva.
const placeholders = [
  "from-adriatico-200 via-adriatico-100 to-sabbia-100",
  "from-sabbia-200 via-schiuma-100 to-adriatico-100",
  "from-adriatico-300 via-adriatico-100 to-schiuma-100",
  "from-sabbia-100 via-adriatico-100 to-adriatico-200",
  "from-schiuma-200 via-sabbia-100 to-adriatico-100",
  "from-adriatico-100 via-sabbia-200 to-sabbia-100",
  "from-adriatico-200 via-adriatico-100 to-sabbia-200",
  "from-sabbia-300 via-sabbia-100 to-adriatico-100",
];

function ImagePlaceholder({ index, className }: { index: number; className?: string }) {
  const grad = placeholders[index % placeholders.length];
  return (
    <div
      aria-hidden
      className={clsx("absolute inset-0 bg-gradient-to-br", grad, className)}
    />
  );
}

export function Galleria({ dict }: { dict: Dictionary }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items: LightboxItem[] = site.gallery.map((img) => ({
    id: img.id,
    caption:
      dict.galleria.captions[img.id as keyof typeof dict.galleria.captions] ?? "",
  }));

  return (
    <Section
      id="galleria"
      eyebrow={dict.galleria.eyebrow}
      title={dict.galleria.title}
      tone="white"
    >
      <p className="max-w-prose text-lg text-pietra-700 leading-relaxed mb-10">
        {dict.galleria.body}
      </p>

      <ul
        role="list"
        className="grid grid-cols-2 sm:grid-cols-4 auto-rows-fr gap-3 sm:gap-4"
      >
        {site.gallery.map((img, i) => {
          const caption = items[i].caption;
          return (
            <li key={img.id} className={clsx("relative", aspectClass[img.aspect] ?? "aspect-square")}>
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`${dict.galleria.openImage}: ${caption}`}
                className="group absolute inset-0 overflow-hidden rounded-lg ring-1 ring-pietra-200/60 focus-visible:ring-2 focus-visible:ring-adriatico-600 cursor-zoom-in"
              >
                {/* Placeholder finché non c'è la foto reale.
                    Per usare le foto: sostituire questo blocco con
                      <Image src={img.src} alt={caption} fill sizes="..." className="object-cover" />
                */}
                <ImagePlaceholder index={i} />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
                />
                <span className="absolute bottom-0 inset-x-0 p-3 text-xs sm:text-sm text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity text-left">
                  {caption}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <Lightbox
        items={items}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
        labels={dict.galleria.lightbox}
        renderItem={(_, i) => (
          // Placeholder grande — sostituire con <Image> reale quando le foto saranno disponibili
          <>
            <ImagePlaceholder index={i} />
            <span className="absolute inset-0 flex items-center justify-center text-white/40 text-sm font-mono">
              {site.gallery[i].src}
            </span>
          </>
        )}
      />
    </Section>
  );
}
