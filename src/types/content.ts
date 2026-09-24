import type { routing } from "@/i18n/routing";

import type { PageSeo } from "./seo";

export type DayCode = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HeroSlide {
  id: string;
  line1: string;
  line2: string;
  caption: string;
  media: { left: HeroMedia; right: HeroMedia };
}

export interface HeroMedia {
  poster: ImageAsset;
  sources: readonly HeroVideoSource[];
}

export interface HeroVideoSource {
  src: string;
  type: string;
  /** Limits the source to a viewport, so phones fetch the phone-sized encode. */
  media?: string;
}

export interface Hero {
  eyebrow: string;
  slides: readonly HeroSlide[];
}

export interface DisciplineMetric {
  label: string;
  value: number;
}

/**
 * One figure in the pinned "dentro de la sala" track. `span` picks a width
 * band rather than a length: the rhythm of the track is part of the design and
 * must not shift when photography of a different aspect ratio lands.
 */
export interface DisciplineGalleryPiece {
  caption: string;
  span: 1 | 2 | 3;
  image: ImageAsset;
  video?: readonly HeroVideoSource[];
  /** Shown on the video badge, e.g. '0:24'. */
  duration?: string;
}

export interface DisciplineSessionBlock {
  time: string;
  title: string;
  body: string;
}

export interface DisciplineMetaItem {
  label: string;
  value: string;
}

export interface Discipline {
  slug: string; // 'entrenamiento-funcional'
  /** English URL segment, used only by `routing.ts` pathnames. */
  enSlug: string; // 'functional-training'
  name: string; // 'Funcional'
  code: string; // '[FNL]'
  order: number; // Display order — Hyrox first
  /** Short qualifier on the carousel card, e.g. 'Centro oficial'. */
  badge: string;
  shortDescription: string;
  /** Hero paragraph on the discipline page. */
  tagline: string;
  /** Two-line display heading; the second line renders outlined. */
  headline: { solid: string; outlined: string };
  /** Lead paragraph of the extended description. */
  longDescription: string;
  /** The paragraphs after the lead. */
  paragraphs: string[];
  meta: DisciplineMetaItem[];
  forWho: string;
  sessionLooksLike: string[];
  session: DisciplineSessionBlock[];
  /** Closing call to action. The gym sells memberships, not trials. */
  cta: { heading: string; body: string };
  metrics: DisciplineMetric[];
  level: "todos" | "iniciacion" | "avanzado";
  image: ImageAsset;
  /** Optional looping clip for the carousel card, layered over `image`. */
  video?: HeroVideoSource[];
  gallery: DisciplineGalleryPiece[];
  coachSlugs: string[];
  faq: FaqItem[];
  seo: PageSeo;
}

/** Copy for the /disciplinas hub. The cards come from `disciplines.ts`. */
export interface DisciplinasPage {
  /**
   * Decorative full-bleed photo behind the hero copy, sitting at half
   * opacity under a scrim. Empty or missing on disk falls back to the
   * gradient, so the page never waits on photography.
   */
  heroImage: string;
  eyebrow: string;
  headlineSolid: string;
  headlineOutlined: string;
  lead: string;
  scrollHint: string;
  /** Labels the ring group on each card for screen readers. */
  metricsLabel: string;
  cta: {
    eyebrow: string;
    headlineTop: string;
    headlineBottom: string;
    action: string;
  };
  closing: { heading: string; body: string; action: string };
}

/** Copy shared by every discipline page. Per-discipline copy lives on `Discipline`. */
export interface DisciplinaPage {
  hubLabel: string;
  heroHint: string;
  playLabel: string;
  closeLabel: string;
  galleryHeading: string;
  /** Sits beside the heading. Describes the set rather than counting it. */
  galleryMeta: string;
  /** Still used by the piece badge, which is visually hidden. */
  galleryVideo: string;
  attributesHeading: string;
  attributeLevels: { high: string; mid: string; low: string };
  aboutEyebrow: string;
  sessionHeading: string;
  sessionBlocks: string;
  switcherHeading: string;
  coachEyebrow: string;
  coachAction: string;
  scheduleHeading: string;
  scheduleAction: string;
  scheduleWeek: string;
  scheduleWeekend: string;
  scheduleColumns: { day: string; time: string; coach: string };
  scheduleLimited: string;
  scheduleBooking: string;
  schedulePending: string;
  ctaAction: string;
}

export interface Coach {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: ImageAsset;
  disciplineSlugs: string[];
}

export interface ScheduleBlock {
  /** Days this band applies to. */
  days: DayCode[];
  /** Human label for the page, e.g. 'Lunes a viernes'. */
  label: string;
  opens: string; // '06:00'
  closes: string; // '01:00'
}

