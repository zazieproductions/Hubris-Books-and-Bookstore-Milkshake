/**
 * Single source of truth for SEO across the app and the build scripts.
 *
 * This module is imported by:
 *   - `src/components/SEO.tsx`  (runtime <title>/meta/JSON-LD)
 *   - `scripts/generate-sitemap.mjs` (public/sitemap.xml + public/robots.txt)
 *   - `scripts/prerender.mjs`   (static per-route meta baked into dist/)
 *
 * It must stay free of React/browser APIs so plain `node` can import it
 * (Node 22 strips the TypeScript types on load).
 */

import { BOOKS, IMPRINTS, type Book } from "./books.ts";
import { FAQS } from "./faq.ts";
import { NEWS, type NewsArticle } from "./news.ts";

/* ------------------------------------------------------------------ */
/* Site-wide configuration                                             */
/* ------------------------------------------------------------------ */

export const SITE_URL = "https://hubrisbooks.win";
export const SITE_NAME = "Hubris Books & Bookstore Milkshake";
export const SITE_SHORT_NAME = "Hubris Books";
export const SITE_TAGLINE = "Books for Librarians with a Purchasable Edge™";
export const SITE_DESCRIPTION =
  "Hubris Books & Bookstore Milkshake — the world's most dependent publisher. Books for librarians with a purchasable edge. No refunds since 2006.";
export const SITE_LOCALE = "en_US";
export const SITE_FOUNDING_YEAR = "2006";

export const SITE_IMAGE_PATH = "/og-image.jpg";
export const SITE_IMAGE_URL = `${SITE_URL}${SITE_IMAGE_PATH}`;
export const SITE_IMAGE_ALT =
  "Hubris Books & Bookstore Milkshake — Books for Librarians with a Purchasable Edge";
export const SITE_IMAGE_WIDTH = 1200;
export const SITE_IMAGE_HEIGHT = 630;

export const NOINDEX_ROUTES = ["/cart", "/checkout"];

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface SeoImage {
  url: string;
  title: string;
  caption?: string;
}

export interface BreadcrumbTrail {
  name: string;
  path: string;
}

export interface SeoEntry {
  /** Absolute, canonical path — no trailing slash except "/" */
  path: string;
  /** Full <title> (Google truncates around 580px, ~60 chars is the sweet spot) */
  title: string;
  /** Meta description, ~155 characters */
  description: string;
  /** sitemap.xml priority, 0.0–1.0 */
  priority: number;
  changeFrequency: ChangeFrequency;
  type: "website" | "article" | "product";
  /** ISO date string */
  publishedTime?: string;
  lastModified?: string;
  keywords?: string[];
  images?: SeoImage[];
  breadcrumbs?: BreadcrumbTrail[];
  /** Emitted as og:price:* for product-type routes */
  product?: { price: number; currency: string };
  /** Omitted from sitemap.xml and emitted with robots noindex */
  noindex?: boolean;
  /** Repo file used to derive <lastmod> from git history */
  sourceFile?: string;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
}

/** Collapse whitespace and trim to `max` chars on a word boundary. */
export function clampDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function firstSentence(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  const match = clean.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : clean;
}

