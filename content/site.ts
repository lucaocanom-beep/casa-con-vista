// Configurazione "fattuale" del sito: numeri, link, contatti, dati strutturali.
// Modifica qui tutto ciò che è oggettivo (prezzi, capienza, mappa, ecc.).
// I testi lunghi (descrizioni, FAQ, recensioni) stanno in lib/i18n/translations.

export const site = {
  name: "Casa con Vista",
  city: "Porto Recanati",
  province: "MC",
  region: "Marche",
  country: "IT",

  // Indirizzo (per Schema.org / mappa).
  address: {
    street: "Galleria Bitocchi 5",
    postalCode: "62017",
    locality: "Porto Recanati",
    region: "MC",
    country: "IT",
    // Coordinate indicative del centro di Porto Recanati — la mappa visiva usa
    // l'indirizzo testuale di mapEmbed, qui servono solo per i dati strutturati SEO.
    lat: 43.4332,
    lng: 13.6657,
  },

  // Contatti
  contact: {
    email: "info@casaconvistaportorecanati.it",
    phone: "+39 335 1672597",
    whatsappNumber: "+393351672597", // formato internazionale, senza spazi
    whatsappPrefilled: {
      it: "Ciao, potrei avere più info riguardo Casa con Vista a Porto Recanati?",
      en: "Hi, could I have more info about Casa con Vista in Porto Recanati?",
    },
  },

  // CIN — Codice Identificativo Nazionale (obbligatorio per legge sulle locazioni brevi)
  cin: "IT043042C22NTGGGC7",

  // URL pubblico (override via NEXT_PUBLIC_SITE_URL)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://casaconvistaportorecanati.it",

  // Caratteristiche chiave dell'appartamento.
  // I numeri compaiono in Hero/Servizi/Casa e nei dati strutturati SEO.
  facts: {
    bedrooms: 2,
    bathrooms: 1,
    sleeps: 3,
    sizeSqm: 65,
    floor: 6,
    elevator: true,
    seaViewDistanceMeters: 50, // distanza in linea d'aria dal mare
  },

  // Mappa: src per <iframe>. Punta all'indirizzo esatto.
  mapEmbed:
    "https://www.google.com/maps?q=Galleria+Bitocchi+5,+62017+Porto+Recanati+MC,+Italia&z=19&output=embed",

  // Prezzi indicativi per notte (€). Adatta liberamente, le card li leggono da qui.
  pricing: [
    { id: "low", priceFrom: 80 },
    { id: "mid", priceFrom: 120 },
    { id: "high", priceFrom: 180 },
  ],

  // Servizi/highlights — l'ordine qui è l'ordine nella griglia.
  // L'icona è scelta dal componente Icon via la chiave `icon`.
  services: [
    { id: "seaview", icon: "wave", highlight: true },
    { id: "ac", icon: "snowflake", highlight: true },
    { id: "wifi", icon: "wifi", highlight: true },
    { id: "kitchen", icon: "kitchen", highlight: false },
    { id: "washer", icon: "washer", highlight: false },
    { id: "parking", icon: "parking", highlight: false },
    { id: "tv", icon: "tv", highlight: false },
    { id: "linens", icon: "linens", highlight: false },
  ] as const,

  // Ambienti — il copy (nome/descrizione) sta nei dict per id.
  rooms: [
    { id: "living", icon: "sofa" },
    { id: "bedroom1", icon: "bed" },
    { id: "bedroom2", icon: "bed" },
    { id: "bathroom", icon: "bath" },
    { id: "kitchen", icon: "kitchen" },
    { id: "balcony", icon: "wave" },
  ] as const,

  // Punti di interesse vicini — distanza approssimata (m a piedi / km in auto).
  // I nomi/descrizioni traducibili stanno nei dict.
  nearby: [
    { id: "beach", distance: "50 m", mode: "walk" },
    { id: "center", distance: "400 m", mode: "walk" },
    { id: "restaurants", distance: "200 m", mode: "walk" },
    { id: "conero", distance: "20 km", mode: "drive" },
    { id: "loreto", distance: "10 km", mode: "drive" },
    { id: "recanati", distance: "15 km", mode: "drive" },
  ] as const,

  // Galleria — l'ordine qui = l'ordine nella griglia.
  // src va sostituito con i file reali in /public/images.
  // L'alt traducibile sta nei dict (chiave = id).
  gallery: [
    { id: "vista", src: "/images/hero-vista-mare.jpg", aspect: "wide" },
    { id: "living", src: "/images/soggiorno.jpg", aspect: "tall" },
    { id: "bedroom1", src: "/images/camera-1.jpg", aspect: "square" },
    { id: "bedroom2", src: "/images/camera-2.jpg", aspect: "square" },
    { id: "kitchen", src: "/images/cucina.jpg", aspect: "wide" },
    { id: "bathroom", src: "/images/bagno.jpg", aspect: "tall" },
    { id: "balcony", src: "/images/terrazzo.jpg", aspect: "wide" },
    { id: "tramonto", src: "/images/tramonto.jpg", aspect: "square" },
  ] as const,
} as const;

// Sezioni del sito: ordine, id ancora, chiave i18n per il label di navigazione.
// Single source of truth: header, page e footer leggono da qui.
export const sections = [
  { id: "hero", navKey: "hero" },
  { id: "luogo", navKey: "luogo" },
  { id: "galleria", navKey: "galleria" },
  { id: "servizi", navKey: "servizi" },
  { id: "casa", navKey: "casa" },
  { id: "posizione", navKey: "posizione" },
  { id: "prezzi", navKey: "prezzi" },
  { id: "recensioni", navKey: "recensioni" },
  { id: "faq", navKey: "faq" },
  { id: "contatti", navKey: "contatti" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
export type ServiceId = (typeof site.services)[number]["id"];
export type RoomId = (typeof site.rooms)[number]["id"];
export type NearbyId = (typeof site.nearby)[number]["id"];
export type PricingId = (typeof site.pricing)[number]["id"];
export type GalleryId = (typeof site.gallery)[number]["id"];
