import type { ClassSlot } from "@/types/content";

/**
 * Weekly class timetable, transcribed from the club's own schedule 2026-09-24.
 *
 * One dataset for both `/horarios` and every discipline page, so the two can
 * never disagree. A visibly stale timetable is worse than no timetable (§6.5):
 * a discipline with no slots here renders a "pendiente" panel rather than an
 * empty table.
 *
 * Length comes from `class-types.ts` — it is a property of the format, not of
 * the session — so a slot only carries `durationMin` when it differs. The coach
 * is per session, because a substitution changes one day and not the format.
 */
export const classSchedule = [
  // Lunes
  {
    day: "Mo",
    start: "10:30",
    classSlug: "funcional",
    coachSlug: "adrian-buda",
  },
  { day: "Mo", start: "18:00", classSlug: "cross-combat", coachSlug: "wilson" },
  { day: "Mo", start: "18:00", classSlug: "booty-power", coachSlug: "andrea" },
  { day: "Mo", start: "19:00", classSlug: "athx", coachSlug: "adrian-buda" },
  { day: "Mo", start: "19:00", classSlug: "hiit", coachSlug: "andrea" },
  { day: "Mo", start: "19:30", classSlug: "boxeo", coachSlug: "simon" },
  { day: "Mo", start: "19:45", classSlug: "pilates", coachSlug: "mihai" },
  { day: "Mo", start: "20:00", classSlug: "hyrox", coachSlug: "andrea" },

  // Martes
  {
    day: "Tu",
    start: "06:30",
    classSlug: "funcional",
    coachSlug: "adrian-buda",
  },
  { day: "Tu", start: "10:30", classSlug: "cross-combat", coachSlug: "wilson" },
  { day: "Tu", start: "18:00", classSlug: "funcional", coachSlug: "andrea" },
  { day: "Tu", start: "19:00", classSlug: "bjj", coachSlug: "wilson" },
  {
    day: "Tu",
    start: "19:00",
    classSlug: "power-cycling",
    coachSlug: "andrea",
  },
  { day: "Tu", start: "20:00", classSlug: "hyrox", coachSlug: "andrea" },

  // Miércoles
  { day: "We", start: "18:00", classSlug: "core", coachSlug: "andrea" },
  {
    day: "We",
    start: "18:00",
    classSlug: "mma-grappling",
    coachSlug: "wilson",
  },
  { day: "We", start: "19:00", classSlug: "athx", coachSlug: "adrian-buda" },
  { day: "We", start: "19:00", classSlug: "hiit", coachSlug: "andrea" },
  { day: "We", start: "19:30", classSlug: "boxeo", coachSlug: "simon" },
  { day: "We", start: "19:45", classSlug: "pilates", coachSlug: "mihai" },
  { day: "We", start: "20:00", classSlug: "hyrox", coachSlug: "andrea" },

  // Jueves
  {
    day: "Th",
    start: "06:30",
    classSlug: "funcional",
    coachSlug: "adrian-buda",
  },
  { day: "Th", start: "10:30", classSlug: "cross-combat", coachSlug: "wilson" },
  { day: "Th", start: "18:00", classSlug: "booty-power", coachSlug: "andrea" },
  { day: "Th", start: "19:00", classSlug: "bjj", coachSlug: "wilson" },
  {
    day: "Th",
    start: "19:00",
    classSlug: "power-cycling",
    coachSlug: "andrea",
  },
  { day: "Th", start: "20:00", classSlug: "hyrox", coachSlug: "andrea" },

  // Viernes
  {
    day: "Fr",
    start: "10:30",
    classSlug: "funcional",
    coachSlug: "adrian-buda",
  },
  { day: "Fr", start: "18:00", classSlug: "funcional", coachSlug: "andrea" },
  {
    day: "Fr",
    start: "18:00",
    classSlug: "mma-grappling",
    coachSlug: "wilson",
  },
  { day: "Fr", start: "19:00", classSlug: "athx", coachSlug: "adrian-buda" },
  { day: "Fr", start: "20:00", classSlug: "hyrox", coachSlug: "andrea" },

  // Sábado
  { day: "Sa", start: "11:00", classSlug: "hyrox", coachSlug: "andrea" },
  { day: "Sa", start: "12:00", classSlug: "athx", coachSlug: "andrea" },
] satisfies ClassSlot[];

/**
 * ISO date of the last timetable review. Rendered on /horarios so visitors can
 * see how current it is. Update it whenever `classSchedule` changes.
 */
export const classScheduleLastUpdated = "2026-09-24";
