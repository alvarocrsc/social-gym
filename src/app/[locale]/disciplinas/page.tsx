import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { JsonLd } from "@/components/seo/JsonLd";
import { pageSeo } from "@/content/seo";
import {
  buildBreadcrumbs,
  buildPageGraph,
  buildWebPage,
} from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { headingFor } from "@/lib/seo/routes";

const seo = pageSeo["/disciplinas"];

export const metadata: Metadata = buildMetadata(seo);

/**
 * Disciplines hub. Exists so the six children have a parent, the breadcrumb
 * trail is real, and `clases dirigidas calahorra` has a target (§6.3).
 *
 * TODO: sections — short intro plus six cards linking each discipline.
 */
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
      <h1>{headingFor(seo)}</h1>
    </>
  );
}
