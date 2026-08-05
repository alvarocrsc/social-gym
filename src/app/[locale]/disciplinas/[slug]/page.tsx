import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { JsonLd } from "@/components/seo/JsonLd";
import { disciplines } from "@/content/disciplines";
import { pageSeo } from "@/content/seo";
import { site } from "@/content/site";
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

/**
 * Discipline template — six pages from one file (§6.2).
 *
 * TODO: sections — DisciplineHero, DisciplineBody, DisciplineSchedule, Team
 * (filtered), FaqSection, RelatedDisciplines, FinalCta. Each page needs
 * 400–600 words of genuinely distinct copy; near-identical paragraphs with the
 * name swapped would waste all six.
 */
export default async function DisciplinaPage({
  params,
}: PageProps<"/[locale]/disciplinas/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const discipline = disciplines.find((entry) => entry.slug === slug);
  if (!discipline) {
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
      {/* §6.2: H1 is `<Disciplina> en Calahorra`. */}
      <h1>{`${discipline.name} en ${site.address.locality}`}</h1>
    </>
  );
}
