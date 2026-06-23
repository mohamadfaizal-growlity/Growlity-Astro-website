// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://growlity-astro-website.vercel.app',
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'theme-react-router-alias',
        enforce: 'pre',
        resolveId(source, importer) {
          if (source === 'react-router') {
            if (importer && !importer.includes('node_modules') && !importer.includes('admin')) {
              return path.resolve(__dirname, './src/lib/react-router-polyfill.tsx');
            }
          }
          return null;
        }
      }
    ],
    resolve: {
      alias: []
    }
  },

  integrations: [mdx(), sitemap(), react()]
});