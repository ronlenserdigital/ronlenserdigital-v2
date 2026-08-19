import { useState } from "react";
import { cn } from "../../lib/utils.js";

/**
 * FAQ section.
 *
 * Ported from the 21st.dev faqsection with zero new dependencies. The
 * original wants @radix-ui/react-accordion, @radix-ui/react-slot,
 * @radix-ui/react-icons, class-variance-authority and tw-animate-css, plus
 * the shadcn Button and Accordion files, to open and close a panel.
 *
 * The open/close is a grid-template-rows transition from 0fr to 1fr, which
 * animates to auto height in CSS with no measurement and no keyframes. One
 * open item per column, same as the original's type="single" collapsible.
 */

function Item({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-hairline">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-6 py-5 text-left"
      >
        <span
          className={cn(
            "text-base leading-snug font-medium transition-colors md:text-lg",
            open ? "text-paper" : "text-paper/85 hover:text-paper"
          )}
        >
          {q}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "mt-1 grid h-5 w-5 shrink-0 place-items-center transition-transform duration-300",
            open && "rotate-45"
          )}
        >
          <span className="absolute h-px w-4 bg-graphite" />
          <span
            className={cn(
              "h-4 w-px transition-colors",
              open ? "bg-accent" : "bg-graphite"
            )}
          />
        </span>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-[0.95rem] leading-relaxed text-graphite">{a}</p>
        </div>
      </div>
    </div>
  );
}

function Column({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {items.map((f, i) => (
        <Item
          key={f.q}
          q={f.q}
          a={f.a}
          open={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        />
      ))}
    </div>
  );
}

/* The questions people actually ask on the phone. */
const LEFT = [
  {
    q: "What does a build actually include?",
    a: "The thing itself. Pages, copy, forms, mobile, the code, and getting it live. One fixed number agreed before I start, and no monthly fee to me afterwards. Fill out the form and you get your number, usually the same day.",
  },
  {
    q: "How fast is fast?",
    a: "A straightforward site is usually about a week from the day you say go. Apps and custom tools run longer depending on what they have to do. You get a date in writing before I start and I hold to it.",
  },
  {
    q: "Do you handle the domain and hosting?",
    a: "You buy and own those yourself, in your name, on your card. I set everything up and connect it, but the accounts stay yours. It is a few dollars a month and it means nobody, including me, can hold your website hostage. If you do not have a domain yet I will tell you exactly what to buy.",
  },
  {
    q: "Who owns it when we are done?",
    a: "You do. The code, the repo, the domain, the hosting account, all of it in your name. If you fire me tomorrow you keep everything and any other developer can pick it up.",
  },
  {
    q: "What if I need changes later?",
    a: "Small tweaks are usually free for the first month. After that you can pay per change or keep me on retainer. You are never stuck waiting on me though, because you own the code.",
  },
];

const RIGHT = [
  {
    q: "Do I need to know what I want before I call?",
    a: "No. Most people call knowing what is annoying them, not what to build. Tell me the annoying part. If software is not the fix I will tell you that on the call and it costs you nothing.",
  },
  {
    q: "You build with AI. Does that mean it is generic?",
    a: "The opposite. AI is what lets one person build something custom for your business instead of selling you a template because custom would take too long. The tools are AI, the decisions are mine, and the thing gets built for you specifically.",
  },
  {
    q: "Is software built with AI worse?",
    a: "Not if the person driving knows what good looks like. I test everything, I deploy it, and I am the one on the phone when it breaks. Ask any agency what their junior developer wrote last week and you will get a much vaguer answer.",
  },
  {
    q: "Why are you cheaper than the shop down the road?",
    a: "Because there is one of me, no office, no account manager, and no project manager forwarding your emails. You are paying for the thing to exist and work, not for a payroll.",
  },
  {
    q: "Do you only do websites?",
    a: "No. Websites are the common ask, but I build apps, customer portals, internal dashboards, scheduling and job tracking, automations, and AI that answers your phone and books work. If it can be built, ask.",
  },
  {
    q: "Can you work with what I already have?",
    a: "Usually yes. I can fix or rebuild an existing site, connect the tools you already pay for, or move you off something that is not working. Send me the link and I will tell you straight whether it is worth saving.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="border-t border-hairline px-5 py-20 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="display reveal mx-auto max-w-[18ch] text-big">
            The things people ask me on the phone.
          </h2>
          <p className="reveal mx-auto mt-5 max-w-[46ch] text-graphite">
            If yours is not here, ask it. I answer the same day.
          </p>
        </div>

        <div className="mt-14 grid gap-x-12 text-left md:grid-cols-2">
          <Column items={LEFT} />
          <Column items={RIGHT} />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <a
              href="#quote"
              className="inline-flex items-center gap-4 rounded-full bg-paper py-3 pr-3 pl-8 text-ink transition-colors hover:bg-paper-deep"
            >
              <span className="font-medium">Ask me something else</span>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink/15">
                &rarr;
              </span>
            </a>
          <a
            href="tel:+15403956493"
            className="text-sm text-graphite transition-colors hover:text-paper"
          >
            Or just call. (540) 395-6493
          </a>
        </div>
      </div>
    </section>
  );
}
