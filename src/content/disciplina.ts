import type { DisciplinaPage } from "@/types/content";

/**
 * Chrome copy for the discipline detail template — the words that are the same
 * on all six pages. Everything that changes per discipline lives on the
 * `Discipline` entry in `disciplines.ts`.
 */
export const disciplina = {
  hubLabel: "Disciplinas",
  heroHint: "Galería",
  playLabel: "Ver la clase",
  closeLabel: "Cerrar",
  galleryHeading: "Dentro de la sala",
  galleryPieces: "piezas",
  galleryVideos: "vídeos",
  galleryVideo: "vídeo",
  attributesHeading: "Qué trabaja",
  attributeLevels: { high: "Alta", mid: "Media", low: "Baja" },
  aboutEyebrow: "La disciplina",
  sessionHeading: "Cómo es una sesión",
  sessionBlocks: "bloques",
  switcherHeading: "Cambiar de disciplina",
  coachEyebrow: "Tu coach",
  coachAction: "Hablar con el equipo",
  scheduleHeading: "Horarios",
  scheduleAction: "Horario completo",
  scheduleWeek: "Entre semana",
  scheduleWeekend: "Fin de semana",
  scheduleColumns: { day: "Día", time: "Hora", coach: "Coach" },
  scheduleLimited: "Plazas limitadas",
  scheduleBooking: "Reserva en la app",
  schedulePending:
    "Estamos cerrando el horario de la temporada. Escríbenos y te decimos los días y las horas de esta disciplina.",
  ctaAction: "Ver membresías",
} as const satisfies DisciplinaPage;
