import type { Discipline } from "@/types/content";

import { pageSeo } from "./seo";

// AV1 first, H.264 second — same order and reasoning as `hero.ts`. Both strings
// are read out of each file's av1C / avcC box, never guessed: a wrong one makes
// the browser skip the source with no error.
//
// The AV1 level rides on resolution, so a clip cropped out of landscape footage
// declares a lower one than the tall Hyrox pair. Both are real values from the
// files, not a shared guess.
const GALLERY_AV1_L8 = 'video/mp4; codecs="av01.0.08M.08"'; // 1152×1360
const GALLERY_AV1_L5 = 'video/mp4; codecs="av01.0.05M.08"'; // 916×1080
const GALLERY_H264 = 'video/mp4; codecs="avc1.640028"'; // High@4.0

/**
 * The active disciplines, in display order — Hyrox first (§7.2).
 *
 * This module is the single source for disciplines: the hub page, the six
 * discipline pages, the sitemap and the nav all derive from it. Adding a
 * new entry here should be the only edit needed, apart from its localized
 * pathname in `src/i18n/routing.ts` and its `pageSeo` record (see the notes
 * in both).
 *
 * K1 and Powerlifting appeared in the old mockup and are deliberately absent.
 *
 * Copy is written. `forWho`, `sessionLooksLike` and `faq` stay empty because
 * no section renders them yet.
 *
 * Every image path follows the slug, and `existingImage()` hides the ones
 * whose file is not there yet — so adding a photo means dropping
 * `public/disciplinas/<slug>.jpg` (or `<slug>/01.jpg`…`06.jpg` for the
 * gallery) and nothing else.
 */
