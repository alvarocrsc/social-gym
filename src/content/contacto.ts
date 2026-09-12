import type { ContactoPage } from "@/types/content";

/**
 * Chrome copy for /contacto.
 *
 * No address, phone, email or hour appears here: those live in `site.ts` and
 * `schedule.ts`, and NAP consistency depends on there being exactly one copy of
 * each. The design handoff's contact details were invented placeholders and are
 * deliberately not carried over.
 */
export const contacto = {
  headlineSolid: "Pásate a",
  headlineOutlined: "conocer la sala",
  keywordLine: "Gimnasio en Calahorra · teléfono y dirección",
  lead: "Llámanos, escríbenos o preséntate sin cita. Te enseñamos la sala, te contamos cómo funcionan las clases y decides con calma.",

  whereLabel: "Dónde",
  whereAction: "Cómo llegar",

  whenLabel: "Cuándo",
  statusOpen: "Abierto ahora · cierra a las {time}",
  statusClosed: "Cerrado ahora",
  statusOpensAt: "Cerrado · abre a las {time}",
  statusOpensOn: "Cerrado · abre el {day} a las {time}",

  talkLabel: "Hablamos",
  followLabel: "Síguenos",
  phoneLabel: "Llamar al",
  whatsappLabel: "WhatsApp",
  emailLabel: "Escribir a",
  instagramLabel: "Instagram",

  actionWhatsapp: "Escríbenos por WhatsApp",
  actionPhone: "Llámanos ahora",
  actionNote:
    "También puedes pasarte sin cita en cualquier momento del horario.",

  reviewsHeadline: "{rating} sobre 5",
  reviewsBody: "{count} reseñas en Google de gente que entrena aquí.",
  reviewsAction: "Leer las reseñas",

  mapHeading: "Estamos en C. Viacampo 12 bis",
  mapBody:
    "En Calahorra, La Rioja. Abre el mapa para trazar la ruta desde donde estés.",
  mapAction: "Ver el mapa",
  mapConsent:
    "Al abrir el mapa se carga contenido de Google Maps, que puede instalar cookies en tu navegador.",
  mapDirections: "Abrir en Google Maps",
  areaLead: "Vienen a entrenar desde",
} satisfies ContactoPage;
