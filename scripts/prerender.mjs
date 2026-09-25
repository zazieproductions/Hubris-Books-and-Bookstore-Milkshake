#!/usr/bin/env node
/**
 * Bakes per-route <title>, meta description, canonical, Open Graph, Twitter card
 * and JSON-LD into static HTML files inside dist/.
 *
 * The app is a client-rendered SPA, so without this every URL would ship the
 * same <head>. Google renders JavaScript, but a static head means:
 *   • social/scraper bots (which do not run JS) see the right card
 *   • the canonical + meta are correct on the very first byte
 *   • /catalog, /book/:id and /news/:slug are served as real files (HTTP 200)
 *
 * Runs after `vite build`:  npm run build
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { loadSeoModule } from "./lib/load-seo.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const {
  SITE_IMAGE_ALT,
  SITE_IMAGE_HEIGHT,
  SITE_IMAGE_URL,
  SITE_IMAGE_WIDTH,
  SITE_LOCALE,
  SITE_NAME,
  absoluteUrl,
  buildAllRouteEntries,
  buildSitemapEntries,
  routeJsonLd,
} = await loadSeoModule(ROOT);
const DIST = resolve(ROOT, "dist");
const TEMPLATE = join(DIST, "index.html");

if (!existsSync(TEMPLATE)) {
  console.error("dist/index.html not found — run `vite build` first.");
  process.exit(1);
}

const template = readFileSync(TEMPLATE, "utf8");
const SEO_BLOCK = /<!--SEO:START-->[\s\S]*?<!--SEO:END-->/;
if (!SEO_BLOCK.test(template)) {
  console.error("index.html is missing the <!--SEO:START-->/<!--SEO:END--> markers.");
  process.exit(1);
}

const OG_TYPES = { website: "website", article: "article", product: "product" };

const esc = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/** JSON-LD is safe to inline once "<" is escaped, which also defuses </script>. */
const jsonLdScript = (blocks) =>
  `<script type="application/ld+json">${JSON.stringify(
    blocks.length === 1 ? blocks[0] : blocks,
  ).replace(/</g, "\\u003c")}</script>`;

function headBlock(entry, { noindex = false } = {}) {
  const url = absoluteUrl(entry.path);
  const image = entry.images?.[0]?.url ?? SITE_IMAGE_URL;
  const imageAlt = entry.images?.[0]?.title ?? SITE_IMAGE_ALT;
  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return [
    "<!--SEO:START-->",
    `<title>${esc(entry.title)}</title>`,
    `<meta name="description" content="${esc(entry.description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta name="robots" content="${robots}" />`,
    entry.keywords?.length
      ? `<meta name="keywords" content="${esc(entry.keywords.join(", "))}" />`
      : "",
    `<meta property="og:type" content="${OG_TYPES[entry.type] ?? "website"}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:title" content="${esc(entry.title)}" />`,
    `<meta property="og:description" content="${esc(entry.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:locale" content="${SITE_LOCALE}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:alt" content="${esc(imageAlt)}" />`,
    `<meta property="og:image:width" content="${SITE_IMAGE_WIDTH}" />`,
    `<meta property="og:image:height" content="${SITE_IMAGE_HEIGHT}" />`,
    entry.product
      ? `<meta property="og:price:amount" content="${entry.product.price.toFixed(2)}" />`
      : "",
    entry.product
      ? `<meta property="og:price:currency" content="${esc(entry.product.currency)}" />`
      : "",
    entry.type === "article" && entry.publishedTime
      ? `<meta property="article:published_time" content="${esc(entry.publishedTime)}" />`
      : "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(entry.title)}" />`,
    `<meta name="twitter:description" content="${esc(entry.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    `<meta name="twitter:image:alt" content="${esc(imageAlt)}" />`,
    jsonLdScript(noindex ? [] : routeJsonLd(entry)),
    "<!--SEO:END-->",
  ]
    .filter(Boolean)
    .join("\n    ");
}

