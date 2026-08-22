import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { VirtuagymStore } from "@/components/sections/membresias/VirtuagymStore";
import { JsonLd } from "@/components/seo/JsonLd";
import { faq } from "@/content/faq";
import { pageSeo } from "@/content/seo";
import {
  buildBreadcrumbs,
  buildFaqPage,
  buildPageGraph,
  buildWebPage,
} from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { headingFor } from "@/lib/seo/routes";

const seo = pageSeo["/membresias"];

export const metadata: Metadata = buildMetadata(seo);

/**
 * Membresías.
 *
 * TODO: sections — PlansHero, PlansGrid, IncludedMatrix, VirtuagymStore,
 * FaqSection, FinalCta (§6.4). Prices render as our own HTML from `plans.ts`
 * above the Virtuagym embed, never only inside it (hard rule 9).
 */
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
      <h1>{headingFor(seo)}</h1>
      <VirtuagymStore />
    </>
  );
}
