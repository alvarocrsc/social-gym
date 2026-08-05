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

const seo = pageSeo["/aviso-legal"];

export const metadata: Metadata = buildMetadata(seo);

/**
 * Aviso legal (LSSI-CE). Shell only.
 *
 * TODO: legal copy pending. It must carry the exact registered legal name —
 * still unconfirmed (§20 blocking item 3) — plus NIF B72749559, the address
 * and contact details. Not drafted here: legal text is the client's to supply
 * or approve, and an invented company name would be worse than an empty page.
 */
export default async function AvisoLegalPage({
  params,
}: PageProps<"/[locale]/aviso-legal">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={buildPageGraph([
          buildWebPage(seo.path, seo.title, seo.description),
          buildBreadcrumbs([{ name: "Aviso legal", path: seo.path }]),
        ])}
      />
      <h1>{headingFor(seo)}</h1>
    </>
  );
}
