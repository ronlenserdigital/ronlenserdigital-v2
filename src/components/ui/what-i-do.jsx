import { Globe, LayoutDashboard, Wrench, Workflow, PhoneCall, Search, ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils.js";

/**
 * What I do.
 *
 * Ported from the 21st.dev how-we-do-it process overview. Changes:
 *   - no shadcn Button, so no @radix-ui/react-slot and no
 *     class-variance-authority. Three packages to style one link.
 *   - shadcn theme variables mapped to ours: bg-card -> bg-ink-soft,
 *     text-primary -> text-paper, border -> hairline
 *   - the decorative rule uses a vertical line on desktop and a horizontal
 *     one on mobile, same as the original, but sized to the card rather than
 *     hanging a pixel outside it
 */

const ITEMS = [
  {
    icon: Globe,
    title: "Websites",
    description: "Marketing sites, landing pages, booking and quote flows. Rebuilds of whatever is not working now.",
  },
  {
    icon: LayoutDashboard,
    title: "Web apps",
    description: "Customer portals, client logins, dashboards. Anything that needs a database behind it.",
  },
  {
    icon: Wrench,
    title: "Internal tools",
    description: "Scheduling and dispatch, job tracking, inventory, quoting. The spreadsheet you outgrew.",
  },
  {
    icon: Workflow,
    title: "Automations",
    description: "Lead routing, follow ups, invoices, the tools you already pay for finally talking to each other.",
  },
  {
    icon: PhoneCall,
    title: "AI answering",
    description: "Chat on your site and a phone line that picks up, answers, books the job and texts you.",
  },
  {
    icon: Search,
    title: "Getting found",
    description: "Local SEO, Google Business Profile, service area pages, reviews. Logos and brand marks too.",
  },
];

function Card({ icon: Icon, title, description }) {
  return (
    <div
      className={cn(
        "group relative w-full cursor-default rounded-lg border border-hairline bg-ink-soft p-6",
        "transition-all duration-300 hover:border-paper/40 hover:shadow-lg hover:shadow-black/40"
      )}
    >
      {/* rule: vertical on desktop, horizontal on mobile */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-0 hidden h-1/2 w-px -translate-y-1/2 bg-hairline transition-colors group-hover:bg-paper/60 md:block"
      />
      <span
        aria-hidden="true"
        className="absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-hairline transition-colors group-hover:bg-paper/60 md:hidden"
      />

      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-hairline bg-ink text-paper transition-colors duration-300 group-hover:bg-paper group-hover:text-ink">
        <Icon className="h-6 w-6" />
      </div>

      <div className="flex flex-col">
        <h3 className="mb-1.5 font-display text-lg">{title}</h3>
        <p className="text-sm leading-relaxed text-graphite">{description}</p>
      </div>
    </div>
  );
}

export function WhatIDo() {
  return (
    <section
      id="capabilities"
      className="w-full border-t border-hairline px-5 py-20 md:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-3 md:gap-10 lg:gap-16">
        {/* left */}
        <div className="flex flex-col items-start justify-center md:col-span-1">
          <span className="eyebrow mb-3">What I do</span>
          <h2 className="display reveal mb-5 text-big">Not a website guy.</h2>
          <p className="reveal mb-8 text-base leading-relaxed text-graphite">
            Websites are the common ask, but the job is whatever the business
            actually needs. Most of the time the site is not the thing costing
            you money. Tell me what is and I will price the fix.
          </p>
          <a
            href="#quote"
            className="inline-flex items-center rounded-lg bg-paper px-7 py-3 text-sm font-medium text-ink transition-transform duration-300 hover:scale-105"
          >
            Tell me the problem
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </a>
        </div>

        {/* right */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:col-span-2">
          {ITEMS.map((item) => (
            <Card key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
