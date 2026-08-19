/**
 * The stack strip.
 *
 * Deliberately not scraped brand SVGs. Hotlinking eleven companies' logo
 * files gives eleven different visual weights, dead links when any of them
 * redesigns, and reproduced trademarks sitting on a commercial page. These
 * are original geometric glyphs at one size with the wordmark in mono, so
 * the row reads as one designed object.
 *
 * Add a tool by pushing to TOOLS. Glyphs are 16x16 viewBox.
 */

const g = (paths) => (
  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 shrink-0" aria-hidden="true">
    {paths}
  </svg>
);

const TOOLS = [
  {
    name: "Claude",
    glyph: g(
      <path
        d="M8 1.5 9.7 6.3 14.5 8 9.7 9.7 8 14.5 6.3 9.7 1.5 8 6.3 6.3Z"
        fill="currentColor"
      />
    ),
  },
  {
    name: "Claude Code",
    glyph: g(
      <>
        <path d="M5.5 4 2 8l3.5 4M10.5 4 14 8l-3.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    name: "Grok",
    glyph: g(
      <path d="M2.5 13.5 13.5 2.5M6 2.5h7.5V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    name: "ChatGPT",
    glyph: g(
      <>
        <circle cx="8" cy="8" r="5.4" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="8" cy="8" r="1.8" fill="currentColor" />
      </>
    ),
  },
  {
    name: "GitHub",
    glyph: g(
      <>
        <circle cx="4.2" cy="4" r="1.7" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="11.8" cy="4" r="1.7" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="4.2" cy="12.4" r="1.7" stroke="currentColor" strokeWidth="1.3" />
        <path d="M11.8 5.7v1.5a2 2 0 0 1-2 2H6.2a2 2 0 0 0-2 2v.4M4.2 5.7v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
  {
    name: "Vercel",
    glyph: g(<path d="M8 2.6 14.6 13.4H1.4Z" fill="currentColor" />),
  },
  {
    name: "Supabase",
    glyph: g(
      <path d="M8.6 1.4 2.4 8.6h5V14.6l6.2-7.2h-5Z" fill="currentColor" />
    ),
  },
  {
    name: "Cloudflare",
    glyph: g(
      <path d="M3 10.5h8.6a2.1 2.1 0 0 0 0-4.2h-.5A3.6 3.6 0 0 0 4.4 5.6 2.5 2.5 0 0 0 3 10.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    ),
  },
  {
    name: "Figma",
    glyph: g(
      <>
        <rect x="5.6" y="1.8" width="4.8" height="4.2" rx="2.1" stroke="currentColor" strokeWidth="1.2" />
        <rect x="5.6" y="6" width="4.8" height="4.2" rx="2.1" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="10.4" cy="8.1" r="2.1" fill="currentColor" />
      </>
    ),
  },
  {
    name: "Stripe",
    glyph: g(
      <path d="M11 4.6c-1-.5-2-.7-3-.7-1.6 0-2.6.7-2.6 1.8 0 2.6 6 1.6 6 4.7 0 1.4-1.3 2.3-3.3 2.3-1.2 0-2.4-.3-3.4-.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    ),
  },
  {
    name: "Resend",
    glyph: g(
      <path d="M2 4.2 8 9l6-4.8M2 4.2h12v7.6H2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    ),
  },
  {
    name: "Tailwind",
    glyph: g(
      <path d="M2 7.4c.8-2.3 2.2-3.4 4.2-3.4 3 0 3.4 2.3 4.9 2.7 1 .3 1.9-.1 2.7-1.1-.8 2.3-2.2 3.4-4.2 3.4-3 0-3.4-2.3-4.9-2.7-1-.3-1.9.1-2.7 1.1Z" fill="currentColor" />
    ),
  },
];

export function StackStrip() {
  return (
    <section className="relative z-10 border-t border-hairline px-5 py-16 md:px-8 md:py-20">
      <h2 className="text-center text-base font-medium text-paper md:text-lg">
        The tools I build with.
      </h2>
      <p className="mx-auto mt-3 max-w-[46ch] text-center text-sm text-graphite">
        Not a secret and not a shortcut. This is the stack that lets one person
        ship what a ten person shop quotes months for.
      </p>

      <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12">
        {TOOLS.map((t) => (
          <span
            key={t.name}
            className="flex items-center gap-2 text-graphite transition-colors hover:text-paper"
          >
            {t.glyph}
            <span className="font-mono text-[0.6875rem] tracking-[0.1em] whitespace-nowrap uppercase">
              {t.name}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
