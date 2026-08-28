import { PhoneCall, ArrowUpRight } from "lucide-react";

/**
 * Service area page template. The copy comes entirely from src/areas.js,
 * where every city has its own writing. This file is layout only.
 */
export function ServiceArea({ area }) {
  return (
    <article className="px-5 pt-32 pb-8 md:px-8 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">
          {area.city}, Virginia / Websites, apps and automations
        </p>
        <h1 className="display mt-5 text-big">{area.h1}</h1>
        <p className="mt-7 text-lg leading-relaxed text-paper">{area.intro}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="/#quote"
            className="inline-flex items-center gap-4 rounded-full bg-paper py-3 pr-3 pl-8 text-ink transition-colors hover:bg-paper-deep"
          >
            <span className="font-medium">Get a fixed quote</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink/15">
              &rarr;
            </span>
          </a>
          <a
            href="tel:+15403956493"
            className="inline-flex items-center gap-2 rounded-full border border-hairline px-7 py-3.5 text-sm transition-colors hover:border-paper/40"
          >
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
            (540) 395-6493
          </a>
        </div>

        <div className="mt-12 space-y-5 text-[1.02rem] leading-relaxed text-graphite">
          {area.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-hairline bg-ink-soft p-6 md:p-8">
          <p className="eyebrow">Who this is for in {area.city}</p>
          <p className="mt-3 text-[0.98rem] leading-relaxed text-paper">
            {area.forWho}
          </p>
        </div>

        <div className="mt-10 grid gap-px bg-hairline sm:grid-cols-3">
          {[
            ["Fixed price", "One number in writing before work starts. It does not move."],
            ["About a week", "Straightforward sites go live in days. Apps take longer, with a date in writing."],
            ["You own it", "Domain, hosting, code, all in your name at handoff. No monthly fee to me."],
          ].map(([t, b]) => (
            <div key={t} className="bg-ink p-6">
              <h2 className="font-display text-lg">{t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-graphite">{b}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-5">
          <a
            href="/#quote"
            className="inline-flex items-center rounded-lg bg-paper px-7 py-3 text-sm font-medium text-ink transition-transform duration-300 hover:scale-105"
          >
            Tell me what you need
            <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href="/"
            className="text-sm text-graphite underline underline-offset-4 transition-colors hover:text-paper"
          >
            Everything I build, on one page
          </a>
        </div>
      </div>
    </article>
  );
}
