import { useLocation } from "react-router-dom";
import { AUTHORS } from "../data/authors";
import { BOOKS, IMPRINTS } from "../data/books";
import { NEWS } from "../data/news";
import { articleSeo, authorSeo, bookSeo, imprintSeo, routeEntry } from "../data/seo";
import SEO from "./SEO";

/**
 * Applies the right <title>, meta description, canonical, Open Graph,
 * Twitter card and JSON-LD for whatever route is mounted. Mounted once in
 * App.tsx so every page — present and future — stays in sync with
 * src/data/seo.ts and with the static HTML baked by scripts/prerender.mjs.
 */
export default function RouteSEO() {
  const { pathname } = useLocation();
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;

  const book = BOOKS.find((b) => path === `/book/${b.id}`);
  const article = NEWS.find((n) => path === `/news/${n.slug}`);
  const imprint = Object.keys(IMPRINTS).find((id) => path === `/imprint/${id}`);
  const author = AUTHORS.find((a) => path === `/author/${a.slug}`);

  const entry = book
    ? bookSeo(book)
    : article
      ? articleSeo(article)
      : imprint
        ? imprintSeo(imprint)
        : author
          ? authorSeo(author)
          : routeEntry(path);

  if (!entry) return null;
  return <SEO entry={entry} />;
}
