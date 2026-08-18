import { AsciiCanvas } from "./ui/ascii-canvas.jsx";
import { BlurText } from "./ui/blur-text.jsx";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/*                                                                     */
/* Structure follows the reference: pill nav top left, character grid   */
/* filling the frame, headline anchored bottom left. The grid itself is */
/* ours (procedural metaballs through an ASCII ramp), not their asset.  */
/*                                                                     */
/* Swap the grid for real footage by passing src:                       */
/*   <AsciiCanvas src="/reel.mp4" />                                    */
/* ------------------------------------------------------------------ */

const LINKS = [
  ["Work", "#work"],
  ["Process", "#process"],
  ["Pricing", "#pricing"],
  ["Quote", "#quote"],
];

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden">
      {/* pill nav, top left */}
      <div className="absolute top-4 left-5 z-30 md:left-8">
        <nav className="flex items-center gap-1 rounded-full border border-hairline bg-ink-soft/70 p-1.5 backdrop-blur-md">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-full bg-accent font-mono text-[0.625rem] font-medium text-accent-ink"
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
      </div>

      {/* the grid */}
      {/* Drop a headshot at public/ron.jpg and it renders through the grid.
          Until then the procedural figure stands in. Any video works too:
          src="/reel.mp4" */}
      <AsciiCanvas
        src="/ron.jpg"
        cols={210}
        className="absolute inset-x-0 top-0 h-[74vh] w-full md:h-[78vh]"
      />

      {/* legibility scrim under the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/5"
        style={{ background: "linear-gradient(to top, #000 34%, transparent 100%)" }}
      />

      {/* headline, bottom left */}
      <div className="relative z-20 mt-auto px-5 pb-14 md:px-8 md:pb-16">
        <BlurText
          as="h1"
          text="Websites, apps, automations. Whatever the problem needs."
          animateBy="words"
          delay={40}
          className="display max-w-[18ch] text-mid leading-[1.05] md:text-big"
        />
        <BlurText
          as="p"
          text="One person with an AI stack, shipping in days what agencies quote in months. Fredericksburg, Virginia."
          animateBy="words"
          delay={18}
          className="mt-5 max-w-[42ch] text-graphite md:text-lg"
        />
      </div>

      {/* scroll dot, right edge */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-5 z-20 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-paper/70 md:right-8"
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Claims marquee                                                      */
/* ------------------------------------------------------------------ */
const CLAIMS = [
  "Built with AI",
  "Shipped in days",
  "You own the code",
  "No monthly lock in",
  "Websites, apps, automations",
  "Fredericksburg VA",
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
/* Statement                                                           */
/* ------------------------------------------------------------------ */
export function Statement() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-40">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3">
          <p className="eyebrow md:sticky md:top-28">
            01 <span className="mx-1 text-accent">/</span> Why it matters
          </p>
        </div>

        <div className="md:col-span-8 md:col-start-5">
          <h2 className="display text-mega">
            <span className="line-mask block">
              <span className="line-inner block">A shop of ten</span>
            </span>
            <span className="line-mask block">
              <span className="line-inner block">
                quotes <span className="stroke-type">months.</span>
              </span>
            </span>
            <span className="line-mask block">
              <span className="line-inner block text-accent">I quote days.</span>
            </span>
          </h2>

          <div className="rule my-10" />

          <div className="grid gap-8 md:grid-cols-2">
            <BlurText
              as="p"
              text="I build with AI. Claude, Claude Code, Grok, Vercel, Supabase. That is not a shortcut, it is the reason one person can do the work of a room."
              animateBy="words"
              delay={20}
              className="text-lg leading-snug text-graphite"
            />
            <p className="reveal text-lg leading-snug">
              You are not paying for hours. You are paying for the thing to
              exist and work.{" "}
              <span className="text-accent">That is the entire argument.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
