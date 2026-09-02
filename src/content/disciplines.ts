import type { Discipline } from "@/types/content";

import { pageSeo } from "./seo";

// AV1 first, H.264 second — same order and reasoning as `hero.ts`. Both strings
// are read out of each file's av1C / avcC box, never guessed: a wrong one makes
// the browser skip the source with no error.
const GALLERY_AV1 = 'video/mp4; codecs="av01.0.08M.08"';
const GALLERY_H264 = 'video/mp4; codecs="avc1.640028"'; // High@4.0

/**
 * The six active disciplines, in display order — Hyrox first (§7.2).
 *
 * This module is the single source for disciplines: the hub page, the six
 * discipline pages, the sitemap and the nav all derive from it. Adding a
 * seventh entry here should be the only edit needed, apart from its
 * localized pathname in `src/i18n/routing.ts` (see the note there).
 *
 * K1 and Powerlifting appeared in the old mockup and are deliberately absent.
 *
 * Copy is written. `forWho`, `sessionLooksLike` and `faq` stay empty because
 * no section renders them yet; every media slot awaits the photography batch.
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
          { src: "/disciplinas/hyrox/02.av1.mp4", type: GALLERY_AV1 },
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
          { src: "/disciplinas/hyrox/04.av1.mp4", type: GALLERY_AV1 },
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
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Trabajo de pies",
        span: 3,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Saco pesado",
        span: 1,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Manoplas",
        span: 3,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Combinaciones",
        span: 1,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Acondicionamiento",
        span: 2,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
    ],
    coachSlugs: [], // TODO: confirm — coach names unverified (§7.3)
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/boxeo"],
  },
  {
    slug: "entrenamiento-funcional",
    enSlug: "functional-training",
    name: "Funcional",
    code: "[FNL]",
    order: 3,
    badge: "En grupo", // TODO: confirm
    shortDescription:
      "Fuerza, movilidad y algo de cardio en la misma sesión. Cada ejercicio tiene su versión, así que empiezas por donde estés hoy.",
    tagline:
      "Empujar, tirar, levantar del suelo y desplazarte. Los patrones que usas fuera del gimnasio, entrenados dentro.",
    headline: { solid: "Moverte", outlined: "mejor" },
    longDescription:
      "El entrenamiento funcional trabaja movimientos, no músculos por separado: sentadilla, bisagra de cadera, empuje, tracción y desplazamiento. Es la base sobre la que se apoya cualquier otra cosa que hagas.",
    paragraphs: [
      "Cada sesión es distinta y combina un bloque de fuerza con uno final de intensidad. Se entrena en grupo, con kettlebells, mancuernas, anillas, cajones y peso corporal, y el coach lleva la clase de principio a fin.",
      "Todo ejercicio tiene su versión. Si hoy no llegas al fondo de la sentadilla, hay un cajón; si el dominio no sale, hay una goma. Empiezas por donde estés y el margen lo pones tú.",
      "Es la clase que mejor funciona cuando vienes de estar parado, y también la que más echan de menos los que se acostumbran a ella.",
    ],
    // TODO: confirm — duración y material redactados, no facilitados por el club.
    meta: [
      { label: "Duración", value: "60 min" },
      { label: "Objetivo", value: "Fuerza" },
      { label: "Material", value: "Peso libre" },
      { label: "Nivel", value: "Todos" },
    ],
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    // TODO: confirm — reparto de minutos redactado, pendiente de validar con los coaches.
    session: [
      {
        time: "00–10 min",
        title: "Activación",
        body: "Movilidad de cadera y hombro y una serie de preparación con el mismo material que se va a usar después.",
      },
      {
        time: "10–20 min",
        title: "Técnica",
        body: "Repaso del patrón principal del día a carga baja, con el coach corrigiendo posición persona a persona.",
      },
      {
        time: "20–48 min",
        title: "Fuerza y metcon",
        body: "Series de fuerza y un circuito final de intensidad, con la carga escalada para cada uno.",
      },
      {
        time: "48–60 min",
        title: "Movilidad final",
        body: "Estiramiento guiado y respiración para cerrar la sesión sin salir a la calle en caliente.",
      },
    ],
    cta: {
      heading: "Empieza por donde estés",
      body: "Elige tu membresía y entra en el próximo grupo. El material y la progresión los ponemos nosotros.",
    },
    // TODO: confirm — placeholder profile, not measured.
    metrics: [
      { label: "Fuerza", value: 80 },
      { label: "Resistencia", value: 75 },
      { label: "Agilidad", value: 70 },
      { label: "Velocidad", value: 60 },
      { label: "Flexibilidad", value: 50 },
    ],
    level: "todos", // Confirmado 2026-08-05
    image: {
      src: "/disciplinas/funcional.jpg",
      alt: "",
      width: 1720,
      height: 1440,
    }, // TODO: confirm — photography pending
    // TODO: photography — los pies de foto son definitivos, el material no.
    gallery: [
      {
        caption: "Kettlebell swing",
        span: 2,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Circuito en grupo",
        span: 3,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Sentadilla frontal",
        span: 1,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Salto al cajón",
        span: 3,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Anillas",
        span: 1,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Cuerdas",
        span: 2,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
    ],
    coachSlugs: [], // TODO: confirm — coach names unverified (§7.3)
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/entrenamiento-funcional"],
  },
  {
    slug: "spinning",
    enSlug: "spinning",
    name: "Spinning",
    code: "[SPN]",
    order: 4,
    badge: "Clase dirigida", // TODO: confirm
    shortDescription:
      "Música alta, luz baja y una hora en la que solo piensas en pedalear. Tú decides la resistencia, así que el ritmo es tuyo.",
    tagline:
      "Luz baja, música alta y una hora en la que solo existe la siguiente cuesta. La resistencia la eliges tú.",
    headline: { solid: "Tu ritmo", outlined: "tu resistencia" },
    longDescription:
      "El spinning es cardio de alta intensidad sin impacto: la bici absorbe todo lo que las rodillas y los tobillos no tienen por qué aguantar, y aun así sales con las pulsaciones donde quieras ponerlas.",
    paragraphs: [
      "La clase se dirige por bloques —llano, subida, series cortas— marcados con la música. El coach da la cadencia y la sensación de esfuerzo; la resistencia la pones tú en el mando, así que dos personas de la misma fila pueden estar haciendo entrenos muy distintos.",
      "Antes de empezar te ajustamos la altura del sillín y la distancia al manillar. Es lo que separa una hora cómoda de una hora con dolor de espalda, y se tarda dos minutos.",
      "Si vuelves de una lesión o llevas tiempo sin entrenar, es la forma más segura de recuperar fondo. Si ya estás en forma, es la más rápida de encontrar tu techo.",
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
        body: "Colocación en la bici, altura de sillín y unos minutos de pedaleo suave para soltar piernas.",
      },
      {
        time: "08–20 min",
        title: "Bloque llano",
        body: "Cadencia alta y resistencia baja para calentar el sistema y coger el ritmo de la música.",
      },
      {
        time: "20–42 min",
        title: "Subidas y series",
        body: "El bloque duro: series de pie, subidas sostenidas y sprints cortos, con recuperación activa entre cada una.",
      },
      {
        time: "42–50 min",
        title: "Bajada de pulsaciones",
        body: "Pedaleo suave, respiración y estiramiento de cuádriceps, isquios y gemelo fuera de la bici.",
      },
    ],
    cta: {
      heading: "Súbete a la bici",
      body: "Elige tu membresía y reserva tu bici para la próxima sesión.",
    },
    // TODO: confirm — placeholder profile, not measured.
    metrics: [
      { label: "Fuerza", value: 45 },
      { label: "Resistencia", value: 95 },
      { label: "Agilidad", value: 25 },
      { label: "Velocidad", value: 80 },
      { label: "Flexibilidad", value: 20 },
    ],
    level: "todos", // Confirmado 2026-08-05
    image: {
      src: "/disciplinas/spinning.jpg",
      alt: "",
      width: 1720,
      height: 1440,
    }, // TODO: confirm — photography pending
    // TODO: photography — los pies de foto son definitivos, el material no.
    gallery: [
      {
        caption: "Sala de ciclo",
        span: 2,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Bloque de subida",
        span: 3,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Ajuste de sillín",
        span: 1,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Series de pie",
        span: 3,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Cadencia",
        span: 1,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Vuelta a la calma",
        span: 2,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
    ],
    coachSlugs: [], // TODO: confirm — coach names unverified (§7.3)
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/spinning"],
  },
  {
    slug: "pilates",
    enSlug: "pilates",
    name: "Pilates",
    code: "[PLT]",
    order: 5,
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
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Respiración y centro",
        span: 3,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Aro y banda",
        span: 1,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Control de columna",
        span: 3,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Trabajo lateral",
        span: 1,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Estiramiento final",
        span: 2,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
    ],
    coachSlugs: [], // TODO: confirm — coach names unverified (§7.3)
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/pilates"],
  },
  {
    slug: "gap",
    enSlug: "gap",
    name: "GAP",
    code: "[GAP]",
    order: 6,
    badge: "Clase dirigida", // TODO: confirm
    shortDescription:
      "Glúteo, abdomen y pierna en sesiones cortas que van al grano. Fáciles de seguir y de encajar en una semana complicada.",
    tagline:
      "Glúteo, abdomen y pierna. Sesiones cortas que van directas al grano y encajan en la peor de las semanas.",
    headline: { solid: "Corto", outlined: "e intenso" },
    longDescription:
      "GAP concentra el trabajo en glúteo, abdomen y pierna: los tres grupos que más se resienten de pasar el día sentado y los que más rápido responden cuando les dedicas tiempo.",
    paragraphs: [
      "Son series de repeticiones altas con peso corporal, banda elástica y algo de carga ligera. Se sigue fácil desde el primer día porque los ejercicios se repiten sesión a sesión: lo que cambia es el volumen y el descanso.",
      "No hay nada técnico que aprender ni material que dominar, así que toda la energía se va en trabajar. Por eso es la clase que mejor funciona para empezar y la que más gente encadena semanas seguidas.",
      "Cuarenta y cinco minutos, un grupo que va al mismo ritmo y una sensación muy concreta al día siguiente. Poco más hace falta.",
    ],
    // TODO: confirm — duración y material redactados, no facilitados por el club.
    meta: [
      { label: "Duración", value: "45 min" },
      { label: "Objetivo", value: "Fuerza" },
      { label: "Material", value: "Banda elástica" },
      { label: "Nivel", value: "Todos" },
    ],
    forWho: "", // TODO: copy
    sessionLooksLike: [], // TODO: copy
    // TODO: confirm — reparto de minutos redactado, pendiente de validar con los coaches.
    session: [
      {
        time: "00–08 min",
        title: "Calentamiento",
        body: "Activación de glúteo y core y movilidad de cadera y tobillo antes de la primera serie.",
      },
      {
        time: "08–24 min",
        title: "Bloque de pierna",
        body: "Sentadillas, zancadas y puentes en series de repeticiones altas con descansos cortos.",
      },
      {
        time: "24–38 min",
        title: "Glúteo y abdomen",
        body: "Trabajo aislado con banda elástica y series de abdomen encadenadas sin bajar el ritmo.",
      },
      {
        time: "38–45 min",
        title: "Estiramiento",
        body: "Cadena posterior, cadera y zona lumbar para bajar pulsaciones y cerrar la sesión.",
      },
    ],
    cta: {
      heading: "Empieza esta semana",
      body: "Elige tu membresía y encaja el GAP donde mejor te venga.",
    },
    // TODO: confirm — placeholder profile, not measured.
    metrics: [
      { label: "Fuerza", value: 70 },
      { label: "Resistencia", value: 65 },
      { label: "Agilidad", value: 45 },
      { label: "Velocidad", value: 40 },
      { label: "Flexibilidad", value: 40 },
    ],
    level: "todos", // Confirmado 2026-08-05
    image: { src: "/disciplinas/gap.jpg", alt: "", width: 1720, height: 1440 }, // TODO: confirm — photography pending
    // TODO: photography — los pies de foto son definitivos, el material no.
    gallery: [
      {
        caption: "Serie de glúteo",
        span: 2,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Circuito GAP",
        span: 3,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Banda elástica",
        span: 1,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Abdomen",
        span: 3,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Zancadas",
        span: 1,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
      {
        caption: "Estiramiento",
        span: 2,
        image: { src: "", alt: "", width: 1120, height: 1080 },
      },
    ],
    coachSlugs: [], // TODO: confirm — coach names unverified (§7.3)
    faq: [], // TODO: copy
    seo: pageSeo["/disciplinas/gap"],
  },
] satisfies Discipline[];