/** Visual family on the timetable. Not every format has a discipline page. */
export type ClassTier = "hyrox" | "fuerza" | "dirigida" | "cuerpo" | "contacto";

/**
 * A format as it appears on the timetable. Disciplines are the subset of these
 * that also have a marketing page — `/horarios` runs classes the site does not
 * sell individually, so the two vocabularies are deliberately separate.
 */
export interface ClassType {
  slug: string;
  /** Short label shown inside a timetable cell, e.g. 'FNL'. */
  code: string;
  name: string;
  /** Spelled out in the legend when `name` is an abbreviation. */
  fullName?: string;
  tier: ClassTier;
  /** Minutes the format runs. A slot may override it. */
  durationMin: number;
  /** Links to a discipline page when one exists. */
  disciplineSlug?: string;
}

export interface ClassSlot {
  day: DayCode; // 'Mo' … 'Su'
  start: string; // '18:00'
  classSlug: string;
  /** Only when this session differs from the format's usual length. */
  durationMin?: number;
  coachSlug?: string;
}

export interface HorariosPage {
  /**
   * Decorative full-bleed photo behind the hero copy, sitting at half
   * opacity under a scrim. Empty or missing on disk falls back to the
   * gradient, so the page never waits on photography.
   */
  heroImage: string;
  eyebrow: string;
  headlineSolid: string;
  headlineOutlined: string;
  keywordLine: string;
  lead: string;
  heroAction: string;
  openHeading: string;
  openTrackTicks: readonly string[];
  weekHeading: string;
  weekAnchor: string;
  filterClassLabel: string;
  filterCoachLabel: string;
  filterAllClasses: string;
  filterAllCoaches: string;
  filterClear: string;
  filterCount: string;
  emptyFiltered: string;
  todayLabel: string;
  hourColumn: string;
  weekFootnote: string;
  lastUpdatedLabel: string;
  densityEyebrow: string;
  densityHeadlineSolid: string;
  densityHeadlineOutlined: string;
  densityLead: string;
  densityRows: readonly {
    range: string;
    note: string;
    bars: readonly number[];
    peak: boolean;
  }[];
  ctaHeadlineSolid: string;
  ctaHeadlineOutlined: string;
  ctaBody: string;
  ctaAction: string;
  appStoreKicker: string;
  googlePlayKicker: string;
}

export interface MembershipPlan {
  slug: string;
  name: string;
  price: number | null;
  period: "mes" | "trimestre" | "semestre" | "año" | "sesion";
  /** Months of access. Drives the per-month figure and the comparison table. */
  months: number;
  durationLabel: string;
  periodLabel: string;
  badge: string;
  /** One human sentence on who this plan is for. */
  pitch: string;
  monthlyLabel: string;
  savingLabel: string;
  description: string;
  features: string[];
  highlighted: boolean;
  /** Virtuagym product id, confirmed against the live webshop. */
  productId: string;
}

export interface MembresiasPage {
  /**
   * Decorative full-bleed photo behind the hero copy, sitting at half
   * opacity under a scrim. Empty or missing on disk falls back to the
   * gradient, so the page never waits on photography.
   */
  heroImage: string;
  eyebrow: string;
  headlineSolid: string;
  headlineOutlined: string;
  keywordLine: string;
  lead: string;
  heroAction: string;
  tickerItems: readonly string[];
  plansHeading: string;
  plansMeta: string;
  planAction: string;
  plansFootnote: string;
  compareHeading: string;
  compareConcept: string;
  compareRows: readonly { label: string; values: readonly string[] }[];
  /** Heading for the rows every plan shares, used by the stacked
      mobile layout where a four-column table does not fit. */
  compareSharedLabel: string;
  howEyebrow: string;
  howHeadlineSolid: string;
  howHeadlineOutlined: string;
  howLead: string;
  howSteps: readonly { title: string; body: string }[];
  faqHeading: string;
  storeEyebrow: string;
  storeHeading: string;
  storeLead: string;
  storeNewTab: string;
  storeAllPlans: string;
  ctaHeadlineSolid: string;
  ctaHeadlineOutlined: string;
  ctaBody: string;
  ctaAction: string;
  appStoreKicker: string;
  googlePlayKicker: string;
}

/**
 * Copy for /contacto. Every value the page shows — address, hours, phone,
 * email, socials — comes from `site.ts` and `schedule.ts`; this holds only the
 * words wrapped around them.
 */
