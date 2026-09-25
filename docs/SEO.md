# SEO & Google Search Console

Everything search-related lives in one place: **`src/data/seo.ts`**. Edit that file
and re-run `npm run build`; the sitemap, robots.txt and every page's `<head>` are
regenerated. Nothing here is hand-maintained, so the sitemap can never drift from
the app.

## The URL to paste into Search Console

```
https://hubrisbooks.win/sitemap.xml
```

Search Console → **Sitemaps** → *Add a new sitemap* → paste `sitemap.xml`
(the `https://hubrisbooks.win/` part is pre-filled).

> The sitemap must live on the property you verified. If you verified
> `https://hubrisbooks.win` as a **Domain** property, `sitemap.xml` is accepted as
> a relative path; if you verified a URL-prefix property, the host must match
> exactly (`https`, no `www`, no trailing slash).

## What gets generated

| File | Source | Notes |
| --- | --- | --- |
| `public/sitemap.xml` | `src/data/seo.ts` | 51 URLs, `image:` extension on the homepage |
| `public/robots.txt` | `src/data/seo.ts` | Blocks `/cart` + `/checkout`, declares the sitemap |
| `public/_redirects` | static | Cloudflare Pages routing (real 404, not a soft-404) |
| `dist/<route>.html` | `scripts/prerender.mjs` | Per-route title, description, canonical, OG, Twitter, JSON-LD |
| `dist/404.html` | `scripts/prerender.mjs` | `noindex` + real 404 status |

### Sitemap contents (51 URLs)

| Section | Count | Priority | changefreq |
| --- | --- | --- | --- |
| Home | 1 | 1.0 | daily |
| Hub pages (`/catalog`, `/bestsellers`, `/news`, `/authors`, `/about`, `/loyalty`, `/faq`, `/terms`) | 8 | 0.3 – 0.9 | daily → yearly |
| Books (`/book/:id`) | 25 | 0.7 – 0.8 | weekly |
| News articles (`/news/:slug`) | 17 | 0.6 – 0.7 | daily → yearly |

* `<lastmod>` is real: it comes from the git commit date of the file that owns the
  content (`src/data/books.ts`, `src/pages/Home.tsx`, …), or the article's
  publication date for news.
* `/cart` and `/checkout` are deliberately **excluded** — they are transactional,
  have no standalone content, and are `noindex` + `Disallow`-ed.
* Query-string catalog views (`/catalog?imprint=…`) are `Disallow`-ed as
  duplicates of `/catalog`.

## Why flat `.html` files (Cloudflare Pages routing)

Cloudflare Pages resolves paths like this:

| File | URL | Response |
| --- | --- | --- |
| `catalog.html` | `/catalog` | **200**, serves the file |
| `catalog.html` | `/catalog.html` | 308 → `/catalog` |
| `catalog/index.html` | `/catalog` | 308 → `/catalog/` |
| `catalog/index.html` | `/catalog/` | 200 |

The prerenderer writes **flat** files (`dist/catalog.html`, `dist/book/<id>.html`,
`dist/news/<slug>.html`) so the URL Google crawls is byte-identical to the
sitemap `<loc>` and the canonical tag — no redirect hop, and no duplicate
trailing-slash variant. `dist/404.html` also disables Pages' SPA mode, so unknown
paths return a real 404 instead of soft-404ing into the homepage.

## Commands

```bash
npm run build          # tsc → sitemap/robots → vite build → prerender
npm run seo:sitemap    # regenerate public/sitemap.xml + public/robots.txt only
npm run seo:prerender  # re-bake dist/**/index.html from the latest seo.ts
```

`generate-sitemap.mjs` hard-fails the build on: duplicate URLs, non-HTTPS URLs,
off-domain URLs, trailing slashes, fragments, bad priorities, bad `changefreq`,
missing titles/descriptions and malformed `lastmod` values.

## On-page SEO

* **Canonical** — every route emits `<link rel="canonical">` in the *static HTML*
  and again at runtime.
* **Open Graph + Twitter** — `og:title/description/url/image/type`, `og:image`
  is `public/og-image.jpg` (1200×630), plus `og:price:amount` / `og:price:currency`
  on book pages.
* **JSON-LD** — `Organization` + `WebSite` (home), `Book`+`Product` with
  `Offer`/ISBN (books), `NewsArticle` (articles), `ItemList` (catalog,
  bestsellers, news index), `FAQPage` (FAQ), `BreadcrumbList` (every page with a
  trail).
* **No-JS fallback** — each prerendered page carries a small `<noscript>` block
  with the page's H1 and description, so non-rendering crawlers see real text.

Runtime metadata is applied by `src/components/RouteSEO.tsx`, mounted once in
`App.tsx`; it reads the same `src/data/seo.ts` table the build scripts use.

## Adding a page

1. Add the route to `App.tsx`.
2. Add a `SeoEntry` to `STATIC_ROUTES` in `src/data/seo.ts` (path, title,
   description, priority, changefreq, optional breadcrumbs/keywords/images).
3. `npm run build`. The page appears in the sitemap and is prerendered
   automatically.

New books/news items need no work — the sitemap is generated from
`src/data/books.ts` and `src/data/news.ts`.

## First-30-days checklist

1. **Verify the property** — Domain property (DNS TXT) covers all subdomains and
   protocols; URL-prefix only covers `https://hubrisbooks.win/`.
2. **Submit the sitemap** — expect "Success" with 51 discovered URLs within a day.
3. **Request indexing** on `/`, `/catalog`, `/bestsellers`, `/news` and 2–3 book
   pages via the URL Inspection tool — this is the fastest way to get first crawl.
4. **Check Page Indexing** after ~1 week. Everything should land in *Indexed*;
   "Crawled – currently not indexed" on thin pages (e.g. `/terms`) is normal.
5. **Watch Core Web Vitals** — the JS bundle is ~716 kB (216 kB gzip); if LCP
   suffers, code-split `react-router` routes (also silences the Vite chunk warning).
6. **Internal links** — `/catalog` and `/news` are the two hub pages; every book
   and article links back to them, which is what spreads PageRank here.