function parseDate(value: string): Date | null {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function isoDate(value: string | Date | null | undefined): string | undefined {
  if (!value) return undefined;
  const d = value instanceof Date ? value : parseDate(value);
  return d ? d.toISOString().slice(0, 10) : undefined;
}

function changeFrequencyForDate(date: Date | null, now = new Date()): ChangeFrequency {
  if (!date) return "monthly";
  const days = (now.getTime() - date.getTime()) / 86_400_000;
  if (days <= 14) return "daily";
  if (days <= 90) return "weekly";
  if (days <= 730) return "monthly";
  return "yearly";
}

/* ------------------------------------------------------------------ */
/* Static routes                                                       */
/* ------------------------------------------------------------------ */

const HOME: SeoEntry = {
  path: "/",
  title: `${SITE_NAME} — Books for Librarians with a Purchasable Edge™`,
  description: clampDescription(
    `${SITE_DESCRIPTION} Shop ${BOOKS.length} books on cataloging, metadata, critical librarianship, open access and late fees. Shipping in 6–8 eternities.`,
  ),
  priority: 1,
  changeFrequency: "daily",
  type: "website",
  keywords: [
    "Hubris Books",
    "Bookstore Milkshake",
    "library science books",
    "cataloging",
    "metadata",
    "critical librarianship",
    "librarianship",
    "open access",
  ],
  images: [
    {
      url: `${SITE_URL}/images/munnytown-selfie.jpg?v=2`,
      title: "Hubris Munnytown, bunny CEO of Hubris Books, taking a mirror selfie surrounded by money",
    },
  ],
  sourceFile: "src/pages/Home.tsx",
};

const CATALOG: SeoEntry = {
  path: "/catalog",
  title: `Full Catalog — ${BOOKS.length} Books for Librarians | ${SITE_SHORT_NAME}`,
  description: clampDescription(
    `Browse all ${BOOKS.length} Hubris Books titles: cataloging, metadata, critical librarianship, open access, collection development and library management. Filter by imprint, sort by profit.`,
  ),
  priority: 0.9,
  changeFrequency: "daily",
  type: "website",
  keywords: [
    "library science catalog",
    "librarianship books",
    "cataloging books",
    "metadata books",
    "library science publishers",
  ],
  breadcrumbs: [{ name: "Home", path: "/" }, { name: "Catalog", path: "/catalog" }],
  sourceFile: "src/pages/Catalog.tsx",
};

const BESTSELLERS: SeoEntry = {
  path: "/bestsellers",
  title: "Bestsellers — The Hubris 10, Ranked by Revenue | Hubris Books",
  description: clampDescription(
    "Our bestselling library science books, ranked by revenue and labeled by merit. Cataloging, late fees, metadata and late capitalism — hardcover, ebook and audiobook.",
  ),
  priority: 0.8,
  changeFrequency: "weekly",
  type: "website",
  keywords: ["bestselling library books", "best cataloging books", "librarian bestsellers"],
  breadcrumbs: [{ name: "Home", path: "/" }, { name: "Bestsellers", path: "/bestsellers" }],
  sourceFile: "src/pages/Bestsellers.tsx",
};

const NEWS_INDEX: SeoEntry = {
  path: "/news",
  title: `Press Releases, Awards & Corporate News | ${SITE_SHORT_NAME}`,
  description: clampDescription(
    `Every press release, CEO statement, acquisition and recall notice from Hubris Books. ${NEWS.length} dispatches from the world's most dependent publisher.`,
  ),
  priority: 0.8,
  changeFrequency: "weekly",
  type: "website",
  keywords: ["publisher press releases", "library publishing news", "Hubris Books news"],
  breadcrumbs: [{ name: "Home", path: "/" }, { name: "News", path: "/news" }],
  sourceFile: "src/pages/News.tsx",
};

const AUTHORS: SeoEntry = {
  path: "/authors",
  title: "Publish With Us — Author Packages & Submission Fees | Hubris Books",
  description: clampDescription(
    "Author packages from $2,400. Peer review in 11 minutes. Royalty rate: 0.4% of net of net. Submit your manuscript to Hubris Books, the world's most dependent publisher.",
  ),
  priority: 0.7,
  changeFrequency: "monthly",
  type: "website",
  keywords: [
    "publish with a library science publisher",
    "academic book proposal",
    "library science author",
    "publishing packages",
  ],
  breadcrumbs: [{ name: "Home", path: "/" }, { name: "Authors", path: "/authors" }],
  sourceFile: "src/pages/Authors.tsx",
};

const ABOUT: SeoEntry = {
  path: "/about",
  title: "About Hubris Books — 15 Years of Independence (Owned by 47 Firms)",
  description: clampDescription(
    "Founded in a garage in 2006 as Library Juice Press. Now a 90-story tower in Dayton, proudly independent and owned by 47 private equity firms. Meet the bunny CEO.",
  ),
  priority: 0.6,
  changeFrequency: "monthly",
  type: "website",
  keywords: ["about Hubris Books", "library science publisher", "independent publisher Dayton Ohio"],
  breadcrumbs: [{ name: "Home", path: "/" }, { name: "About", path: "/about" }],
  sourceFile: "src/pages/About.tsx",
};

const LOYALTY: SeoEntry = {
  path: "/loyalty",
  title: "FunBux™ Loyalty Program — Spirit Bucks, Real Fees | Hubris Books",
  description: clampDescription(
    "Earn 10 FunBux™ per dollar spent with the Hubris loyalty program. Redeemable for nothing, expiring when observed, and backed by the First National Bank of Fees.",
  ),
  priority: 0.6,
  changeFrequency: "monthly",
  type: "website",
  keywords: ["bookstore loyalty program", "FunBux", "library rewards program"],
  breadcrumbs: [{ name: "Home", path: "/" }, { name: "Loyalty", path: "/loyalty" }],
  sourceFile: "src/pages/Loyalty.tsx",
};

const FAQ: SeoEntry = {
  path: "/faq",
  title: "FAQ — Refunds, Shipping, Cancellations & Fees | Hubris Books",
  description: clampDescription(
    "Answers on returns (no), shipping (6–8 eternities), cancellations (a quest), the Browsing Fee, Vanilla Compliance, FunBux™ and why the ebook costs more than the hardcover.",
  ),
  priority: 0.6,
  changeFrequency: "monthly",
  type: "website",
  keywords: ["bookstore FAQ", "return policy", "shipping policy", "subscription cancellation"],
  breadcrumbs: [{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }],
  sourceFile: "src/pages/FAQ.tsx",
};

const TERMS: SeoEntry = {
  path: "/terms",
  title: "Terms of Servitude — Fees, FunBux™ & the §13.3 Soul Clause",
  description: clampDescription(
    "The Hubris Books Terms of Servitude: all sales final, fees subject to fees, subscriptions renew forever, and per §13.3 your soul is licensed for marketing. Current version: 4,812.",
  ),
  priority: 0.3,
  changeFrequency: "yearly",
  type: "website",
  keywords: ["terms of service", "terms of servitude", "purchase terms"],
  breadcrumbs: [{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }],
  sourceFile: "src/pages/Terms.tsx",
};

export const STATIC_ROUTES: SeoEntry[] = [
  HOME,
  CATALOG,
  BESTSELLERS,
  NEWS_INDEX,
  AUTHORS,
  ABOUT,
  LOYALTY,
  FAQ,
  TERMS,
];

/** Transactional pages: kept crawlable-blocked and out of the sitemap. */
export const NOINDEX_ROUTE_ENTRIES: SeoEntry[] = [
  {
    path: "/cart",
    title: "Your Cart (It Has Opinions) — Hubris Books",
    description:
      "Review your cart, its mandatory add-ons, and the fees it has selected on your behalf. Removal triggers a restocking fee.",
    priority: 0,
    changeFrequency: "never",
    type: "website",
    noindex: true,
    sourceFile: "src/pages/Cart.tsx",
  },
  {
    path: "/checkout",
    title: "Checkout — Ten Steps, No Take-Backs | Hubris Books",
    description: "Ten-step checkout including required add-ons, insurance opt-out and a reflection period.",
    priority: 0,
    changeFrequency: "never",
    type: "website",
    noindex: true,
    sourceFile: "src/pages/Checkout.tsx",
  },
];

/* ------------------------------------------------------------------ */
/* Dynamic routes                                                      */
/* ------------------------------------------------------------------ */

export function bookSeo(book: Book): SeoEntry {
  const imprint = IMPRINTS[book.imprint]?.name ?? SITE_SHORT_NAME;
  const blurb = firstSentence(book.blurb);
  return {
    path: `/book/${book.id}`,
    title: `${book.title}: ${book.subtitle} — ${SITE_SHORT_NAME}`,
    description: clampDescription(
      `${book.title} by ${book.author}. ${blurb} ${book.pages} pages, ${book.year}, ISBN ${book.isbn}.`,
    ),
    priority: book.staffPick || book.badges?.includes("BESTSELLER") ? 0.8 : 0.7,
    changeFrequency: "weekly",
    type: "product",
    product: { price: book.price, currency: "USD" },
    publishedTime: `${book.year}-01-01`,
    keywords: [
      book.title,
      book.subtitle,
      book.author,
      imprint,
      "librarianship",
      "library science",
      book.isbn,
      ...(book.badges ?? []),
    ].filter(Boolean),
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Catalog", path: "/catalog" },
      { name: book.title, path: `/book/${book.id}` },
    ],
    sourceFile: "src/data/books.ts",
  };
}

