import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import App from "./App.jsx";
import "./index.css";

/* Analytics. Cookieless, no personal data, only visible in Ron's Vercel
   dashboard. Off in dev so local clicks never pollute the numbers. */
if (import.meta.env.PROD) {
  inject();
  injectSpeedInsights();
}

const root = document.getElementById("root");
const path = window.location.pathname;
const app = (
  <React.StrictMode>
    <App path={path} />
  </React.StrictMode>
);

/* Prerendered pages hydrate. Anything else (dev server) mounts fresh. */
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
