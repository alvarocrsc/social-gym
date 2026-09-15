import type { Coach } from "@/types/content";

/**
 * Coaches, entered as the client confirms them (§7.3).
 *
 * `role` and `bio` stay empty until the wording is agreed. The portrait path
 * follows the slug and `existingImage()` hides it until the file exists, so a
 * photo is live as soon as `public/coaches/<slug>.jpg` lands and consent is on
 * record. Nothing here is emitted as `Person` structured data yet.
 *
 * TODO: confirm — apellidos de Andrea, Wilson, Simón y Mihai; solo se facilitó
 * el nombre de pila.
 */
export const coaches = [
  {
    slug: "adrian-buda",
    name: "Adrián Buda", // Confirmado 2026-09-02
    role: "", // TODO: confirm — título exacto
    bio: "", // TODO: copy
    image: {
      src: "/coaches/adrian-buda.jpg",
      alt: "",
      width: 800,
      height: 800,
    }, // TODO: confirm — foto y consentimiento
    disciplineSlugs: ["hyrox", "athx", "full-body-strength"],
  },
  {
    slug: "andrea",
    name: "Andrea", // Confirmado 2026-09-02
    role: "", // TODO: confirm — título exacto
    bio: "", // TODO: copy
    image: { src: "/coaches/andrea.jpg", alt: "", width: 800, height: 800 }, // TODO: confirm — foto y consentimiento
    disciplineSlugs: [
      "hyrox",
      "athx",
      "full-body-strength",
      "booty-power",
      "power-cycling",
      "core",
      "hiit",
    ],
  },
  {
    slug: "wilson",
    name: "Wilson", // Confirmado 2026-09-08
    role: "", // TODO: confirm — título exacto
    bio: "", // TODO: copy
    image: { src: "/coaches/wilson.jpg", alt: "", width: 800, height: 800 }, // TODO: confirm — foto y consentimiento
    disciplineSlugs: [
      "cross-combat",
      "defensa-personal",
      "bjj",
      "mma-grappling",
    ],
  },
  {
    slug: "simon",
    name: "Simón", // Confirmado 2026-09-08
    role: "", // TODO: confirm — título exacto
    bio: "", // TODO: copy
    image: { src: "/coaches/simon.jpg", alt: "", width: 800, height: 800 }, // TODO: confirm — foto y consentimiento
    disciplineSlugs: ["boxeo"],
  },
  {
    slug: "mihai",
    name: "Mihai", // Confirmado 2026-09-08
    role: "", // TODO: confirm — título exacto
    bio: "", // TODO: copy
    image: { src: "/coaches/mihai.jpg", alt: "", width: 800, height: 800 }, // TODO: confirm — foto y consentimiento
    disciplineSlugs: ["pilates"],
  },
] satisfies Coach[];
