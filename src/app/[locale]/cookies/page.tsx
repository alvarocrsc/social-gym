import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LegalDoc } from "@/components/sections/legal/LegalDoc";
import { cookies } from "@/content/cookies";
import { pageSeo } from "@/content/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbs,
  buildPageGraph,
  buildWebPage,
} from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";

const seo = pageSeo["/cookies"];

export const metadata: Metadata = buildMetadata(seo);

export default async function CookiesPage({
  params,
}: PageProps<"/[locale]/cookies">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");

  return (
    <>
      <JsonLd
        data={buildPageGraph([
          buildWebPage(seo.path, seo.title, seo.description),
          buildBreadcrumbs([{ name: "Política de cookies", path: seo.path }]),
        ])}
      />
      <LegalDoc
        doc={cookies}
        titleId="cookies-titulo"
        updatedLabel={t("updated")}
      />
    </>
  );
}
