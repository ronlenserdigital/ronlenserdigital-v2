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
    <Section id="results" num="03" label="The numbers" bare>
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
