import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useReveal } from "./hooks.js";
import { CursorDisc, Nav, Hero, Marquee } from "./components/Top.jsx";
import { Statement, Work, Process, Pricing, Contact } from "./components/Body.jsx";

export default function App() {
  const root = useRef(null);
  useReveal(root);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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

  return (
    <div ref={root}>
      <CursorDisc />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Statement />
        <Work />
        <Process />
        <Pricing />
        <Contact />
      </main>
    </div>
  );
}
