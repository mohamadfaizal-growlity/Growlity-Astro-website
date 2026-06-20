// @ts-check
import { defineConfig } from 'astro/config';

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
    plugins: [tailwindcss()]
  },

  integrations: [mdx(), sitemap(), react()]
});