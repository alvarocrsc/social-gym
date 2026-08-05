import type { PageSeo } from "./seo";

/** Day codes for the weekly timetable, Monday first. */
export type DayCode = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";

/** An image with the alt text it must always carry (§12). */
export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** A question and its answer. Feeds both page copy and `FAQPage` JSON-LD. */
export interface FaqItem {
  question: string;
  answer: string;
}

/** One of the six training disciplines. Order 1 is Hyrox (§7.2). */
export interface Discipline {
  slug: string; // 'entrenamiento-funcional'
  /** English URL segment, used only by `routing.ts` pathnames. */
  enSlug: string; // 'functional-training'
  name: string; // 'Funcional'
  code: string; // '[FNL]'
  order: number; // Display order — Hyrox first
  shortDescription: string; // Home card
  longDescription: string; // Discipline page body
  forWho: string;
  sessionLooksLike: string[];
  level: "todos" | "iniciacion" | "avanzado";
  image: ImageAsset;
  gallery?: ImageAsset[];
  coachSlugs: string[];
  faq: FaqItem[];
  seo: PageSeo;
}

/** A coach. Never populated without confirmed spelling, role and photo consent (§7.3). */
export interface Coach {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: ImageAsset;
  disciplineSlugs: string[];
}

/** An opening-hours band. Feeds `openingHoursSpecification` JSON-LD. */
export interface ScheduleBlock {
  /** Days this band applies to. */
  days: DayCode[];
  /** Human label for the page, e.g. 'Lunes a viernes'. */
  label: string;
  opens: string; // '06:00'
  closes: string; // '01:00'
}

/** One class in the weekly timetable rendered at /horarios. */
export interface ClassSlot {
  day: DayCode; // 'Mo' … 'Su'
  start: string; // '18:00'
  durationMin: number;
  disciplineSlug: string;
  coachSlug?: string;
}

/** A membership plan. Prices must match Virtuagym exactly — never invented. */
export interface MembershipPlan {
  slug: string;
  name: string;
  /** Euros per period. `null` until the client confirms (§20 blocking item 2). */
  price: number | null;
  period: "mes" | "trimestre" | "año" | "sesion";
  description: string;
  features: string[];
  highlighted: boolean;
}

/**
 * Site-wide business facts. Every value appearing in more than one place lives
 * here only — NAP consistency is an SEO requirement (§8.8).
 *
 * Arrays are `readonly` so `site.ts` can use `as const satisfies Site` and keep
 * its literal types.
 */
export interface Site {
  name: string;
  legalName: string;
  nif: string;
  tagline: string;
  foundingYear: number;
  url: string | undefined;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
    lat: number;
    lng: number;
  };
  googlePlaceId: string;
  /** Display only. Never emitted as `aggregateRating` — hard rule 7. */
  reviews: { rating: number; count: number; source: string };
  socials: { instagram: string };
  app: { provider: string; appStore: string; googlePlay: string };
  areaServed: readonly string[];
}

/** A single navigation entry. */
export interface NavItem {
  label: string;
  href: string;
}
