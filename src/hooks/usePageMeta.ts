import { useEffect } from "react";

/**
 * Per-route SEO meta for the SPA: <title>, meta description, and a
 * canonical <link> pointing at the current clean URL. Call once at the
 * top of each page component.
 */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;
  }, [title, description]);
}
