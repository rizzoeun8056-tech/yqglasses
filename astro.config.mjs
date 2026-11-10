import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://yqglasses.com',
  output: 'static',
  redirects: {
    '/blog/how-to-use-cake-knife-and-server-set/': {
      status: 301,
      destination: '/cake-knife-server-sets/',
    },
    '/blog/personalized-champagne-glass-brief/': {
      status: 301,
      destination: '/personalized-champagne-glasses/',
    },
    '/blog/choosing-champagne-glassware/': {
      status: 301,
      destination: '/personalized-champagne-glasses/',
    },
  },
});
