import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { DisciplinaAbout } from "@/components/sections/disciplina/DisciplinaAbout";
import { DisciplinaAttributes } from "@/components/sections/disciplina/DisciplinaAttributes";
import { DisciplinaCta } from "@/components/sections/disciplina/DisciplinaCta";
import { DisciplinaGallery } from "@/components/sections/disciplina/DisciplinaGallery";
import { DisciplinaHero } from "@/components/sections/disciplina/DisciplinaHero";
import { DisciplinaMotion } from "@/components/sections/disciplina/DisciplinaMotion";
import { DisciplinaSchedule } from "@/components/sections/disciplina/DisciplinaSchedule";
import { DisciplinaSession } from "@/components/sections/disciplina/DisciplinaSession";
import { JsonLd } from "@/components/seo/JsonLd";
import { disciplines } from "@/content/disciplines";
import { pageSeo } from "@/content/seo";
import {
  buildBreadcrumbs,
  buildDisciplineService,
  buildFaqPage,
  buildPageGraph,
  buildWebPage,
} from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";

/** Only the six known slugs exist; anything else is a 404, not an on-demand render. */
export const dynamicParams = false;

/** One page per entry in `disciplines.ts` — never a hardcoded list. */
export function generateStaticParams(): Array<{ slug: string }> {
  return disciplines.map((discipline) => ({ slug: discipline.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/disciplinas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const discipline = disciplines.find((entry) => entry.slug === slug);

  return discipline ? buildMetadata(discipline.seo) : {};
}

/** Discipline template — six pages from one file (§6.2). */
export default async function DisciplinaPage({
  params,
}: PageProps<"/[locale]/disciplinas/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const index = disciplines.findIndex((entry) => entry.slug === slug);
  const discipline = disciplines[index];
  if (discipline === undefined) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={buildPageGraph([
          buildWebPage(
            discipline.seo.path,
            discipline.seo.title,
            discipline.seo.description,
          ),
          buildBreadcrumbs([
            { name: "Disciplinas", path: pageSeo["/disciplinas"].path },
            { name: discipline.name, path: discipline.seo.path },
          ]),
          buildDisciplineService(discipline),
          buildFaqPage(discipline.faq),
        ])}
      />

      <DisciplinaMotion>
        <DisciplinaHero discipline={discipline} index={index} />
        <DisciplinaGallery discipline={discipline} />
        <DisciplinaAttributes discipline={discipline} />
        <DisciplinaAbout discipline={discipline} />
        <DisciplinaSession discipline={discipline} />
        <DisciplinaSchedule discipline={discipline} />
        <DisciplinaCta discipline={discipline} />
      </DisciplinaMotion>
    </>
  );
}
