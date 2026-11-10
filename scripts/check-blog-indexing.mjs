import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const checked = [];
const redirects = [];

function attributes(tag) {
  return Object.fromEntries(
    Array.from(tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs), (match) =>
      [match[1].toLowerCase(), match[3].toLowerCase()]),
  );
}

async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await inspect(path);
      continue;
    }
    if (!entry.name.endsWith('.html')) continue;

    const html = await readFile(path, 'utf8');
    const meta = Array.from(html.matchAll(/<meta\b[^>]*>/gi), (match) => attributes(match[0]));
    if (meta.some((tag) => tag['http-equiv'] === 'refresh')) {
      redirects.push(path);
      continue;
    }

    const robots = meta.filter((tag) => ['robots', 'googlebot', 'bingbot'].includes(tag.name));
    const directives = (tag) => (tag.content ?? '').split(/[\s,]+/);
    const blocksIndexing = robots.some((tag) =>
      directives(tag).some((directive) => ['noindex', 'nofollow', 'none'].includes(directive)));
    const allowsIndexing = robots.some((tag) => tag.name === 'robots' &&
      directives(tag).includes('index') && directives(tag).includes('follow'));

    if (blocksIndexing || !allowsIndexing) {
      throw new Error(`Blog pages must use index, follow: ${path}`);
    }
    checked.push(path);
  }
}

await inspect(resolve('dist/blog'));
if (!checked.length) throw new Error('No blog pages found for indexing validation.');
console.log(`Verified ${checked.length} blog pages: index, follow; skipped ${redirects.length} redirects.`);
