import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AsciiCanvas } from "./ui/ascii-canvas.jsx";
import { BlurText } from "./ui/blur-text.jsx";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/*                                                                     */
/* Adapted from the 21st.dev hero-section-9. Changes:                   */
/*   - <a> instead of next/link, and plain anchors instead of the       */
/*     shadcn Button, which wanted radix slot + cva for a link          */
/*   - our tokens instead of bg-white with dark: variants               */
/*   - the tilted screenshot is not an image. It is a browser frame     */
/*     rendering this site, so there is no asset to keep in sync with   */
/*     the real page.                                                   */
/* ------------------------------------------------------------------ */

const MENU = [
  ["What I do", "#capabilities"],
  ["Process", "#process"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
];

export function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <header>
        <nav className="fixed inset-x-0 top-0 z-30 border-b border-hairline bg-ink/70 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 py-3">
              <div className="flex w-full items-center justify-between lg:w-auto">
                <a href="#top" aria-label="Home" className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="grid h-7 w-7 place-items-center rounded-md bg-paper font-mono text-[0.6875rem] font-semibold text-ink"
                  >
                    R
                  </span>
                  <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase">
                    Ron Lenser Digital
                  </span>
                </a>

                <button
                  onClick={() => setOpen(!open)}
                  aria-expanded={open}
                  aria-label={open ? "Close menu" : "Open menu"}
                  className="-mr-2 p-2 lg:hidden"
                >
                  {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>
              </div>

              <div
                className={`${
                  open ? "block" : "hidden"
                } w-full pb-4 lg:flex lg:w-fit lg:items-center lg:gap-8 lg:pb-0`}
              >
                <ul className="space-y-3 lg:flex lg:gap-7 lg:space-y-0">
                  {MENU.map(([label, href]) => (
                    <li key={href}>
                      <a
                        href={href}
                        onClick={() => setOpen(false)}
                        className="block text-sm text-graphite transition-colors hover:text-paper"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex gap-3 lg:mt-0 lg:border-l lg:border-hairline lg:pl-7">
                  <a
                    href="tel:+15403956493"
                    className="rounded-lg border border-hairline px-4 py-2 text-sm transition-colors hover:border-paper/40"
                  >
                    Call
                  </a>
                  <a
                    href="#quote"
                    className="rounded-lg bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-paper-deep"
                  >
                    Get a quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* light rakes, ours rather than the original's hardcoded hsl greys */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 isolate z-[2] hidden opacity-60 lg:block"
        >
          <div className="absolute top-0 left-0 h-[80rem] w-[35rem] -translate-y-[87.5%] -rotate-45 rounded-full bg-[radial-gradient(68%_68%_at_55%_31%,rgba(255,255,255,.07)_0,rgba(255,255,255,.02)_50%,transparent_80%)]" />
          <div className="absolute top-0 left-0 h-[80rem] w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,.05)_0,rgba(255,255,255,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        </div>

        <section className="overflow-hidden">
          <div className="relative mx-auto max-w-5xl px-5 pt-32 pb-16 md:px-8 md:pt-36">
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <p className="eyebrow">Fredericksburg, Virginia</p>

              <BlurText
                as="h1"
                text="Websites, apps and automations. Built in days."
                animateBy="words"
                delay={70}
                className="display mt-6 justify-center text-balance text-big"
              />

              <BlurText
                as="p"
                text="One person with an AI stack, building the thing your business actually needs. Not a template with your logo on it."
                animateBy="words"
                delay={16}
                className="mx-auto mt-7 max-w-2xl justify-center text-lg text-graphite"
              />

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#quote"
                  className="inline-flex items-center gap-4 rounded-full bg-paper py-3 pr-3 pl-8 text-ink transition-colors hover:bg-paper-deep"
                >
                  <span className="font-medium">Start a project</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink/15">
                    &rarr;
                  </span>
                </a>
                <a
                  href="tel:+15403956493"
                  className="rounded-full border border-hairline px-7 py-3.5 text-sm transition-colors hover:border-paper/40"
                >
                  (540) 395-6493
                </a>
              </div>
            </div>
          </div>

          {/* The tilted plate. Not a screenshot: it renders this site. */}
          <div className="mx-auto -mt-4 max-w-7xl [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]">
            <div className="-mr-16 pl-16 [mask-image:linear-gradient(to_right,black_55%,transparent_100%)] [perspective:1200px] lg:-mr-56 lg:pl-56">
              <div className="[transform:rotateX(18deg)]">
                <div className="relative skew-x-[.28rad] lg:h-[40rem]">
                  <SiteFrame />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* A browser window rendering ronlenserdigital.com, live. */
function SiteFrame() {
  return (
    <div className="relative z-[2] overflow-hidden rounded-xl border border-hairline bg-ink-soft shadow-2xl shadow-black/60">
      {/* chrome */}
      <div className="flex items-center gap-3 border-b border-hairline bg-ink px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
        </div>
        <div className="mx-auto w-full max-w-sm rounded-md bg-ink-soft px-3 py-1 text-center font-mono text-[0.625rem] tracking-[0.08em] text-graphite">
          ronlenserdigital.com
        </div>
      </div>

      {/* viewport */}
      <div className="relative h-[22rem] lg:h-[34rem]">
        <AsciiCanvas src="/ron.jpg" cols={170} className="absolute inset-0 h-full w-full" />

        <div className="absolute top-5 left-5 z-10 flex items-center gap-1 rounded-full border border-hairline bg-ink/60 p-1 backdrop-blur-md">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-paper font-mono text-[0.5rem] font-semibold text-ink">
            R
          </span>
          {["Work", "Process", "Pricing"].map((l) => (
            <span key={l} className="px-2.5 py-1 text-[0.6875rem] text-graphite">
              {l}
            </span>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink via-ink/70 to-transparent px-6 pt-16 pb-6">
          <p className="font-mono text-[0.5625rem] tracking-[0.16em] text-accent uppercase">
            One person, start to finish
          </p>
          <p className="display mt-2 max-w-[20ch] text-xl lg:text-3xl">
            You get me. Not a queue.
          </p>
        </div>
      </div>
    </div>
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
/* Statement — centred, no label column                                */
/* ------------------------------------------------------------------ */
export function Statement() {
  return (
    <section className="border-t border-hairline px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-5xl text-center">
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
            <span className="line-inner block">I quote days.</span>
          </span>
        </h2>

        <div className="rule mx-auto my-12 max-w-md" />

        <div className="mx-auto grid max-w-4xl gap-8 text-left md:grid-cols-2">
          <BlurText
            as="p"
            text="I build with AI. Claude, Claude Code, Grok, Vercel, Supabase. That is not a shortcut, it is the reason one person can do the work of a room."
            animateBy="words"
            delay={20}
            className="text-lg leading-snug text-graphite"
          />
          <p className="reveal text-lg leading-snug">
            You are not paying for hours. You are paying for the thing to exist
            and work. That is the entire argument.
          </p>
        </div>
      </div>
    </section>
  );
}