/** Minimal, honest fallback for visitors/crawlers without JavaScript. */
function noscriptBlock(entry) {
  return [
    "<noscript>",
    '  <div style="max-width:44rem;margin:0 auto;padding:3rem 1.25rem;font-family:Inter,system-ui,sans-serif;color:#1A1B1E;background:#FAF6ED;">',
    `    <h1 style="font-size:1.75rem;line-height:1.2;margin:0 0 .75rem;">${esc(
      entry.title.replace(/ — Hubris Books.*$/, ""),
    )}</h1>`,
    `    <p style="font-size:1rem;line-height:1.6;margin:0 0 1rem;">${esc(entry.description)}</p>`,
    `    <p style="font-size:.9rem;line-height:1.6;margin:0;">Hubris Books needs JavaScript to render this page. Meanwhile: <a href="/sitemap.xml" style="color:#0F1E3D;">browse the sitemap</a> or <a href="/catalog" style="color:#0F1E3D;">read the full catalog</a>.</p>`,
    "  </div>",
    "</noscript>",
  ].join("\n  ");
}

function render(entry, { noindex = false } = {}) {
  return template
    .replace(SEO_BLOCK, headBlock(entry, { noindex }))
    .replace("<div id=\"root\"></div>", `<div id="root"></div>\n  ${noscriptBlock(entry)}`);
}

/* ------------------------------ write ----------------------------- */

const routes = buildAllRouteEntries();
const written = [];

for (const entry of routes) {
  const isNoindex = Boolean(entry.noindex);
  // Flat files, not directories: Cloudflare Pages serves /catalog.html at /catalog
  // with HTTP 200, whereas a directory (/catalog/index.html) is only served at
  // /catalog/ and 308-redirects the extensionless URL. Flat files keep the
  // served URL byte-identical to the sitemap <loc> and the canonical tag.
  const file =
    entry.path === "/" ? join(DIST, "index.html") : join(DIST, `${entry.path}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render(entry, { noindex: isNoindex }), "utf8");
  written.push({ path: entry.path, file, noindex: isNoindex });
}

// Real 404 page so unknown paths do not soft-404 into the homepage.
const notFound = render(
  {
    path: "/404",
    title: "Page Not Found (Fee Still Applies) — Hubris Books",
    description:
      "That page does not exist. A $2.99 Navigation Disappointment Fee has been assessed. Try the catalog instead.",
    type: "website",
  },
  { noindex: true },
);
writeFileSync(join(DIST, "404.html"), notFound, "utf8");

/* --------------------------- verify ------------------------------ */

// Every URL in the sitemap must resolve to a file Cloudflare Pages can serve
// with HTTP 200 at that exact path.
const sitemapFile = join(DIST, "sitemap.xml");
if (existsSync(sitemapFile)) {
  const sitemap = readFileSync(sitemapFile, "utf8");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const missing = [];
  for (const loc of locs) {
    const pathname = new URL(loc).pathname;
    const file =
      pathname === "/" ? join(DIST, "index.html") : join(DIST, `${pathname}.html`);
    if (!existsSync(file)) missing.push(loc);
  }
  if (missing.length) {
    console.error("\n❌ sitemap URLs with no prerendered file:");
    for (const m of missing) console.error(`   - ${m}`);
    process.exit(1);
  }
  console.log(`✅ verified      ${locs.length} sitemap URLs resolve to prerendered files`);
}

const indexed = buildSitemapEntries().length;
console.log(
  `✅ prerendered ${written.length} routes into dist/ (${indexed} indexable, ${
    written.length - indexed
  } noindex) + 404.html`,
);

if (!existsSync(join(DIST, "sitemap.xml"))) {
  console.warn("⚠️  dist/sitemap.xml missing — run scripts/generate-sitemap.mjs before vite build.");
}
if (!existsSync(join(DIST, "robots.txt"))) {
  console.warn("⚠️  dist/robots.txt missing — run scripts/generate-sitemap.mjs before vite build.");
}
