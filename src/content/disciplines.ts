import type { Discipline } from "@/types/content";

import { pageSeo } from "./seo";

/**
 * The six active disciplines, in display order — Hyrox first (§7.2).
 *
 * This module is the single source for disciplines: the hub page, the six
 * discipline pages, the sitemap and the nav all derive from it. Adding a
 * seventh entry here should be the only edit needed, apart from its
 * localized pathname in `src/i18n/routing.ts` (see the note there).
 *
 * K1 and Powerlifting appeared in the old mockup and are deliberately absent.
 *
 * `shortDescription` is written copy. `longDescription`, `forWho`,
 * `sessionLooksLike` and `faq` await the copy pass in week 2, and `image`
 * awaits the incoming photography batch.
 */
export const disciplines = [
  {
    slug: "hyrox",
    enSlug: "hyrox",
    name: "Hyrox",
    code: "[HYX]",
    order: 1,
    shortDescription:
      "Somos centro oficial Hyrox. Preparamos las ocho estaciones contigo, compitas o no: aquí el objetivo es terminar mejor de lo que empezaste.",
    longDescription: "", // TODO: copy
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    level: "todos", // Confirmado 2026-08-05
    image: { src: "", alt: "", width: 0, height: 0 }, // TODO: confirm — photography pending
    coachSlugs: [], // TODO: confirm — coach names unverified (§7.3)
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/hyrox"],
  },
  {
    slug: "boxeo",
    enSlug: "boxing",
    name: "Boxeo",
    code: "[BXO]",
    order: 2,
    shortDescription:
      "Técnica, saco y mucho footwork. Aprendes a golpear bien antes que fuerte, y nadie te va a mirar por encima del hombro.",
    longDescription: "", // TODO: copy
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    level: "todos", // Confirmado 2026-08-05
    image: { src: "", alt: "", width: 0, height: 0 }, // TODO: confirm — photography pending
    coachSlugs: [], // TODO: confirm — coach names unverified (§7.3)
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/boxeo"],
  },
  {
    slug: "entrenamiento-funcional",
    enSlug: "functional-training",
    name: "Funcional",
    code: "[FNL]",
    order: 3,
    shortDescription:
      "Fuerza, movilidad y algo de cardio en la misma sesión. Cada ejercicio tiene su versión, así que empiezas por donde estés hoy.",
    longDescription: "", // TODO: copy
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    level: "todos", // Confirmado 2026-08-05
    image: { src: "", alt: "", width: 0, height: 0 }, // TODO: confirm — photography pending
    coachSlugs: [], // TODO: confirm — coach names unverified (§7.3)
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/entrenamiento-funcional"],
  },
  {
    slug: "spinning",
    enSlug: "spinning",
    name: "Spinning",
    code: "[SPN]",
    order: 4,
    shortDescription:
      "Música alta, luz baja y una hora en la que solo piensas en pedalear. Tú decides la resistencia, así que el ritmo es tuyo.",
    longDescription: "", // TODO: copy
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    level: "todos", // Confirmado 2026-08-05
    image: { src: "", alt: "", width: 0, height: 0 }, // TODO: confirm — photography pending
    coachSlugs: [], // TODO: confirm — coach names unverified (§7.3)
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/spinning"],
  },
  {
    slug: "pilates",
    enSlug: "pilates",
    name: "Pilates",
    code: "[PLT]",
    order: 5,
    shortDescription:
      "Control, respiración y core. Sale una clase tranquila que al día siguiente se nota, y es de las mejores formas de volver a moverte.",
    longDescription: "", // TODO: copy
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    level: "todos", // Confirmado 2026-08-05
    image: { src: "", alt: "", width: 0, height: 0 }, // TODO: confirm — photography pending
    coachSlugs: [], // TODO: confirm — coach names unverified (§7.3)
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/pilates"],
  },
  {
    slug: "gap",
    enSlug: "gap",
    name: "GAP",
    code: "[GAP]",
    order: 6,
    shortDescription:
      "Glúteo, abdomen y pierna en sesiones cortas que van al grano. Fáciles de seguir y de encajar en una semana complicada.",
    longDescription: "", // TODO: copy
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    level: "todos", // Confirmado 2026-08-05
    image: { src: "", alt: "", width: 0, height: 0 }, // TODO: confirm — photography pending
    coachSlugs: [], // TODO: confirm — coach names unverified (§7.3)
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/gap"],
  },
] satisfies Discipline[];
