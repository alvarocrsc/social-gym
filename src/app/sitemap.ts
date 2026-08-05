import type { MetadataRoute } from "next";

import { absoluteUrl, routes } from "@/lib/seo/routes";

/**
 * Generated from the route registry in `lib/seo/routes.ts`, whose discipline
 * URLs derive from `disciplines.ts` (§8.5).
 *
 * Spanish URLs only. No `/en/*` entries and no `alternates.languages`, because
 * advertising alternates that don't exist is worse than having none — English
 * content is deferred (hard rule 8).
 *
 * Lives at `src/app/`, outside `[locale]`, so it is served unprefixed at
 * /sitemap.xml. The proxy matcher excludes it explicitly.
 *
 * **No `lastmod`.** A build-time `new Date()` would claim every page changed
 * on every deploy, and a sitemap whose lastmod always says "just now" teaches
 * Google to ignore the field altogether. Omitting it is honest; it comes back
 * only when the content layer can report a real per-route change date.
 *
 * `changefreq` and `priority` are kept for non-Google crawlers. Google ignores
 * both outright, so treat them as documentation rather than as levers.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
