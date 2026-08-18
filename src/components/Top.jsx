import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Cobalt cursor disc. The one flourish. Desktop + fine pointer only.  */
/* ------------------------------------------------------------------ */
export function CursorDisc() {
  const disc = useRef(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = disc.current;
    let x = 0,
      y = 0,
      cx = 0,
      cy = 0,
      raf = 0;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      const hit = e.target.closest("[data-cursor]");
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
/* Nav                                                                 */
/* ------------------------------------------------------------------ */
export function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-paper/85 backdrop-blur-md" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="eyebrow !text-ink">
          Ron Lenser Digital
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {[
            ["Work", "#work"],
            ["Process", "#process"],
            ["Pricing", "#pricing"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-graphite transition-colors hover:text-ink"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-cobalt"
        >
          Book a call
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
const HERO_LINES = ["Everyone else", "uses the same", "template."];

export function Hero() {
  return (
    <section id="top" className="relative px-6 pt-36 pb-16 md:px-10 md:pt-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-baseline justify-between">
          <p className="eyebrow">Fredericksburg, Virginia</p>
          <p className="eyebrow hidden md:block">Independent studio</p>
        </div>

        <div className="rule my-6" />

        <h1 className="display text-mega">
          {HERO_LINES.map((line, i) => (
            <span className="line-mask" key={line}>
              <span
                className="line-inner"
                style={{ animationDelay: `${0.1 + i * 0.11}s` }}
              >
                {line}
              </span>
            </span>
          ))}
          <span className="line-mask">
            <span
              className="line-inner text-cobalt"
              style={{ animationDelay: `${0.1 + HERO_LINES.length * 0.11}s` }}
            >
              You won't.
            </span>
          </span>
        </h1>

        <div className="mt-12 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="reveal max-w-md text-lg leading-relaxed text-graphite md:col-span-5 md:col-start-8">
            I write every line of every site by hand. No page builders, no
            recycled themes, no monthly platform fee. Most builds go live in
            about a week.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */
const CLAIMS = [
  "No templates",
  "No page builders",
  "No monthly lock in",
  "You own the code",
  "Built in Virginia",
];

export function Marquee() {
  const strip = [...CLAIMS, ...CLAIMS, ...CLAIMS, ...CLAIMS];
  return (
    <div className="border-y border-hairline py-4">
      <div className="marquee-track">
        {strip.map((c, i) => (
          <span
            key={i}
            className="eyebrow flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap"
          >
            {c}
            <span className="text-cobalt">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
