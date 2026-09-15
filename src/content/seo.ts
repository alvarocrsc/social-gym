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
      "Centro de entrenamiento en Calahorra abierto los 365 días. Hyrox, boxeo, jiu-jitsu, ciclo, pilates, fuerza y más. Inclusivo y sin egos. Ven a vernos.",
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
      "Trece clases dirigidas en un mismo centro de Calahorra: Hyrox, ATHX, boxeo, jiu-jitsu, ciclo, pilates, core y fuerza. Elige la tuya y empieza hoy mismo.",
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
  "/disciplinas/athx": {
    title: "ATHX, entrenamiento híbrido en Calahorra | Social Gym",
    description:
      "ATHX en Calahorra: entrenamiento híbrido que combina fuerza, cardio y acondicionamiento metabólico en una sesión. Cargas, remo y SkiErg adaptados a tu nivel.",
    path: "/disciplinas/athx",
    primaryKeyword: "athx calahorra",
    secondaryKeywords: [
      "entrenamiento híbrido calahorra",
      "entrenamiento funcional calahorra",
    ],
  },
  "/disciplinas/pilates": {
    title: "Clases de pilates en Calahorra | Social Gym Calahorra",
    description:
      "Clases de pilates en Calahorra centradas en control, respiración y core. Sesiones tranquilas que se notan al día siguiente. Ideales para empezar a moverte.",
    path: "/disciplinas/pilates",
    primaryKeyword: "pilates calahorra",
    secondaryKeywords: ["clases de pilates calahorra"],
  },
  "/disciplinas/booty-power": {
    title: "Booty Power en Calahorra · Glúteo y cadera | Social Gym",
    description:
      "Clases de Booty Power en Calahorra: glúteo, cadera y cadena posterior con banda y carga progresiva. Series largas y una sesión que se nota de verdad.",
    path: "/disciplinas/booty-power",
    primaryKeyword: "booty power calahorra",
    secondaryKeywords: ["clases de gluteo calahorra"],
  },
  "/disciplinas/power-cycling": {
    title: "Power Cycling en Calahorra · Ciclo indoor | Social Gym",
    description:
      "Clases de Power Cycling en Calahorra: ciclo indoor por bloques de alta intensidad y sin impacto para rodillas ni tobillos. Tú decides la resistencia.",
    path: "/disciplinas/power-cycling",
    primaryKeyword: "power cycling calahorra",
    secondaryKeywords: ["ciclo indoor la rioja"],
  },
  "/disciplinas/full-body-strength": {
    title: "Full Body Strength en Calahorra | Social Gym Calahorra",
    description:
      "Clases de Full Body Strength en Calahorra: fuerza de cuerpo entero con barra y mancuernas, técnica corregida y carga que sube semana a semana.",
    path: "/disciplinas/full-body-strength",
    primaryKeyword: "full body strength calahorra",
    secondaryKeywords: ["clases de fuerza calahorra"],
  },
  "/disciplinas/core": {
    title: "Clases de Core en Calahorra · Abdomen y lumbar | Social Gym",
    description:
      "Clases de Core en Calahorra: abdomen profundo, lumbares y suelo pélvico en sesiones cortas y exigentes. La base que sostiene todo lo demás que entrenas.",
    path: "/disciplinas/core",
    primaryKeyword: "core calahorra",
    secondaryKeywords: ["clases de abdominales calahorra"],
  },
  "/disciplinas/hiit": {
    title: "Clases de HIIT en Calahorra · 30 minutos | Social Gym",
    description:
      "Clases de HIIT en Calahorra: media hora de intervalos de alta intensidad y descansos cortos. El entreno más rápido del horario y el que más se nota.",
    path: "/disciplinas/hiit",
    primaryKeyword: "hiit calahorra",
    secondaryKeywords: ["entrenamiento interválico calahorra"],
  },
  "/disciplinas/cross-combat": {
    title: "Cross Combat en Calahorra · Golpeo | Social Gym Calahorra",
    description:
      "Cross Combat en Calahorra: golpeo, desplazamiento y acondicionamiento en el mismo circuito. El físico de un deportista de combate, y sin contacto.",
    path: "/disciplinas/cross-combat",
    primaryKeyword: "cross combat calahorra",
    secondaryKeywords: ["clases de combate calahorra"],
  },
  "/disciplinas/defensa-personal": {
    title: "Defensa personal en Calahorra | Social Gym Calahorra",
    description:
      "Clases de defensa personal en Calahorra: distancia, salida y respuestas sencillas que funcionan bajo estrés. Sin experiencia previa y sin golpearse.",
    path: "/disciplinas/defensa-personal",
    primaryKeyword: "defensa personal calahorra",
    secondaryKeywords: ["clases defensa personal la rioja"],
  },
  "/disciplinas/bjj": {
    title: "Brazilian Jiu-Jitsu en Calahorra | Social Gym Calahorra",
    description:
      "Clases de Brazilian Jiu-Jitsu en Calahorra: control, transiciones y sumisión en el suelo. Noventa minutos donde la técnica gana siempre a la fuerza.",
    path: "/disciplinas/bjj",
    primaryKeyword: "jiu jitsu calahorra",
    secondaryKeywords: ["brazilian jiu jitsu la rioja"],
  },
  "/disciplinas/mma-grappling": {
    title: "MMA y grappling en Calahorra | Social Gym Calahorra",
    description:
      "Clases de MMA y grappling en Calahorra: golpeo de pie, derribo y control en el suelo. Noventa minutos con sparring opcional y a intensidad pactada.",
    path: "/disciplinas/mma-grappling",
    primaryKeyword: "mma calahorra",
    secondaryKeywords: ["grappling calahorra"],
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
