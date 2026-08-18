import { useEffect, useRef, useState } from "react";
import { useInView, useCountUp } from "../lib/motion.js";

/* ------------------------------------------------------------------ */
/* Work — filterable pinned horizontal filmstrip                       */
/* ------------------------------------------------------------------ */
const PROJECTS = [
  { n: "01", name: "Abbots Lane", tags: ["Website"], year: "2026" },
  { n: "02", name: "Casablanca House", tags: ["Website", "SEO"], year: "2026" },
  { n: "03", name: "Riverbend Co.", tags: ["Brand", "Website"], year: "2025" },
  { n: "04", name: "Northside Trades", tags: ["Website", "AI"], year: "2025" },
  { n: "05", name: "Falmouth Auto", tags: ["Website", "SEO"], year: "2025" },
];

const FILTERS = ["All", "Website", "Brand", "SEO", "AI"];

function useHorizontalScroll(ref) {
  const [p, setP] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const handler = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        setP(total <= 0 ? 0 : Math.min(1, Math.max(0, -r.top / total)));
      });
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [ref]);

  return p;
}

export function Work() {
  const track = useRef(null);
  const p = useHorizontalScroll(track);
  const [filter, setFilter] = useState("All");

  const shown =
    filter === "All" ? PROJECTS : PROJECTS.filter((x) => x.tags.includes(filter));

  const shift = p * Math.max(0, (shown.length - 1.6) * 30);
  const active = Math.min(shown.length, Math.floor(p * shown.length) + 1);

  return (
    <section id="work" ref={track} className="relative h-[360vh] bg-ink">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 pb-8 md:px-10">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`eyebrow rounded-full border px-4 py-2 transition-colors ${
                  filter === f
                    ? "border-accent bg-accent !text-paper"
                    : "border-paper/20 !text-paper/50 hover:border-paper/50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <p className="eyebrow !text-paper/50 tabular-nums">
            {String(active).padStart(2, "0")} / {String(shown.length).padStart(2, "0")}
          </p>
        </div>

        <div
          className="flex gap-6 px-6 transition-transform duration-500 ease-out will-change-transform md:gap-10 md:px-10"
          style={{ transform: `translate3d(-${shift}%, 0, 0)` }}
        >
          {shown.map((proj) => (
            <article
              key={proj.n}
              data-cursor="VIEW"
              className="group w-[78vw] shrink-0 md:w-[42vw]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-soft">
                {/* Swap for <img src="..."> or <video autoPlay muted loop playsInline> */}
                <div className="absolute inset-0 grid place-items-center">
                  <span className="eyebrow !text-paper/20">{proj.name}</span>
                </div>
                <div className="absolute inset-0 scale-110 bg-accent opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
              </div>

              <div className="mt-5 flex items-baseline justify-between border-t border-paper/15 pt-4">
                <div>
                  <h3 className="font-display text-2xl text-paper">{proj.name}</h3>
                  <p className="mt-1 text-sm text-paper/45">{proj.tags.join(" / ")}</p>
                </div>
                <span className="eyebrow !text-paper/45">{proj.year}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 px-6 md:px-10">
          <div className="h-px w-full bg-paper/15">
            <div className="h-px bg-accent" style={{ width: `${Math.max(4, p * 100)}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Capabilities — dense columns                                        */
/* ------------------------------------------------------------------ */
const CAPS = [
  [
    "Websites",
    ["Custom marketing sites", "Landing pages", "Multi location pages", "Booking and quote flows", "Rebuilds and rescues", "Speed and Core Web Vitals"],
  ],
  [
    "Found on Google",
    ["Local SEO setup", "Google Business Profile", "Service area pages", "Schema markup", "Review generation", "Rank tracking"],
  ],
  [
    "Answering",
    ["AI chatbot on site", "AI phone receptionist", "Missed call text back", "Lead routing to your phone", "After hours coverage", "Booking handoff"],
  ],
  [
    "Brand",
    ["Logo and marks", "Type and color systems", "Vehicle and signage art", "Print and business cards", "Photo direction", "Social templates"],
  ],
];

export function Capabilities() {
  return (
    <section id="capabilities" className="border-t border-hairline px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <p className="eyebrow reveal">What I do</p>

        <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-4">
          {CAPS.map(([title, items]) => (
            <div key={title} className="reveal">
              <h3 className="font-display text-xl">{title}</h3>
              <div className="rule mt-4 mb-4" />
              <ul className="space-y-2.5">
                {items.map((it) => (
                  <li key={it} className="text-[0.95rem] leading-snug text-graphite">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */
const STEPS = [
  ["01", "Call", "Fifteen minutes. I learn the business and what the site has to do.", "1 day"],
  ["02", "Quote", "Fixed price, fixed date, in writing. No hourly, no surprises.", "1 day"],
  ["03", "Build", "Written by hand. You see it live on a preview link every day.", "5 to 7 days"],
  ["04", "Launch", "Domain, forms, Google. You get the code and the keys.", "1 day"],
];

export function Process() {
  return (
    <section id="process" className="border-t border-hairline px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <p className="eyebrow reveal">How a build runs</p>
        <div className="rule mt-6" />

        {STEPS.map(([n, title, body, dur]) => (
          <div
            key={n}
            className="reveal grid grid-cols-12 items-baseline gap-4 border-b border-hairline py-8 transition-colors hover:bg-paper-deep md:gap-8 md:py-10"
          >
            <span className="eyebrow col-span-2 md:col-span-1">{n}</span>
            <h3 className="display col-span-10 text-mid md:col-span-3">{title}</h3>
            <p className="col-span-12 text-graphite md:col-span-6 md:text-lg">{body}</p>
            <span className="eyebrow col-span-12 md:col-span-2 md:text-right">{dur}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Results — count-up grid                                             */
/* ------------------------------------------------------------------ */
const RESULTS = [
  { v: 7, suffix: "", pre: "", label: "Days from signed quote to live site, typical." },
  { v: 100, suffix: "%", pre: "", label: "Hand written code. Zero page builders, zero themes." },
  { v: 0, suffix: "", pre: "$", label: "Monthly platform fee. You own the site outright." },
  { v: 98, suffix: "+", pre: "", label: "PageSpeed score on the last four builds." },
  { v: 24, suffix: "h", pre: "", label: "Longest you wait on a reply during a build." },
  { v: 1, suffix: "", pre: "", label: "Person you talk to. Same person who writes it." },
];

function ResultTile({ item }) {
  const [ref, seen] = useInView();
  const n = useCountUp(item.v, seen);

  return (
    <div ref={ref} className="border-t border-hairline pt-6">
      <span className="display block text-big tabular-nums">
        {item.pre}
        {Math.round(n)}
        {item.suffix}
      </span>
      <p className="mt-3 max-w-[24ch] text-sm leading-snug text-graphite">{item.label}</p>
    </div>
  );
}

export function Results() {
  return (
    <section id="results" className="border-t border-hairline px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <p className="eyebrow reveal">The numbers</p>
        <h2 className="display reveal mt-6 max-w-[18ch] text-big">
          What you actually get for the money.
        </h2>

        <div className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {RESULTS.map((r) => (
            <ResultTile key={r.label} item={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
