import type { ConsentContent } from "@/types/content";

export const consent = {
  eyebrow: "Cookies",
  title: "Tú decides qué se carga",
  body: "Usamos cookies propias para que la web funcione. Si nos dejas, también de terceros para medir las visitas y mostrar la tienda y el mapa.",
  accept: "Aceptar todas",
  reject: "Rechazar",
  configure: "Configurar",
  save: "Guardar preferencias",
  policyAction: "Leer la política de cookies",
  alwaysOn: "Siempre activas",
  categories: {
    necessary: {
      name: "Necesarias",
      body: "Hacen funcionar la navegación y recuerdan esta misma elección.",
    },
    analytics: {
      name: "Analíticas",
      body: "Google Analytics, para saber qué páginas se visitan. Datos agregados, nunca identificativos.",
    },
    external: {
      name: "Contenido externo",
      body: "La tienda de Virtuagym y el mapa de Google. Sin esto verás un enlace en su lugar.",
    },
  },
  frameBlockedTitle: "Contenido externo bloqueado",
  frameBlockedBody:
    "La tienda se carga desde Virtuagym, que instala sus propias cookies. Acéptalas para verla aquí, o ábrela en una pestaña nueva.",
  frameBlockedAccept: "Aceptar y cargar la tienda",
} satisfies ConsentContent;
