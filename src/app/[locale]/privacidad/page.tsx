import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LegalDoc } from "@/components/sections/legal/LegalDoc";
import { privacidad } from "@/content/privacidad";
import { pageSeo } from "@/content/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbs,
  buildPageGraph,
  buildWebPage,
} from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";

const seo = pageSeo["/privacidad"];

export const metadata: Metadata = buildMetadata(seo);

export default async function PrivacidadPage({
  params,
}: PageProps<"/[locale]/privacidad">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");

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
      <LegalDoc
        doc={privacidad}
        titleId="privacidad-titulo"
        updatedLabel={t("updated")}
      />
    </>
  );
}
