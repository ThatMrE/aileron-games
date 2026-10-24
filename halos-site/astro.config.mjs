// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://halos-bio-sample.netlify.app',
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  // Lets a parent's scoped styles reach the elements it passes a class to.
  scopedStyleStrategy: 'class',
  devToolbar: { enabled: false },
});
