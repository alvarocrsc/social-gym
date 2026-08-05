import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo/routes";

/**
 * Keeps every non-production deploy out of the index (§8.5).
 *
 * Note that robots.txt has carried no `noindex` directive since Google dropped
 * support in 2019, so `Disallow: /` is the correct expression here. It stops
 * crawling but not indexing on its own, which is why `buildMetadata` also
 * emits a real `<meta name="robots" content="noindex, nofollow">` off
 * production. The two together are what actually keeps staging out.
 *
 * The `Sitemap:` line is withheld off production too — there is no reason to
 * advertise a sitemap for a deploy that should not be crawled.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";

  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  // No `host`: it was a Yandex-only directive and Yandex itself dropped it.
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
