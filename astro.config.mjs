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
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        { find: /^react-router$/, replacement: path.resolve(__dirname, './src/lib/react-router-polyfill.tsx') }
      ]
    }
  },

  integrations: [mdx(), sitemap(), react()]
});