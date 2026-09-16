import type { Hero, HeroMedia } from "@/types/content";

// Every clip and poster is 9:16.
const MEDIA_WIDTH = 1080;
const MEDIA_HEIGHT = 1920;

// AV1 first, H.264 second: Chrome, Edge and Firefox take the AV1 (roughly a
// third the bytes at the same measured quality) and Safari falls through to
// H.264. Codec strings are read from each file's av1C box, not guessed — a
// wrong one makes the browser skip the source silently.
const AV1_TYPE = 'video/mp4; codecs="av01.0.08M.08"';
const H264_TYPE = 'video/mp4; codecs="avc1.640032"'; // High@5.0

// 720x1280 re-encodes for phones, where the right half is hidden and the left
// one fills the screen. The full-size files are 1080x1920 at up to 5.3 Mbps,
// which is most of what a phone downloads before it can show anything.
const MOBILE_MEDIA = "(max-width: 47.9375rem)";
const MOBILE_AV1_TYPE = 'video/mp4; codecs="av01.0.05M.08"';
const MOBILE_H264_TYPE = 'video/mp4; codecs="avc1.4D401F"'; // Main@3.1

function slot(name: string): HeroMedia {
  return {
    poster: {
      src: `/hero-${name}-poster.jpg`,
      alt: "",
      width: MEDIA_WIDTH,
      height: MEDIA_HEIGHT,
    },
    sources: [
      ...(name.endsWith("-left")
        ? [
            {
              src: `/hero-${name}.m.av1.mp4`,
              type: MOBILE_AV1_TYPE,
              media: MOBILE_MEDIA,
            },
            {
              src: `/hero-${name}.m.mp4`,
              type: MOBILE_H264_TYPE,
              media: MOBILE_MEDIA,
            },
          ]
        : []),
      { src: `/hero-${name}.av1.mp4`, type: AV1_TYPE },
      { src: `/hero-${name}.mp4`, type: H264_TYPE },
    ],
  };
}

export const hero = {
  eyebrow: "Gimnasio en Calahorra · La Rioja",

  slides: [
    {
      id: "nadie-solo",
      line1: "Aquí nadie",
      line2: "entrena solo",
      caption: "Vienes a entrenar. Te quedas por la gente.",
      media: { left: slot("01-left"), right: slot("01-right") },
    },
    {
      id: "no-compites",
      line1: "No compites",
      line2: "contra nadie",
      caption: "Sin miradas. Sin ego. Sin postureo.",
      media: { left: slot("02-left"), right: slot("02-right") },
    },
    {
      id: "el-de-ayer",
      line1: "Solo contra",
      line2: "el de ayer",
      caption: "Tu única marca a batir es la tuya.",
      media: { left: slot("03-left"), right: slot("03-right") },
    },
    {
      id: "sin-egos",
      line1: "Entrena",
      line2: "sin egos",
      caption: "Desde el primer día o desde hace años.",
      media: { left: slot("04-left"), right: slot("04-right") },
    },
    {
      id: "365-dias",
      line1: "Abierto los",
      line2: "365 días",
      caption: "Nochebuena, agosto, tu cumpleaños. Abrimos.",
      media: { left: slot("05-left"), right: slot("05-right") },
    },
  ],
} as const satisfies Hero;
