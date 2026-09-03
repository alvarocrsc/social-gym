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
  galleryPieces: string;
  galleryVideos: string;
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

export interface ClassSlot {
  day: DayCode; // 'Mo' … 'Su'
  start: string; // '18:00'
  durationMin: number;
  disciplineSlug: string;
  coachSlug?: string;
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
    lat: number;
    lng: number;
  };
  googlePlaceId: string;
  reviews: { rating: number; count: number; source: string };
  socials: { instagram: string };
  app: { provider: string; appStore: string; googlePlay: string };
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
