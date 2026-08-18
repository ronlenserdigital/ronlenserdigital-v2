import { useState } from "react";
import { useMagnetic } from "../lib/motion.js";

/* ------------------------------------------------------------------ */
/* Testimonials — carousel with counter                                */
/* REPLACE THESE WITH REAL QUOTES BEFORE LAUNCH.                       */
/* ------------------------------------------------------------------ */
const QUOTES = [
  {
    body: "Placeholder. Swap for a real quote before this goes live.",
    name: "Client name",
    role: "Owner, Business — Fredericksburg, VA",
  },
  {
    body: "Placeholder. Swap for a real quote before this goes live.",
    name: "Client name",
    role: "Owner, Business — Stafford, VA",
  },
  {
    body: "Placeholder. Swap for a real quote before this goes live.",
    name: "Client name",
    role: "Owner, Business — Spotsylvania, VA",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const q = QUOTES[i];
  const go = (d) => setI((v) => (v + d + QUOTES.length) % QUOTES.length);

  return (
    <section className="border-t border-hairline px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-baseline justify-between">
          <p className="eyebrow">What clients say</p>
          <p className="eyebrow tabular-nums">
            {String(i + 1).padStart(2, "0")} / {String(QUOTES.length).padStart(2, "0")}
          </p>
        </div>

        <div className="rule mt-6 mb-10" />

        <blockquote key={i} className="reveal is-in">
          <p className="display max-w-[22ch] text-big">{q.body}</p>
          <footer className="mt-10 flex items-end justify-between">
            <div>
              <p className="font-medium">{q.name}</p>
              <p className="mt-1 text-sm text-graphite">{q.role}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous quote"
                className="grid h-12 w-12 place-items-center rounded-full border border-hairline transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                &larr;
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next quote"
                className="grid h-12 w-12 place-items-center rounded-full border border-hairline transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                &rarr;
              </button>
            </div>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Client logo marquee                                                 */
/* ------------------------------------------------------------------ */
const CLIENTS = [
  "Abbots Lane",
  "Casablanca House",
  "Riverbend Co.",
  "Northside Trades",
  "Falmouth Auto",
  "Rappahannock Supply",
];

export function Clients() {
  const strip = [...CLIENTS, ...CLIENTS, ...CLIENTS];
  return (
    <section className="overflow-hidden border-t border-hairline py-14">
      <p className="eyebrow mb-8 px-6 md:px-10">Recent clients</p>
      <div className="marquee-track">
        {strip.map((c, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-14 pr-14 font-display text-2xl whitespace-nowrap text-graphite"
          >
            {c}
          </span>
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
    <section id="pricing" className="border-t border-hairline px-6 py-24 md:px-10 md:py-36">
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
/* Contact card — a named human, not a form                            */
/* ------------------------------------------------------------------ */
export function ContactCard() {
  return (
    <section className="border-t border-hairline px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1600px] items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          {/* Drop a real headshot at /public/ron.jpg */}
          <div className="aspect-[4/5] w-full max-w-[260px] bg-paper-deep">
            <div className="grid h-full place-items-center">
              <span className="eyebrow">Photo of Ron</span>
            </div>
          </div>
          <p className="mt-4 font-medium">Ron Lenser</p>
          <p className="text-sm text-graphite">Founder. The one who writes it.</p>
        </div>

        <div className="md:col-span-8 md:col-start-5">
          <p className="eyebrow reveal">Want to talk about a project?</p>
          <h2 className="display reveal mt-6 text-mid">
            Call me and tell me what your business does. If a custom site is not
            the right move for you, I will say so on that call.
          </h2>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Closing CTA + footer                                                */
/* ------------------------------------------------------------------ */
const ROUTES = [
  ["Get a quote", "tel:+15403956493", "QUOTE"],
  ["See the work", "#work", "WORK"],
  ["Just say hello", "mailto:ron@ronlenserdigital.com", "HELLO"],
];

export function Closing() {
  const cta = useMagnetic(0.22);

  return (
    <section id="contact" className="bg-ink px-6 py-24 text-paper md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="display reveal text-mega">
          Let's build
          <br />
          <span className="text-cobalt">something good.</span>
        </h2>

        <div className="mt-16 grid gap-px border-t border-paper/15 md:grid-cols-3">
          {ROUTES.map(([label, href, cur], i) => (
            <a
              key={label}
              ref={i === 0 ? cta : undefined}
              href={href}
              data-cursor={cur}
              className="group flex items-center justify-between border-b border-paper/15 py-8 pr-4 transition-colors hover:text-cobalt md:border-b-0 md:px-6 md:py-10"
            >
              <span className="font-display text-2xl">{label}</span>
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
          ))}
        </div>

        <div className="mt-20 grid gap-8 border-t border-paper/15 pt-10 md:grid-cols-3">
          <div>
            <span className="eyebrow !text-paper/45">Phone</span>
            <a
              href="tel:+15403956493"
              className="mt-2 block font-display text-2xl hover:text-cobalt"
            >
              (540) 395-6493
            </a>
          </div>
          <div>
            <span className="eyebrow !text-paper/45">Email</span>
            <a
              href="mailto:ron@ronlenserdigital.com"
              className="mt-2 block font-display text-2xl break-all hover:text-cobalt"
            >
              ron@ronlenserdigital.com
            </a>
          </div>
          <div>
            <span className="eyebrow !text-paper/45">Studio</span>
            <span className="mt-2 block font-display text-2xl">Fredericksburg, VA</span>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-paper/15 pt-8 text-sm text-paper/40 md:flex-row md:justify-between">
          <span>Ron Lenser Digital</span>
          <span>&copy; {new Date().getFullYear()}. Written by hand.</span>
        </div>
      </div>
    </section>
  );
}
