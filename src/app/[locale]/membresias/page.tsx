import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { AppCta } from "@/components/sections/membresias/AppCta";
import { BenefitsTicker } from "@/components/sections/membresias/BenefitsTicker";
import { HowItWorks } from "@/components/sections/membresias/HowItWorks";
import { MembershipStore } from "@/components/sections/membresias/MembershipStore";
import { MembresiasHero } from "@/components/sections/membresias/MembresiasHero";
import { MembresiasMotion } from "@/components/sections/membresias/MembresiasMotion";
import { PlansCompare } from "@/components/sections/membresias/PlansCompare";
import { PlansFaq } from "@/components/sections/membresias/PlansFaq";
import { PlansGrid } from "@/components/sections/membresias/PlansGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { faq } from "@/content/faq";
import { pageSeo } from "@/content/seo";
import { site } from "@/content/site";
import {
  buildBreadcrumbs,
  buildFaqPage,
  buildPageGraph,
  buildWebPage,
} from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";

const seo = pageSeo["/membresias"];

export const metadata: Metadata = buildMetadata(seo);

export default async function MembresiasPage({
  params,
}: PageProps<"/[locale]/membresias">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={buildPageGraph([
          buildWebPage(seo.path, seo.title, seo.description),
          buildBreadcrumbs([{ name: "Membresías", path: seo.path }]),
          buildFaqPage(faq),
        ])}
      />

      <MembresiasMotion shopUrl={site.virtuagym.shopEmbedUrl}>
        <MembresiasHero />
        <BenefitsTicker />
        <PlansGrid />
        <PlansCompare />
        <MembershipStore />
        <HowItWorks />
        <PlansFaq />
        <AppCta />
      </MembresiasMotion>
    </>
  );
}
