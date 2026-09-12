import type { LegalDocument } from "@/types/content";

import { site } from "./site";

const ADDRESS = `${site.address.street}, ${site.address.postalCode} ${site.address.locality}, ${site.address.region}`;

/**
 * Política de privacidad — RGPD arts. 13 and 14.
 *
 * RGPD art. 12 puts a one-month deadline on answering a rights request.
 */
export const privacidad = {
  eyebrow: "Legal",
  title: "Política de privacidad",
  lead: "Qué datos tratamos, por qué, durante cuánto tiempo y cómo puedes controlarlos. En resumen: esta web no te pide nada.",
  updated: "2026-09-11",
  indexLabel: "En esta página",
  sections: [
    {
      id: "responsable",
      heading: "Responsable del tratamiento",
      blocks: [
        {
          kind: "terms",
          items: [
            { term: "Responsable", body: site.legalName },
            { term: "NIF", body: site.nif },
            { term: "Domicilio", body: ADDRESS },
            { term: "Teléfono", body: site.phoneDisplay },
            { term: "Correo electrónico", body: site.email },
          ],
        },
        {
          kind: "text",
          body: "Para cualquier cuestión sobre esta política o sobre tus datos, escribe a esa dirección indicando en el asunto lo que necesitas. No tenemos designado un delegado de protección de datos, porque nuestra actividad no se encuentra en ninguno de los supuestos del artículo 37 del RGPD.",
        },
      ],
    },
    {
      id: "que-datos",
      heading: "Qué datos tratamos",
      blocks: [
        {
          kind: "text",
          body: "Esta web no tiene formularios. No hay registro, ni alta de usuario, ni boletín, ni ningún campo donde escribir tus datos. Si solo navegas por ella, no recogemos nada que te identifique.",
        },
        {
          kind: "text",
          body: "Los tratamientos que sí existen son estos:",
        },
        {
          kind: "terms",
          items: [
            {
              term: "Datos de navegación",
              body: "Nuestro proveedor de alojamiento registra la dirección IP, la fecha y hora, la página solicitada y el navegador, como hace cualquier servidor web. Se usan para que el sitio funcione y para detectar abusos, y se analizan de forma agregada.",
            },
            {
              term: "Tu elección sobre cookies",
              body: "Se guarda en tu propio navegador, en el almacenamiento local del dispositivo. No se envía a nuestros servidores ni nos permite identificarte: solo sirve para no volver a preguntarte.",
            },
            {
              term: "Lo que nos cuentas al contactarnos",
              body: "Si nos llamas, nos escribes un correo o nos mandas un mensaje por Instagram, tratamos los datos que aparezcan en esa conversación: tu nombre, tu teléfono o tu correo y lo que nos preguntes. Nos los das tú, cuando quieres.",
            },
            {
              term: "Datos de uso del sitio",
              body: "Si aceptas las cookies analíticas, medimos qué páginas se visitan y cómo se llega a ellas. Los informes son agregados y no te identifican. Si no las aceptas, no se instala ninguna herramienta de medición.",
            },
          ],
        },
        {
          kind: "text",
          body: "La contratación de un abono y la reserva de clases no ocurren en esta web, sino en la plataforma Virtuagym. Los datos que introduces allí se rigen por la información que esa plataforma te facilita en el momento de registrarte.",
        },
      ],
    },
    {
      id: "finalidades",
      heading: "Para qué los usamos y con qué base legal",
      blocks: [
        {
          kind: "table",
          caption: "Finalidad, base jurídica y datos implicados",
          columns: ["Finalidad", "Base jurídica", "Datos"],
          rows: [
            [
              "Servir la web y mantenerla segura y disponible",
              "Interés legítimo (art. 6.1.f RGPD) en prestar y proteger el servicio",
              "Datos de navegación",
            ],
            [
              "Recordar si aceptas o rechazas las cookies",
              "Obligación legal (art. 22.2 LSSI-CE): hay que conservar la elección",
              "Preferencia guardada en tu dispositivo",
            ],
            [
              "Atender tu consulta y darte información sobre el centro",
              "Aplicación de medidas precontractuales a petición tuya (art. 6.1.b RGPD)",
              "Los que incluyas en el mensaje",
            ],
            [
              "Medir el uso del sitio para mejorarlo",
              "Consentimiento (art. 6.1.a RGPD), revocable cuando quieras",
              "Datos de uso agregados",
            ],
            [
              "Mostrar la tienda de abonos y el mapa dentro de la web",
              "Consentimiento (art. 6.1.a RGPD)",
              "Los que recojan esos terceros",
            ],
            [
              "Cumplir obligaciones contables, fiscales y de consumo",
              "Obligación legal (art. 6.1.c RGPD)",
              "Datos de facturación, cuando eres socio",
            ],
          ],
        },
        {
          kind: "text",
          body: "No enviamos comunicaciones comerciales por correo electrónico desde esta web, porque no recogemos direcciones a través de ella. No tomamos decisiones automatizadas ni elaboramos perfiles que produzcan efectos jurídicos sobre ti.",
        },
      ],
    },
    {
      id: "conservacion",
      heading: "Cuánto tiempo los conservamos",
      blocks: [
        {
          kind: "terms",
          items: [
            {
              term: "Registros del servidor",
              body: "El tiempo que nuestro proveedor de alojamiento los mantiene por motivos de seguridad y diagnóstico, tras lo cual se eliminan o quedan agregados sin posibilidad de identificación.",
            },
            {
              term: "Preferencia de cookies",
              body: "Permanece en tu dispositivo hasta que borras los datos del navegador. Puedes eliminarla tú en cualquier momento.",
            },
            {
              term: "Consultas",
              body: "Mientras dure la conversación y, después, el tiempo necesario para atender cualquier responsabilidad que pudiera derivarse de ella.",
            },
            {
              term: "Relación como socio",
              body: "Durante la vigencia del abono y, después, durante los plazos de prescripción que fijan la normativa mercantil, fiscal y de consumo, bloqueados y accesibles solo para atender requerimientos.",
            },
          ],
        },
      ],
    },
    {
      id: "destinatarios",
      heading: "Quién más accede a tus datos",
      blocks: [
        {
          kind: "text",
          body: "No vendemos tus datos ni los cedemos a terceros para que te hagan publicidad. Sí trabajamos con proveedores que tratan datos por cuenta nuestra o que recogen datos propios cuando los usas:",
        },
        {
          kind: "terms",
          items: [
            {
              term: "Proveedor de alojamiento",
              body: "Sirve las páginas y guarda los registros técnicos descritos arriba.",
            },
            {
              term: "Virtuagym",
              body: "Plataforma de gestión, reservas y venta de abonos. Instala sus propias cookies cuando abres la tienda dentro de la web, y solo entonces.",
            },
            {
              term: "Google",
              body: "Google Maps, cuando pulsas para cargar el mapa, y Google Analytics, si aceptas las cookies analíticas. Si no haces ninguna de las dos cosas, no se carga nada de Google.",
            },
            {
              term: "Administraciones y fuerzas de seguridad",
              body: "Cuando exista una obligación legal de facilitar la información.",
            },
          ],
        },
      ],
    },
    {
      id: "transferencias",
      heading: "Transferencias fuera del Espacio Económico Europeo",
      blocks: [
        {
          kind: "text",
          body: "Algunos de estos proveedores son empresas estadounidenses o pueden tratar datos fuera del Espacio Económico Europeo. Cuando eso ocurre, la transferencia se ampara en los mecanismos previstos en el capítulo V del RGPD: una decisión de adecuación de la Comisión Europea o, en su defecto, cláusulas contractuales tipo junto con las medidas adicionales que correspondan.",
        },
        {
          kind: "text",
          body: "Puedes pedirnos una copia de las garantías aplicadas a una transferencia concreta escribiendo a la dirección de contacto.",
        },
      ],
    },
    {
      id: "derechos",
      heading: "Tus derechos",
      blocks: [
        {
          kind: "text",
          body: "El RGPD te reconoce estos derechos sobre tus datos, y puedes ejercerlos gratuitamente:",
        },
        {
          kind: "terms",
          items: [
            {
              term: "Acceso",
              body: "Saber si tratamos datos tuyos y, en ese caso, cuáles y para qué, y obtener una copia.",
            },
            {
              term: "Rectificación",
              body: "Corregir los que sean inexactos y completar los que estén incompletos.",
            },
            {
              term: "Supresión",
              body: "Pedir que los borremos cuando ya no sean necesarios o retires tu consentimiento, salvo que debamos conservarlos por una obligación legal.",
            },
            {
              term: "Limitación",
              body: "Pedir que los conservemos pero dejemos de usarlos mientras se resuelve una impugnación.",
            },
            {
              term: "Oposición",
              body: "Oponerte a los tratamientos basados en nuestro interés legítimo por motivos de tu situación particular.",
            },
            {
              term: "Portabilidad",
              body: "Recibir en formato estructurado y de uso común los datos que nos hayas facilitado, cuando el tratamiento se base en tu consentimiento o en un contrato.",
            },
            {
              term: "Retirar el consentimiento",
              body: "En cualquier momento, sin que ello afecte a la licitud del tratamiento anterior a la retirada.",
            },
          ],
        },
        {
          kind: "text",
          body: `Para ejercerlos, escribe a ${site.email} o a la dirección postal indicada arriba, adjuntando algo que acredite tu identidad. Responderemos en el plazo de un mes, ampliable a dos si la solicitud es compleja, y te avisaremos si eso ocurre.`,
        },
      ],
    },
    {
      id: "reclamacion",
      heading: "Reclamar ante la autoridad de control",
      blocks: [
        {
          kind: "text",
          body: "Si consideras que no hemos atendido correctamente tu solicitud o que tratamos tus datos de forma indebida, puedes presentar una reclamación ante la Agencia Española de Protección de Datos, que es la autoridad de control competente en España. Te agradeceríamos que nos lo contases antes, para intentar resolverlo.",
        },
        {
          kind: "link",
          href: "https://www.aepd.es",
          label: "Agencia Española de Protección de Datos",
          external: true,
        },
      ],
    },
    {
      id: "seguridad",
      heading: "Seguridad",
      blocks: [
        {
          kind: "text",
          body: "Aplicamos medidas técnicas y organizativas razonables para proteger los datos frente al acceso no autorizado, la pérdida o la alteración. El sitio se sirve íntegramente sobre conexión cifrada y el contenido de terceros no se carga hasta que lo autorizas.",
        },
        {
          kind: "text",
          body: "Ningún sistema es infalible. Si llegara a producirse una brecha que suponga un riesgo para tus derechos, la notificaremos a la autoridad de control y, cuando proceda, a las personas afectadas, en los plazos que marca el RGPD.",
        },
      ],
    },
    {
      id: "menores",
      heading: "Menores de edad",
      blocks: [
        {
          kind: "text",
          body: "Esta web no está dirigida a menores de 14 años ni recoge datos de forma consciente de ellos. El acceso al centro por parte de menores requiere la autorización de quien ostente su patria potestad o tutela, que se gestiona presencialmente y no a través de este sitio.",
        },
      ],
    },
    {
      id: "cambios",
      heading: "Cambios en esta política",
      blocks: [
        {
          kind: "text",
          body: "Podemos actualizar esta política cuando cambie la normativa o la forma en que funciona el sitio. La fecha de la última actualización aparece al principio de la página, y si el cambio es relevante lo destacaremos de forma visible.",
        },
      ],
    },
  ],
} satisfies LegalDocument;
