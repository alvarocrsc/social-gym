import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LegalDoc } from "@/components/sections/legal/LegalDoc";
import { avisoLegal } from "@/content/aviso-legal";
import { pageSeo } from "@/content/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbs,
  buildPageGraph,
  buildWebPage,
} from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";

const seo = pageSeo["/aviso-legal"];

export const metadata: Metadata = buildMetadata(seo);

export default async function AvisoLegalPage({
  params,
}: PageProps<"/[locale]/aviso-legal">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");

  return (
    <>
      <JsonLd
        data={buildPageGraph([
          buildWebPage(seo.path, seo.title, seo.description),
          buildBreadcrumbs([{ name: "Aviso legal", path: seo.path }]),
        ])}
      />
      <LegalDoc
        doc={avisoLegal}
        titleId="aviso-legal-titulo"
        updatedLabel={t("updated")}
      />
    </>
  );
}
