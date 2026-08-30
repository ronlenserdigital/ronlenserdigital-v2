import { PhoneCall, ArrowUpRight } from "lucide-react";

/**
 * /services
 *
 * Hub page. The old site had this URL indexed, so it 301s nowhere and lives
 * again. Lists every service line, links down to the local SEO page and into
 * the home page sections for the rest.
 */

const LINES = [
  {
    t: "Websites",
    href: "/#capabilities",
    d: "Marketing sites, landing pages, booking and quote flows, and rebuilds of whatever is not working now. Built around your business, not a theme.",
  },
  {
    t: "Web apps",
    href: "/#capabilities",
    d: "Customer portals, client logins, dashboards. Anything that needs a database and a login behind it.",
  },
  {
    t: "Internal tools",
    href: "/#capabilities",
    d: "Scheduling and dispatch, job tracking, inventory, quoting. The spreadsheet you outgrew, turned into software.",
  },
  {
    t: "Automations",
    href: "/#capabilities",
    d: "Lead routing, follow ups, invoices, and the tools you already pay for finally talking to each other.",
  },
  {
    t: "AI answering",
    href: "/#capabilities",
    d: "Chat on your site and a phone line that picks up, answers questions, books the job and texts you the details.",
  },
  {
    t: "Local SEO",
    href: "/services/local-seo",
    d: "Google Business Profile, service area pages, schema and reviews, so Fredericksburg finds you first. Full page on this one.",
  },
];

export function Services() {
  return (
    <article className="px-5 pt-32 pb-8 md:px-8 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Services / Fredericksburg, Virginia</p>
        <h1 className="display mt-5 text-big">What I build.</h1>
        <p className="mt-7 text-lg leading-relaxed text-paper">
          One person in Fredericksburg with an AI stack, building whatever the
          business actually needs. Every project gets a fixed quote in writing
          before work starts, and you own everything at hand off.
        </p>

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

        <div className="mt-14 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
          {LINES.map((l) => (
            <a
              key={l.t}
              href={l.href}
              className="group bg-ink p-6 transition-colors hover:bg-ink-soft"
            >
              <h2 className="flex items-center justify-between font-display text-lg">
                {l.t}
                <ArrowUpRight
                  className="h-4 w-4 text-graphite transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-graphite">{l.d}</p>
            </a>
          ))}
        </div>

        <div className="mt-14 space-y-5 border-t border-hairline pt-10 pb-8 text-[1.02rem] leading-relaxed text-graphite">
          <h2 className="display text-mid text-paper">How every project runs</h2>
          <p>
            A fifteen minute call, a fixed number and date in writing, a live
            preview link while it is built, and a hand off where the code, the
            accounts and the domain end up in your name. Most websites take
            about a week. Details on the{" "}
            <a href="/#process" className="text-paper underline underline-offset-4">
              process
            </a>{" "}
            and answers to the usual questions in the{" "}
            <a href="/#faq" className="text-paper underline underline-offset-4">
              FAQ
            </a>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
