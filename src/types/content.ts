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
  longDescription: string;
  forWho: string;
  sessionLooksLike: string[];
  metrics: DisciplineMetric[];
  level: "todos" | "iniciacion" | "avanzado";
  image: ImageAsset;
  /** Optional looping clip for the carousel card, layered over `image`. */
  video?: HeroVideoSource[];
  gallery?: ImageAsset[];
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
  period: "mes" | "trimestre" | "año" | "sesion";
  description: string;
  features: string[];
  highlighted: boolean;
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
  virtuagym: { shopEmbedUrl: string; shopUrl: string };
  areaServed: readonly string[];
}

export type AppPathname = keyof typeof routing.pathnames;

export interface NavItem {
  label: string;
  href: AppPathname;
}
