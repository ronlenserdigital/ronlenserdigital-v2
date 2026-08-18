import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { reduced } from "../lib/motion.js";
import { BlurText } from "./ui/blur-text.jsx";
import { AsciiCanvas } from "./ui/ascii-canvas.jsx";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/*                                                                     */
/* Adapted from the 21st.dev portfolio-hero: two stacked name lines,    */
/* portrait masked into a tall oval between them, blur reveal, scroll   */
/* cue. Kept the Fira Code face.                                        */
/*                                                                     */
/* Changed: colour is #ECC6AF, sampled from Ron's own skin highlight    */
/* in the photo, not the original acid lime. No .dark toggle, no third  */
/* nav, no stock headshot. Added a CTA and a scroll animation.          */
/* ------------------------------------------------------------------ */

/** 0..1 as the hero scrolls out of view. */
function useHeroScroll(ref) {
  const [p, setP] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (reduced()) return;
    const tick = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setP(Math.min(1, Math.max(0, -r.top / (r.height * 0.9))));
      });
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, [ref]);

  return p;
}

const LINKS = [
  ["Work", "#work"],
  ["Process", "#process"],
  ["Pricing", "#pricing"],
  ["Quote", "#quote"],
];

export function Hero() {
  const ref = useRef(null);
  const p = useHeroScroll(ref);

  // scroll choreography: the two name lines slide apart, the portrait
  // grows through the gap, the whole block lifts and fades out
  const split = p * 16;
  const portraitScale = 1 + p * 1.6;
  const lift = p * -70;
  const fade = 1 - p * 1.15;

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-5 pt-4 pb-8 md:px-8"
    >
      {/* pill nav */}
      <nav className="z-30 flex w-fit items-center gap-1 rounded-full border border-hairline bg-ink-soft/70 p-1.5 backdrop-blur-md">
        <span
          aria-hidden="true"
          className="grid h-8 w-8 place-items-center rounded-full bg-signal font-mono text-[0.625rem] font-medium text-ink"
        >
          R
        </span>
        {LINKS.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="rounded-full px-3.5 py-1.5 text-sm text-graphite transition-colors hover:bg-ink hover:text-paper"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* name + portrait */}
      <div
        className="relative flex flex-col items-center will-change-transform"
        style={{ transform: `translateY(${lift}px)`, opacity: Math.max(0, fade) }}
      >
        <BlurText
          as="h1"
          text="RON"
          animateBy="letters"
          delay={90}
          className="font-name justify-center text-[clamp(4.5rem,17vw,13rem)] leading-[0.78] font-bold tracking-tighter text-signal"
          style={{ transform: `translateX(${-split}%)` }}
        />
        <BlurText
          as="span"
          text="LENSER"
          animateBy="letters"
          delay={90}
          className="font-name justify-center text-[clamp(4.5rem,17vw,13rem)] leading-[0.78] font-bold tracking-tighter text-signal"
          style={{ transform: `translateX(${split}%)` }}
        />

        {/* portrait, masked into a tall oval, sitting between the lines */}
        <div
          className="group absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{ transform: `translate(-50%,-50%) scale(${portraitScale})` }}
          data-cursor="RON"
        >
          <div className="h-[112px] w-[66px] overflow-hidden rounded-full bg-ink-soft shadow-2xl shadow-black/60 transition-transform duration-500 group-hover:scale-110 sm:h-[154px] sm:w-[92px] md:h-[188px] md:w-[112px] lg:h-[222px] lg:w-[132px]">
            <img
              src="/ron-portrait.jpg"
              alt="Ron Lenser"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* tagline, CTA, scroll cue */}
      <div
        className="flex flex-col items-center gap-7"
        style={{ opacity: Math.max(0, 1 - p * 1.6) }}
      >
        <BlurText
          as="p"
          text="Custom websites, local SEO, and AI that answers the phone."
          animateBy="words"
          delay={90}
          className="font-tagline max-w-[44ch] justify-center text-center text-lg text-graphite md:text-xl"
        />

        <a
          href="#quote"
          data-cursor="TALK"
          className="inline-flex items-center gap-4 rounded-full bg-signal py-3 pr-3 pl-8 text-ink transition-transform hover:scale-[1.03]"
        >
          <span className="font-medium">Book a call</span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ink/15">
            &rarr;
          </span>
        </a>

        <a
          href="#work"
          aria-label="Scroll to work"
          className="text-graphite transition-colors hover:text-paper"
        >
          <ChevronDown className="h-6 w-6 motion-safe:animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ASCII break — the character grid, kept as its own full bleed band   */
/* ------------------------------------------------------------------ */
export function AsciiBreak() {
  return (
    <section className="relative h-[85vh] overflow-hidden border-y border-hairline">
      <AsciiCanvas src="/ron.jpg" cols={210} className="absolute inset-0 h-full w-full" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{ background: "linear-gradient(to top, #000 22%, transparent 100%)" }}
      />
      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-12 md:px-8 md:pb-16">
        <p className="eyebrow">One person, start to finish</p>
        <h2 className="display mt-4 max-w-[18ch] text-mid md:text-big">
          You get me. Not a queue, not an account manager.
        </h2>
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
    <div className="overflow-hidden border-b border-hairline py-4">
      <div className="marquee-track">
        {strip.map((c, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-8 pr-8 font-mono text-[0.6875rem] tracking-[0.16em] whitespace-nowrap text-graphite uppercase"
          >
            {c}
            <span className="text-signal">/</span>
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
    <section className="px-5 py-24 md:px-8 md:py-40">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3">
          <p className="eyebrow md:sticky md:top-28">
            01 <span className="mx-1 text-signal">/</span> Why it matters
          </p>
        </div>

        <div className="md:col-span-8 md:col-start-5">
          <h2 className="display text-mega">
            <span className="line-mask block">
              <span className="line-inner block">Everyone uses</span>
            </span>
            <span className="line-mask block">
              <span className="line-inner block">
                the <span className="stroke-type">same</span> template.
              </span>
            </span>
            <span className="line-mask block">
              <span className="line-inner block text-signal">You won't.</span>
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
              <span className="text-signal">That is the entire argument.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
