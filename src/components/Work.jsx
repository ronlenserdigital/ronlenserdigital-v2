import { useInView, useCountUp } from "../lib/motion.js";

/* Shared shell: sticky numbered label in a narrow left column, content offset
   right. Consistent with the hero and statement, so the whole page reads off
   one grid instead of a stack of full width blocks. */
export function Section({ id, num, label, children, className = "", bare }) {
  return (
    <section
      id={id}
      className={`border-t border-hairline px-5 py-20 md:px-8 md:py-32 ${className}`}
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3">
          <p className="eyebrow md:sticky md:top-28">
            {num} <span className="mx-1 text-accent">/</span> {label}
          </p>
        </div>
        <div className={bare ? "md:col-span-12" : "md:col-span-8 md:col-start-5"}>
          {children}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Capabilities — staggered columns, not an even four up               */
/* ------------------------------------------------------------------ */
const CAPS = [
  ["Websites", ["Custom marketing sites", "Landing pages", "Multi location pages", "Booking and quote flows", "Rebuilds and rescues", "Speed and Core Web Vitals"]],
  ["Found on Google", ["Local SEO setup", "Google Business Profile", "Service area pages", "Schema markup", "Review generation", "Rank tracking"]],
  ["Answering", ["AI chatbot on site", "AI phone receptionist", "Missed call text back", "Lead routing to your phone", "After hours coverage", "Booking handoff"]],
  ["Brand", ["Logo and marks", "Type and color systems", "Vehicle and signage art", "Print and business cards", "Photo direction", "Social templates"]],
];

export function Capabilities() {
  return (
    <Section id="capabilities" num="02" label="What I do">
      <h2 className="display reveal max-w-[18ch] text-big">
        Not a website guy. A build guy.
      </h2>

      <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
        {CAPS.map(([title, items], i) => (
          <div key={title} className="reveal" style={{ marginTop: i % 2 ? "2.5rem" : 0 }}>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[0.625rem] tracking-[0.14em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display text-xl">{title}</h3>
            </div>
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
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */
const STEPS = [
  ["01", "Call", "Fifteen minutes. Tell me the problem, not the solution you think you need.", "1 day"],
  ["02", "Quote", "Fixed price, fixed date, in writing. No hourly, no surprises.", "1 day"],
  ["03", "Build", "You get a live preview link on day one and watch it fill in.", "3 to 10 days"],
  ["04", "Hand off", "Deployed, connected, documented. The repo and the accounts are yours.", "1 day"],
];

export function Process() {
  return (
    <Section id="process" num="03" label="How a build runs" bare>
      <div className="border-t border-hairline">
        {STEPS.map(([n, title, body, dur]) => (
          <div
            key={n}
            className="reveal group grid grid-cols-12 items-baseline gap-4 border-b border-hairline py-8 transition-colors hover:bg-ink-soft md:gap-8 md:py-12"
          >
            <span className="col-span-2 font-mono text-[0.625rem] tracking-[0.14em] text-accent md:col-span-1">
              {n}
            </span>
            <h3 className="display col-span-10 text-mid md:col-span-3">{title}</h3>
            <p className="col-span-12 leading-snug text-graphite md:col-span-6 md:text-lg">
              {body}
            </p>
            <span className="eyebrow col-span-12 md:col-span-2 md:text-right">{dur}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Results — count-up, uneven grid                                     */
/* ------------------------------------------------------------------ */
const RESULTS = [
  { v: 7, suffix: "", pre: "", label: "Days from signed quote to shipped, typical." },
  { v: 1, suffix: "", pre: "", label: "Person you talk to. Same one who builds it." },
  { v: 0, suffix: "", pre: "$", label: "Monthly platform fee. No lock in, no rented software." },
  { v: 24, suffix: "h", pre: "", label: "Longest you wait on a reply during a build." },
  { v: 100, suffix: "%", pre: "", label: "Yours at hand off. Repo, accounts, domain, all of it." },
  { v: 0, suffix: "", pre: "", label: "Meetings you sit through that could have been a text." },
];

function ResultTile({ item, i }) {
  const [ref, seen] = useInView();
  const n = useCountUp(item.v, seen);

  return (
    <div
      ref={ref}
      className="border-t border-hairline pt-6"
      style={{ marginTop: i % 3 === 1 ? "2rem" : 0 }}
    >
      <span className="display block text-big tabular-nums">
        {item.pre}
        {Math.round(n)}
        <span className="text-accent">{item.suffix}</span>
      </span>
      <p className="mt-3 max-w-[24ch] text-sm leading-snug text-graphite">{item.label}</p>
    </div>
  );
}

export function Results() {
  return (
    <Section id="results" num="04" label="The numbers" bare>
      <h2 className="display reveal max-w-[18ch] text-big">
        What you actually get for the money.
      </h2>
      <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {RESULTS.map((r, i) => (
          <ResultTile key={r.label} item={r} i={i} />
        ))}
      </div>
    </Section>
  );
}
