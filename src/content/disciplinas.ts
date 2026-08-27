import type { DisciplinasPage } from "@/types/content";

export const disciplinas = {
  eyebrow: "Clases dirigidas en Calahorra",
  headlineSolid: "Seis formas",
  headlineOutlined: "de entrenar",
  lead: "Fuerza, boxeo, resistencia y clases dirigidas bajo un mismo techo en Calahorra. Elige la tuya y cámbiate cuando quieras: todas entran en la misma cuota.",
  scrollHint: "Desliza abajo",
  metricsLabel: "Exigencia física",
  cta: {
    eyebrow: "Todas incluidas",
    headlineTop: "Una cuota.",
    headlineBottom: "Seis disciplinas.",
    action: "Ver membresías",
  },
  closing: {
    heading: "¿No sabes por dónde empezar?",
    body: "Ven un día, prueba la clase que quieras y decide después. Sin compromiso.",
    action: "Reservar prueba",
  },
} as const satisfies DisciplinasPage;
