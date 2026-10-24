// Pixel sizes of the supplied webp files. The "1600" exports are not all 1600 wide,
// so srcset descriptors use the real widths.
export const images = {
  'product-line': { lg: 1536, sm: 800, ratio: 1536 / 864 },
  'drop-macro': { lg: 1536, sm: 800, ratio: 1536 / 864 },
  'opal-packaging': { lg: 1536, sm: 800, ratio: 1536 / 864 },
  'hero-vial': { lg: 1536, sm: 800, ratio: 1536 / 864 },
  'dropper-halo': { lg: 1024, sm: 800, ratio: 1024 / 1280 },
  'halo-portrait-elder': { lg: 1024, sm: 800, ratio: 1024 / 1280 },
  'halo-portrait-scientist': { lg: 1024, sm: 800, ratio: 1024 / 1280 },
  'plinth-hoop': { lg: 1024, sm: 800, ratio: 1024 / 1280 },
} as const;

export type ImageName = keyof typeof images;
