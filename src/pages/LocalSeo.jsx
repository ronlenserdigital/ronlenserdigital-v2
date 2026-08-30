import { PhoneCall, ArrowUpRight } from "lucide-react";

/**
 * /services/local-seo
 *
 * Exists because Search Console shows this exact URL earning nearly all of
 * the site's non branded impressions (fredericksburg seo queries) from the
 * old multi page site. The URL kept its job; the page is new.
 *
 * FAQ pairs are exported so seo.js can build FAQPage schema from the same
 * array the page renders. Same no-drift rule as the home page FAQ.
 */

export const LOCAL_SEO_FAQ = [
  {
    q: "How long does local SEO take to work in Fredericksburg?",
    a: "The Google Business Profile side can start producing in weeks. Organic rankings on the classic results take months, because Google trusts slowly. Anyone promising page one in thirty days is selling something they do not control.",
  },
  {
    q: "Do I need a new website for local SEO?",
    a: "Not always. If your site loads fast, works on a phone and says clearly what you do and where, it can usually be fixed rather than replaced. Send me the link and I will tell you straight which one it is.",
  },
  {
    q: "What is a Google Business Profile and why does it matter more than my website?",
    a: "It is the listing with the map, reviews, hours and photos that shows up when someone searches for a service near them. For local services it sits above every normal result, which means it often gets the call before your website is ever seen.",
  },
  {
    q: "Is there a monthly fee?",
    a: "The setup work is a one time project with a fixed written quote. Ongoing work like review management or new pages is optional, separate, and you can stop any time without losing anything.",
  },
  {
    q: "Do you guarantee first place on Google?",
    a: "No, and nobody honest does. Google decides rankings, not me. What I control is whether your business information, pages and profile give Google every reason to show you, and I put that work in writing.",
  },
];

const WORK = [
  {
    t: "Google Business Profile",
    d: "Claimed, verified, right category, service areas, hours, photos and posts. This is the map box, and the map box gets the call.",
  },
  {
    t: "Service and area pages",
    d: "Real pages for what you do and where you do it, written for people and structured so Google can read them. No doorway page spam.",
  },
  {
    t: "Schema markup",
    d: "Structured data that tells Google and AI assistants your name, hours, services and area in their own language.",
  },
  {
    t: "Reviews on autopilot",
    d: "A simple system that asks every happy customer at the right moment, so the rating grows without you chasing anyone.",
  },
  {
    t: "Citations that agree",
    d: "Your name, address and phone made identical everywhere they appear. Listings that disagree quietly kill local rankings.",
  },
  {
    t: "A site that holds up",
    d: "Fast, mobile, clear about what you do. If yours needs fixing first I will say so, and if it does not I will say that too.",
  },
];

export function LocalSeo() {
  return (
    <article className="px-5 pt-32 pb-8 md:px-8 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Local SEO / Fredericksburg, Virginia</p>
        <h1 className="display mt-5 text-big">
          Local SEO for Fredericksburg businesses that need the phone to ring.
        </h1>
        <p className="mt-7 text-lg leading-relaxed text-paper">
          When someone nearby searches for what you do, three businesses show
          up on the map and get the call. This is the work that puts you in
          that box, done once, priced in writing.
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

        <div className="mt-14 space-y-5 text-[1.02rem] leading-relaxed text-graphite">
          <h2 className="display text-mid text-paper">
            What local SEO actually is
          </h2>
          <p>
            It is not magic and it is not a subscription you pay forever out
            of fear. Local SEO is making sure Google has clean, consistent,
            provable answers to three questions: what you do, where you do it,
            and whether people trust you. Most local businesses fail all three
            without knowing it, because the information is missing, outdated,
            or scattered across directories that disagree with each other.
          </p>
        </div>

        <h2 className="display mt-14 text-mid">What the work includes</h2>
        <div className="mt-6 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
          {WORK.map((w) => (
            <div key={w.t} className="bg-ink p-6">
              <h3 className="font-display text-lg">{w.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-graphite">{w.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 space-y-5 text-[1.02rem] leading-relaxed text-graphite">
          <h2 className="display text-mid text-paper">
            Why the map matters more than rankings
          </h2>
          <p>
            For local services, the map pack sits above every normal search
            result. Someone with a burst pipe or a dead AC does not scroll to
            result seven, they call one of the three businesses in the box.
            Getting into that box is mostly your Business Profile, your
            reviews and your consistency, which is exactly the work above. The
            classic blue link rankings still matter, they just come second and
            they come slower.
          </p>
          <p>
            What it costs: one fixed number, in writing, before anything
            starts. The setup is a one time project, not a retainer. A
            plumber with one truck and a med spa with three locations are not
            the same job, which is why there is no price list,{" "}
            <a href="/#quote" className="text-paper underline underline-offset-4">
              the form
            </a>{" "}
            gets you your number, usually the same day.
          </p>
        </div>

        <h2 className="display mt-14 text-mid">
          Questions people ask before hiring me
        </h2>
        <div className="mt-6 border-t border-hairline">
          {LOCAL_SEO_FAQ.map((f) => (
            <details key={f.q} className="group border-b border-hairline py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-base leading-snug font-medium text-paper/85 transition-colors hover:text-paper">
                {f.q}
                <span
                  aria-hidden="true"
                  className="mt-1 text-graphite transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-graphite">
                {f.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-14 border-t border-hairline pt-10 pb-8">
          <p className="text-lg leading-relaxed text-graphite">
            Who does the work: me.{" "}
            <a href="/" className="text-paper underline underline-offset-4">
              Ron Lenser
            </a>
            , one person in Fredericksburg building with an AI stack, which is
            the reason the quote is days and not months. You talk to the
            person doing the work, and everything created belongs to you when
            it is done, including the accounts.
          </p>
          <a
            href="/#quote"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-paper px-8 py-3.5 font-medium text-ink transition-colors hover:bg-paper-deep"
          >
            Tell me about your business
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
