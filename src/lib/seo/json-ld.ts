import { classSchedule } from "@/content/class-schedule";
import { plans } from "@/content/plans";
import { schedule } from "@/content/schedule";
import { site } from "@/content/site";
import type { Discipline, FaqItem, MembershipPlan } from "@/types/content";

import { SITE_URL, absoluteUrl } from "./routes";

/**
 * A JSON-LD node. Values are whatever `JSON.stringify` accepts; the shape is
 * governed by schema.org, not by TypeScript.
 */
export type JsonLdNode = Record<string, unknown>;

/** Stable `@id` anchors, so nodes can reference each other across pages. */
const GYM_ID = `${SITE_URL}/#gym`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Schema.org day URIs, keyed by our internal day codes. */
const DAY_URI = {
  Mo: "https://schema.org/Monday",
  Tu: "https://schema.org/Tuesday",
  We: "https://schema.org/Wednesday",
  Th: "https://schema.org/Thursday",
  Fr: "https://schema.org/Friday",
  Sa: "https://schema.org/Saturday",
  Su: "https://schema.org/Sunday",
} as const;

/**
 * The root `@graph` for the locale layout (§8.4).
 *
 * Deliberately carries **no `aggregateRating` and no `review`**. The gym's
 * 4.9/102 is real, but self-serving review markup on a `LocalBusiness` is
 * against Google's policy and risks a manual action — it goes on the page as
 * plain HTML instead (hard rule 7).
 */
export function buildRootGraph(): JsonLdNode {
  const gym: JsonLdNode = {
    "@type": ["HealthClub", "ExerciseGym"],
    "@id": GYM_ID,
    name: site.name,
    url: `${SITE_URL}/`,
    telephone: site.phone,
    email: site.email,
    vatID: site.nif,
    foundingDate: String(site.foundingYear),
    slogan: site.tagline,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.lat,
      longitude: site.address.lng,
    },
    hasMap: `https://www.google.com/maps/place/?q=place_id:${site.googlePlaceId}`,
    openingHoursSpecification: schedule.map((block) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: block.days.map((day) => DAY_URI[day]),
      opens: block.opens,
      closes: block.closes,
    })),
    areaServed: site.areaServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
    sameAs: [site.socials.instagram],
  };

  // Omitted entirely while plans.ts is empty — an OfferCatalog with no offers
  // is worse than none.
  if (plans.length > 0) {
    gym.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: "Membresías",
      itemListElement: plans.map(buildOffer),
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      gym,
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: site.name,
        inLanguage: "es-ES",
        publisher: { "@id": GYM_ID },
      },
    ],
  };
}

/**
 * `WebPage` node for any route below the home page.
 *
 * @param path Spanish route path.
 * @param name Page name, from the route's SEO record.
 * @param description Page description, from the route's SEO record.
 */
export function buildWebPage(
  path: string,
  name: string,
  description: string,
): JsonLdNode {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "es-ES",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": GYM_ID },
  };
}

/**
 * `BreadcrumbList` node. Required everywhere below the home page (§8.4).
 *
 * @param trail Ordered crumbs, excluding the implicit home entry.
 */
export function buildBreadcrumbs(
  trail: Array<{ name: string; path: string }>,
): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Inicio", path: "/" }, ...trail].map(
      (crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      }),
    ),
  };
}

/**
 * `Service` node for a discipline page, provided by the gym.
 *
 * @param discipline The entry from `disciplines.ts`.
 */
export function buildDisciplineService(discipline: Discipline): JsonLdNode {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(`/disciplinas/${discipline.slug}`)}#service`,
    name: `${discipline.name} en ${site.address.locality}`,
    description: discipline.shortDescription,
    serviceType: discipline.name,
    url: absoluteUrl(`/disciplinas/${discipline.slug}`),
    provider: { "@id": GYM_ID },
    areaServed: site.areaServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
  };
}

/**
 * `Offer` node for one membership plan. Only ever called with confirmed
 * prices — `plans.ts` stays empty until they are.
 */
function buildOffer(plan: MembershipPlan): JsonLdNode {
  return {
    "@type": "Offer",
    name: plan.name,
    description: plan.description,
    priceCurrency: "EUR",
    ...(plan.price !== null && { price: plan.price }),
    url: absoluteUrl("/membresias"),
  };
}

/**
 * `FAQPage` node. Returns `null` when there are no questions, so callers omit
 * the node rather than emit an empty one.
 *
 * Kept for semantic value only — Google stopped showing FAQ rich results for
 * non-authoritative sites in 2023 (§8.4).
 */
export function buildFaqPage(items: FaqItem[]): JsonLdNode | null {
  if (items.length === 0) return null;

  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/**
 * Wraps page-level nodes in a `@graph`, dropping any that are `null`.
 *
 * @param nodes Nodes to include; `null` entries are skipped.
 */
export function buildPageGraph(
  nodes: Array<JsonLdNode | null>,
): JsonLdNode | null {
  const present = nodes.filter((node): node is JsonLdNode => node !== null);
  if (present.length === 0) return null;

  return { "@context": "https://schema.org", "@graph": present };
}

/** Whether the weekly timetable has any slots to render or mark up (§6.5). */
export function hasClassSchedule(): boolean {
  return classSchedule.length > 0;
}
