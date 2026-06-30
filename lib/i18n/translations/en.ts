// EN translations. The shape must match it.ts (enforced by the Dictionary type).

import type { it as ItDict } from "./it";

export const en: typeof ItDict = {
  meta: {
    title: "Casa con Vista — Sea-view apartment in Porto Recanati",
    description:
      "Sea-view apartment in Porto Recanati: two bedrooms, air conditioning, WiFi, steps from the beach. Book directly with us — no OTA fees.",
  },

  nav: {
    hero: "Home",
    luogo: "The place",
    galleria: "Gallery",
    servizi: "Highlights",
    casa: "The house",
    posizione: "Location",
    prezzi: "Rates",
    recensioni: "Reviews",
    faq: "FAQ",
    contatti: "Contact",
    ctaPrimary: "Check availability",
    ctaPrimaryShort: "Book",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  hero: {
    eyebrow: "Porto Recanati · Marche",
    title: "Casa con Vista",
    subtitle:
      "Facing the Adriatic, with the Conero on the horizon. A bright apartment a few steps from the beach.",
    facts: "2 bedrooms · sleeps 3 · sea view · A/C · WiFi",
    cta: "Check availability",
    ctaSecondary: "Discover the house",
    scrollHint: "Scroll to explore",
  },

  luogo: {
    eyebrow: "The place",
    title: "Where Marche meets the sea",
    lead: "Porto Recanati is a rare balance: a town that tastes of salt and seafront, set between Mount Conero to the north and the long beaches that stretch southwards.",
    body: [
      "In the morning the fishermen sail back into the small harbour, sunlight slants across the old town's façades, and the coffee in Piazza Brancondi tastes of warm brioche. A few steps away the beach opens wide and tidy, perfect to cycle for miles.",
      "From here the distances that matter are short. The hill towns of the Marche — Loreto, Recanati, Macerata — are half-day trips. The Conero park, with its white pebble coves and clifftop trails, is twenty minutes by car. And at sundown the Adriatic reminds you why you chose to stay right here.",
    ],
    pull: "A view that changes with every hour of the day.",
  },

  galleria: {
    eyebrow: "Gallery",
    title: "A look around",
    body: "Photos of the rooms, the view and the small details that make this stay its own thing. Tap an image to enlarge it.",
    openImage: "Open image",
    lightbox: {
      prev: "Previous image",
      next: "Next image",
      close: "Close",
    },
    captions: {
      vista: "The view from the balcony at sunset",
      living: "The bright living room",
      bedroom1: "Master bedroom",
      bedroom2: "Second bedroom",
      kitchen: "Fully equipped kitchen",
      bathroom: "Bathroom",
      balcony: "Sea-view balcony",
      tramonto: "The Adriatic at sunset",
    },
  },

  servizi: {
    eyebrow: "Highlights",
    title: "Everything you need to feel at home",
    body: "The essentials, done right: the view, the cool air, a fast connection. And the rest, so you can settle in.",
    items: {
      seaview: {
        label: "Sea view",
        desc: "Direct view over the Adriatic from balcony and living room.",
      },
      ac: {
        label: "Air conditioning",
        desc: "Heating and cooling in every room.",
      },
      wifi: {
        label: "Fast WiFi",
        desc: "Fibre connection, fine for remote work too.",
      },
      kitchen: {
        label: "Equipped kitchen",
        desc: "Hob, oven, moka pot and a full set of cookware.",
      },
      washer: {
        label: "Washing machine",
        desc: "Great for longer stays — fresh laundry whenever you need it.",
      },
      parking: {
        label: "Parking",
        desc: "Free public street parking right in front of the building.",
      },
      tv: {
        label: "Smart TV",
        desc: "Large screen, Netflix and free-to-air channels.",
      },
      linens: {
        label: "Linens included",
        desc: "Bed linen and bath towels ready on arrival.",
      },
    },
  },

  casa: {
    eyebrow: "The house",
    title: "Two bedrooms, one view, the right amount of space",
    intro:
      "Sixty-five square metres on the sixth floor with lift, designed for three. Each room is meant for staying put a while, calmly.",
    rooms: {
      living: {
        label: "Living room",
        desc: "Comfy sofa, dining table, large windows on the sea.",
      },
      bedroom1: {
        label: "Master bedroom",
        desc: "King-size bed, roomy wardrobe, blackout curtains.",
      },
      bedroom2: {
        label: "Second bedroom",
        desc: "One single bed — ideal for a third guest, a child or a friend.",
      },
      bathroom: {
        label: "Bathroom",
        desc: "Newly renovated, with shower, hairdryer and a window for fresh air.",
      },
      kitchen: {
        label: "Kitchen",
        desc: "Full cooking corner: hob, oven, fridge and a complete set of cookware.",
      },
      balcony: {
        label: "Sea-view balcony",
        desc: "Small table and seats for breakfast over the Adriatic.",
      },
    },
    factsLabel: {
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      sleeps: "Sleeps",
      size: "Size",
      floor: "Floor",
      sqm: "sqm",
    },
  },

  posizione: {
    eyebrow: "Location",
    title: "Right by the sea, close to everything",
    body: "On Porto Recanati's seafront, with the beach less than a minute away and the old town within walking distance. A car makes it easy to explore the Conero, the hill towns and the small treasures inland.",
    mapAria: "Map of Porto Recanati",
    modes: { walk: "on foot", drive: "by car" },
    nearby: {
      beach: {
        label: "Beach",
        desc: "Fine sand and pebbles, lidos and free stretches.",
      },
      center: {
        label: "Old town",
        desc: "Piazza Brancondi, restaurants, gelaterias, Thursday market.",
      },
      restaurants: {
        label: "Restaurants",
        desc: "Adriatic seafood, the local brodetto fish stew.",
      },
      conero: {
        label: "Conero coast",
        desc: "White coves, clifftop trails, Sirolo and Numana.",
      },
      loreto: {
        label: "Loreto",
        desc: "The Basilica of the Holy House, a pilgrimage site.",
      },
      recanati: {
        label: "Recanati",
        desc: "Leopardi's town, with its view onto the infinite.",
      },
    },
  },

  prezzi: {
    eyebrow: "Rates",
    title: "Transparent seasons, direct booking",
    body: "Booking through this site means talking directly with us: no fees, clearer prices, a reply the same day.",
    perNight: "per night",
    from: "from",
    seasons: {
      low: {
        label: "Low season",
        months: "November — March",
      },
      mid: {
        label: "Mid season",
        months: "April, May, October",
      },
      high: {
        label: "High season",
        months: "June — September",
      },
    },
    advantages: [
      "No OTA fees",
      "Same-day direct reply",
      "Long stays: ask for a tailored discount",
    ],
    ctaNote: "For a quote on specific dates, write to us below.",
  },

  recensioni: {
    eyebrow: "Reviews",
    title: "What past guests say",
    body: "A few words from recent guests.",
    items: [
      {
        quote:
          "A view to wake up smiling to. The apartment is thoughtful in every detail, and the location is unbeatable: the sea right below, restaurants two steps away.",
        author: "Giulia & Marco",
        location: "Bologna",
        date: "July 2025",
      },
      {
        quote:
          "Back for the second year. The balcony at sunset alone is worth the trip. The hosts are attentive and easy to reach.",
        author: "The Ricci family",
        location: "Milan",
        date: "August 2025",
      },
      {
        quote:
          "Quiet and cool even in mid-August. Perfect base for the Conero and Loreto. We'll book again.",
        author: "Anna",
        location: "Turin",
        date: "August 2025",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "The questions we get most",
    body: "Anything missing? Just write — we reply the same day.",
    items: [
      // Sea view
      {
        q: "Does the apartment have a sea view?",
        a: "Yes. The apartment has a direct, front-facing view over the Adriatic, visible from the living room, the bedrooms and the terrace.",
      },
      {
        q: "Can you see the sea from inside as well?",
        a: "Yes. The sea is visible right through the windows of the living room and the bedrooms — even while sitting on the sofa or lying in bed.",
      },
      {
        q: "Is the view front-facing or side-on?",
        a: "The view is front-facing and unobstructed, with no buildings in the way to the east.",
      },
      // Who it's suited for
      {
        q: "Is the apartment suitable for couples?",
        a: "Yes. Guests in couples particularly love it for the light, the quiet and the intimate atmosphere.",
      },
      {
        q: "Is it suitable for older guests?",
        a: "Yes — it's a good choice for older guests too: the building has a lift and there are only 4 steps to reach it.",
      },
      {
        q: "Is it suitable for families with children?",
        a: "Yes — we provide a travel cot and a high chair on request, at no extra cost.",
      },
      // Location & access
      {
        q: "Which floor is the apartment on?",
        a: "The apartment is on the sixth floor and is served by a lift. Past the main entrance there are only 4 steps to climb on foot.",
      },
      {
        q: "Can you reach the town centre on foot?",
        a: "Yes. The apartment is right in the centre of Porto Recanati — no car needed.",
      },
      {
        q: "Is the area quiet?",
        a: "Yes. Despite being central, the area is generally quiet, especially in the evening.",
      },
      {
        q: "How do you reach the apartment?",
        a: "The apartment is easy to reach by both car and train. Porto Recanati railway station is about four minutes away on foot.",
      },
      {
        q: "Is there parking nearby?",
        a: "Yes — there is free unassigned street parking in the area.",
      },
      // Comfort
      {
        q: "Is the apartment bright?",
        a: "Very. Sunlight pours in from the sea-facing side until around 1 pm. From about 2:30 pm onwards, light keeps coming in from the opposite side.",
      },
      {
        q: "Can you have breakfast with a sea view?",
        a: "Yes. Both the terrace and the indoor rooms let you enjoy the sea view at meal times too.",
      },
      {
        q: "What kind of beds are there?",
        a: "Both the double bed and the single bed have medium-firm mattresses, much appreciated by guests.",
      },
      {
        q: "Is it suitable for remote working?",
        a: "Yes. The Wi-Fi is stable and the apartment is quiet during the day.",
      },
      {
        q: "Is it quiet in the evening?",
        a: "Generally yes. The apartment also suits light sleepers.",
      },
      {
        q: "Can you hear the train?",
        a: "No — train noise is almost imperceptible from inside the apartment.",
      },
      // Practical
      {
        q: "What are check-in and check-out times?",
        a: "Check-in from 3:00 pm, check-out by 10:00 am. We'll do our best with different times — just ask in advance.",
      },
      {
        q: "Are pets allowed?",
        a: "Yes, small and medium-sized dogs are welcome. Please mention the weight when you book.",
      },
      {
        q: "Is the final cleaning included?",
        a: "Yes, final cleaning is always included, and so is the linen.",
      },
      {
        q: "What is the cancellation policy?",
        a: "Free cancellation up to 14 days before arrival. For later changes, get in touch — we'll find a solution case by case.",
      },
      {
        q: "Can I pay on arrival?",
        a: "We accept bank transfer at booking and the balance on arrival, or card via secure link.",
      },
    ],
  },

  contatti: {
    eyebrow: "Contact",
    title: "Drop us a line — we reply the same day",
    body: "Tell us when you'd like to come and how many you are: we'll send availability and a quote within hours. No middlemen.",
    whatsappFloatAria: "Message us on WhatsApp",
    form: {
      name: "Name",
      email: "Email",
      dates: "Dates",
      datesPlaceholder: "e.g. 12 — 19 July",
      guests: "Guests",
      message: "Message",
      messagePlaceholder: "A few details about your stay, questions, special needs…",
      submit: "Send request",
      submitting: "Sending…",
      success: "Thanks — we've received your request and will reply shortly.",
      error: "Something went wrong. Please try again or message us on WhatsApp.",
      consentLabel:
        "I agree to my data being used solely to answer this enquiry.",
    },
    channels: {
      whatsappLabel: "WhatsApp",
      whatsappAction: "Open WhatsApp",
      emailLabel: "Email",
      phoneLabel: "Phone",
      hoursLabel: "Hours",
      hoursValue: "Mon — Sun · 9:00 — 21:00",
    },
  },

  leadMagnet: {
    eyebrow: "Free guide",
    title: "The Marche you won't find on Google",
    body: "Small beaches where you can find peace, authentic places to eat well, and corners of the region that first-time visitors always miss.",
    bodyCta: "If you want to experience Porto Recanati like a local, leave your name and email: we'll send you the full guide right away.",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "Your email",
    submit: "I want the guide",
    submitting: "One moment…",
    success: "Done! You're about to be redirected to the guide.",
    error: "Something went wrong. Please try again shortly.",
    consent: "I agree to receive the guide by email.",
    dismiss: "I already know the area well",
    close: "Close",
  },

  footer: {
    tagline: "Sea-view apartment in Porto Recanati. Book directly.",
    cinLabel: "CIN",
    cinPlaceholder: "[TO BE ADDED]",
    rights: "All rights reserved.",
    legal: {
      privacy: "Privacy",
      cookies: "Cookies",
    },
  },

  langToggle: {
    aria: "Switch language",
  },

  a11y: {
    skipToContent: "Skip to main content",
  },
};
