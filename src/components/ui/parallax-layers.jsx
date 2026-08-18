import { useRef } from "react";
import { useParallax } from "../../lib/motion.js";
import { BlurText } from "./blur-text.jsx";

/**
 * Parallax layers.
 *
 * Ported from the 21st.dev / Osmo parallax-scrolling component. What changed:
 *
 *   - NO SECOND LENIS. The original constructs `new Lenis()` inside the
 *     component. App.jsx already runs one. Two instances fight over
 *     scrollTop every frame and scrolling breaks site wide. This reads
 *     scroll position directly and lets the app's single Lenis drive it.
 *   - no gsap, no ScrollTrigger. That was ~50 kB gzipped to translate four
 *     layers. It is a lerp and a transform.
 *   - the original imports `@studio-freight/lenis`, which is the deprecated
 *     package name for `lenis`. Installing it would have shipped two copies
 *     of the same library.
 *   - the Osmo CDN images are gone. They are someone else's artwork and this
 *     site sells original work. Layers are typography and plates you can
 *     swap for real project screenshots.
 *   - the original relies on `.parallax__*` classes that were never included
 *     in the snippet, so it renders unstyled as delivered.
 *   - reduced motion parks every layer at rest.
 *
 * Layer depth: back layers travel most, front layers least.
 */

const LAYERS = [
  { key: "1", travel: 70 },
  { key: "2", travel: 55 },
  { key: "3", travel: 40 },
  { key: "4", travel: 10 },
];

const shift = (p, travel) => `translate3d(0, ${(p - 0.5) * travel}%, 0)`;

export function ParallaxBreak() {
  const rig = useRef(null);
  const p = useParallax(rig);

  const layer = (key) => LAYERS.find((l) => l.key === key).travel;

  return (
    <section
      ref={rig}
      aria-label="Hand built"
      className="relative isolate overflow-hidden py-32 md:py-48"
    >
      {/* layer 1, furthest back: oversized ghost word */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
        style={{ transform: shift(p, layer("1")) }}
        aria-hidden="true"
      >
        <span className="display text-[26vw] leading-none whitespace-nowrap text-hairline">
          HAND BUILT
        </span>
      </div>

      {/* layer 2: back plate. Swap for a wide project screenshot. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 flex justify-center will-change-transform"
        style={{ transform: shift(p, layer("2")) }}
        aria-hidden="true"
      >
        <div className="h-[34vh] w-[62vw] -translate-y-1/2 rotate-[-4deg] bg-ink-soft shadow-2xl shadow-black/40" />
      </div>

      {/* layer 3: the message */}
      <div
        className="relative z-10 px-5 text-center will-change-transform md:px-8"
        style={{ transform: shift(p, layer("3")) }}
      >
        <p className="font-mono text-[0.625rem] tracking-[0.16em] text-accent uppercase">
          No themes were harmed
        </p>
        <BlurText
          as="h2"
          text="Every line of it, typed."
          animateBy="letters"
          delay={26}
          className="display mt-5 justify-center text-big"
        />
        <p className="mx-auto mt-5 max-w-[38ch] leading-snug text-graphite">
          Open the source on anything I have built. You will not find a page
          builder, a bloated theme, or forty plugins holding it together.
        </p>
      </div>

      {/* layer 4, closest: front plate. Swap for a detail crop. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center will-change-transform"
        style={{ transform: shift(p, layer("4")) }}
        aria-hidden="true"
      >
        <div className="h-[22vh] w-[38vw] translate-y-1/3 rotate-[3deg] bg-ink-soft shadow-2xl shadow-black/50" />
      </div>

      {/* edge fades so layers do not hard-cut at the section boundary */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent"
      />
    </section>
  );
}
