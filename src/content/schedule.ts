import type { ScheduleBlock } from "@/types/content";

/**
 * Opening hours. Confirmed against the Google Business Profile — these two must
 * never drift apart (§8.8). Feeds `openingHoursSpecification` in the root
 * JSON-LD graph.
 *
 * The gym is open 365 days a year; Sunday hours also cover public holidays.
 */
export const schedule = [
  {
    days: ["Mo", "Tu", "We", "Th", "Fr"],
    label: "Lunes a viernes",
    opens: "06:00",
    closes: "01:00",
  },
  {
    days: ["Sa"],
    label: "Sábado",
    opens: "09:00",
    closes: "20:00",
  },
  {
    days: ["Su"],
    label: "Domingo y festivos",
    opens: "09:00",
    closes: "14:00",
  },
] satisfies ScheduleBlock[];
