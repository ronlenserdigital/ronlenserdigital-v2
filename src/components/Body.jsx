import { useRef } from "react";
import { useScrollProgress } from "../hooks.js";

/* ------------------------------------------------------------------ */
/* Statement                                                           */
/* ------------------------------------------------------------------ */
export function Statement() {
  return (
    <section className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px] md:grid md:grid-cols-12">
        <p className="eyebrow reveal md:col-span-3">Why it matters</p>
        <h2 className="display reveal text-big md:col-span-9">
          A template costs the person selling it nothing, and it shows. Your
          competitor down the road is running the same one.{" "}
          <span className="text-cobalt">
            Custom is the only thing they cannot copy.
          </span>
        </h2>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Work — pinned horizontal filmstrip. The signature moment.           */
/* ------------------------------------------------------------------ */
const PROJECTS = [
  { n: "01", name: "Abbots Lane", type: "Custom website", year: "2026" },
  { n: "02", name: "Casablanca House", type: "Website and local SEO", year: "2026" },
  { n: "03", name: "Riverbend Co.", type: "Brand and website", year: "2025" },
  { n: "04", name: "Northside Trades", type: "Website and AI receptionist", year: "2025" },
];

export function Work() {
  const track = useRef(null);
  const p = useScrollProgress(track);
  const shift = p * 62;

  return (
    <section id="work" ref={track} className="relative h-[340vh] bg-ink">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="flex items-baseline justify-between px-6 pb-8 md:px-10">
          <p className="eyebrow !text-paper/50">Selected work</p>
          <p className="eyebrow !text-paper/50">
            {String(Math.min(PROJECTS.length, Math.floor(p * PROJECTS.length) + 1)).padStart(2, "0")}
            {" / "}
            {String(PROJECTS.length).padStart(2, "0")}
          </p>
        </div>

        <div
          className="flex gap-6 px-6 will-change-transform md:gap-10 md:px-10"
          style={{ transform: `translate3d(-${shift}%, 0, 0)` }}
        >
          {PROJECTS.map((proj) => (
            <article
              key={proj.n}
              data-cursor="VIEW"
              className="group w-[78vw] shrink-0 md:w-[46vw]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-soft">
                {/* Replace with <img> or <video> per project */}
                <div className="absolute inset-0 grid place-items-center">
                  <span className="eyebrow !text-paper/25">{proj.name}</span>
                </div>
                <div className="absolute inset-0 bg-cobalt opacity-0 mix-blend-color transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <div className="mt-5 flex items-baseline justify-between border-t border-paper/15 pt-4">
                <div>
                  <h3 className="font-display text-2xl text-paper">{proj.name}</h3>
                  <p className="mt-1 text-sm text-paper/45">{proj.type}</p>
                </div>
                <span className="eyebrow !text-paper/45">{proj.year}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 px-6 md:px-10">
          <div className="h-px w-full bg-paper/15">
            <div
              className="h-px bg-cobalt transition-none"
              style={{ width: `${Math.max(6, p * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process — numbered because it is an actual sequence                 */
/* ------------------------------------------------------------------ */
const STEPS = [
  ["01", "Call", "Fifteen minutes. I learn the business and what it needs to do.", "1 day"],
  ["02", "Quote", "Fixed price, fixed date, in writing. No hourly, no surprises.", "1 day"],
  ["03", "Build", "Written by hand. You see it live on a preview link every day.", "5 to 7 days"],
  ["04", "Launch", "Domain, forms, Google. You get the code and the keys.", "1 day"],
];

export function Process() {
  return (
    <section id="process" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <p className="eyebrow reveal">How a build runs</p>
        <div className="rule mt-6 mb-2" />

        {STEPS.map(([n, title, body, dur]) => (
          <div
            key={n}
            className="reveal group grid grid-cols-12 items-baseline gap-4 border-b border-hairline py-8 transition-colors hover:bg-paper-deep md:gap-8 md:py-10"
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
/* Pricing                                                             */
/* ------------------------------------------------------------------ */
const OFFERS = [
  {
    name: "Custom website",
    price: "$1,000",
    unit: "one time",
    body: "Everything written by hand and built around your business. Live in about a week. You own the code outright.",
    accent: true,
  },
  {
    name: "AI chatbot",
    price: "$49",
    unit: "per month",
    body: "Answers questions on your site and captures the lead while you are on a job.",
  },
  {
    name: "AI receptionist",
    price: "$99",
    unit: "per month",
    body: "Picks up the calls you miss, books the work, and texts you the details.",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-hairline px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <p className="eyebrow reveal">What it costs</p>

        <div className="mt-12 grid gap-px bg-hairline md:grid-cols-3">
          {OFFERS.map((o) => (
            <div
              key={o.name}
              className={`reveal flex flex-col justify-between gap-12 p-8 md:p-10 ${
                o.accent ? "bg-ink text-paper" : "bg-paper"
              }`}
            >
              <div>
                <h3 className="font-display text-2xl">{o.name}</h3>
                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    o.accent ? "text-paper/55" : "text-graphite"
                  }`}
                >
                  {o.body}
                </p>
              </div>
              <div className="flex items-baseline gap-3">
                <span className={`display text-big ${o.accent ? "text-cobalt" : ""}`}>
                  {o.price}
                </span>
                <span className={`eyebrow ${o.accent ? "!text-paper/50" : ""}`}>{o.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact + footer                                                    */
/* ------------------------------------------------------------------ */
export function Contact() {
  return (
    <section id="contact" className="bg-ink px-6 py-28 text-paper md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <p className="eyebrow reveal !text-paper/45">Next step</p>

        <h2 className="display reveal mt-6 text-mega">
          Let's talk about
          <br />
          <span className="text-cobalt">your build.</span>
        </h2>

        <div className="mt-16 grid gap-10 border-t border-paper/15 pt-10 md:grid-cols-3">
          <a
            href="tel:+15403956493"
            data-cursor="CALL"
            className="reveal group block"
          >
            <span className="eyebrow !text-paper/45">Phone</span>
            <span className="mt-2 block font-display text-3xl transition-colors group-hover:text-cobalt">
              (540) 395-6493
            </span>
          </a>

          <a
            href="mailto:ron@ronlenserdigital.com"
            data-cursor="EMAIL"
            className="reveal group block"
          >
            <span className="eyebrow !text-paper/45">Email</span>
            <span className="mt-2 block font-display text-3xl break-all transition-colors group-hover:text-cobalt">
              ron@ronlenserdigital.com
            </span>
          </a>

          <div className="reveal">
            <span className="eyebrow !text-paper/45">Studio</span>
            <span className="mt-2 block font-display text-3xl">
              Fredericksburg, VA
            </span>
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-4 border-t border-paper/15 pt-8 text-sm text-paper/40 md:flex-row md:justify-between">
          <span>Ron Lenser Digital</span>
          <span>&copy; {new Date().getFullYear()}. Written by hand.</span>
        </div>
      </div>
    </section>
  );
}
