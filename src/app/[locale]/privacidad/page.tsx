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

const seo = pageSeo["/privacidad"];

export const metadata: Metadata = buildMetadata(seo);

/**
 * Política de privacidad (RGPD / LOPDGDD). Shell only.
 *
 * TODO: legal copy pending. Needs the data controller's registered name,
 * processing purposes, legal bases, retention periods and how to exercise
 * rights. Not drafted here — see the note in `aviso-legal/page.tsx`.
 */
export default async function PrivacidadPage({
  params,
}: PageProps<"/[locale]/privacidad">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={buildPageGraph([
          buildWebPage(seo.path, seo.title, seo.description),
          buildBreadcrumbs([
            { name: "Política de privacidad", path: seo.path },
          ]),
        ])}
      />
      <h1>{headingFor(seo)}</h1>
    </>
  );
}
