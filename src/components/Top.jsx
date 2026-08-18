import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useInView, useMagnetic } from "../lib/motion.js";
import { BlurText } from "./ui/blur-text.jsx";

/* ------------------------------------------------------------------ */
/* Hero — name led                                                     */
/*                                                                     */
/* Adapted from the 21st.dev portfolio-hero. Kept: the two stacked      */
/* name lines, the portrait sitting between them, the blur reveal, the  */
/* scroll cue. Dropped: the .dark toggle (this theme runs on tokens),   */
/* the third nav (header menu and section rail already exist), the      */
/* hardcoded acid lime, the stock headshot, and Fira Code / Antic.      */
/* Added: a CTA, because a hero on a lead-gen site needs one.           */
/* ------------------------------------------------------------------ */

function Portrait() {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="group absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
      data-cursor="RON"
    >
      <div className="h-[110px] w-[66px] overflow-hidden rounded-full bg-paper-deep shadow-2xl shadow-ink/30 transition-transform duration-500 group-hover:scale-110 sm:h-[152px] sm:w-[92px] md:h-[188px] md:w-[112px] lg:h-[222px] lg:w-[132px]">
        {failed ? (
          <div className="grid h-full place-items-center px-2 text-center">
            <span className="font-mono text-[0.5rem] leading-tight tracking-[0.1em] text-graphite uppercase">
              Add
              <br />
              /public
              <br />
              /ron.jpg
            </span>
          </div>
        ) : (
          <img
            src="/ron.jpg"
            alt="Ron Lenser"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

export function Hero({ ready }) {
  const [ref] = useInView({ threshold: 0.05 });
  const cta = useMagnetic(0.3);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-5 pt-40 pb-10 md:px-8 md:pt-48"
    >
      {/* the name */}
      <div className="relative py-10 text-center">
        <h1 className="font-name leading-[0.75] font-bold tracking-tighter uppercase">
          <span className="line-mask block">
            <span
              className="line-inner block text-[clamp(3.4rem,15vw,11rem)]"
              style={{ animationDelay: ready ? "0.05s" : "1.1s" }}
            >
              Ron
            </span>
          </span>
          <span className="line-mask block">
            <span
              className="line-inner block text-[clamp(3.4rem,15vw,11rem)]"
              style={{ animationDelay: ready ? "0.16s" : "1.21s" }}
            >
              Lenser
            </span>
          </span>
        </h1>

        <Portrait />
      </div>

      {/* tagline + CTA */}
      <div className="flex flex-col items-center gap-8">
        <BlurText
          as="p"
          text="Custom websites, written line by line, for businesses that are tired of looking like everyone else."
          animateBy="words"
          delay={26}
          className="font-tagline max-w-[46ch] justify-center text-center text-lg leading-snug text-graphite md:text-xl"
        />

        <a
          ref={cta}
          href="#quote"
          data-cursor="TALK"
          className="inline-flex items-center gap-4 rounded-full bg-ink py-3 pr-3 pl-8 text-ink transition-colors hover:bg-graphite"
        >
          <span className="font-medium">Book a call</span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ink/10">
            &rarr;
          </span>
        </a>

        <a
          href="#work"
          aria-label="Scroll to work"
          className="flex items-center gap-2 text-graphite transition-colors hover:text-accent"
        >
          <span className="font-mono text-[0.625rem] tracking-[0.16em] uppercase">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4 motion-safe:animate-bounce" aria-hidden="true" />
        </a>
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
            className="flex shrink-0 items-center gap-8 pr-8 font-mono text-[0.6875rem] tracking-[0.16em] whitespace-nowrap text-graphite uppercase"
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
/* Statement — the pitch that used to be the hero headline             */
/* ------------------------------------------------------------------ */
export function Statement() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-40">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3">
          <p className="eyebrow md:sticky md:top-28">
            02 <span className="mx-1 text-accent">/</span> Why it matters
          </p>
        </div>

        <div className="md:col-span-8 md:col-start-5">
          <h2 className="display text-big">
            <span className="line-mask block">
              <span className="line-inner block">Everyone uses the</span>
            </span>
            <span className="line-mask block">
              <span className="line-inner block">
                same template. <span className="text-graphite">You won't.</span>
              </span>
            </span>
          </h2>

          <div className="rule my-10" />

          <div className="grid gap-8 md:grid-cols-2">
            <BlurText
              as="p"
              text="A template costs the person selling it nothing, and it shows. Your competitor down the road bought the same one."
              animateBy="words"
              delay={20}
              className="text-lg leading-snug text-graphite"
            />
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
