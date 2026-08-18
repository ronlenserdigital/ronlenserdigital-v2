import { useState } from "react";
import { useMagnetic } from "../lib/motion.js";
import { Section } from "./Work.jsx";

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
    <Section num="07" label="What clients say">
      <div className="flex justify-end">
        <p className="eyebrow tabular-nums">
          {String(i + 1).padStart(2, "0")} / {String(QUOTES.length).padStart(2, "0")}
        </p>
      </div>

      <div className="rule mt-4 mb-10" />

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
                className="grid h-12 w-12 place-items-center rounded-full border border-hairline transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              >
                &larr;
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next quote"
                className="grid h-12 w-12 place-items-center rounded-full border border-hairline transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              >
                &rarr;
              </button>
            </div>
          </footer>
      </blockquote>
    </Section>
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
      <p className="eyebrow mb-8 px-5 !text-graphite md:px-8">Recent clients</p>
      <div className="marquee-track">
        {strip.map((c, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-14 pr-14 font-display text-3xl whitespace-nowrap text-graphite"
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
    name: "Website",
    price: "$1,000",
    unit: "one time",
    body: "Built around your business, not a theme. Live in about a week. Repo, domain and accounts are yours at hand off.",
    accent: true,
  },
  {
    name: "Custom build",
    price: "Quoted",
    unit: "per project",
    body: "Apps, portals, dashboards, internal tools, automations. Tell me the problem and I will price the fix, fixed, in writing.",
  },
  {
    name: "AI answering",
    price: "$49",
    unit: "per month",
    body: "Chat on your site from $49. Phone answering that books the job from $99. Both catch what you miss.",
  },
];

export function Pricing() {
  return (
    <Section id="pricing" num="08" label="What it costs" bare>
      <h2 className="display reveal max-w-[16ch] text-big">One price. Written down. Before I start.</h2>

      <div className="mt-14 grid gap-px bg-hairline md:grid-cols-3">
          {OFFERS.map((o) => (
            <div
              key={o.name}
              className={`reveal flex flex-col justify-between gap-12 p-8 md:p-10 ${
                o.accent ? "bg-transparent text-paper" : "bg-ink"
              }`}
            >
              <div>
                <h3 className="font-display text-2xl">{o.name}</h3>
                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    o.accent ? "text-graphite" : "text-graphite"
                  }`}
                >
                  {o.body}
                </p>
              </div>
              <div className="flex items-baseline gap-3">
                <span className={`display text-big ${o.accent ? "text-accent" : ""}`}>
                  {o.price}
                </span>
                <span className={`eyebrow ${o.accent ? "!text-graphite" : ""}`}>{o.unit}</span>
              </div>
            </div>
          ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact card — a named human, not a form                            */
/* ------------------------------------------------------------------ */
export function ContactCard() {
  return (
    <section className="border-t border-hairline px-5 py-20 md:px-8 md:py-32">
      <div className="grid items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          {/* Drop a real headshot at /public/ron.jpg */}
          <div className="aspect-[4/5] w-full max-w-[260px] border border-hairline bg-ink-soft">
            <div className="grid h-full place-items-center">
              <span className="eyebrow">Photo of Ron</span>
            </div>
          </div>
          <p className="mt-4 font-medium">Ron Lenser</p>
          <p className="text-sm text-graphite">Founder. The one who builds it.</p>
        </div>

        <div className="md:col-span-8 md:col-start-5">
          <p className="eyebrow reveal">09 <span className="mx-1 text-accent">/</span> Want to talk?</p>
          <h2 className="display reveal mt-6 text-mid">
            Call me and tell me what is actually slowing the business down. If
            software is not the answer, I will say so on that call.
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
    <section id="contact" className="px-5 py-24 md:px-8 md:py-36">
      <div>
        <h2 className="display reveal text-mega">
          Let's build
          <br />
          <span className="text-accent">something good.</span>
        </h2>

        <div className="mt-16 grid gap-px border-t border-hairline md:grid-cols-3">
          {ROUTES.map(([label, href, cur], i) => (
            <a
              key={label}
              ref={i === 0 ? cta : undefined}
              href={href}
              data-cursor={cur}
              className="group flex items-center justify-between border-b border-hairline py-8 pr-4 transition-colors hover:text-accent md:border-b-0 md:px-6 md:py-10"
            >
              <span className="font-display text-2xl">{label}</span>
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
