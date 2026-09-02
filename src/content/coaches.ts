import type { Coach } from "@/types/content";

/**
 * Coaches, entered as the client confirms them (§7.3).
 *
 * `role`, `bio` and `image` stay empty until the wording is agreed and photo
 * consent is on record — a name alone is enough for the timetable, and nothing
 * here is emitted as `Person` structured data yet.
 */
export const coaches = [
  {
    slug: "adrian-buda",
    name: "Adrián Buda", // Confirmado 2026-09-02
    role: "", // TODO: confirm — título exacto
    bio: "", // TODO: copy
    image: { src: "", alt: "", width: 800, height: 800 }, // TODO: confirm — foto y consentimiento
    disciplineSlugs: ["hyrox"],
  },
  {
    slug: "andrea",
    // TODO: confirm — apellido; se facilitó solo el nombre.
    name: "Andrea", // Confirmado 2026-09-02
    role: "", // TODO: confirm — título exacto
    bio: "", // TODO: copy
    image: { src: "", alt: "", width: 800, height: 800 }, // TODO: confirm — foto y consentimiento
    disciplineSlugs: ["hyrox"],
  },
] satisfies Coach[];
