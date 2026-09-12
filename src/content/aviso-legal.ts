import type { LegalDocument } from "@/types/content";

import { site } from "./site";

const ADDRESS = `${site.address.street}, ${site.address.postalCode} ${site.address.locality}, ${site.address.region}, ${site.address.countryLabel}`;

/**
 * Aviso legal — the information LSSI-CE art. 10 requires a commercial site to
 * publish about who runs it.
 *
 * Every identifying value comes from `site.ts` so it stays character for
 * character identical to the footer, the JSON-LD and the Google profile.
 */
export const avisoLegal = {
  eyebrow: "Legal",
  title: "Aviso legal",
  lead: "Quién hay detrás de esta web, en qué condiciones puedes usarla y a quién dirigirte si algo no encaja.",
  updated: "2026-09-11",
  indexLabel: "En esta página",
  sections: [
    {
      id: "titular",
      heading: "Titular del sitio web",
      blocks: [
        {
          kind: "text",
          body: "En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), se hacen constar los siguientes datos identificativos del titular de este sitio web:",
        },
        {
          kind: "terms",
          items: [
            { term: "Denominación social", body: site.legalName },
            { term: "Nombre comercial", body: site.name },
            { term: "NIF", body: site.nif },
            {
              term: "Registro Mercantil",
              body: "Inscrita en el Registro Mercantil de Madrid, tomo 3001, folio 177, hoja M-51404.",
            },
            { term: "Domicilio", body: ADDRESS },
            { term: "Teléfono", body: site.phoneDisplay },
            { term: "Correo electrónico", body: site.email },
            { term: "Sitio web", body: "socialgymfit.com" },
            {
              term: "Actividad",
              body: "Centro de entrenamiento y actividades dirigidas.",
            },
          ],
        },
      ],
    },
    {
      id: "objeto",
      heading: "Objeto y uso del sitio",
      blocks: [
        {
          kind: "text",
          body: "Este sitio web es informativo. Describe el centro, las disciplinas que se imparten, los horarios y las modalidades de abono, y facilita los datos de contacto para quien quiera venir a conocerlo.",
        },
        {
          kind: "text",
          body: "La contratación de cualquier abono no se realiza en esta web: se hace a través de la plataforma Virtuagym, que abrimos desde la página de membresías y que se rige por sus propias condiciones. Al acceder a este sitio aceptas este aviso legal en la versión publicada en ese momento.",
        },
        {
          kind: "text",
          body: "Te comprometes a hacer un uso lícito del sitio y a no emplearlo para actividades contrarias a la ley, al orden público o a los derechos de terceros, ni a intentar dañar sus sistemas o acceder a áreas no públicas.",
        },
      ],
    },
    {
      id: "contenidos",
      heading: "Exactitud de los contenidos",
      blocks: [
        {
          kind: "text",
          body: "Cuidamos que la información publicada esté al día, en particular los horarios y los precios. Aun así, el horario de clases puede cambiar por causas organizativas y las tarifas mostradas se corresponden con las vigentes en la plataforma de contratación en el momento de la publicación.",
        },
        {
          kind: "text",
          body: "En caso de discrepancia entre lo publicado aquí y lo que figure en la plataforma de contratación en el momento de comprar, prevalece esta última. Si detectas un error, escríbenos y lo corregimos.",
        },
      ],
    },
    {
      id: "propiedad-intelectual",
      heading: "Propiedad intelectual e industrial",
      blocks: [
        {
          kind: "text",
          body: `Los textos, el diseño, la marca, el logotipo, las fotografías y los vídeos de este sitio son titularidad de ${site.legalName} o se utilizan con autorización de sus titulares, y están protegidos por la normativa de propiedad intelectual e industrial.`,
        },
        {
          kind: "text",
          body: "Puedes ver, descargar e imprimir los contenidos para tu uso personal. No está permitida su reproducción, distribución, transformación o comunicación pública con fines comerciales sin autorización previa y por escrito.",
        },
        {
          kind: "text",
          body: "Las marcas, nombres comerciales y logotipos de terceros que aparecen en el sitio pertenecen a sus respectivos propietarios y su presencia no implica relación, patrocinio ni recomendación, salvo cuando así se indique expresamente.",
        },
      ],
    },
    {
      id: "responsabilidad",
      heading: "Responsabilidad",
      blocks: [
        {
          kind: "text",
          body: "Trabajamos para que el sitio esté disponible de forma continuada, pero no podemos garantizar que no se produzcan interrupciones por mantenimiento, incidencias técnicas o causas ajenas. No asumimos responsabilidad por los daños que pudieran derivarse de la falta de disponibilidad del servicio.",
        },
        {
          kind: "text",
          body: "La información publicada no constituye asesoramiento médico ni deportivo individualizado. Si tienes una lesión, una patología o cualquier duda sobre tu estado de salud, consulta con un profesional sanitario antes de empezar a entrenar.",
        },
      ],
    },
    {
      id: "enlaces",
      heading: "Enlaces a sitios de terceros",
      blocks: [
        {
          kind: "text",
          body: "Este sitio contiene enlaces y contenidos incrustados de terceros, en concreto la tienda de Virtuagym, el mapa de Google Maps, el perfil de Instagram y las fichas de las tiendas de aplicaciones.",
        },
        {
          kind: "text",
          body: "No controlamos esos sitios ni respondemos de sus contenidos ni de sus prácticas de privacidad. Cuando los abres, pasas a regirte por sus condiciones y sus políticas. En la política de cookies explicamos cuáles de esos contenidos solo se cargan si los aceptas.",
        },
        { kind: "link", href: "/cookies", label: "Ver la política de cookies" },
      ],
    },
    {
      id: "datos",
      heading: "Protección de datos",
      blocks: [
        {
          kind: "text",
          body: "El tratamiento de datos personales se explica por separado, con el detalle que exige el Reglamento General de Protección de Datos: qué datos tratamos, con qué finalidad y base jurídica, durante cuánto tiempo y cómo puedes ejercer tus derechos.",
        },
        {
          kind: "link",
          href: "/privacidad",
          label: "Ver la política de privacidad",
        },
      ],
    },
    {
      id: "legislacion",
      heading: "Legislación aplicable",
      blocks: [
        {
          kind: "text",
          body: "Este aviso legal se rige por la legislación española. Para cualquier controversia derivada del acceso o uso del sitio, las partes se someten a los juzgados y tribunales que resulten competentes conforme a la normativa aplicable.",
        },
        {
          kind: "text",
          body: "Si eres consumidor, esta sumisión no afecta a los derechos que te reconoce la normativa de consumo, incluida la posibilidad de acudir a los tribunales de tu domicilio.",
        },
      ],
    },
  ],
} satisfies LegalDocument;
