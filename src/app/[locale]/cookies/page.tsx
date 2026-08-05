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

const seo = pageSeo["/cookies"];

export const metadata: Metadata = buildMetadata(seo);

/**
 * Política de cookies. Shell only.
 *
 * TODO: legal copy pending. The cookie table cannot be written until we know
 * which cookies the Virtuagym embed sets (§20 open question 8) and which
 * analytics cookies survive the consent gate (§13).
 */
export default async function CookiesPage({
  params,
}: PageProps<"/[locale]/cookies">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={buildPageGraph([
          buildWebPage(seo.path, seo.title, seo.description),
          buildBreadcrumbs([{ name: "Política de cookies", path: seo.path }]),
        ])}
      />
      <h1>{headingFor(seo)}</h1>
    </>
  );
}
