import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static', // Default in Astro 5; allows serverless API routes via adapter
  adapter: vercel(),
  build: {
    format: 'file'
  }
});