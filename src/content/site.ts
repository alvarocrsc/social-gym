import type { Site } from "@/types/content";

/**
 * Business facts, single source of truth. Values here must match the Google
 * Business Profile character for character (§8.8).
 *
 * Empty strings are unresolved client questions (§20), not oversights — a
 * plausible-looking placeholder ends up in production structured data.
 */
export const site = {
  name: "Social Gym",
  legalName: "PUMP GYM S.L.",
  nif: "B72749559",
  tagline: "Mambo, eat & repeat",
  foundingYear: 2022,
  url: process.env.NEXT_PUBLIC_SITE_URL, // TODO: confirm — domain not yet owned
  phone: "+34941051433",
  phoneDisplay: "941 05 14 33",
  whatsapp: "", // TODO: confirm — same number on WhatsApp Business?
  email: "socialgymoficial@gmail.com", // temporary, corporate address pending
  address: {
    street: "C. Viacampo, 12 bis",
    locality: "Calahorra",
    region: "La Rioja",
    postalCode: "26500",
    country: "ES",
    lat: 42.309606,
    lng: -1.9585302,
  },
  googlePlaceId: "ChIJh0UpYs6PWg0R5vxEOrI1YZw",
  // Display only — never emitted as aggregateRating (hard rule 7).
  reviews: { rating: 4.9, count: 102, source: "Google" },
  socials: { instagram: "https://instagram.com/socialgym.es" },
  // TODO: confirm — exact store URLs
  app: { provider: "Virtuagym", appStore: "https://apps.apple.com/es/app/social-gym/id6759244895", googlePlay: "https://play.google.com/store/apps/details?id=digifit.android.virtuagym.pro.socialgym2&pcampaignid=web_share" },
  virtuagym: {
    shopEmbedUrl:
      "https://socialgym.virtuagym.com/webshop/?club=di9xYmQzNTNZT0Q4UEZMRXRnM0dadz09&embedded=1",
    shopUrl: "", // TODO: confirm — hosted shop URL, the cookie-rejected fallback
  },
  areaServed: [
    "Calahorra",
    "Rincón de Soto",
    "Autol",
    "Aldeanueva de Ebro",
    "Alfaro",
    "Pradejón",
    "Arnedo",
  ],
} as const satisfies Site;
