import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const images = new Set();
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await inspect(path);
    else if (entry.name.endsWith('.html')) {
      const html = await readFile(path, 'utf8');
      for (const match of html.matchAll(/<img\b[^>]*\bsrc="(\/images\/[^"?#]+)"/g)) images.add(match[1]);
    }
  }
}
await inspect(resolve('dist/blog'));
for (const image of images) {
  const size = (await stat(resolve('public', image.slice(1)))).size;
  if (size >= 30000) throw new Error(`Blog image must be below 30,000 bytes: ${image} (${size} bytes)`);
}
console.log(`Verified ${images.size} blog images: each below 30,000 bytes.`);
