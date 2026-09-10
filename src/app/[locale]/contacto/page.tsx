import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { ContactoBand } from "@/components/sections/contacto/ContactoBand";
import { ContactoMotion } from "@/components/sections/contacto/ContactoMotion";
import { ContactoPlane } from "@/components/sections/contacto/ContactoPlane";
import { ContactoSlab } from "@/components/sections/contacto/ContactoSlab";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageSeo } from "@/content/seo";
import {
  buildBreadcrumbs,
  buildContactPage,
  buildPageGraph,
} from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";

const seo = pageSeo["/contacto"];

export const metadata: Metadata = buildMetadata(seo);

export default async function ContactoPage({
  params,
}: PageProps<"/[locale]/contacto">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={buildPageGraph([
          buildContactPage(seo.path, seo.title, seo.description),
          buildBreadcrumbs([{ name: "Contacto", path: seo.path }]),
        ])}
      />

      <ContactoMotion>
        <ContactoPlane />
        <ContactoBand />
        <ContactoSlab />
      </ContactoMotion>
    </>
  );
}
