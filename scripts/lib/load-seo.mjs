/**
 * Loads src/data/seo.ts from a plain Node script.
 *
 * Fast path: Node >= 22.6 strips TypeScript types natively, so `import()` of a
 * .ts module just works.
 *
 * Fallback: on anything older (Vite 7's floor is Node 20.19), compile the
 * module through Vite's SSR loader instead — it understands the same tsconfig
 * and import specifiers the app uses. Same exports either way.
 *
 * Set SEO_FORCE_VITE_LOADER=1 to exercise the fallback locally.
 */

const MODULE_URL = new URL("../../src/data/seo.ts", import.meta.url).href;
const MODULE_ID = "/src/data/seo.ts";

const NEEDS_VITE = /ERR_MODULE_NOT_FOUND|ERR_UNKNOWN_FILE_EXTENSION|ERR_UNSUPPORTED|TypeError/;

export async function loadSeoModule(root) {
  if (!process.env.SEO_FORCE_VITE_LOADER) {
    try {
      return await import(MODULE_URL);
    } catch (err) {
      if (!NEEDS_VITE.test(err?.code ?? err?.name ?? "")) throw err;
      console.warn(
        "⚠️  Node cannot import .ts directly (needs >= 22.6) — loading through Vite instead.",
      );
    }
  }

  const { createServer } = await import("vite");
  const server = await createServer({
    root,
    appType: "custom",
    logLevel: "error",
    server: { middlewareMode: true, hmr: false },
    // This server exists for exactly one ssrLoadModule() call, so skip the
    // dependency scan — it would only race with server.close() and warn.
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  try {
    return await server.ssrLoadModule(MODULE_ID);
  } finally {
    await server.close();
  }
}
