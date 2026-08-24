import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { reduced } from "./lib/motion.js";
import { pageFor } from "./seo.js";
import { Home } from "./pages/Home.jsx";
import { Privacy } from "./pages/Privacy.jsx";
import { Terms } from "./pages/Terms.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { Nav } from "./components/Top.jsx";
import { Footer } from "./components/ui/footer-section.jsx";
import { StickyCta } from "./components/StickyCta.jsx";
import { CookieNotice } from "./components/CookieNotice.jsx";

/* Path based routing with no router dependency. Four routes, that is it.
   `path` is passed in by the prerender script at build time and read from
   window in the browser. */
const ROUTES = {
  "/": Home,
  "/privacy": Privacy,
  "/terms": Terms,
};

export default function App({ path }) {
  const p = pageFor(path).path;
  const Page = ROUTES[p] ?? NotFound;
  const isHome = p === "/";
  const root = useRef(null);

  // smooth scroll
  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // scroll reveals, re-scanned when sections mount
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    const scan = () =>
      (root.current ?? document)
        .querySelectorAll(".reveal:not(.is-in)")
        .forEach((el) => io.observe(el));

    scan();
    const mo = new MutationObserver(scan);
    if (root.current) mo.observe(root.current, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div ref={root}>
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <Nav home={isHome} />
      <main id="content">
        <Page />
      </main>
      <Footer home={isHome} />
      <StickyCta />
      <CookieNotice />
    </div>
  );
}
