import { ChevronDown } from "lucide-react";
import { useScramble, useInView, useMagnetic } from "../lib/motion.js";
import { BlurText } from "./ui/blur-text.jsx";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* Asymmetric editorial grid. Outline type on one word, a media plate  */
/* sitting inline inside the headline, metadata rail up top, offset    */
/* lower band. Nothing is centered.                                    */
/* ------------------------------------------------------------------ */
export function Hero({ ready }) {
  const [ref, seen] = useInView({ threshold: 0.05 });
  const tag = useScramble("INDEPENDENT STUDIO", seen);
  const cta = useMagnetic(0.3);

  let i = 0;
  const delay = () => `${(ready ? 0.05 : 1.1) + 0.07 * i++}s`;

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-24 md:pt-28">
      <div className="flex items-start justify-between px-5 md:px-8">
        <p className="eyebrow">
          Fredericksburg VA
          <span className="mx-2 text-accent">/</span>
          Est. 2025
        </p>
        <p className="eyebrow hidden tabular-nums md:block">{tag}</p>
      </div>

      <div className="rule mt-5 mb-10 md:mb-14" />

      <h1 className="display px-5 text-mega md:px-8">
        <span className="line-mask block">
          <span className="line-inner block" style={{ animationDelay: delay() }}>
            EVERYONE
          </span>
        </span>

        <span className="line-mask block">
          <span
            className="line-inner block whitespace-nowrap"
            style={{ animationDelay: delay() }}
          >
            USES THE <span className="stroke-type">SAME</span>
          </span>
        </span>

        <span className="flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
          <span className="line-mask block">
            <span className="line-inner block" style={{ animationDelay: delay() }}>
              TEMPLATE.
            </span>
          </span>

          {/* Drop a looping video or a work still in here */}
          <span
            className="reveal mb-[0.16em] hidden aspect-[16/9] flex-1 bg-ink-soft md:block"
            aria-hidden="true"
          />
        </span>

        <span className="line-mask block">
          <span
            className="line-inner block text-accent"
            style={{ animationDelay: delay() }}
          >
            YOU WON'T.
          </span>
        </span>
      </h1>

      <div className="mt-14 grid gap-8 border-t border-hairline px-5 pt-8 md:mt-20 md:grid-cols-12 md:px-8">
        <div className="md:col-span-3">
          <p className="eyebrow">01 / The pitch</p>
        </div>

        <BlurText
          as="p"
          text="I write every line of every site by hand. No page builders, no recycled themes, no monthly platform fee. Most builds go live in about a week."
          animateBy="words"
          delay={22}
          className="max-w-lg text-lg leading-snug md:col-span-5 md:text-xl"
        />

        <div className="md:col-span-3 md:col-start-10 md:justify-self-end">
          <a
            ref={cta}
            href="#quote"
            data-cursor="TALK"
            className="inline-flex items-center gap-4 rounded-full bg-ink py-3 pr-3 pl-8 text-paper transition-colors hover:bg-accent hover:text-accent-ink"
          >
            <span className="font-medium">Book a call</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-paper/15">
              &rarr;
            </span>
          </a>
        </div>
      </div>

      <a
        href="#work"
        aria-label="Scroll to work"
        className="mx-auto mt-14 flex w-fit items-center gap-2 text-graphite transition-colors hover:text-accent md:mt-16"
      >
        <span className="font-mono text-[0.625rem] tracking-[0.16em] uppercase">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 motion-safe:animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Claims marquee — inverted band so it cuts the page                  */
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
    <div className="mt-16 overflow-hidden bg-ink py-4 md:mt-24">
      <div className="marquee-track">
        {strip.map((c, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-8 pr-8 font-mono text-[0.6875rem] tracking-[0.16em] whitespace-nowrap text-paper/70 uppercase"
          >
            {c}
            <span className="text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Statement — sticky section label, offset column, two column body    */
/* ------------------------------------------------------------------ */
export function Statement() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-40">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3">
          <p className="eyebrow md:sticky md:top-28">02 / Why it matters</p>
        </div>

        <div className="md:col-span-8 md:col-start-5">
          <BlurText
            as="h2"
            text="A template costs the person selling it nothing, and it shows."
            animateBy="words"
            delay={45}
            className="display text-big"
          />

          <div className="rule my-10" />

          <div className="grid gap-8 md:grid-cols-2">
            <p className="reveal text-lg leading-snug text-graphite">
              Your competitor down the road bought the same one. Same hero, same
              three cards, same stock photo of a handshake.
            </p>
            <p className="reveal text-lg leading-snug">
              Custom is the only thing they cannot copy off a shelf.{" "}
              <span className="text-accent">That is the entire argument.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