export function articleSeo(article: NewsArticle): SeoEntry {
  const published = parseDate(article.date);
  return {
    path: `/news/${article.slug}`,
    title: `${article.title} — ${SITE_SHORT_NAME} News`,
    description: clampDescription(article.excerpt),
    priority: article.featured ? 0.7 : 0.6,
    changeFrequency: changeFrequencyForDate(published),
    type: "article",
    publishedTime: isoDate(published),
    lastModified: isoDate(published),
    keywords: [article.category, article.author, ...(article.tags ?? [])].filter(Boolean),
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "News", path: "/news" },
      { name: article.title, path: `/news/${article.slug}` },
    ],
    sourceFile: "src/data/news.ts",
  };
}

export const BOOK_ROUTES: SeoEntry[] = BOOKS.map(bookSeo);
export const ARTICLE_ROUTES: SeoEntry[] = NEWS.map(articleSeo);

/** Mirrors the ranking used by src/pages/Bestsellers.tsx. */
export const BESTSELLER_ROUTES: SeoEntry[] = [...BOOKS]
  .sort((a, b) => b.price * b.pages - a.price * a.pages)
  .slice(0, 10)
  .map(bookSeo);

/** Everything that belongs in sitemap.xml, in priority order. */
export function buildSitemapEntries(): SeoEntry[] {
  return [...STATIC_ROUTES, ...BOOK_ROUTES, ...ARTICLE_ROUTES].filter((e) => !e.noindex);
}

/** Every route the prerenderer should write to disk (includes noindex pages). */
export function buildAllRouteEntries(): SeoEntry[] {
  return [...STATIC_ROUTES, ...BOOK_ROUTES, ...ARTICLE_ROUTES, ...NOINDEX_ROUTE_ENTRIES];
}

