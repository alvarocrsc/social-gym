import type { PageSeo } from "@/types/seo";

/**
 * One entry per route. Keywords come from the map in AGENTS.md §8.3 and are
 * pending validation in a real volume tool during week 1.
 *
 * Keys are the Spanish paths and double as the canonical source — the English
 * routes canonicalise to these, since no English content exists yet (§4.3).
 *
 * The three legal routes are not in the §8.3 map and carry no keyword target;
 * their titles sit below the 50-char floor because padding a legal page title
 * with filler helps nobody.
 */
export const pageSeo = {
  "/": {
    title: "Gimnasio en Calahorra abierto 365 días | Social Gym",
    description:
      "Centro de entrenamiento en Calahorra abierto los 365 días. Hyrox, boxeo, spinning, pilates, GAP y funcional. Inclusivo y sin egos. Ven a conocernos.",
    path: "/",
    primaryKeyword: "gimnasio calahorra",
    secondaryKeywords: [
      "gimnasio en calahorra",
      "centro de entrenamiento calahorra",
    ],
  },
  "/membresias": {
    title: "Precios y tarifas del gimnasio | Social Gym Calahorra",
    description:
      "Consulta las tarifas del gimnasio en Calahorra: cuotas, qué incluye cada plan y cómo darte de alta. Sin letra pequeña y sin permanencia sorpresa.",
    path: "/membresias",
    primaryKeyword: "precios gimnasio calahorra",
    secondaryKeywords: [
      "tarifas gimnasio calahorra",
      "cuota gimnasio calahorra",
    ],
  },
  "/disciplinas": {
    title: "Clases dirigidas en Calahorra | Social Gym Calahorra",
    description:
      "Seis disciplinas en un mismo centro de Calahorra: Hyrox, boxeo, entrenamiento funcional, spinning, pilates y GAP. Elige la tuya y entrena con gente real.",
    path: "/disciplinas",
    primaryKeyword: "clases dirigidas calahorra",
    secondaryKeywords: ["actividades gimnasio calahorra"],
  },
  "/disciplinas/hyrox": {
    title: "Hyrox en Calahorra · Centro oficial | Social Gym Calahorra",
    description:
      "Centro oficial de entrenamiento Hyrox en Calahorra. Prepara las ocho estaciones con un plan real, tanto si compites como si empiezas desde cero.",
    path: "/disciplinas/hyrox",
    primaryKeyword: "hyrox calahorra",
    secondaryKeywords: ["centro oficial hyrox la rioja", "entrenar hyrox"],
  },
  "/disciplinas/boxeo": {
    title: "Clases de boxeo en Calahorra | Social Gym Calahorra",
    description:
      "Clases de boxeo en Calahorra para todos los niveles. Técnica, saco y trabajo de piernas en sesiones dirigidas. Sin sparring obligatorio ni egos.",
    path: "/disciplinas/boxeo",
    primaryKeyword: "boxeo calahorra",
    secondaryKeywords: ["clases de boxeo calahorra"],
  },
  "/disciplinas/entrenamiento-funcional": {
    title: "Entrenamiento funcional en Calahorra | Social Gym Calahorra",
    description:
      "Entrenamiento funcional en Calahorra: fuerza, movilidad y trabajo metabólico en sesiones dirigidas. Cada ejercicio se adapta a tu nivel desde el primer día.",
    path: "/disciplinas/entrenamiento-funcional",
    primaryKeyword: "entrenamiento funcional calahorra",
    // Adjacent intent. We mention CrossFit honestly and never claim to be one.
    secondaryKeywords: ["crossfit calahorra"],
  },
  "/disciplinas/spinning": {
    title: "Spinning y ciclo indoor en Calahorra | Social Gym Calahorra",
    description:
      "Spinning en Calahorra con música alta y luz baja. Tú eliges la resistencia, así que la clase vale igual si llevas años o si es tu primer día en la bici.",
    path: "/disciplinas/spinning",
    primaryKeyword: "spinning calahorra",
    secondaryKeywords: ["ciclo indoor calahorra"],
  },
  "/disciplinas/pilates": {
    title: "Clases de pilates en Calahorra | Social Gym Calahorra",
    description:
      "Clases de pilates en Calahorra centradas en control, respiración y core. Sesiones tranquilas que se notan al día siguiente. Ideales para empezar a moverte.",
    path: "/disciplinas/pilates",
    primaryKeyword: "pilates calahorra",
    secondaryKeywords: ["clases de pilates calahorra"],
  },
  "/disciplinas/gap": {
    title: "GAP en Calahorra · Glúteo, abdomen y pierna | Social Gym",
    description:
      "Clases de GAP en Calahorra: glúteo, abdomen y pierna en sesiones cortas y directas. Trabajo de fuerza sencillo de seguir y fácil de encajar en tu semana.",
    path: "/disciplinas/gap",
    primaryKeyword: "gap calahorra",
    secondaryKeywords: ["clases gap la rioja"],
  },
  "/horarios": {
    title: "Horarios de clases y gimnasio | Social Gym Calahorra",
    description:
      "Horario completo del gimnasio en Calahorra y de todas las clases dirigidas, día a día. Abrimos los 365 días del año. Reserva tu plaza desde la app.",
    path: "/horarios",
    primaryKeyword: "horario gimnasio calahorra",
    secondaryKeywords: ["horarios clases gimnasio calahorra"],
  },
  "/contacto": {
    title: "Contacto y teléfono del gimnasio | Social Gym Calahorra",
    description:
      "Teléfono, dirección y horarios del gimnasio Social Gym en Calahorra. Estamos en C. Viacampo 12 bis. Escríbenos o pásate a conocer la sala sin cita.",
    path: "/contacto",
    primaryKeyword: "gimnasio calahorra telefono",
    secondaryKeywords: ["gimnasio calahorra direccion"],
  },
  "/aviso-legal": {
    title: "Aviso legal y datos identificativos | Social Gym Calahorra",
    description:
      "Aviso legal de Social Gym: titularidad del sitio, datos identificativos, condiciones de uso y propiedad intelectual, conforme a la LSSI-CE vigente.",
    path: "/aviso-legal",
    primaryKeyword: "",
    secondaryKeywords: [],
  },
  "/privacidad": {
    title: "Política de privacidad y protección de datos | Social Gym",
    description:
      "Cómo trata Social Gym tus datos personales: finalidades, base legal, plazos de conservación y cómo ejercer tus derechos, conforme al RGPD y la LOPDGDD.",
    path: "/privacidad",
    primaryKeyword: "",
    secondaryKeywords: [],
  },
  "/cookies": {
    title: "Política de cookies y cómo configurarlas | Social Gym",
    description:
      "Qué cookies utiliza Social Gym, para qué sirven, cuánto duran y cómo aceptarlas, rechazarlas o configurarlas en cualquier momento desde el navegador.",
    path: "/cookies",
    primaryKeyword: "",
    secondaryKeywords: [],
  },
} satisfies Record<string, PageSeo>;
