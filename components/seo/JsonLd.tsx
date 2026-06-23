import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// Dati strutturati Schema.org per l'appartamento.
// Tipo: LodgingBusiness con sottoclasse VacationRental (più adatta agli affitti brevi).
// I motori di ricerca usano questi dati per rich result e knowledge panel.

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function JsonLd({ locale, dict }: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "VacationRental"],
    "@id": `${site.url}/${locale}#lodging`,
    name: site.name,
    description: dict.meta.description,
    url: `${site.url}/${locale}`,
    image: `${site.url}/${locale}/opengraph-image`,
    telephone: site.contact.phone,
    email: site.contact.email,
    inLanguage: locale === "it" ? "it-IT" : "en-US",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.lat,
      longitude: site.address.lng,
    },
    numberOfBedrooms: site.facts.bedrooms,
    numberOfBathroomsTotal: site.facts.bathrooms,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: site.facts.sleeps,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: site.facts.sizeSqm,
      unitCode: "MTK", // metri quadri
    },
    petsAllowed: true,
    smokingAllowed: false,
    amenityFeature: site.services.map((s) => ({
      "@type": "LocationFeatureSpecification",
      name: dict.servizi.items[s.id as keyof typeof dict.servizi.items].label,
      value: true,
    })),
    priceRange: `€${site.pricing[0].priceFrom}-${site.pricing[site.pricing.length - 1].priceFrom}`,
    offers: site.pricing.map((p) => ({
      "@type": "Offer",
      name: dict.prezzi.seasons[p.id as keyof typeof dict.prezzi.seasons].label,
      price: p.priceFrom,
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.priceFrom,
        priceCurrency: "EUR",
        unitText: "NIGHT",
      },
    })),
    identifier: {
      "@type": "PropertyValue",
      propertyID: "CIN",
      value: site.cin,
    },
  };

  return (
    <script
      type="application/ld+json"
      // dangerouslySetInnerHTML: l'unico modo accettato per iniettare JSON-LD;
      // i dati sono interamente generati lato server da fonti fidate.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