const ROUTE_INDEX: Map<string, SeoEntry> = new Map(
  buildAllRouteEntries().map((entry) => [entry.path, entry]),
);

/** O(1) lookup used by the router-level SEO component. */
export function routeEntry(path: string): SeoEntry | undefined {
  return ROUTE_INDEX.get(path.length > 1 ? path.replace(/\/$/, "") : path);
}

export function findRouteEntry(path: string): SeoEntry | undefined {
  return routeEntry(path);
}

/* ------------------------------------------------------------------ */
/* JSON-LD structured data                                             */
/* ------------------------------------------------------------------ */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_SHORT_NAME,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: SITE_IMAGE_URL,
      width: SITE_IMAGE_WIDTH,
      height: SITE_IMAGE_HEIGHT,
    },
    slogan: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    foundingDate: SITE_FOUNDING_YEAR,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1 Hubris Tower",
      addressLocality: "Dayton",
      addressRegion: "OH",
      addressCountry: "US",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

export function breadcrumbJsonLd(trail: BreadcrumbTrail[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function bookJsonLd(book: Book) {
  const entry = bookSeo(book);
  const imprint = IMPRINTS[book.imprint]?.name ?? SITE_SHORT_NAME;
  return {
    "@context": "https://schema.org",
    "@type": ["Book", "Product"],
    "@id": `${absoluteUrl(entry.path)}#book`,
    name: `${book.title}: ${book.subtitle}`,
    url: absoluteUrl(entry.path),
    description: entry.description,
    isbn: book.isbn,
    numberOfPages: book.pages,
    datePublished: `${book.year}-01-01`,
    inLanguage: "en",
    author: { "@type": "Person", name: book.author },
    publisher: { "@id": `${SITE_URL}/#organization` },
    brand: { "@type": "Brand", name: imprint },
    category: "Books > Professional & Technical > Library & Information Science",
    offers: {
      "@type": "Offer",
      url: absoluteUrl(entry.path),
      price: book.price.toFixed(2),
      priceCurrency: "USD",
      availability: book.soldOut
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  };
}

export function articleJsonLd(article: NewsArticle) {
  const entry = articleSeo(article);
  const published = parseDate(article.date);
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${absoluteUrl(entry.path)}#article`,
    headline: article.title.replace(/\s+/g, " ").trim(),
    description: entry.description,
    url: absoluteUrl(entry.path),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(entry.path) },
    image: SITE_IMAGE_URL,
    datePublished: isoDate(published),
    dateModified: isoDate(published),
    author: { "@type": "Person", name: article.author, jobTitle: article.authorRole },
    publisher: { "@id": `${SITE_URL}/#organization` },
    articleSection: article.category,
    keywords: (article.tags ?? []).join(", "),
    wordCount: article.body.join(" ").split(/\s+/).length,
    timeRequired: `PT${article.readMinutes}M`,
    isAccessibleForFree: true,
    inLanguage: "en-US",
  };
}

export function itemListJsonLd(name: string, entries: SeoEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.title,
      url: absoluteUrl(entry.path),
    })),
  };
}

export function faqJsonLd(qa: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((item) => ({
      "@type": "Question",
      name: item.q.replace(/\s+/g, " ").trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a.replace(/\s+/g, " ").trim(),
      },
    })),
  };
}

/**
 * Structured data for a route. Used by both the runtime `<SEO>` component and
 * the build-time prerenderer so the served HTML and the hydrated DOM agree.
 */
export function routeJsonLd(entry: SeoEntry): unknown[] {
  const blocks: unknown[] = [];

  const book = BOOKS.find((b) => entry.path === `/book/${b.id}`);
  const article = NEWS.find((n) => entry.path === `/news/${n.slug}`);

  if (entry.path === "/") {
    blocks.push(organizationJsonLd(), websiteJsonLd());
  } else if (book) {
    blocks.push(bookJsonLd(book));
  } else if (article) {
    blocks.push(articleJsonLd(article));
  } else if (entry.path === "/catalog") {
    blocks.push(itemListJsonLd(`Hubris Books catalog — ${BOOK_ROUTES.length} titles`, BOOK_ROUTES));
  } else if (entry.path === "/bestsellers") {
    blocks.push(itemListJsonLd("The Hubris 10 — bestsellers ranked by revenue", BESTSELLER_ROUTES));
  } else if (entry.path === "/news") {
    blocks.push(itemListJsonLd("Hubris Books press releases and corporate news", ARTICLE_ROUTES));
  } else if (entry.path === "/faq") {
    blocks.push(faqJsonLd(FAQS));
  }

  if (entry.breadcrumbs?.length) blocks.push(breadcrumbJsonLd(entry.breadcrumbs));

  return blocks;
}
