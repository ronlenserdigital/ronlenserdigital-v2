import { Section } from "./Sections.jsx";

/* No numbers on the page. Every quote is scoped on a call and priced in
   writing, so a price list here would be wrong more often than right. */
const HOW = [
  {
    name: "Fixed, not hourly",
    body: "You get one number and one date, in writing, before I start. It does not move because something took me longer than I thought.",
    note: "If I underestimate the job, that is my problem, not your invoice.",
    accent: true,
  },
  {
    name: "Priced per project",
    body: "A one page site and a scheduling app are not the same job. I scope yours on a fifteen minute call and quote that, not a package you have to squeeze into.",
    note: "No tiers, no bronze silver gold, nothing you pay for and never use.",
  },
  {
    name: "Nothing monthly to me",
    body: "The build is a one time cost. Ongoing services are optional and separate, and you can stop them any time without losing the thing I built.",
    note: "You pay your own domain and hosting, in your name, a few dollars a month.",
  },
];

export function Pricing() {
  return (
    <Section
      id="pricing"
      title="One number. In writing. Before I start."
      intro="I do not publish a price list, because the honest number depends on what the thing has to do. Tell me the problem and you will have a fixed quote, usually the same day."
    >
      <div className="grid gap-px bg-hairline md:grid-cols-3">
        {HOW.map((o) => (
          <div
            key={o.name}
            className={`reveal flex flex-col gap-4 p-8 transition-colors md:p-10 ${
              o.accent ? "bg-ink-soft text-paper" : "bg-ink hover:bg-ink-soft"
            }`}
          >
            <h3 className="font-display text-2xl">{o.name}</h3>
            <p
              className={`text-sm leading-relaxed ${
                o.accent ? "text-paper/60" : "text-graphite"
              }`}
            >
              {o.body}
            </p>
            <p className="mt-auto border-t border-hairline pt-4 text-sm leading-snug text-paper/70">
              {o.note}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
        <a
          href="#quote"
          className="inline-flex items-center gap-4 rounded-full bg-paper py-3 pr-3 pl-8 text-ink transition-colors hover:bg-paper-deep"
        >
          <span className="font-medium">Get your number</span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ink/15">
            &rarr;
          </span>
        </a>
        <p className="text-sm text-graphite">
          Two minutes to fill out. No obligation, no follow up sequence.
        </p>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact card — a named human, not a form                            */
/* ------------------------------------------------------------------ */
export function ContactCard() {
  return (
    <section className="border-t border-hairline px-5 py-20 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <div className="w-full max-w-[280px] overflow-hidden rounded-lg border border-hairline bg-ink-soft">
            <picture>
              <source srcSet="/ron-portrait.webp" type="image/webp" />
              <img
                src="/ron-portrait.jpg"
                alt="Ron Lenser, founder of Ron Lenser Digital, in Fredericksburg, Virginia"
                width="720"
                height="900"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </picture>
          </div>
          <p className="mt-4 font-medium">Ron Lenser</p>
          <p className="text-sm text-graphite">Founder. The one who builds it.</p>
        </div>

        <div className="md:col-span-8">
          <p className="eyebrow reveal">Want to talk?</p>
          <h2 className="display reveal mt-4 text-mid">
            Call me and tell me what is actually slowing the business down. If
            software is not the answer, I will say so on that call.
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:+15403956493"
              className="rounded-full bg-paper px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-paper-deep"
            >
              (540) 395-6493
            </a>
            <a
              href="#quote"
              className="rounded-full border border-hairline px-7 py-3 text-sm transition-colors hover:border-paper/40"
            >
              Or send the form
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
