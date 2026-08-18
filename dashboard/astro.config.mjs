import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'hybrid', // Allows static pages + serverless API routes
  adapter: vercel(),
  build: {
    format: 'file'
  }
});