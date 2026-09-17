import type { HorariosPage } from "@/types/content";

/**
 * Chrome copy for /horarios. The timetable itself comes from
 * `class-schedule.ts` and `class-types.ts`; the opening hours from
 * `schedule.ts`.
 */
export const horarios = {
  heroImage: "/heroes/horarios.jpg",
  eyebrow: "Horarios",
  headlineSolid: "Tú pones",
  headlineOutlined: "la hora",
  keywordLine: "Horario del gimnasio en Calahorra",
  lead: "Diecinueve horas abiertos de lunes a viernes. Entra a la hora que te cuadre y reserva tu clase dirigida desde la app.",
  heroAction: "Ver la semana",
  openHeading: "Sala abierta",
  openTrackTicks: ["00:00", "12:00", "24:00"],
  weekHeading: "Clases dirigidas",
  weekAnchor: "semana",
  filterClassLabel: "Clase",
  filterCoachLabel: "Coach",
  filterAllClasses: "Todas las clases",
  filterAllCoaches: "Todo el equipo",
  filterClear: "Quitar filtros",
  filterCount: "{n} clases esta semana",
  emptyFiltered: "Ninguna clase coincide con el filtro.",
  todayLabel: "Hoy",
  hourColumn: "Hora",
  weekFootnote:
    "Semana tipo · las plazas se reservan desde la app · el horario puede variar en festivos",
  lastUpdatedLabel: "Actualizado el",
  densityEyebrow: "Cuándo venir",
  densityHeadlineSolid: "Elige tu",
  densityHeadlineOutlined: "franja",
  densityLead:
    "Las clases dirigidas se concentran de 18:00 a 20:30, así que reserva con antelación si entrenas por la tarde. El resto del día la sala es tuya.",
  // TODO: confirm — la afluencia es una estimación a partir del número de
  // clases por franja, no una medición de la sala.
  densityRows: [
    {
      range: "06:00 – 10:00",
      note: "Sala tranquila y alguna clase madrugadora",
      bars: [35, 22, 18],
      peak: false,
    },
    {
      range: "10:00 – 17:00",
      note: "Fuerza y Cross Combat a media mañana",
      bars: [55, 40, 30],
      peak: false,
    },
    {
      range: "18:00 – 20:30",
      note: "Hora punta: casi todas las dirigidas",
      bars: [100, 85, 70],
      peak: true,
    },
    {
      range: "21:00 – 01:00",
      note: "Sala para ti solo",
      bars: [28, 20, 14],
      peak: false,
    },
  ],
  ctaHeadlineSolid: "Reserva tu clase",
  ctaHeadlineOutlined: "en la app",
  ctaBody:
    "Consulta el horario actualizado, apúntate a las clases y entra a la sala con tu QR.",
  ctaAction: "Ver membresías",
  appStoreKicker: "Descarga en",
  googlePlayKicker: "Disponible en",
} as const satisfies HorariosPage;
