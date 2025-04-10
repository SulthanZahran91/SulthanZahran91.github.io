// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://SulthanZahran91.github.io', // Your main GitHub Pages domain
  base: '/',        // The name of your repository (project site)
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});