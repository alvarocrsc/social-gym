import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/home/Hero";
import { HomeIndex } from "@/components/sections/home/HomeIndex";
import { HomeIntro } from "@/components/sections/home/HomeIntro";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { HomeVisit } from "@/components/sections/home/HomeVisit";
import { pageSeo } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";

const seo = pageSeo["/"];

export const metadata: Metadata = buildMetadata(seo);

/**
 * Home. Carries no page-level JSON-LD — the root `@graph` in the layout
 * already describes the gym and the site, and `BreadcrumbList` belongs only
 * below the home page (§8.4).
 */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <HomeMotion>
        <HomeIntro />
        <HomeIndex />
        <HomeVisit />
      </HomeMotion>
    </>
  );
}
