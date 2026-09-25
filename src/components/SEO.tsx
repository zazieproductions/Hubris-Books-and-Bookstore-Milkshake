import { useEffect } from "react";
import {
  SITE_IMAGE_ALT,
  SITE_IMAGE_HEIGHT,
  SITE_IMAGE_URL,
  SITE_IMAGE_WIDTH,
  SITE_LOCALE,
  SITE_NAME,
  absoluteUrl,
  routeJsonLd,
  type SeoEntry,
} from "../data/seo";

export interface SEOProps {
  /** Canonical path, e.g. "/catalog". Defaults to `entry.path`. */
  path?: string;
  title?: string;
  description?: string;
  /** One JSON-LD block or an array of blocks. */
  jsonLd?: unknown | unknown[];
  /** Pre-built metadata; individual props below win when supplied. */
  entry?: SeoEntry;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  noindex?: boolean;
  type?: SeoEntry["type"];
}

function setMeta(attr: "name" | "property", key: string, content: string | undefined) {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

const LD_ID = "hubris-jsonld";

const OG_TYPES: Record<SeoEntry["type"], string> = {
  website: "website",
  article: "article",
  product: "product",
};

/**
 * Client-side document head manager: title, canonical, Open Graph,
 * Twitter card, robots and JSON-LD. Values mirror what
 * `scripts/prerender.mjs` bakes into the static HTML at build time.
 */
export default function SEO({
  path,
  title,
  description,
  jsonLd,
  entry,
  image,
  imageAlt,
  keywords,
  noindex,
  type,
}: SEOProps) {
  const finalTitle = title ?? entry?.title ?? SITE_NAME;
  const finalDescription = description ?? entry?.description;
  const canonical = absoluteUrl(path ?? entry?.path ?? "/");
  const finalType = type ?? entry?.type ?? "website";
  const finalImage = image ?? entry?.images?.[0]?.url ?? SITE_IMAGE_URL;
  const finalImageAlt = imageAlt ?? entry?.images?.[0]?.title ?? SITE_IMAGE_ALT;
  const keywordsValue = (keywords ?? entry?.keywords)?.join(", ");
  const robotsValue =
    (noindex ?? entry?.noindex ?? false)
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const ldBlocks = jsonLd ?? (entry ? routeJsonLd(entry) : undefined);
  const ldPayload = ldBlocks
    ? JSON.stringify(Array.isArray(ldBlocks) ? ldBlocks : [ldBlocks])
    : "";
  const productPrice = entry?.product ? entry.product.price.toFixed(2) : "";
  const productCurrency = entry?.product?.currency ?? "";

  useEffect(() => {
    document.title = finalTitle;
    setCanonical(canonical);
    setMeta("name", "description", finalDescription);
    setMeta("name", "robots", robotsValue);
    setMeta("name", "keywords", keywordsValue);

    setMeta("property", "og:type", OG_TYPES[finalType]);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", finalTitle);
    setMeta("property", "og:description", finalDescription);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", finalImage);
    setMeta("property", "og:image:alt", finalImageAlt);
    setMeta("property", "og:image:width", String(SITE_IMAGE_WIDTH));
    setMeta("property", "og:image:height", String(SITE_IMAGE_HEIGHT));
    setMeta("property", "og:locale", SITE_LOCALE);
    if (productPrice) {
      setMeta("property", "og:price:amount", productPrice);
      setMeta("property", "og:price:currency", productCurrency);
    }

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", finalTitle);
    setMeta("name", "twitter:description", finalDescription);
    setMeta("name", "twitter:image", finalImage);
    setMeta("name", "twitter:image:alt", finalImageAlt);

    const old = document.getElementById(LD_ID);
    if (old) old.remove();
    if (ldPayload) {
      const blocks = JSON.parse(ldPayload) as unknown[];
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = LD_ID;
      script.textContent = JSON.stringify(blocks.length === 1 ? blocks[0] : blocks);
      document.head.appendChild(script);
    }
  }, [
    finalTitle,
    finalDescription,
    canonical,
    finalType,
    finalImage,
    finalImageAlt,
    keywordsValue,
    robotsValue,
    ldPayload,
    productPrice,
    productCurrency,
  ]);

  return null;
}
