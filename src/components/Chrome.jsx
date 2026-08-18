import { useEffect, useRef, useState } from "react";
import { reduced } from "../lib/motion.js";

/* ------------------------------------------------------------------ */
/* Preloader                                                           */
/* ------------------------------------------------------------------ */
export function Preloader({ onDone }) {
  const [n, setN] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduced()) {
      setGone(true);
      onDone?.();
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / 1100);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else
        setTimeout(() => {
          setGone(true);
          onDone?.();
        }, 180);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-end justify-between bg-ink px-5 pb-6 transition-transform duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)] md:px-8 md:pb-10 ${
        gone ? "-translate-y-full" : ""
      }`}
    >
      <span className="eyebrow">Ron Lenser Digital</span>
      <span className="display text-big tabular-nums">{String(n).padStart(3, "0")}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cursor disc                                                         */
/* ------------------------------------------------------------------ */
export function CursorDisc() {
  const disc = useRef(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || reduced()) return;
    const el = disc.current;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      const hit = e.target.closest?.("[data-cursor]");
      setLabel(hit ? hit.dataset.cursor : "");
    };
    const loop = () => {
      cx += (x - cx) * 0.16;
      cy += (y - cy) * 0.16;
      if (el) el.style.translate = `${cx}px ${cy}px`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={disc} className={`cursor-disc ${label ? "is-on" : ""}`} aria-hidden="true">
      {label}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header — wordmark only.                                             */
/* The hamburger and the full screen overlay are gone. The circular     */
/* dock at top right is the menu now, and the tubelight rail handles     */
/* section navigation. One control each, no duplicates.                 */
/* ------------------------------------------------------------------ */
export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-5 py-5 md:px-8">
      <a href="#top" className="eyebrow">
        Ron Lenser Digital
      </a>
    </header>
  );
}
