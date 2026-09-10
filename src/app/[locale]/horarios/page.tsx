import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { HorariosCta } from "@/components/sections/horarios/HorariosCta";
import { HorariosHero } from "@/components/sections/horarios/HorariosHero";
import { HorariosMotion } from "@/components/sections/horarios/HorariosMotion";
import { OpeningHours } from "@/components/sections/horarios/OpeningHours";
import { WeekTimetable } from "@/components/sections/horarios/WeekTimetable";
import { WhenToCome } from "@/components/sections/horarios/WhenToCome";
import { JsonLd } from "@/components/seo/JsonLd";
import { horarios } from "@/content/horarios";
import { pageSeo } from "@/content/seo";
import {
  buildBreadcrumbs,
  buildPageGraph,
  buildWebPage,
} from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";

const seo = pageSeo["/horarios"];

export const metadata: Metadata = buildMetadata(seo);

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

      <HorariosMotion countTemplate={horarios.filterCount}>
        <HorariosHero />
        <OpeningHours />
        <WeekTimetable />
        <WhenToCome />
        <HorariosCta />
      </HorariosMotion>
    </>
  );
}
