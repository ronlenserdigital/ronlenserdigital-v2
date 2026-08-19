import { useInView, useCountUp } from "../lib/motion.js";

/* Shared shell. The old version reserved a narrow left column for a numbered
   label; with the numbers gone that column was dead space, so sections are
   now a centred header over full width content. */
export function Section({ id, eyebrow, title, intro, children, className = "" }) {
  return (
    <section
      id={id}
      className={`border-t border-hairline px-5 py-20 md:px-8 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || intro) && (
          <div className="mx-auto mb-14 max-w-3xl text-center">
            {eyebrow && <p className="eyebrow reveal">{eyebrow}</p>}
            {title && (
              <h2 className="display reveal mt-4 text-big">{title}</h2>
            )}
            {intro && (
              <p className="reveal mx-auto mt-5 max-w-[54ch] text-lg text-graphite">
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Results — count-up, uneven grid                                     */
/* ------------------------------------------------------------------ */
const RESULTS = [
  { v: 7, suffix: "", pre: "", label: "Days from signed quote to shipped, typical." },
  { v: 1, suffix: "", pre: "", label: "Person you talk to. Same one who builds it." },
  { v: 0, suffix: "", pre: "", label: "Monthly fees to me for the build. You own it outright." },
  { v: 24, suffix: "h", pre: "", label: "Longest you wait on a reply during a build." },
  { v: 100, suffix: "%", pre: "", label: "Yours at hand off. Repo, accounts, domain, all of it." },
  { v: 0, suffix: "", pre: "", label: "Meetings you sit through that could have been a text." },
];

function ResultTile({ item }) {
  const [ref, seen] = useInView();
  const n = useCountUp(item.v, seen);

  return (
    <div ref={ref} className="bg-ink p-8 transition-colors hover:bg-ink-soft md:p-10">
      <span className="display block text-big tabular-nums">
        {item.pre}
        {Math.round(n)}
        {item.suffix}
      </span>
      <p className="mt-3 text-sm leading-snug text-graphite">{item.label}</p>
    </div>
  );
}

export function Results() {
  return (
    <Section
      id="results"
      title="What you actually get for the money."
      intro="No retainers, no platform fees, no waiting three weeks for a reply."
    >
      <div className="grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {RESULTS.map((r) => (
          <ResultTile key={r.label} item={r} />
        ))}
      </div>
    </Section>
  );
}
