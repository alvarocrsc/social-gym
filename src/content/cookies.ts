import type { LegalDocument } from "@/types/content";

/**
 * Política de cookies — LSSI-CE art. 22.2 and the AEPD's cookie guidance.
 *
 * TODO: the analytics row describes what Google Analytics installs once it is
 * wired. `NEXT_PUBLIC_GA_ID` is still empty, so today accepting that category
 * loads nothing — the row is correct the day the tag lands and harmless before.
 */
export const cookies = {
  eyebrow: "Legal",
  title: "Política de cookies",
  lead: "Qué se guarda en tu dispositivo cuando visitas esta web, quién lo pone y cómo puedes quitarlo.",
  updated: "2026-09-11",
  indexLabel: "En esta página",
  sections: [
    {
      id: "que-son",
      heading: "Qué son las cookies",
      blocks: [
        {
          kind: "text",
          body: "Una cookie es un archivo pequeño que una web guarda en tu navegador para recordar algo entre una visita y otra. La normativa aplica el mismo criterio a otras formas de almacenamiento en el dispositivo, como el almacenamiento local, y aquí las tratamos todas igual.",
        },
        {
          kind: "text",
          body: "Las cookies necesarias para que el sitio funcione no requieren tu permiso. Todas las demás, sí, y no se instalan hasta que lo das.",
        },
      ],
    },
    {
      id: "como-controlarlas",
      heading: "Cómo controlas lo que se instala",
      blocks: [
        {
          kind: "text",
          body: "La primera vez que entras aparece un aviso con tres opciones del mismo tamaño y peso: aceptar todo, rechazar todo o configurar por categorías. Mientras no elijas, no se carga nada que no sea imprescindible.",
        },
        {
          kind: "text",
          body: "Puedes cambiar de opinión cuando quieras borrando los datos del sitio en tu navegador: al volver a entrar, el aviso aparecerá de nuevo. Rechazar no limita el acceso a ninguna parte de la web; lo único que cambia es que la tienda y el mapa se muestran como un enlace en lugar de cargarse dentro de la página.",
        },
      ],
    },
    {
      id: "propias",
      heading: "Almacenamiento propio",
      blocks: [
        {
          kind: "text",
          body: "Solo guardamos una cosa, y es precisamente la que la ley exige conservar: tu respuesta al aviso de cookies. No es una cookie, no viaja a nuestros servidores y no permite identificarte.",
        },
        {
          kind: "table",
          caption: "Almacenamiento propio",
          columns: ["Nombre", "Tipo", "Finalidad", "Duración"],
          rows: [
            [
              "sg-consent",
              "Almacenamiento local",
              "Recuerda qué categorías has aceptado o rechazado para no volver a preguntarte.",
              "Hasta que borras los datos del navegador",
            ],
          ],
        },
      ],
    },
    {
      id: "terceros",
      heading: "Cookies de terceros",
      blocks: [
        {
          kind: "text",
          body: "Estas solo existen si aceptas la categoría correspondiente. Mientras no lo hagas, el contenido que las instala ni siquiera se carga.",
        },
        {
          kind: "text",
          body: "Virtuagym es la plataforma donde se contratan los abonos. Sus cookies se instalan al abrir la tienda dentro de la página de membresías:",
        },
        {
          kind: "table",
          caption: "Cookies de Virtuagym, categoría «contenido externo»",
          columns: ["Nombre", "Dominio", "Finalidad", "Duración"],
          rows: [
            [
              "virtuagym_sid",
              ".virtuagym.com",
              "Identifica la sesión en la tienda.",
              "1 año",
            ],
            [
              "virtuagym_u",
              ".virtuagym.com",
              "Asocia la sesión a un usuario de la plataforma.",
              "1 año",
            ],
            [
              "virtuagym_k",
              ".virtuagym.com",
              "Clave técnica de la sesión.",
              "1 año",
            ],
            [
              "virtuagym_lang",
              ".virtuagym.com",
              "Guarda el idioma en el que se muestra la tienda.",
              "1 hora",
            ],
            [
              "AWSALB",
              "socialgym.virtuagym.com",
              "Reparto de carga entre servidores.",
              "7 días",
            ],
            [
              "AWSALBCORS",
              "socialgym.virtuagym.com",
              "Reparto de carga para peticiones entre dominios.",
              "7 días",
            ],
          ],
        },
        {
          kind: "text",
          body: "Google Maps solo se carga cuando pulsas el botón del mapa en la página de contacto. A partir de ese momento Google puede instalar sus propias cookies, por ejemplo para recordar preferencias de visualización y prevenir usos abusivos del servicio.",
        },
        {
          kind: "link",
          href: "https://policies.google.com/technologies/cookies",
          label: "Cómo usa Google las cookies",
          external: true,
        },
        {
          kind: "text",
          body: "Google Analytics, si aceptas la categoría de analíticas, mide de forma agregada qué páginas se visitan y cómo se llega a ellas. No se comparte con fines publicitarios: el consentimiento para publicidad y personalización se mantiene denegado en todo momento.",
        },
        {
          kind: "table",
          caption: "Cookies analíticas, categoría «analíticas»",
          columns: ["Nombre", "Dominio", "Finalidad", "Duración"],
          rows: [
            [
              "_ga",
              "socialgymfit.com",
              "Distingue visitantes de forma anónima.",
              "2 años",
            ],
            [
              "_ga_*",
              "socialgymfit.com",
              "Mantiene el estado de la sesión de medición.",
              "2 años",
            ],
          ],
        },
      ],
    },
    {
      id: "navegador",
      heading: "Gestionarlas desde el navegador",
      blocks: [
        {
          kind: "text",
          body: "Además del aviso de esta web, tu navegador te permite ver, bloquear y eliminar cookies de cualquier sitio. Ten en cuenta que bloquearlas de forma general puede afectar al funcionamiento de otras páginas.",
        },
        {
          kind: "list",
          items: [
            "Chrome: Configuración › Privacidad y seguridad › Cookies y otros datos de sitios.",
            "Firefox: Ajustes › Privacidad y seguridad › Cookies y datos del sitio.",
            "Safari: Ajustes › Privacidad › Gestionar datos de sitios web.",
            "Edge: Configuración › Cookies y permisos del sitio.",
          ],
        },
      ],
    },
    {
      id: "mas-informacion",
      heading: "Más información",
      blocks: [
        {
          kind: "text",
          body: "El tratamiento de datos personales que se deriva de estas cookies se explica en la política de privacidad, junto con las bases jurídicas, los plazos de conservación y la forma de ejercer tus derechos.",
        },
        {
          kind: "link",
          href: "/privacidad",
          label: "Ver la política de privacidad",
        },
      ],
    },
  ],
} satisfies LegalDocument;
