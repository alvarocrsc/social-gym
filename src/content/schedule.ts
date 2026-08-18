import type { ScheduleBlock } from "@/types/content";

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
