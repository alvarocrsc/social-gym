import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { DisciplinasHero } from "@/components/sections/disciplinas/DisciplinasHero";
import { DisciplinesCarousel } from "@/components/sections/disciplinas/DisciplinesCarousel";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageSeo } from "@/content/seo";
import {
  buildBreadcrumbs,
  buildPageGraph,
  buildWebPage,
} from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";

const seo = pageSeo["/disciplinas"];

export const metadata: Metadata = buildMetadata(seo);

export default async function DisciplinasPage({
  params,
}: PageProps<"/[locale]/disciplinas">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={buildPageGraph([
          buildWebPage(seo.path, seo.title, seo.description),
          buildBreadcrumbs([{ name: "Disciplinas", path: seo.path }]),
        ])}
      />
      <DisciplinasHero />
      <DisciplinesCarousel />
    </>
  );
}
