import type { MembresiasPage } from "@/types/content";

/**
 * Chrome copy for /membresias. Plan names, prices and periods live in
 * `plans.ts`, which mirrors the Virtuagym webshop.
 */
export const membresias = {
  eyebrow: "Precios y cuotas",
  headlineSolid: "Una cuota.",
  headlineOutlined: "Todo dentro.",
  keywordLine: "Precios del gimnasio en Calahorra",
  // TODO: confirm — "sin matrícula" y "sin extras" vienen del diseño; la
  // tienda no vende matrícula, pero el club no lo ha confirmado por escrito.
  lead: "Acceso ilimitado a la sala y a todas las clases dirigidas: Hyrox, boxeo, funcional, spinning, pilates y GAP. Sin matrícula y sin extras por disciplina. Elige cuánto tiempo quieres comprometerte y paga menos cuanto más largo sea.",
  heroAction: "Ver los 4 planes",
  // TODO: confirm — reclamos comerciales del diseño, sin verificar en la tienda.
  tickerItems: [
    "Sin matrícula",
    "Todas las clases incluidas",
    "Cancela cuando quieras",
    "App de reservas",
    "Sin extras por disciplina",
  ],
  plansHeading: "Elige tu plan",
  plansMeta: "4 opciones · mismo acceso",
  planAction: "Contratar",
  plansFootnote:
    "Precios con IVA incluido · el pago se completa en la tienda online",
  compareHeading: "Qué incluye cada una",
  compareConcept: "Concepto",
  compareRows: [
    {
      label: "Sala y máquinas sin límite",
      values: ["sí", "sí", "sí", "sí"],
    },
    {
      label: "Las seis disciplinas dirigidas",
      values: ["sí", "sí", "sí", "sí"],
    },
    {
      label: "Reserva de clases en la app",
      values: ["sí", "sí", "sí", "sí"],
    },
    {
      label: "Duración del acceso",
      values: ["1 mes", "3 meses", "6 meses", "12 meses"],
    },
    {
      label: "Renovación",
      values: ["Cada mes", "Cada 3 meses", "Cada 6 meses", "Cada año"],
    },
    {
      label: "Precio por mes",
      values: ["50,00 €", "46,67 €", "45,00 €", "41,67 €"],
    },
  ],
  howEyebrow: "Cómo funciona",
  howHeadlineSolid: "De la web",
  howHeadlineOutlined: "a la sala",
  howLead:
    "El pago se completa en nuestra tienda online. Al terminar recibes el acceso por correo y ya puedes reservar tu primera clase desde la app.",
  howSteps: [
    {
      title: "Elige tu plan",
      body: "Mensual si quieres probar sin ataduras, anual si ya lo tienes claro.",
    },
    {
      title: "Paga en la tienda online",
      body: "Pago seguro con tarjeta. Recibes la factura y el alta al instante.",
    },
    {
      title: "Entra y reserva",
      body: "Tu acceso queda activo el mismo día. Reserva clases desde la app.",
    },
  ],
  faqHeading: "Preguntas frecuentes",
  storeEyebrow: "Tienda online",
  storeHeading: "Completa tu alta",
  storeLead:
    "Elige un plan arriba y aquí abajo se abre su ficha para pagar. El proceso lo gestiona Virtuagym, nuestro sistema de reservas.",
  storeNewTab: "Abrir en una pestaña nueva",
  storeAllPlans: "Ver los cuatro planes",
  ctaHeadlineSolid: "Todo se gestiona",
  ctaHeadlineOutlined: "desde la app",
  ctaBody:
    "Reserva clases, consulta el horario y controla tu membresía desde el móvil. Descargarla no cuesta nada.",
  ctaAction: "Elegir plan",
  appStoreKicker: "Descarga en",
  googlePlayKicker: "Disponible en",
} as const satisfies MembresiasPage;
