import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { reduced } from "./lib/motion.js";
import { Preloader, CursorDisc, Nav } from "./components/Chrome.jsx";
import { Hero, Marquee, Statement } from "./components/Top.jsx";
import { Work, Capabilities, Process, Results } from "./components/Work.jsx";
import { Testimonials, Clients, Pricing, ContactCard } from "./components/Social.jsx";
import { Quote } from "./components/Quote.jsx";
import { QuickActions } from "./components/QuickActions.jsx";
import { SectionRail } from "./components/SectionRail.jsx";
import { Footer } from "./components/ui/footer-section.jsx";
import { ParallaxBreak } from "./components/ui/parallax-layers.jsx";

export default function App() {
  const root = useRef(null);
  const [ready, setReady] = useState(false);

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
      <Preloader onDone={() => setReady(true)} />
      <CursorDisc />
      <Nav />
      <SectionRail />
      <QuickActions />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Statement />
        <ParallaxBreak />
        <Work />
        <Capabilities />
        <Process />
        <Results />
        <Testimonials />
        <Clients />
        <Pricing />
        <ContactCard />
        <Quote />
      </main>
      <Footer />
    </div>
  );
}
