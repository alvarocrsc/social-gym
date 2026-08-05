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

const seo = pageSeo["/contacto"];

export const metadata: Metadata = buildMetadata(seo);

/**
 * Contacto.
 *
 * TODO: sections — ContactBlock and MapEmbed. The map is a lazy iframe or a
 * static image mounted on interaction, never in the initial payload (§8.6).
 */
export default async function ContactoPage({
  params,
}: PageProps<"/[locale]/contacto">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={buildPageGraph([
          buildWebPage(seo.path, seo.title, seo.description),
          buildBreadcrumbs([{ name: "Contacto", path: seo.path }]),
        ])}
      />
      <h1>{headingFor(seo)}</h1>
    </>
  );
}
