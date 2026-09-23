// Architectural photographs generated with Higgsfield (gpt_image_2_5, 2K) and
// exported as AVIF + WebP at several widths into /public/images.
export const IMAGES = {
  facade: {
    width: 1744,
    height: 2336,
    widths: [480, 800, 1200, 1600],
    color: "#716b66",
    alt: "Détail d’une façade haussmannienne : pierre de taille, balcon filant en fer forgé et hautes fenêtres",
  },
  parquet: {
    width: 1792,
    height: 2240,
    widths: [480, 800, 1200, 1600],
    color: "#715c44",
    alt: "Parquet en point de Hongrie traversé par un rectangle de lumière naturelle",
  },
  toits: {
    width: 2688,
    height: 1520,
    widths: [800, 1280, 1920, 2560],
    color: "#919092",
    alt: "Toits de zinc et cheminées du 9e arrondissement de Paris dans la lumière du matin",
  },
} as const;

export type ImageKey = keyof typeof IMAGES;

export function srcSet(key: ImageKey, format: "avif" | "webp") {
  return IMAGES[key].widths.map((w) => `/images/${key}-${w}.${format} ${w}w`).join(", ");
}
