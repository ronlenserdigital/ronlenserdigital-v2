/**
 * Prerender.
 *
 * Runs after `vite build`. Builds a server bundle of the app, renders every
 * route to static HTML, and writes it into dist/ with the right head tags
 * for that route. Result: crawlers, AI engines, link previews and users on
 * slow connections all get the full page before a byte of JavaScript runs.
 * React then hydrates on top.
 *
 * Also writes sitemap.xml and 404.html (which Vercel serves for any unknown
 * path on a static deployment).
 */
import { build } from "vite";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const dist = path.resolve("dist");
const ssrDir = path.join(dist, ".ssr");

await build({
  logLevel: "warn",
  build: { ssr: "src/entry-server.jsx", outDir: ssrDir, emptyOutDir: true },
});

const { render, PAGES, headHtml, SITE } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const template = await readFile(path.join(dist, "index.html"), "utf8");
const today = new Date().toISOString().slice(0, 10);

const routes = Object.keys(PAGES);
const urls = [];

for (const route of routes) {
  // function replacers, so "$$" and "$&" in content are not treated as patterns
  const head = headHtml(route);
  const app = render(route);
  const html = template.replace("<!--head-->", () => head).replace("<!--app-->", () => app);

  const file =
    route === "/" ? "index.html" : route === "/404" ? "404.html" : `${route.slice(1)}.html`;
  await writeFile(path.join(dist, file), html);

  if (PAGES[route].index !== false) {
    urls.push({ loc: SITE.url + (route === "/" ? "/" : route), priority: route === "/" ? "1.0" : "0.3" });
  }
  console.log("prerendered", file);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.priority === "1.0" ? "weekly" : "yearly"}</changefreq>
    <priority>${u.priority}</priority>${
      u.priority === "1.0"
        ? `
    <image:image>
      <image:loc>${SITE.url}/ron-portrait.jpg</image:loc>
      <image:title>Ron Lenser, founder of Ron Lenser Digital</image:title>
    </image:image>`
        : ""
    }
  </url>`
  )
  .join("\n")}
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);
console.log("wrote sitemap.xml");

await rm(ssrDir, { recursive: true, force: true });