export interface ContactoPage {
  /**
   * Decorative full-bleed photo behind the contact plane. The copy sits at
   * the bottom of the first screen, so the scrim is light where the image
   * is on its own and heavy where it meets the text.
   */
  heroImage: string;
  headlineSolid: string;
  headlineOutlined: string;
  keywordLine: string;
  lead: string;
  whereLabel: string;
  whereAction: string;
  whenLabel: string;
  /** `{time}` is replaced with the closing time, in Europe/Madrid. */
  statusOpen: string;
  statusClosed: string;
  /** `{time}`, and `{day}` when the next opening is not today. */
  statusOpensAt: string;
  statusOpensOn: string;
  talkLabel: string;
  followLabel: string;
  phoneLabel: string;
  whatsappLabel: string;
  emailLabel: string;
  instagramLabel: string;
  actionWhatsapp: string;
  actionPhone: string;
  actionNote: string;
  reviewsHeadline: string;
  reviewsBody: string;
  reviewsAction: string;
  mapHeading: string;
  mapBody: string;
  mapAction: string;
  mapConsent: string;
  mapDirections: string;
  areaLead: string;
}

export interface HomeImageSlot {
  primary: ImageAsset;
  fallback: ImageAsset;
}

export interface HomeFact {
  value: string;
  label: string;
  count?: number;
}

export interface HomePage {
  intro: {
    eyebrow: string;
    headingSolid: string;
    headingOutlined: string;
    lead: string;
    facts: HomeFact[];
    place: string;
    coordinates: string;
    image: HomeImageSlot;
  };
  index: {
    eyebrow: string;
    headingSolid: string;
    headingOutlined: string;
    lead: string;
    allAction: string;
  };
  visit: {
    eyebrow: string;
    headingSolid: string;
    headingOutlined: string;
    lead: string;
    addressLabel: string;
    directionsAction: string;
    phoneLabel: string;
    hoursLabel: string;
    reviewsLabel: string;
    reviewsScore: string;
    reviewsOutOf: string;
    reviewsText: string;
    scheduleAction: string;
    membershipsAction: string;
    since: string;
    image: HomeImageSlot;
  };
}

/** A block of body content inside a legal section. */
export type LegalBlock =
  | { kind: "text"; body: string }
  | { kind: "list"; items: string[] }
  | { kind: "terms"; items: Array<{ term: string; body: string }> }
  | { kind: "table"; caption: string; columns: string[]; rows: string[][] }
  /* Split by destination so an internal link is checked against the route map
     and an external one never reaches the typed `Link`. */
  | { kind: "link"; href: AppPathname; label: string; external?: false }
  | { kind: "link"; href: string; label: string; external: true };

/** One numbered section of a legal document. */
export interface LegalSection {
  /** Anchor id, Spanish kebab-case. Stable — these get linked to. */
  id: string;
  heading: string;
  blocks: LegalBlock[];
}

/**
 * A complete legal document.
 *
 * `updated` is a literal ISO date, never `new Date()`: a last-updated line
 * that moves on every deploy tells the reader nothing and is the same lie the
 * sitemap deliberately avoids with `lastmod`.
 */
export interface LegalDocument {
  eyebrow: string;
  title: string;
  lead: string;
  /** ISO `YYYY-MM-DD`. */
  updated: string;
  indexLabel: string;
  sections: LegalSection[];
}

/** One toggleable cookie category in the banner's detail panel. */
export interface ConsentCategory {
  name: string;
  body: string;
}

/** Cookie banner copy. */
export interface ConsentContent {
  eyebrow: string;
  title: string;
  body: string;
  accept: string;
  reject: string;
  configure: string;
  save: string;
  policyAction: string;
  alwaysOn: string;
  categories: {
    necessary: ConsentCategory;
    analytics: ConsentCategory;
    external: ConsentCategory;
  };
  frameBlockedTitle: string;
  frameBlockedBody: string;
  frameBlockedAccept: string;
}

/** Copy for the global footer. */
export interface SiteFooterContent {
  legalLabel: string;
  manifesto: string;
  action: string;
}

/**
 * Site-wide business facts. Every value appearing in more than one place lives
 * here only.
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
    /** Display name for the country. `country` stays the ISO code for schema.org. */
    countryLabel: string;
    lat: number;
    lng: number;
  };
  googlePlaceId: string;
  reviews: { rating: number; count: number; source: string };
  socials: { instagram: string };
  app: {
    provider: string;
    appStore: string;
    googlePlay: string;
    /** Store glyph shown beside the label. Empty renders the label alone. */
    icon: { appStore: string; googlePlay: string };
  };
  /**
   * `shopEmbedUrl` is the iframe source. `shopUrl` is the same shop hosted by
   * Virtuagym, needed as the fallback link when the visitor rejects cookies
   * and the embed cannot mount (§13).
   */
  virtuagym: {
    shopEmbedUrl: string;
    /** Product-page embed, with the id appended. */
    productEmbedBase: string;
    shopUrl: string;
  };
  areaServed: readonly string[];
}

export type AppPathname = keyof typeof routing.pathnames;

export interface NavItem {
  label: string;
  href: AppPathname;
}
