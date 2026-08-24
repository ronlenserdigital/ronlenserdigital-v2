import { renderToString } from "react-dom/server";
import App from "./App.jsx";

/* Called by scripts/prerender.mjs for each route. */
export function render(path) {
  return renderToString(<App path={path} />);
}

export { PAGES, SITE, headHtml, jsonLd } from "./seo.js";
