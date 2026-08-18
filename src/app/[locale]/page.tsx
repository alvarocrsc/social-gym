import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/home/Hero";
import { pageSeo } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";

const seo = pageSeo["/"];

export const metadata: Metadata = buildMetadata(seo);

/**
 * Home. Carries no page-level JSON-LD — the root `@graph` in the layout
 * already describes the gym and the site, and `BreadcrumbList` belongs only
 * below the home page (§8.4).
 *
 * TODO: sections — TickerBand, Disciplines, Manifesto, StatsBand, SocialProof,
 * Schedule, Team, AppShowcase, Gallery, Location, FinalCta (§6.1).
 */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Hero />;
}
