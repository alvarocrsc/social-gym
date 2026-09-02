import type { ClassSlot } from "@/types/content";

/**
 * Weekly class timetable, per discipline.
 *
 * A visibly stale timetable is worse than no timetable (§6.5): every discipline
 * page renders only its own slots and falls back to a "pendiente" panel when it
 * has none, so a partially filled table never reads as complete.
 */
export const classSchedule = [
  // Hyrox — confirmado 2026-09-02
  {
    day: "Mo",
    start: "20:00",
    durationMin: 60,
    disciplineSlug: "hyrox",
    coachSlug: "adrian-buda",
  },
  {
    day: "Tu",
    start: "20:00",
    durationMin: 60,
    disciplineSlug: "hyrox",
    coachSlug: "andrea",
  },
  {
    day: "We",
    start: "19:00",
    durationMin: 60,
    disciplineSlug: "hyrox",
    coachSlug: "andrea",
  },
  {
    day: "Th",
    start: "20:00",
    durationMin: 60,
    disciplineSlug: "hyrox",
    coachSlug: "adrian-buda",
  },
  {
    day: "Fr",
    start: "20:00",
    durationMin: 60,
    disciplineSlug: "hyrox",
    coachSlug: "adrian-buda",
  },
  {
    day: "Sa",
    start: "11:00",
    durationMin: 60,
    disciplineSlug: "hyrox",
    coachSlug: "andrea",
  },
] satisfies ClassSlot[];

/**
 * ISO date of the last timetable review. Rendered on /horarios so visitors can
 * see how current it is. Update it whenever `classSchedule` changes.
 */
export const classScheduleLastUpdated = "2026-09-02";
