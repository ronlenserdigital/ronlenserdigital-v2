import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { reduced } from "./lib/motion.js";
import { Hero, Marquee, Statement } from "./components/Top.jsx";
import { Pricing, ContactCard } from "./components/Social.jsx";
import { FAQ } from "./components/ui/faq-section.jsx";
import { StackStrip } from "./components/ui/stack-strip.jsx";
import { HowItWorks } from "./components/ui/how-it-works.jsx";
import { WhatIDo } from "./components/ui/what-i-do.jsx";
import { Quote } from "./components/Quote.jsx";
import { Footer } from "./components/ui/footer-section.jsx";

export default function App() {
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
      <main>
        <Hero />
        <StackStrip />
        <Marquee />
        <Statement />
        <WhatIDo />
        <HowItWorks />
        <FAQ />
        <Pricing />
        <ContactCard />
        <Quote />
      </main>
      <Footer />
    </div>
  );
}
