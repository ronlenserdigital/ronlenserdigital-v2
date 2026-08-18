import { useEffect, useRef, useState } from "react";
import { useClock, useAvailability, useMagnetic, reduced } from "../lib/motion.js";

/* ------------------------------------------------------------------ */
/* Preloader — counts to 100, then wipes up                            */
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
    const dur = 1100;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setGone(true);
          onDone?.();
        }, 180);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-end justify-between bg-ink px-6 pb-6 transition-transform duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)] md:px-10 md:pb-10 ${
        gone ? "-translate-y-full" : ""
      }`}
    >
      <span className="eyebrow !text-paper/40">Ron Lenser Digital</span>
      <span className="display text-big text-paper tabular-nums">
        {String(n).padStart(3, "0")}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Status bar — live clock and open / closed                           */
/* ------------------------------------------------------------------ */
export function StatusBar() {
  const time = useClock("America/New_York");
  const open = useAvailability();

  return (
    <div className="hidden border-b border-hairline px-6 py-2.5 md:block md:px-10">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between">
        <span className="eyebrow">Fredericksburg, Virginia</span>

        <span className="eyebrow flex items-center gap-2">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${
              open ? "animate-pulse bg-accent" : "bg-graphite"
            }`}
          />
          {open ? "Taking calls now" : "Closed, leave a message"}
        </span>

        <span className="eyebrow tabular-nums">Local time {time}</span>
      </div>
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
/* Nav + full screen menu overlay                                      */
/* ------------------------------------------------------------------ */
const LINKS = [
  ["Work", "#work"],
  ["Capabilities", "#capabilities"],
  ["Process", "#process"],
  ["Results", "#results"],
  ["Pricing", "#pricing"],
  ["Contact", "#contact"],
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const cta = useMagnetic(0.25);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid && !menu ? "bg-paper/80 backdrop-blur-md" : ""
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
          <a
            href="#top"
            className={`eyebrow transition-colors ${menu ? "!text-paper" : "!text-ink"}`}
          >
            Ron Lenser Digital
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.slice(0, 4).map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="link-swap text-sm text-graphite hover:text-ink"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              ref={cta}
              href="#contact"
              className={`hidden rounded-full px-5 py-2.5 text-sm font-medium transition-colors sm:block ${
                menu
                  ? "bg-paper text-ink"
                  : "bg-ink text-paper hover:bg-accent"
              }`}
            >
              Book a call
            </a>

            <button
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              aria-label={menu ? "Close menu" : "Open menu"}
              className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5"
            >
              <span
                className={`block h-px w-6 transition-all duration-300 ${
                  menu ? "translate-y-[3.5px] rotate-45 bg-paper" : "bg-ink"
                }`}
              />
              <span
                className={`block h-px w-6 transition-all duration-300 ${
                  menu ? "-translate-y-[3.5px] -rotate-45 bg-paper" : "bg-ink"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-ink transition-[clip-path] duration-[800ms] ease-[cubic-bezier(.76,0,.24,1)] ${
          menu
            ? "[clip-path:inset(0_0_0%_0)]"
            : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div className="flex h-full flex-col justify-center px-6 md:px-10">
          <nav className="mx-auto w-full max-w-[1600px]">
            {LINKS.map(([label, href], i) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenu(false)}
                data-cursor="GO"
                className="group flex items-baseline justify-between border-b border-paper/12 py-5 md:py-7"
                style={{
                  transitionDelay: `${menu ? 220 + i * 55 : 0}ms`,
                  opacity: menu ? 1 : 0,
                  transform: menu ? "none" : "translateY(18px)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "600ms",
                }}
              >
                <span className="display text-big text-paper transition-colors group-hover:text-accent">
                  {label}
                </span>
                <span className="eyebrow !text-paper/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </a>
            ))}
          </nav>

          <div className="mx-auto mt-12 flex w-full max-w-[1600px] flex-col gap-2 text-paper/50 md:flex-row md:gap-10">
            <a href="tel:+15403956493" className="text-sm hover:text-paper">
              (540) 395-6493
            </a>
            <a href="mailto:ron@ronlenserdigital.com" className="text-sm hover:text-paper">
              ron@ronlenserdigital.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
