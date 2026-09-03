import type { DisciplinasPage } from "@/types/content";

export const disciplinas = {
  eyebrow: "Clases dirigidas en Calahorra",
  headlineSolid: "Diez formas",
  headlineOutlined: "de entrenar",
  lead: "Fuerza, boxeo, resistencia y clases dirigidas bajo un mismo techo en Calahorra. Elige la tuya y cámbiate cuando quieras: todas entran en la misma cuota.",
  scrollHint: "Desliza abajo",
  metricsLabel: "Exigencia física",
  cta: {
    eyebrow: "Todas incluidas",
    headlineTop: "Una cuota.",
    headlineBottom: "Todo incluido.",
    action: "Ver membresías",
  },
  closing: {
    heading: "¿No sabes por dónde empezar?",
    body: "Escríbenos y te decimos cuál encaja mejor con lo que buscas y con los días que puedes venir.",
    action: "Hablar con el equipo",
  },
} as const satisfies DisciplinasPage;
