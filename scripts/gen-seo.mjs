/**
 * Generates public/robots.txt and public/sitemap.xml from the single SITE_URL
 * constant, so they cannot drift from the deployed domain. Runs before build.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const site = readFileSync(resolve(root, 'src/lib/site.ts'), 'utf8');
const match = site.match(/export const SITE_URL = '([^']+)'/);
if (!match) {
  throw new Error('gen-seo: could not find SITE_URL in src/lib/site.ts');
}
const SITE_URL = match[1].replace(/\/$/, '');

// Keep in step with the routes in src/App.tsx.
const routes = [
  { path: '/', priority: '1.0' },
  { path: '/work/pharma-erp', priority: '0.8' },
  { path: '/work/fedguard', priority: '0.8' },
  { path: '/work/hearing-care', priority: '0.8' },
];

const today = new Date().toISOString().slice(0, 10);

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(root, 'public/robots.txt'), robots);
writeFileSync(resolve(root, 'public/sitemap.xml'), sitemap);

console.log(`gen-seo: wrote robots.txt and sitemap.xml for ${SITE_URL} (${routes.length} routes)`);
