import { BRANDS } from "./brand-marks.js";

/**
 * The stack strip.
 *
 * Real brand marks, inlined from Simple Icons (CC0) rather than hotlinked, so
 * nothing breaks when a company redesigns and the page makes no third party
 * request. Everything renders in currentColor to stay monochrome with the
 * rest of the site: grey at rest, white on hover.
 *
 * Add or remove a tool in BRANDS in brand-marks.js.
 */
export function StackStrip() {
  return (
    <section className="relative z-10 border-t border-hairline px-5 py-16 md:px-8 md:py-20">
      <h2 className="text-center text-base font-medium text-paper md:text-lg">
        The tools I build with.
      </h2>
      <p className="mx-auto mt-3 max-w-[48ch] text-center text-sm text-graphite">
        Not a secret and not a shortcut. This is the stack that lets one person
        ship what a ten person shop quotes months for.
      </p>

      <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-9 gap-y-7 sm:gap-x-12">
        {BRANDS.map((b) => (
          <span
            key={b.name}
            title={b.name}
            className="flex items-center gap-2.5 text-graphite transition-colors duration-200 hover:text-paper"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 shrink-0"
              aria-hidden="true"
            >
              <path d={b.path} />
            </svg>
            <span className="font-mono text-[0.6875rem] tracking-[0.1em] whitespace-nowrap uppercase">
              {b.name}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
