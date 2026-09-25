/**
 * Generates public/sitemap.xml from the app's data sources so the sitemap
 * can never drift out of sync with the routes.
 *
 * Runs on every `npm run build`.
 *
 * The author slug transform below MUST stay identical to slugify() in
 * src/data/authors.ts — the sitemap URLs and the /author/:slug routes
 * are only valid as long as both agree.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const BASE = "https://hubrisbooks.win";
const LASTMOD = new Date().toISOString().slice(0, 10); // ship date = last modified

const slugify = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const booksSrc = readFileSync("src/data/books.ts", "utf8");
const newsSrc = readFileSync("src/data/news.ts", "utf8");

// id appears before author in every Book literal
const books = [...booksSrc.matchAll(/id:\s*"([^"]+)"[\s\S]*?author:\s*"([^"]*)"/g)].map(
  ([, id, author]) => ({ id, author }),
);
const bookIds = books.map((b) => b.id);

// unique authors in first-appearance order
const authorSlugs = [...new Set(books.map((b) => slugify(b.author)))];

const newsSlugs = [...newsSrc.matchAll(/^\s*slug:\s*"([a-z0-9-]+)",/gm)].map((m) => m[1]);

const urls = [];
const add = (loc, changefreq, priority) =>
  urls.push(
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
  );

// 1) Top-level pages, highest value first
add(`${BASE}/`, "daily", "1.0");
add(`${BASE}/catalog`, "daily", "0.9");
add(`${BASE}/bestsellers`, "daily", "0.8");
add(`${BASE}/news`, "weekly", "0.8");

// 2) Imprint landing pages (category level)
for (const id of ["milkshake", "hubris", "synergy", "vault"])
  add(`${BASE}/imprint/${id}`, "weekly", "0.8");

// 3) Book detail pages (commercial pages — keep them hot)
for (const id of bookIds) add(`${BASE}/book/${id}`, "weekly", "0.8");

// 4) Author pages
for (const slug of authorSlugs) add(`${BASE}/author/${slug}`, "monthly", "0.7");

// 5) Newsroom articles
for (const slug of newsSlugs) add(`${BASE}/news/${slug}`, "yearly", "0.6");

// 6) Secondary informational pages
add(`${BASE}/authors`, "monthly", "0.7");
add(`${BASE}/about`, "monthly", "0.7");
add(`${BASE}/faq`, "monthly", "0.5");
add(`${BASE}/loyalty`, "monthly", "0.5");
add(`${BASE}/terms`, "yearly", "0.3");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  Hubris Books & Bookstore Milkshake — sitemap.xml
  Canonical domain: ${BASE}
  Generated: ${LASTMOD}
  Deliberately excluded: /cart, /checkout (transactional — Google advises
  against including them), and /catalog?imprint=* query variants
  (duplicates of /catalog; the canonical imprint pages live at /imprint/*).
-->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

mkdirSync("public", { recursive: true });
writeFileSync("public/sitemap.xml", xml);
console.log(
  `sitemap: ${urls.length} urls (${bookIds.length} books, ${authorSlugs.length} authors, ${newsSlugs.length} news, 4 imprints, 9 static)`,
);
