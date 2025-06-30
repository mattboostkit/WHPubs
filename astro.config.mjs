import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.whpubs.com',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  // Ensure URLs are generated without trailing slashes
  trailingSlash: 'never'
});
