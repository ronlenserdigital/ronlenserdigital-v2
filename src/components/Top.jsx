import { useScramble, useInView, useMagnetic } from "../lib/motion.js";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
const LINES = [
  { text: "Everyone else", accent: false },
  { text: "uses the same", accent: false },
  { text: "template.", accent: false },
  { text: "You won't.", accent: true },
];

export function Hero({ ready }) {
  const [ref, seen] = useInView({ threshold: 0.1 });
  const tag = useScramble("Independent studio", seen);
  const cta = useMagnetic(0.3);

  let wordIndex = 0;

  return (
    <section id="top" ref={ref} className="px-6 pt-28 pb-16 md:px-10 md:pt-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-baseline justify-between">
          <p className="eyebrow">Custom websites since 2025</p>
          <p className="eyebrow hidden tabular-nums md:block">{tag}</p>
        </div>

        <div className="rule my-6" />

        <h1 className="display text-mega">
          {LINES.map((line) => (
            <span className="block" key={line.text}>
              <span className={line.accent ? "block text-cobalt" : "block"}>
                {line.text.split(" ").map((w) => {
                  const d = 0.06 * wordIndex++;
                  return (
                    <span className="line-mask inline-block align-top" key={w + d}>
                      <span
                        className="line-inner inline-block pr-[0.22em]"
                        style={{ animationDelay: `${(ready ? 0.05 : 1.1) + d}s` }}
                      >
                        {w}
                      </span>
                    </span>
                  );
                })}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-end">
          <div className="reveal md:col-span-4">
            <a
              ref={cta}
              href="#contact"
              data-cursor="TALK"
              className="inline-flex items-center gap-4 rounded-full bg-ink py-3 pr-3 pl-8 text-paper transition-colors hover:bg-cobalt"
            >
              <span className="font-medium">Book a call</span>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-paper/15">
                &rarr;
              </span>
            </a>
          </div>

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
/* Claims marquee                                                      */
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
    <div className="overflow-hidden border-y border-hairline py-4">
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

/* ------------------------------------------------------------------ */
/* Statement                                                           */
/* ------------------------------------------------------------------ */
export function Statement() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px] md:grid md:grid-cols-12 md:gap-8">
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
