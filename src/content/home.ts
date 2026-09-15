import type { HomePage } from "@/types/content";

import { disciplines } from "./disciplines";
import { site } from "./site";

const count = disciplines.length;

const coordinate = (
  value: number,
  positive: string,
  negative: string,
): string =>
  `${Math.abs(value).toFixed(4).replace(".", ",")}° ${value >= 0 ? positive : negative}`;

const towns = new Intl.ListFormat("es", {
  style: "long",
  type: "conjunction",
}).format(site.areaServed.filter((town) => town !== site.address.locality));

export const home = {
  intro: {
    eyebrow: "01 · El centro",
    headingSolid: "Tu gimnasio",
    headingOutlined: "en Calahorra",
    lead: `Social Gym es un centro de entrenamiento en Calahorra, La Rioja, abierto los 365 días del año. Somos centro oficial Hyrox y bajo el mismo techo tienes ${String(count)} disciplinas, de boxeo y jiu-jitsu a pilates o power cycling, todas incluidas en la misma cuota. Empieces desde cero o lleves años, aquí entrenas a tu ritmo, sin miradas y sin egos. Vienen a entrenar desde ${towns}.`,
    facts: [
      { value: "365", count: 365, label: "días al año abiertos" },
      { value: String(count), count, label: "disciplinas incluidas" },
      { value: "Hyrox", label: "centro oficial" },
    ],
    place: `${site.address.locality} · ${site.address.region}`,
    coordinates: `${coordinate(site.address.lat, "N", "S")} · ${coordinate(site.address.lng, "E", "O")}`,
    image: {
      primary: {
        src: "/home/centro.jpg",
        alt: "Interior de Social Gym, gimnasio en Calahorra",
        width: 2400,
        height: 1350,
      },
      fallback: {
        src: "/disciplinas/power-cycling.jpg",
        alt: "Sala de power cycling de Social Gym iluminada con neón rosa",
        width: 2560,
        height: 1440,
      },
    },
  },
  index: {
    eyebrow: "02 · Disciplinas",
    headingSolid: `${String(count)} disciplinas`,
    headingOutlined: "una sola cuota",
    lead: "Todas entran en cualquier plan, sin extras. Entra en cada una para ver cómo es una sesión y cuándo hay clase.",
    allAction: "Ver todas las disciplinas",
  },
  visit: {
    eyebrow: "03 · Visítanos",
    headingSolid: "Ven cuando",
    headingOutlined: "quieras",
    lead: "Sin cita. Te enseñamos la sala, te contamos cómo funcionan las clases y decides con calma.",
    addressLabel: "Dirección",
    directionsAction: "Cómo llegar",
    phoneLabel: "Teléfono",
    hoursLabel: "Horario",
    reviewsLabel: "Reseñas",
    reviewsScore: site.reviews.rating.toLocaleString("es-ES"),
    reviewsOutOf: "sobre 5",
    reviewsText: `${site.reviews.count.toLocaleString("es-ES")} reseñas en Google`,
    scheduleAction: "Horario de clases",
    membershipsAction: "Ver membresías y precios",
    since: `Desde ${String(site.foundingYear)}`,
    image: {
      primary: {
        src: "/home/entrada.jpg",
        alt: "Entrada de Social Gym en la calle Viacampo de Calahorra",
        width: 1600,
        height: 2000,
      },
      fallback: {
        src: "/disciplinas/athx.jpg",
        alt: "Socia entrenando zancadas con un disco en Social Gym",
        width: 2560,
        height: 3413,
      },
    },
  },
} satisfies HomePage;