export const disciplines = [
  {
    slug: "hyrox",
    enSlug: "hyrox",
    name: "Hyrox",
    code: "[HYX]",
    order: 1,
    badge: "Centro oficial", // Confirmed — official Hyrox centre (§1)
    shortDescription:
      "Somos centro oficial Hyrox. Preparamos las ocho estaciones contigo, compitas o no: aquí el objetivo es terminar mejor de lo que empezaste.",
    tagline:
      "Ocho estaciones y un kilómetro de carrera entre cada una. El formato de fitness de competición más exigente del mundo, con sala y material oficiales en Calahorra.",
    headline: { solid: "Correr", outlined: "y levantar" },
    longDescription:
      "Hyrox combina resistencia y fuerza funcional en un formato cerrado e idéntico en todo el mundo: ocho kilómetros de carrera repartidos en ocho vueltas, con una estación de trabajo al final de cada una.",
    paragraphs: [
      "Aquí entrenamos la prueba por partes. Cada sesión trabaja el gesto técnico de una o dos estaciones, la transición entre carrera y estación —donde se pierden la mayoría de los minutos— y el ritmo al que de verdad puedes sostener el esfuerzo.",
      "El material es el oficial: trineo, sacos, wall balls, remo, ski erg y pasillo de carrera. No hace falta experiencia previa, porque las cargas se escalan y cada estación tiene su versión de iniciación.",
      "Si compites, planificamos contigo el bloque previo a tu carrera. Si no compites, es sencillamente el entreno más completo que vas a encontrar en una hora.",
    ],
    // TODO: confirm — duración y material redactados, no facilitados por el club.
    meta: [
      { label: "Duración", value: "60 min" },
      { label: "Objetivo", value: "Resistencia" },
      { label: "Material", value: "Oficial Hyrox" },
      { label: "Nivel", value: "Todos" },
    ],
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    // TODO: confirm — reparto de minutos redactado, pendiente de validar con los coaches.
    session: [
      {
        time: "00–10 min",
        title: "Calentamiento y movilidad",
        body: "Activación de cadera, tobillo y hombro, y una progresión de carrera suave hasta el ritmo objetivo del día.",
      },
      {
        time: "10–25 min",
        title: "Técnica de estación",
        body: "Una o dos estaciones a carga ligera: posición, agarre y ritmo de repetición antes de acumular fatiga.",
      },
      {
        time: "25–52 min",
        title: "Bloque run + station",
        body: "El corazón de la clase: series de carrera alternadas con estación, cronometradas y con las transiciones medidas.",
      },
      {
        time: "52–60 min",
        title: "Vuelta a la calma",
        body: "Respiración, estiramiento del tren inferior y registro de tus tiempos para poder compararlos la semana que viene.",
      },
    ],
    cta: {
      heading: "Tu sitio en la sala",
      body: "Elige la membresía que encaje con los días que puedes entrenar y nos vemos en la sala Hyrox.",
    },
    // TODO: confirm — placeholder profile, not measured.
    metrics: [
      { label: "Fuerza", value: 75 },
      { label: "Resistencia", value: 95 },
      { label: "Agilidad", value: 60 },
      { label: "Velocidad", value: 70 },
      { label: "Flexibilidad", value: 35 },
    ],
    level: "todos", // Confirmado 2026-08-05
    image: {
      src: "/disciplinas/hyrox.jpg",
      alt: "",
      width: 1720,
      height: 1440,
    }, // TODO: confirm — photography pending
    // TODO: photography — los pies de foto son definitivos, el material no.
    gallery: [
      {
        caption: "Sled push",
        span: 2,
        image: {
          src: "/disciplinas/hyrox/01.jpg",
          alt: "",
          width: 1170,
          height: 1710,
        },
      },
      {
        caption: "Un kilómetro entre estaciones",
        span: 3,
        image: {
          src: "/disciplinas/hyrox/02.jpg",
          alt: "",
          width: 1152,
          height: 1360,
        },
        video: [
          { src: "/disciplinas/hyrox/02.av1.mp4", type: GALLERY_AV1_L8 },
          { src: "/disciplinas/hyrox/02.mp4", type: GALLERY_H264 },
        ],
        duration: "0:06",
      },
      {
        caption: "Wall balls",
        span: 1,
        image: {
          src: "/disciplinas/hyrox/03.jpg",
          alt: "",
          width: 1164,
          height: 1521,
        },
      },
      {
        caption: "Burpee broad jump",
        span: 3,
        image: {
          src: "/disciplinas/hyrox/04.jpg",
          alt: "",
          width: 1152,
          height: 1360,
        },
        video: [
          { src: "/disciplinas/hyrox/04.av1.mp4", type: GALLERY_AV1_L8 },
          { src: "/disciplinas/hyrox/04.mp4", type: GALLERY_H264 },
        ],
        duration: "0:06",
      },
      {
        caption: "Farmers carry",
        span: 1,
        image: {
          src: "/disciplinas/hyrox/05.jpg",
          alt: "",
          width: 1164,
          height: 1543,
        },
      },
      {
        caption: "Remo",
        span: 2,
        image: {
          src: "/disciplinas/hyrox/06.jpg",
          alt: "",
          width: 1167,
          height: 1494,
        },
      },
    ],
    coachSlugs: ["adrian-buda", "andrea"], // Confirmado 2026-09-02
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/hyrox"],
  },
  {
    slug: "boxeo",
    enSlug: "boxing",
    name: "Boxeo",
    code: "[BXO]",
    order: 2,
    badge: "Desde cero", // TODO: confirm
    shortDescription:
      "Técnica, saco y mucho footwork. Aprendes a golpear bien antes que fuerte, y nadie te va a mirar por encima del hombro.",
    tagline:
      "Guardia, distancia y golpeo. Aprendes a moverte antes que a pegar fuerte, y el saco no juzga a nadie.",
    headline: { solid: "Técnica", outlined: "antes que fuerza" },
    longDescription:
      "El boxeo es lo más técnico que vas a encontrar en una sala de grupo: antes de golpear hay que saber estar de pie, repartir el peso y volver a la guardia. Eso es exactamente lo que se entrena aquí.",
    paragraphs: [
      "Las clases combinan trabajo de pies, sombra, saco y manoplas. Se corrige golpe a golpe y en grupos pequeños, porque un directo mal lanzado mil veces solo enseña a lanzarlo mal más rápido.",
      "No hay sparring obligatorio ni nadie mirándote por encima del hombro. Si algún día quieres guantes y contacto controlado, se habla; si no, el saco da exactamente el mismo entrenamiento.",
      "Sales con el pulso alto, los hombros cansados y una hora sin haber pensado en nada más. Como acondicionamiento físico, pocas cosas rinden tanto por minuto.",
    ],
    // TODO: confirm — duración y material redactados, no facilitados por el club.
    meta: [
      { label: "Duración", value: "60 min" },
      { label: "Objetivo", value: "Agilidad" },
      { label: "Material", value: "Guantes y saco" },
      { label: "Nivel", value: "Todos" },
    ],
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    // TODO: confirm — reparto de minutos redactado, pendiente de validar con los coaches.
    session: [
      {
        time: "00–10 min",
        title: "Cuerda y movilidad",
        body: "Salto, rotación de hombro y cuello, y unos minutos de sombra suave para entrar en calor sin castigar las manos.",
      },
      {
        time: "10–25 min",
        title: "Técnica del día",
        body: "Uno o dos golpes por sesión: recorrido, cadera y vuelta a la guardia, primero al aire y después contra el saco.",
      },
      {
        time: "25–50 min",
        title: "Saco y manoplas",
        body: "Rondas cronometradas alternando saco y manoplas, con descansos cortos y correcciones sobre la marcha.",
      },
      {
        time: "50–60 min",
        title: "Core y estiramiento",
        body: "Abdomen, zona lumbar y estiramiento de cadena posterior para bajar pulsaciones antes de salir.",
      },
    ],
    cta: {
      heading: "Ponte los guantes",
      body: "Elige tu membresía y reserva tu primera clase de boxeo desde la app.",
    },
    // TODO: confirm — placeholder profile, not measured.
    metrics: [
      { label: "Fuerza", value: 60 },
      { label: "Resistencia", value: 85 },
      { label: "Agilidad", value: 90 },
      { label: "Velocidad", value: 85 },
      { label: "Flexibilidad", value: 45 },
    ],
    level: "todos", // Confirmado 2026-08-05
    image: {
      src: "/disciplinas/boxeo.jpg",
      alt: "",
      width: 1720,
      height: 1440,
    }, // TODO: confirm — photography pending
    // TODO: photography — los pies de foto son definitivos, el material no.
    gallery: [
      {
        caption: "Guardia y distancia",
        span: 2,
        image: {
          src: "/disciplinas/boxeo/01.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Trabajo de pies",
        span: 3,
        image: {
          src: "/disciplinas/boxeo/02.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Saco pesado",
        span: 1,
        image: {
          src: "/disciplinas/boxeo/03.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Manoplas",
        span: 3,
        image: {
          src: "/disciplinas/boxeo/04.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Combinaciones",
        span: 1,
        image: {
          src: "/disciplinas/boxeo/05.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Acondicionamiento",
        span: 2,
        image: {
          src: "/disciplinas/boxeo/06.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
    ],
    coachSlugs: ["simon"], // Confirmado 2026-09-08
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/boxeo"],
  },
  {
    slug: "athx",
    enSlug: "athx",
    name: "ATHX",
    code: "[ATX]",
    order: 3,
    badge: "Híbrido",
    shortDescription:
      "Fuerza, cardio y acondicionamiento metabólico en la misma sesión. Cargas, remo o SkiErg y movimientos funcionales, adaptados a tu nivel.",
    tagline:
      "Un entrenamiento híbrido que junta fuerza, resistencia y acondicionamiento en una hora. Levantas, remas y te mueves, y cada parte se ajusta a tu nivel.",
    headline: { solid: "Fuerza", outlined: "y motor" },
    longDescription:
      "ATHX es una modalidad de entrenamiento híbrido que combina trabajo de fuerza, resistencia cardiovascular y acondicionamiento metabólico en una misma sesión. Se entrena con cargas, cardio y movimientos funcionales para mejorar tu fuerza, tu potencia, tu resistencia y tu capacidad de trabajo.",
    paragraphs: [
      "Una sesión tipo empieza por la fuerza, con sentadilla o peso muerto y la carga ajustada a cada persona. Después llega la parte híbrida: el remo o el SkiErg se combinan con ejercicios funcionales en bloques de trabajo continuo.",
      "Es un entrenamiento variado: cambian los ejercicios, los tiempos y la forma de combinarlos, así que el cuerpo no se acomoda y la clase no se repite.",
      "Y es completo y adaptable a cualquier nivel. Si empiezas, bajas la carga y el ritmo; si ya tienes base, subes. El esfuerzo lo marcas tú.",
    ],
    // TODO: confirm — objetivo y material redactados a partir de la descripción del club.
    meta: [
      { label: "Duración", value: "60 min" },
      { label: "Objetivo", value: "Fuerza y resistencia" },
      { label: "Material", value: "Cargas y cardio" },
      { label: "Nivel", value: "Todos" },
    ],
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    // TODO: confirm — reparto de minutos redactado, pendiente de validar con los coaches.
    session: [
      {
        time: "00–10 min",
        title: "Activación",
        body: "Movilidad y una entrada en calor progresiva con el material que se va a usar después.",
      },
      {
        time: "10–25 min",
        title: "Fuerza",
        body: "Sentadilla o peso muerto por series, con la carga ajustada a tu nivel y la técnica revisada por el coach.",
      },
      {
        time: "25–50 min",
        title: "Bloque híbrido",
        body: "Remo o SkiErg combinados con ejercicios funcionales en trabajo continuo, para subir pulsaciones sin perder calidad de movimiento.",
      },
      {
        time: "50–60 min",
        title: "Vuelta a la calma",
        body: "Bajada de pulsaciones, movilidad y estiramiento guiado para cerrar la sesión.",
      },
    ],
    cta: {
      heading: "Entrena completo",
      body: "Elige tu membresía y reserva tu plaza en ATHX desde la app. La carga y el ritmo los ajustamos contigo.",
    },
    // TODO: confirm — placeholder profile, not measured.
    metrics: [
      { label: "Fuerza", value: 85 },
      { label: "Resistencia", value: 85 },
      { label: "Agilidad", value: 65 },
      { label: "Velocidad", value: 60 },
      { label: "Flexibilidad", value: 45 },
    ],
    level: "todos",
    image: {
      src: "/disciplinas/athx.jpg",
      alt: "",
      width: 2400,
      height: 3200,
    },
    // TODO: photography — los pies de foto describen la sesión tipo, el material no existe.
    gallery: [
      {
        caption: "Sentadilla",
        span: 2,
        image: {
          src: "/disciplinas/athx/01.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Remo",
        span: 3,
        image: {
          src: "/disciplinas/athx/02.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
        video: [
          { src: "/disciplinas/athx/02.av1.mp4", type: GALLERY_AV1_L5 },
          { src: "/disciplinas/athx/02.mp4", type: GALLERY_H264 },
        ],
        duration: "0:06",
      },
      {
        caption: "Peso muerto",
        span: 1,
        image: {
          src: "/disciplinas/athx/03.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "SkiErg",
        span: 3,
        image: {
          src: "/disciplinas/athx/04.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
        video: [
          { src: "/disciplinas/athx/04.av1.mp4", type: GALLERY_AV1_L5 },
          { src: "/disciplinas/athx/04.mp4", type: GALLERY_H264 },
        ],
        duration: "0:06",
      },
      {
        caption: "Trabajo con cargas",
        span: 1,
        image: {
          src: "/disciplinas/athx/05.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
        video: [
          { src: "/disciplinas/athx/05.av1.mp4", type: GALLERY_AV1_L5 },
          { src: "/disciplinas/athx/05.mp4", type: GALLERY_H264 },
        ],
        duration: "0:06",
      },
      {
        caption: "Ejercicios funcionales",
        span: 2,
        image: {
          src: "/disciplinas/athx/06.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
    ],
    coachSlugs: ["adrian-buda", "andrea"], // Confirmado 2026-09-15
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/athx"],
  },
  {
    slug: "pilates",
    enSlug: "pilates",
    name: "Pilates",
    code: "[PLT]",
    order: 4,
    badge: "Clase dirigida", // TODO: confirm
    shortDescription:
      "Control, respiración y core. Sale una clase tranquila que al día siguiente se nota, y es de las mejores formas de volver a moverte.",
    tagline:
      "Control, respiración y centro. Una clase tranquila que al día siguiente se nota justo donde tenía que notarse.",
    headline: { solid: "Fuerza", outlined: "desde el centro" },
    longDescription:
      "El pilates entrena la musculatura profunda que sostiene la columna: abdomen, suelo pélvico y espalda. No se busca fatiga, se busca control, y por eso se hace despacio y con la respiración marcada.",
    paragraphs: [
      "Trabajamos sobre colchoneta con material ligero —aro, banda elástica, pelota— en series largas de recorrido corto. La sensación no se parece a nada más de la sala: cansa sin que te des cuenta.",
      "Es la clase más pedida por quien pasa el día sentado o arrastra molestias de espalda y cuello. Cada ejercicio tiene una regresión, y avisar de una lesión antes de empezar cambia la sesión entera.",
      "Funciona sola y funciona todavía mejor como complemento: un día de pilates a la semana sostiene todo el resto de tu entrenamiento.",
    ],
    // TODO: confirm — duración y material redactados, no facilitados por el club.
    meta: [
      { label: "Duración", value: "55 min" },
      { label: "Objetivo", value: "Flexibilidad" },
      { label: "Material", value: "Colchoneta" },
      { label: "Nivel", value: "Todos" },
    ],
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    // TODO: confirm — reparto de minutos redactado, pendiente de validar con los coaches.
    session: [
      {
        time: "00–10 min",
        title: "Respiración y colocación",
        body: "Colocación de pelvis y caja torácica y el patrón respiratorio que va a guiar el resto de la clase.",
      },
      {
        time: "10–30 min",
        title: "Serie central",
        body: "Ejercicios de abdomen profundo y control lumbopélvico, en series largas de recorrido corto y muy poca carga.",
      },
      {
        time: "30–48 min",
        title: "Extremidades y lateral",
        body: "Cadera, glúteo medio y hombro con aro o banda, manteniendo el centro activo en todo momento.",
      },
      {
        time: "48–55 min",
        title: "Estiramiento guiado",
        body: "Apertura de cadera y columna y unos minutos de vuelta a la calma antes de levantarte.",
      },
    ],
    cta: {
      heading: "Recupera el control",
      body: "Elige tu membresía y añade el pilates a tu semana.",
    },
    // TODO: confirm — placeholder profile, not measured.
    metrics: [
      { label: "Fuerza", value: 50 },
      { label: "Resistencia", value: 40 },
      { label: "Agilidad", value: 55 },
      { label: "Velocidad", value: 20 },
      { label: "Flexibilidad", value: 95 },
    ],
    level: "todos", // Confirmado 2026-08-05
    image: {
      src: "/disciplinas/pilates.jpg",
      alt: "",
      width: 1720,
      height: 1440,
    }, // TODO: confirm — photography pending
    // TODO: photography — los pies de foto son definitivos, el material no.
    gallery: [
      {
        caption: "Serie de suelo",
        span: 2,
        image: {
          src: "/disciplinas/pilates/01.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Respiración y centro",
        span: 3,
        image: {
          src: "/disciplinas/pilates/02.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Aro y banda",
        span: 1,
        image: {
          src: "/disciplinas/pilates/03.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Control de columna",
        span: 3,
        image: {
          src: "/disciplinas/pilates/04.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Trabajo lateral",
        span: 1,
        image: {
          src: "/disciplinas/pilates/05.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Estiramiento final",
        span: 2,
        image: {
          src: "/disciplinas/pilates/06.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
    ],
    coachSlugs: ["mihai"], // Confirmado 2026-09-08
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/pilates"],
  },
  {
    slug: "booty-power",
    enSlug: "booty-power",
    name: "Booty Power",
    code: "[BTY]",
    order: 5,
    badge: "Clase dirigida", // TODO: confirm
    shortDescription:
      "Glúteo a conciencia, con banda y carga progresiva. Series largas, descansos cortos y una sesión que se nota al subir escaleras.",
    tagline:
      "Glúteo, cadera y toda la cadena posterior. Una hora dedicada al músculo que más agradece el trabajo constante.",
    headline: { solid: "Fuerza", outlined: "de cadera" },
    longDescription:
      "Booty Power es trabajo específico de glúteo con la cadera como centro de todo. No es tonificación suave: se busca tensión, recorrido completo y una carga que suba semana a semana.",
    paragraphs: [
      "La sesión combina puentes, hip thrust, abducciones y zancadas con banda elástica y peso libre. El orden se repite para que puedas medir tu progreso; lo que cambia es la carga y el tiempo bajo tensión.",
      "El glúteo es el músculo que más se apaga cuando pasas el día sentado y el que más rápido responde cuando le dedicas dos sesiones a la semana. También es el que sostiene la rodilla y la zona lumbar.",
      "No hace falta técnica previa ni material propio. Si vienes de core o de HIIT, encajarás desde el primer día.",
    ],
    // TODO: confirm — duración y material redactados, no facilitados por el club.
    meta: [
      { label: "Duración", value: "50 min" },
      { label: "Objetivo", value: "Fuerza" },
      { label: "Material", value: "Banda y peso libre" },
      { label: "Nivel", value: "Todos" },
    ],
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    // TODO: confirm — reparto de minutos redactado, pendiente de validar con los coaches.
    session: [
      {
        time: "00–08 min",
        title: "Activación",
        body: "Movilidad de cadera y activación de glúteo con banda antes de tocar carga.",
      },
      {
        time: "08–22 min",
        title: "Bloque de fuerza",
        body: "Hip thrust y puente de glúteo en series de pocas repeticiones, con el coach ajustando la carga.",
      },
      {
        time: "22–42 min",
        title: "Series largas",
        body: "Abducciones, zancadas y trabajo con banda en repeticiones altas y descansos cortos.",
      },
      {
        time: "42–50 min",
        title: "Estiramiento",
        body: "Cadena posterior, psoas y zona lumbar para bajar pulsaciones y cerrar la sesión.",
      },
    ],
    cta: {
      heading: "Empieza esta semana",
      body: "Elige tu membresía y reserva tu sitio en la próxima clase de Booty Power.",
    },
    // TODO: confirm — placeholder profile, not measured.
    metrics: [
      { label: "Fuerza", value: 80 },
      { label: "Resistencia", value: 60 },
      { label: "Agilidad", value: 40 },
      { label: "Velocidad", value: 35 },
      { label: "Flexibilidad", value: 45 },
    ],
    level: "todos", // TODO: confirm
    image: {
      src: "/disciplinas/booty-power.jpg",
      alt: "",
      width: 1720,
      height: 1440,
    }, // TODO: photography
    // TODO: photography — los pies de foto son un borrador, el material no existe.
    gallery: [
      {
        caption: "Hip thrust",
        span: 2,
        image: {
          src: "/disciplinas/booty-power/01.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Serie con banda",
        span: 3,
        image: {
          src: "/disciplinas/booty-power/02.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Puente de glúteo",
        span: 1,
        image: {
          src: "/disciplinas/booty-power/03.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Zancadas",
        span: 3,
        image: {
          src: "/disciplinas/booty-power/04.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Abducciones",
        span: 1,
        image: {
          src: "/disciplinas/booty-power/05.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Estiramiento",
        span: 2,
        image: {
          src: "/disciplinas/booty-power/06.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
    ],
    coachSlugs: ["andrea"], // Confirmado 2026-09-08
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/booty-power"],
  },
  {
    slug: "power-cycling",
    enSlug: "power-cycling",
    name: "Power Cycling",
    code: "[PWC]",
    order: 6,
    badge: "Clase dirigida", // TODO: confirm
    shortDescription:
      "Ciclo indoor por bloques de mucha intensidad. Piernas y pulso alto durante una hora, sin castigar las articulaciones.",
    tagline:
      "Ciclo indoor llevado al terreno de la fuerza. Bloques cortos donde se aprieta de verdad y recuperaciones medidas.",
    headline: { solid: "Potencia", outlined: "sobre la bici" },
    longDescription:
      "Power Cycling es ciclo indoor a intensidad alta: bloques cortos de mucho esfuerzo, subidas sostenidas y recuperaciones medidas, con la resistencia siempre en tu mando.",
    paragraphs: [
      "La clase se organiza en bloques con un objetivo claro cada uno, marcados con la música. Se alterna trabajo sentado y de pie, con series donde se aprieta de verdad y recuperación activa entre ellas.",
      "Es cardio de alta intensidad sin impacto: la bici absorbe lo que las rodillas y los tobillos no tienen por qué aguantar, y aun así sales con las pulsaciones donde quieras ponerlas.",
      "Antes de empezar te ajustamos el sillín y el manillar. No hace falta saber nada: la resistencia siempre la pones tú.",
    ],
    // TODO: confirm — duración y material redactados, no facilitados por el club.
    meta: [
      { label: "Duración", value: "50 min" },
      { label: "Objetivo", value: "Resistencia" },
      { label: "Material", value: "Bici indoor" },
      { label: "Nivel", value: "Todos" },
    ],
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    // TODO: confirm — reparto de minutos redactado, pendiente de validar con los coaches.
    session: [
      {
        time: "00–08 min",
        title: "Ajuste y calentamiento",
        body: "Colocación en la bici y pedaleo progresivo hasta entrar en ritmo.",
      },
      {
        time: "08–20 min",
        title: "Bloque base",
        body: "Cadencia sostenida a resistencia media para preparar el cuerpo para el trabajo duro.",
      },
      {
        time: "20–42 min",
        title: "Bloques de intensidad",
        body: "Series de pie, subidas sostenidas y sprints cortos, con recuperación activa entre cada bloque.",
      },
      {
        time: "42–50 min",
        title: "Vuelta a la calma",
        body: "Pedaleo suave y estiramiento de cuádriceps, isquios y gemelo fuera de la bici.",
      },
    ],
    cta: {
      heading: "Súbete a la bici",
      body: "Elige tu membresía y reserva tu bici para la próxima sesión.",
    },
    // TODO: confirm — placeholder profile, not measured.
    metrics: [
      { label: "Fuerza", value: 60 },
      { label: "Resistencia", value: 95 },
      { label: "Agilidad", value: 30 },
      { label: "Velocidad", value: 85 },
      { label: "Flexibilidad", value: 20 },
    ],
    level: "todos", // TODO: confirm
    image: {
      src: "/disciplinas/power-cycling.jpg",
      alt: "",
      width: 1720,
      height: 1440,
    }, // TODO: photography
    // TODO: photography — los pies de foto son un borrador, el material no existe.
    gallery: [
      {
        caption: "Sala de ciclo",
        span: 2,
        image: {
          src: "/disciplinas/power-cycling/01.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Bloque de intensidad",
        span: 3,
        image: {
          src: "/disciplinas/power-cycling/02.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Ajuste de bici",
        span: 1,
        image: {
          src: "/disciplinas/power-cycling/03.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Series de pie",
        span: 3,
        image: {
          src: "/disciplinas/power-cycling/04.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Cadencia",
        span: 1,
        image: {
          src: "/disciplinas/power-cycling/05.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Vuelta a la calma",
        span: 2,
        image: {
          src: "/disciplinas/power-cycling/06.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
    ],
    coachSlugs: ["andrea"], // Confirmado 2026-09-08
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/power-cycling"],
  },
  {
    slug: "entrenamiento-funcional",
    enSlug: "functional-training",
    name: "Funcional",
    code: "[FNL]",
    order: 7,
    badge: "Clase dirigida", // TODO: confirm
    shortDescription:
      "Todo el cuerpo en una sesión: empujar, tirar y levantar del suelo con carga real y técnica cuidada.",
    tagline:
      "Una sesión, todo el cuerpo. Fuerza de verdad, con carga que sube y técnica que se corrige levantamiento a levantamiento.",
    headline: { solid: "Fuerza", outlined: "de cuerpo entero" },
    longDescription:
      "Funcional trabaja el cuerpo completo en cada sesión en lugar de repartirlo por días: un empuje, una tracción, un movimiento de pierna y algo de centro, con la carga suficiente para que la fuerza suba de verdad.",
    paragraphs: [
      "Se entrena con barra, mancuernas y kettlebells en series de pocas repeticiones y descansos largos. No es un circuito de intensidad: aquí importa la calidad de cada repetición y el peso que llegas a mover.",
      "El coach corrige la posición levantamiento a levantamiento y te ayuda a decidir cuándo subir carga. Cada ejercicio tiene su versión, así que puedes empezar con muy poco peso sin quedarte fuera de la clase.",
      "Dos sesiones a la semana sostienen todo lo demás: aguantas más en las clases duras, corres mejor y te lesionas menos.",
    ],
    // TODO: confirm — duración y material redactados, no facilitados por el club.
    meta: [
      { label: "Duración", value: "60 min" },
      { label: "Objetivo", value: "Fuerza" },
      { label: "Material", value: "Barra y mancuernas" },
      { label: "Nivel", value: "Todos" },
    ],
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    // TODO: confirm — reparto de minutos redactado, pendiente de validar con los coaches.
    session: [
      {
        time: "00–10 min",
        title: "Calentamiento específico",
        body: "Movilidad de hombro y cadera y series de aproximación con la barra vacía.",
      },
      {
        time: "10–30 min",
        title: "Bloque principal",
        body: "El levantamiento del día en series de pocas repeticiones y descansos largos, corrigiendo posición.",
      },
      {
        time: "30–50 min",
        title: "Accesorios",
        body: "Tracción, empuje y trabajo unilateral para equilibrar lo que el bloque principal deja fuera.",
      },
      {
        time: "50–60 min",
        title: "Centro y movilidad",
        body: "Trabajo de core y estiramiento guiado para cerrar sin salir en caliente.",
      },
    ],
    cta: {
      heading: "Levanta más que ayer",
      body: "Elige tu membresía y entra en el próximo grupo de fuerza.",
    },
    // TODO: confirm — placeholder profile, not measured.
    metrics: [
      { label: "Fuerza", value: 95 },
      { label: "Resistencia", value: 55 },
      { label: "Agilidad", value: 45 },
      { label: "Velocidad", value: 45 },
      { label: "Flexibilidad", value: 40 },
    ],
    level: "todos", // TODO: confirm
    image: {
      src: "/disciplinas/entrenamiento-funcional.jpg",
      alt: "",
      width: 1720,
      height: 1440,
    }, // TODO: photography
    // TODO: photography — los pies de foto son un borrador, el material no existe.
    gallery: [
      {
        caption: "Barra y discos",
        span: 2,
        image: {
          src: "/disciplinas/entrenamiento-funcional/01.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Serie de peso muerto",
        span: 3,
        image: {
          src: "/disciplinas/entrenamiento-funcional/02.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Press militar",
        span: 1,
        image: {
          src: "/disciplinas/entrenamiento-funcional/03.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Remo con mancuerna",
        span: 3,
        image: {
          src: "/disciplinas/entrenamiento-funcional/04.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Trabajo unilateral",
        span: 1,
        image: {
          src: "/disciplinas/entrenamiento-funcional/05.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Movilidad final",
        span: 2,
        image: {
          src: "/disciplinas/entrenamiento-funcional/06.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
    ],
    coachSlugs: ["adrian-buda", "andrea"], // Confirmado 2026-09-15
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/entrenamiento-funcional"],
  },
  {
    slug: "core",
    enSlug: "core",
    name: "Core",
    code: "[COR]",
    order: 8,
    badge: "Sesión corta", // TODO: confirm
    shortDescription:
      "Abdomen, lumbares y suelo pélvico en sesiones cortas. La base que sostiene todo lo demás, entrenada aparte.",
    tagline:
      "El centro del cuerpo, entrenado en serio. Media hora que se nota en todo lo demás que haces.",
    headline: { solid: "Todo empieza", outlined: "por el centro" },
    longDescription:
      "Core entrena la musculatura profunda que estabiliza la columna y transmite la fuerza entre el tren superior y el inferior: abdomen profundo, oblicuos, lumbares y suelo pélvico.",
    paragraphs: [
      "Se trabaja con planchas, anti-rotaciones, isométricos y control respiratorio, en series cortas y muy exigentes. Poca carga, mucho control y cero balanceos.",
      "Es la clase que arregla lo que nadie ve: la postura al final del día, la espalda cuando llevas horas sentado y la estabilidad al levantar peso en cualquier otra disciplina.",
      "Funciona sola y funciona mejor como complemento. Encaja bien al terminar un día de fuerza o como sesión corta entre entrenos duros.",
    ],
    // TODO: confirm — duración y material redactados, no facilitados por el club.
    meta: [
      { label: "Duración", value: "30 min" },
      { label: "Objetivo", value: "Fuerza" },
      { label: "Material", value: "Colchoneta" },
      { label: "Nivel", value: "Todos" },
    ],
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    // TODO: confirm — reparto de minutos redactado, pendiente de validar con los coaches.
    session: [
      {
        time: "00–06 min",
        title: "Respiración y colocación",
        body: "Colocación de pelvis y caja torácica y el patrón respiratorio que sostiene el resto de la clase.",
      },
      {
        time: "06–16 min",
        title: "Anti-extensión",
        body: "Planchas y variantes en series cortas, buscando tensión mantenida y cero balanceo.",
      },
      {
        time: "16–26 min",
        title: "Anti-rotación y lateral",
        body: "Trabajo de oblicuos y estabilidad lateral con banda o peso ligero.",
      },
      {
        time: "26–30 min",
        title: "Estiramiento",
        body: "Apertura de cadera y descarga lumbar antes de levantarte.",
      },
    ],
    cta: {
      heading: "Empieza por el centro",
      body: "Elige tu membresía y añade el core a tu semana.",
    },
    // TODO: confirm — placeholder profile, not measured.
    metrics: [
      { label: "Fuerza", value: 70 },
      { label: "Resistencia", value: 55 },
      { label: "Agilidad", value: 45 },
      { label: "Velocidad", value: 25 },
      { label: "Flexibilidad", value: 60 },
    ],
    level: "todos", // TODO: confirm
    image: { src: "/disciplinas/core.jpg", alt: "", width: 1720, height: 1440 }, // TODO: photography
    // TODO: photography — los pies de foto son un borrador, el material no existe.
    gallery: [
      {
        caption: "Plancha frontal",
        span: 2,
        image: {
          src: "/disciplinas/core/01.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Serie de anti-rotación",
        span: 3,
        image: {
          src: "/disciplinas/core/02.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
        video: [
          { src: "/disciplinas/core/02.av1.mp4", type: GALLERY_AV1_L5 },
          { src: "/disciplinas/core/02.mp4", type: GALLERY_H264 },
        ],
        duration: "0:06",
      },
      {
        caption: "Plancha lateral",
        span: 1,
        image: {
          src: "/disciplinas/core/03.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Hollow hold",
        span: 3,
        image: {
          src: "/disciplinas/core/04.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
        video: [
          { src: "/disciplinas/core/04.av1.mp4", type: GALLERY_AV1_L5 },
          { src: "/disciplinas/core/04.mp4", type: GALLERY_H264 },
        ],
        duration: "0:06",
      },
      {
        caption: "Trabajo con banda",
        span: 1,
        image: {
          src: "/disciplinas/core/05.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
        video: [
          { src: "/disciplinas/core/05.av1.mp4", type: GALLERY_AV1_L5 },
          { src: "/disciplinas/core/05.mp4", type: GALLERY_H264 },
        ],
        duration: "0:06",
      },
      {
        caption: "Estiramiento",
        span: 2,
        image: {
          src: "/disciplinas/core/06.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
    ],
    coachSlugs: ["andrea"], // Confirmado 2026-09-08
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/core"],
  },
  {
    slug: "hiit",
    enSlug: "hiit",
    name: "HIIT",
    code: "[HIT]",
    order: 9,
    badge: "Sesión corta", // TODO: confirm
    shortDescription:
      "Media hora de intervalos a tope y descansos cortos. Entras, aprietas y sales, sin un minuto muerto.",
    tagline:
      "Treinta minutos de intervalos. El entreno más corto del horario y el que más cuesta terminar.",
    headline: { solid: "Media hora", outlined: "al límite" },
    longDescription:
      "HIIT alterna intervalos de intensidad muy alta con descansos medidos. Media hora basta porque el cuerpo sigue trabajando mucho después de que la clase termine.",
    paragraphs: [
      "Cada sesión son bloques cortos —veinte, treinta, cuarenta segundos— con peso corporal, kettlebell y desplazamientos. El coach marca el tiempo y tú marcas el ritmo dentro de él.",
      "Es la clase que mejor encaja cuando no tienes hueco: media hora entra en cualquier tarde y se nota igual que una sesión larga.",
      "Se escala sola. El intervalo dura lo mismo para todos; lo que cambia es cuántas repeticiones metes dentro.",
    ],
    // TODO: confirm — material redactado, no facilitado por el club.
    meta: [
      { label: "Duración", value: "30 min" },
      { label: "Objetivo", value: "Resistencia" },
      { label: "Material", value: "Peso corporal" },
      { label: "Nivel", value: "Todos" },
    ],
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    // TODO: confirm — reparto de minutos redactado, pendiente de validar con los coaches.
    session: [
      {
        time: "00–05 min",
        title: "Calentamiento",
        body: "Movilidad rápida y una serie de activación para entrar en temperatura sin gastar la sesión.",
      },
      {
        time: "05–12 min",
        title: "Primer bloque",
        body: "Intervalos de esfuerzo corto con descansos completos, buscando calidad de movimiento antes que volumen.",
      },
      {
        time: "12–25 min",
        title: "Bloque principal",
        body: "El grueso de la clase: rondas encadenadas con descansos cada vez más justos.",
      },
      {
        time: "25–30 min",
        title: "Vuelta a la calma",
        body: "Respiración y estiramiento breve para bajar pulsaciones antes de salir.",
      },
    ],
    cta: {
      heading: "Media hora y fuera",
      body: "Elige tu membresía y métete en el próximo HIIT.",
    },
    // TODO: confirm — placeholder profile, not measured.
    metrics: [
      { label: "Fuerza", value: 55 },
      { label: "Resistencia", value: 90 },
      { label: "Agilidad", value: 70 },
      { label: "Velocidad", value: 85 },
      { label: "Flexibilidad", value: 25 },
    ],
    level: "todos", // TODO: confirm
    image: { src: "/disciplinas/hiit.jpg", alt: "", width: 1720, height: 1440 }, // TODO: photography
    // TODO: photography — los pies de foto son un borrador, el material no existe.
    gallery: [
      {
        caption: "Intervalo con kettlebell",
        span: 2,
        image: {
          src: "/disciplinas/hiit/01.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Ronda cronometrada",
        span: 3,
        image: {
          src: "/disciplinas/hiit/02.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
        video: [
          { src: "/disciplinas/hiit/02.av1.mp4", type: GALLERY_AV1_L5 },
          { src: "/disciplinas/hiit/02.mp4", type: GALLERY_H264 },
        ],
        duration: "0:06",
      },
      {
        caption: "Peso corporal",
        span: 1,
        image: {
          src: "/disciplinas/hiit/03.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Desplazamientos",
        span: 3,
        image: {
          src: "/disciplinas/hiit/04.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
        video: [
          { src: "/disciplinas/hiit/04.av1.mp4", type: GALLERY_AV1_L5 },
          { src: "/disciplinas/hiit/04.mp4", type: GALLERY_H264 },
        ],
        duration: "0:06",
      },
      {
        caption: "Descanso activo",
        span: 1,
        image: {
          src: "/disciplinas/hiit/05.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Estiramiento",
        span: 2,
        image: {
          src: "/disciplinas/hiit/06.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
    ],
    coachSlugs: ["andrea"], // Confirmado 2026-09-08
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/hiit"],
  },
  {
    slug: "cross-combat",
    enSlug: "cross-combat",
    name: "Cross Combat",
    code: "[CCB]",
    order: 10,
    badge: "Clase dirigida", // TODO: confirm
    shortDescription:
      "Golpeo, desplazamiento y acondicionamiento en el mismo circuito. La parte física del combate, sin contacto.",
    tagline:
      "Golpeo y acondicionamiento en la misma hora. El físico de un deportista de combate, sin subirte al ring.",
    headline: { solid: "Pegar", outlined: "y aguantar" },
    longDescription:
      "Cross Combat cruza el trabajo técnico de los deportes de contacto con el acondicionamiento del entrenamiento funcional: golpeas, te desplazas y entre ronda y ronda haces trabajo físico.",
    paragraphs: [
      "La clase se organiza en rondas: saco o manoplas, un bloque de fuerza o cardio, y vuelta a empezar. No hay contacto con nadie, así que puedes entrar sin haber peleado nunca.",
      "Se trabaja el golpeo básico —directo, gancho, rodilla— y sobre todo el desplazamiento, que es lo que de verdad cansa y lo que menos se entrena.",
      "Es de las clases con más plazas del horario y la que mejor funciona si buscas el acondicionamiento del combate sin el combate.",
    ],
    // TODO: confirm — material redactado, no facilitado por el club.
    meta: [
      { label: "Duración", value: "60 min" },
      { label: "Objetivo", value: "Resistencia" },
      { label: "Material", value: "Guantes y saco" },
      { label: "Nivel", value: "Todos" },
    ],
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    // TODO: confirm — reparto de minutos redactado, pendiente de validar con los coaches.
    session: [
      {
        time: "00–10 min",
        title: "Calentamiento",
        body: "Cuerda, movilidad de hombro y cadera y unos minutos de sombra para soltar.",
      },
      {
        time: "10–25 min",
        title: "Técnica de golpeo",
        body: "El golpe o la combinación del día, primero al aire y después contra el saco.",
      },
      {
        time: "25–50 min",
        title: "Rondas mixtas",
        body: "Saco o manoplas alternados con bloques de fuerza y cardio, cronometrados.",
      },
      {
        time: "50–60 min",
        title: "Core y estiramiento",
        body: "Abdomen, zona lumbar y estiramiento de cadena posterior para cerrar.",
      },
    ],
    cta: {
      heading: "Ponte los guantes",
      body: "Elige tu membresía y reserva tu primera clase de Cross Combat.",
    },
    // TODO: confirm — placeholder profile, not measured.
    metrics: [
      { label: "Fuerza", value: 65 },
      { label: "Resistencia", value: 90 },
      { label: "Agilidad", value: 85 },
      { label: "Velocidad", value: 80 },
      { label: "Flexibilidad", value: 40 },
    ],
    level: "todos", // TODO: confirm
    image: {
      src: "/disciplinas/cross-combat.jpg",
      alt: "",
      width: 1720,
      height: 1440,
    }, // TODO: photography
    // TODO: photography — los pies de foto son un borrador, el material no existe.
    gallery: [
      {
        caption: "Guardia y guantes",
        span: 2,
        image: {
          src: "/disciplinas/cross-combat/01.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Ronda de saco",
        span: 3,
        image: {
          src: "/disciplinas/cross-combat/02.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Manoplas",
        span: 1,
        image: {
          src: "/disciplinas/cross-combat/03.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Bloque de fuerza",
        span: 3,
        image: {
          src: "/disciplinas/cross-combat/04.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Desplazamiento",
        span: 1,
        image: {
          src: "/disciplinas/cross-combat/05.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Acondicionamiento",
        span: 2,
        image: {
          src: "/disciplinas/cross-combat/06.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
    ],
    coachSlugs: ["wilson"], // Confirmado 2026-09-08
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/cross-combat"],
  },
  {
    slug: "bjj",
    enSlug: "brazilian-jiu-jitsu",
    name: "Brazilian Jiu-Jitsu",
    code: "[BJJ]",
    order: 11,
    badge: "Hora y media", // TODO: confirm
    shortDescription:
      "Suelo, control y sumisión. El arte marcial donde la técnica gana a la fuerza, en sesiones de hora y media.",
    tagline:
      "Noventa minutos en el suelo. El arte marcial donde la técnica gana a la fuerza, siempre.",
    headline: { solid: "La técnica", outlined: "gana" },
    longDescription:
      "El jiu-jitsu brasileño se entrena en el suelo: control de posiciones, transiciones y sumisiones. Es el arte marcial donde alguien más pequeño puede controlar a alguien más grande, y eso no es un eslogan, es la mecánica.",
    paragraphs: [
      "La sesión empieza con calentamiento específico y movilidad de cadera, sigue con la técnica del día repetida hasta que sale sola, y termina con rondas a la intensidad que decidas.",
      "Noventa minutos suenan a mucho hasta que empiezas: el jiu-jitsu es el deporte donde el tiempo desaparece, porque cada ronda es un problema distinto que resolver.",
      "Se entra sin experiencia y sin condición física previa. Lo único que se pide es control: aquí nadie va a hacerte daño y tú tampoco se lo vas a hacer a nadie.",
    ],
    // TODO: confirm — material redactado, no facilitado por el club.
    meta: [
      { label: "Duración", value: "90 min" },
      { label: "Objetivo", value: "Agilidad" },
      { label: "Material", value: "Kimono" },
      { label: "Nivel", value: "Todos" },
    ],
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    // TODO: confirm — reparto de minutos redactado, pendiente de validar con los coaches.
    session: [
      {
        time: "00–15 min",
        title: "Calentamiento específico",
        body: "Movilidad de cadera, caídas y desplazamientos en el suelo.",
      },
      {
        time: "15–45 min",
        title: "Técnica del día",
        body: "Una posición y su transición, repetida por parejas sin resistencia hasta automatizarla.",
      },
      {
        time: "45–80 min",
        title: "Rondas",
        body: "Sparring por parejas a la intensidad que se pacte, rotando cada pocos minutos.",
      },
      {
        time: "80–90 min",
        title: "Vuelta a la calma",
        body: "Estiramiento de cadera y espalda y repaso de lo trabajado.",
      },
    ],
    cta: {
      heading: "Pisa el tatami",
      body: "Elige tu membresía y ven a tu primera clase de jiu-jitsu.",
    },
    // TODO: confirm — placeholder profile, not measured.
    metrics: [
      { label: "Fuerza", value: 70 },
      { label: "Resistencia", value: 80 },
      { label: "Agilidad", value: 90 },
      { label: "Velocidad", value: 55 },
      { label: "Flexibilidad", value: 75 },
    ],
    level: "todos", // TODO: confirm
    image: { src: "/disciplinas/bjj.jpg", alt: "", width: 1720, height: 1440 }, // TODO: photography
    // TODO: photography — los pies de foto son un borrador, el material no existe.
    gallery: [
      {
        caption: "Guardia cerrada",
        span: 2,
        image: {
          src: "/disciplinas/bjj/01.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Transición de posición",
        span: 3,
        image: {
          src: "/disciplinas/bjj/02.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Técnica por parejas",
        span: 1,
        image: {
          src: "/disciplinas/bjj/03.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Ronda de sparring",
        span: 3,
        image: {
          src: "/disciplinas/bjj/04.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Control desde arriba",
        span: 1,
        image: {
          src: "/disciplinas/bjj/05.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Estiramiento",
        span: 2,
        image: {
          src: "/disciplinas/bjj/06.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
    ],
    coachSlugs: ["wilson"], // Confirmado 2026-09-08
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/bjj"],
  },
  {
    slug: "mma-grappling",
    enSlug: "mma-grappling",
    name: "MMA / Grappling",
    code: "[MMA]",
    order: 12,
    badge: "Hora y media", // TODO: confirm
    shortDescription:
      "De pie y en el suelo, en la misma sesión. Golpeo, derribo y control, con la intensidad que tú marques.",
    tagline:
      "De pie y en el suelo. Golpeo, derribo y control en noventa minutos, con el sparring siempre opcional.",
    headline: { solid: "Todas", outlined: "las distancias" },
    longDescription:
      "MMA y grappling entrenan lo que ninguna disciplina cubre sola: el golpeo de pie, el derribo, y qué hacer cuando el combate llega al suelo. Las tres distancias, en la misma sesión.",
    paragraphs: [
      "Cada clase reparte el tiempo entre trabajo de pie, transiciones al suelo y control una vez allí. La técnica se repite despacio antes de meterla en rondas.",
      "El sparring existe, es opcional y siempre a intensidad pactada. Puedes hacer noventa minutos de técnica pura durante meses sin que nadie te presione.",
      "Es la clase más completa del horario y también la más exigente: sales cansado de una forma distinta a cualquier otra cosa que hagas aquí.",
    ],
    // TODO: confirm — material redactado, no facilitado por el club.
    meta: [
      { label: "Duración", value: "90 min" },
      { label: "Objetivo", value: "Agilidad" },
      { label: "Material", value: "Guantes y bucal" },
      { label: "Nivel", value: "Todos" },
    ],
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    // TODO: confirm — reparto de minutos redactado, pendiente de validar con los coaches.
    session: [
      {
        time: "00–15 min",
        title: "Calentamiento",
        body: "Movilidad, desplazamientos y trabajo de cuello y cadera antes de tocar a nadie.",
      },
      {
        time: "15–40 min",
        title: "De pie",
        body: "Golpeo básico y entradas a derribo, primero en el aire y después con compañero.",
      },
      {
        time: "40–70 min",
        title: "Suelo",
        body: "Control, transiciones y salidas, repetidas por parejas sin resistencia.",
      },
      {
        time: "70–90 min",
        title: "Rondas y calma",
        body: "Rondas opcionales a intensidad pactada y estiramiento final.",
      },
    ],
    cta: {
      heading: "Prueba las tres distancias",
      body: "Elige tu membresía y ven a una clase de MMA y grappling.",
    },
    // TODO: confirm — placeholder profile, not measured.
    metrics: [
      { label: "Fuerza", value: 80 },
      { label: "Resistencia", value: 90 },
      { label: "Agilidad", value: 90 },
      { label: "Velocidad", value: 75 },
      { label: "Flexibilidad", value: 60 },
    ],
    level: "todos", // TODO: confirm
    image: {
      src: "/disciplinas/mma-grappling.jpg",
      alt: "",
      width: 1720,
      height: 1440,
    }, // TODO: photography
    // TODO: photography — los pies de foto son un borrador, el material no existe.
    gallery: [
      {
        caption: "Guardia de pie",
        span: 2,
        image: {
          src: "/disciplinas/mma-grappling/01.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Entrada a derribo",
        span: 3,
        image: {
          src: "/disciplinas/mma-grappling/02.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Trabajo de suelo",
        span: 1,
        image: {
          src: "/disciplinas/mma-grappling/03.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Control",
        span: 3,
        image: {
          src: "/disciplinas/mma-grappling/04.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Ronda de sparring",
        span: 1,
        image: {
          src: "/disciplinas/mma-grappling/05.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
      {
        caption: "Estiramiento",
        span: 2,
        image: {
          src: "/disciplinas/mma-grappling/06.jpg",
          alt: "",
          width: 1120,
          height: 1080,
        },
      },
    ],
    coachSlugs: ["wilson"], // Confirmado 2026-09-08
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/mma-grappling"],
  },
] satisfies Discipline[];
