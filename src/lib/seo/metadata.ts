import type { Metadata } from "next";

import { site } from "@/content/site";
import type { PageSeo } from "@/types/seo";

import { SITE_URL, absoluteUrl, isProductionSite } from "./routes";

/**
 * The generated share image (`app/[locale]/opengraph-image.tsx`), 1200×630.
 *
 * Unprefixed on purpose. The localized `/es/opengraph-image` that the file
 * convention emits by itself answers 307 to this path, and a redirecting
 * `og:image` is followed inconsistently by social crawlers — several cache the
 * redirect as a failure and show no preview at all.
 */
const OG_IMAGE_PATH = "/opengraph-image";
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

/**
 * The single metadata factory.
 *
 * One deliberate omission: `alternates.languages` is never set and no hreflang
 * is emitted, because English content does not exist yet.
 *
 * The canonical always points at the Spanish URL, in both locales, so the
 * `/en/*` shells consolidate into the Spanish page instead of competing with
 * it as duplicate content.
 *
 * @param seo The route's record from `src/content/seo.ts`.
 */
export function buildMetadata(seo: PageSeo): Metadata {
  const canonical = absoluteUrl(seo.path);
  const image = seo.ogImage ?? OG_IMAGE_PATH;

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
      images: [
        {
          url: image,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [image],
    },
    robots: isProductionSite
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
