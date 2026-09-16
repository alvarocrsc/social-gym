import type { ClassType } from "@/types/content";

/**
 * Every format that appears on the weekly timetable, as the club names it.
 *
 * Separate from `disciplines.ts` because the two lists need not match: a format
 * can run in the room without a marketing page. `disciplineSlug` links the ones
 * that have one, so `/horarios` and each discipline page read the same schedule
 * and share the same photo.
 *
 * `durationMin` lives here rather than on each slot because the length belongs
 * to the format: every Boxeo class is 90 minutes, every Core is 30.
 *
 * Codes and names transcribed from the club's own timetable, 2026-09-07.
 * The cell photo comes from the linked discipline rather than being repeated
 * here.
 */
export const classTypes = [
  {
    slug: "hyrox",
    code: "HYX",
    name: "Hyrox",
    tier: "hyrox",
    durationMin: 60,
    disciplineSlug: "hyrox",
  },
  {
    slug: "funcional",
    code: "FNL",
    name: "Funcional",
    tier: "fuerza",
    durationMin: 60,
    disciplineSlug: "entrenamiento-funcional",
  },
  {
    slug: "athx",
    code: "ATHX",
    name: "ATHX",
    tier: "fuerza",
    durationMin: 60,
    disciplineSlug: "athx",
  },
  {
    slug: "booty-power",
    code: "BOOTY",
    name: "Booty Power",
    tier: "dirigida",
    durationMin: 45,
    disciplineSlug: "booty-power",
  },
  {
    slug: "core",
    code: "CORE",
    name: "Core",
    tier: "dirigida",
    durationMin: 30,
    disciplineSlug: "core",
  },
  {
    slug: "power-cycling",
    code: "CICLO",
    name: "Power Cycling",
    tier: "dirigida",
    durationMin: 45,
    disciplineSlug: "power-cycling",
  },
  {
    slug: "hiit",
    code: "HIIT",
    name: "HIIT",
    fullName: "High Intensity Interval Training",
    tier: "dirigida",
    durationMin: 30,
    disciplineSlug: "hiit",
  },
  {
    slug: "pilates",
    code: "PLTS",
    name: "Pilates",
    tier: "cuerpo",
    durationMin: 60,
    disciplineSlug: "pilates",
  },
  {
    slug: "boxeo",
    code: "BXO",
    name: "Boxeo",
    tier: "contacto",
    durationMin: 90,
    disciplineSlug: "boxeo",
  },
  {
    slug: "cross-combat",
    code: "CC",
    name: "Cross Combat",
    tier: "contacto",
    durationMin: 60,
    disciplineSlug: "cross-combat",
  },
  {
    slug: "defensa-personal",
    code: "DFP",
    name: "Defensa Personal",
    tier: "contacto",
    durationMin: 60,
    disciplineSlug: "defensa-personal",
  },
  {
    slug: "bjj",
    code: "BJJ",
    name: "Brazilian Jiu-Jitsu",
    tier: "contacto",
    durationMin: 90,
    disciplineSlug: "bjj",
  },
  {
    slug: "mma-grappling",
    code: "MMA",
    name: "MMA / Grappling",
    tier: "contacto",
    durationMin: 90,
    disciplineSlug: "mma-grappling",
  },
] satisfies ClassType[];
