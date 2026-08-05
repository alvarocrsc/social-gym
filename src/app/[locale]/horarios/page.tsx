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

const seo = pageSeo["/horarios"];

export const metadata: Metadata = buildMetadata(seo);

/**
 * Horarios. The answer to `horario gimnasio calahorra` currently lives only
 * inside the app, invisible to Google — this page publishes it as real HTML.
 *
 * TODO: sections — semantic `<table>` from `class-schedule.ts` with
 * `<th scope>`, plus the displayed `lastUpdated` (§6.5, §12).
 */
export default async function HorariosPage({
  params,
}: PageProps<"/[locale]/horarios">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={buildPageGraph([
          buildWebPage(seo.path, seo.title, seo.description),
          buildBreadcrumbs([{ name: "Horarios", path: seo.path }]),
        ])}
      />
      <h1>{headingFor(seo)}</h1>
    </>
  );
}
