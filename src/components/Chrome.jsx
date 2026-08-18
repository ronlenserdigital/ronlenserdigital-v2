import { useEffect, useRef, useState } from "react";
import { reduced } from "../lib/motion.js";

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
