import { BOOKS } from "./books";
import type { Book } from "./books";

/**
 * Canonical URL slug for a name: lowercase, non-alphanumerics → "-", trimmed.
 * NOTE: scripts/generate-sitemap.mjs must apply the identical transform so
 * sitemap URLs always match the routes in App.tsx.
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface AuthorEntry {
  slug: string;
  name: string;
  books: Book[];
}

/** One entry per unique author in the catalog, in first-appearance order. */
export const AUTHORS: AuthorEntry[] = (() => {
  const map = new Map<string, AuthorEntry>();
  for (const book of BOOKS) {
    const name = book.author;
    const existing = map.get(name);
    if (existing) existing.books.push(book);
    else map.set(name, { slug: slugify(name), name, books: [book] });
  }
  return [...map.values()];
})();

export const authorBySlug = (slug: string | undefined) =>
  AUTHORS.find((a) => a.slug === slug);
