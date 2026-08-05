import type { ClassSlot } from "@/types/content";

/**
 * Weekly class timetable for /horarios. Deliberately empty.
 *
 * The real timetable lives inside Virtuagym and has not been exported yet. A
 * visibly stale timetable is worse than no timetable (§6.5), which is why
 * `lastUpdated` is displayed on the page and reviewed monthly.
 *
 * TODO: confirm — weekly timetable from Virtuagym.
 */
// TODO: switch to satisfies once populated — empty arrays infer never[].
export const classSchedule: ClassSlot[] = [];

/**
 * ISO date of the last timetable review. Rendered on /horarios so visitors can
 * see how current it is. Update it whenever `classSchedule` changes.
 */
export const classScheduleLastUpdated = ""; // TODO: confirm — set when the timetable lands
