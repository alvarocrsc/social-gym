import { disciplines } from "@/content/disciplines";
import { pageSeo } from "@/content/seo";
import { site } from "@/content/site";
import { routing } from "@/i18n/routing";
import type { AppPathname } from "@/types/content";

/**
 * Absolute site origin, no trailing slash.
 *
 * The whole SEO layer is parameterised on this — metadataBase, canonicals, the
 * sitemap and every JSON-LD `@id` (§16) — so a missing value is a build
 * failure rather than a silent `undefined` in production markup.
 */
export const SITE_URL: string = (() => {
  const raw = site.url;
  if (!raw) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not set. It is the base for metadataBase, " +
        "canonicals, the sitemap and every JSON-LD @id. Copy " +
        ".env.local.example to .env.local and set it (no trailing slash).",
    );
  }
  return raw.replace(/\/+$/, "");
})();

/**
 * Turns an internal Spanish path into an absolute URL.
 *
 * @param path Route path with a leading slash, e.g. `/membresias`.
 */
export function absoluteUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/** A route in the sitemap registry. */
export interface RouteEntry {
  path: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
}

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/membresias", priority: 0.9, changeFrequency: "monthly" },
  { path: "/disciplinas", priority: 0.8, changeFrequency: "monthly" },
  { path: "/horarios", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contacto", priority: 0.7, changeFrequency: "yearly" },
  { path: "/aviso-legal", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacidad", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
] satisfies RouteEntry[];

/**
 * Discipline routes, derived from `disciplines.ts` — never hardcoded. A new
 * entry there reaches the sitemap on its own (§8.5).
 */
const disciplineRoutes: RouteEntry[] = disciplines
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((discipline) => ({
    path: `/disciplinas/${discipline.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

/**
 * Build-time guard against routing drift.
 *
 * `routing.ts` keeps literal pathnames so an unknown `Link href` stays a
 * compile error, which means a new discipline needs an entry there too. This
 * throws during `next build` if the two disagree, rather than shipping a
 * discipline with no localized pathname.
 *
 * The other two drift points are already compiler-enforced: a discipline's
 * `seo` field indexes `pageSeo`, so a missing entry there is a type error.
 */
for (const discipline of disciplines) {
  const pathname = `/disciplinas/${discipline.slug}`;
  if (!Object.hasOwn(routing.pathnames, pathname)) {
    throw new Error(
      `Discipline "${discipline.slug}" has no entry in routing.pathnames. ` +
        `Add "${pathname}" to src/i18n/routing.ts with ` +
        `{ es: "${pathname}", en: "/disciplines/${discipline.enSlug}" }.`,
    );
  }
}

/**
 * A discipline's routing key, for the typed `Link`.
 *
 * The assertion is safe because the loop above throws at build time unless
 * every slug already has a `routing.pathnames` entry — this narrows a string
 * the compiler cannot, rather than papering over an unchecked one.
 */
export function disciplinePathname(slug: string): AppPathname {
  return `/disciplinas/${slug}` as AppPathname;
}

/**
 * Every indexable route, Spanish only. The `/en/*` routes are deliberately
 * absent until English content exists (hard rule 8).
 */
export const routes: RouteEntry[] = [
  ...staticRoutes.slice(0, 3),
  ...disciplineRoutes,
  ...staticRoutes.slice(3),
];

/**
 * Looks up the SEO record for a route.
 *
 * @param path Route path with a leading slash.
 */
export function seoFor(path: keyof typeof pageSeo) {
  return pageSeo[path];
}

/**
 * The keyword half of a title, without the ` | Social Gym…` brand suffix.
 *
 * Used for the placeholder `<h1>` on each route so the heading reads as a
 * heading rather than as a browser-tab title. Sections replace these.
 */
export function headingFor(seo: { title: string }): string {
  return seo.title.split(" | ")[0] ?? seo.title;
}
