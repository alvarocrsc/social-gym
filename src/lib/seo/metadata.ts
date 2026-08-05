import type { Metadata } from "next";

import { site } from "@/content/site";
import type { PageSeo } from "@/types/seo";

import { SITE_URL, absoluteUrl } from "./routes";

/**
 * Staging and preview deploys must never be indexed (§8.5). Vercel sets
 * `VERCEL_ENV` to `production` only on the production deployment.
 */
const isProduction = process.env.VERCEL_ENV === "production";

/**
 * The single metadata factory. No route hand-rolls tags (§8.2).
 *
 * Two deliberate omissions:
 * - `alternates.languages` is never set and no hreflang is emitted, because
 *   English content does not exist yet (hard rule 8).
 * - `openGraph.images` is left to the file-based `opengraph-image.tsx` unless
 *   the route overrides it, since file-based metadata takes priority anyway.
 *
 * The canonical always points at the Spanish URL, in both locales, so the
 * `/en/*` shells consolidate into the Spanish page instead of competing with
 * it as duplicate content.
 *
 * @param seo The route's record from `src/content/seo.ts`.
 */
export function buildMetadata(seo: PageSeo): Metadata {
  const canonical = absoluteUrl(seo.path);

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "es_ES",
      url: canonical,
      siteName: site.name,
      title: seo.title,
      description: seo.description,
      ...(seo.ogImage && {
        images: [
          { url: seo.ogImage, width: 1200, height: 630, alt: seo.title },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      ...(seo.ogImage && { images: [seo.ogImage] }),
    },
    robots: isProduction
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: false },
  };
}
