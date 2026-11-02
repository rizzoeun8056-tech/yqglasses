import type { APIRoute } from 'astro';
import { blogPosts } from '../data/blog';

export const GET: APIRoute = () => {
  const origin = 'https://yqglasses.com';
  const paths = [
    '/',
    '/about/',
    '/blog/',
    '/cake-knife-server-sets/',
    '/custom-shot-glasses/',
    '/file-upload/',
    '/personalized-champagne-glasses/',
    ...blogPosts.map((post) => `/blog/${post.slug}/`),
  ];
  const urls = paths.map((path) => `<url><loc>${origin}${path}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
