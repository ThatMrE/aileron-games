// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://halos-bio-sample.netlify.app',
  output: 'static',
  build: { inlineStylesheets: 'always' },
  // Lets a parent's scoped styles reach the elements it passes a class to.
  scopedStyleStrategy: 'class',
  devToolbar: { enabled: false },
  vite: {
    // three.js is one ~130KB (gzipped) lazy chunk loaded after first paint, by design.
    build: { chunkSizeWarningLimit: 600 },
  },
});
