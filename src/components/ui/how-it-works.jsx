import { Phone, FileText, Terminal, KeyRound } from "lucide-react";
import { cn } from "../../lib/utils.js";

/**
 * How it works.
 *
 * Ported from the 21st.dev how-it-works. Changes:
 *   - shadcn theme variables mapped to ours: bg-card -> bg-ink-soft,
 *     text-primary -> text-paper, bg-muted -> bg-ink, border -> hairline
 *   - generalised from a hardcoded three columns to N. The connector line
 *     and the number row are computed from STEPS.length, so adding a fifth
 *     step does not break the alignment.
 *   - four columns collapse to two on tablet and one on phone; the
 *     connector only draws where all of them sit on one row.
 */

const STEPS = [
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Call",
    description:
      "Fifteen minutes. Tell me what is actually slowing the business down, not the solution you think you need.",
    benefits: [
      "No sales pitch, no deck",
      "I will say so if software is not the fix",
      "Costs you nothing either way",
    ],
    duration: "1 day",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Quote",
    description:
      "One number and one date, in writing, before anything starts. It does not move because something took me longer than I thought.",
    benefits: [
      "Fixed price, never hourly",
      "Scope written down so nothing is assumed",
      "No retainer, no minimum term",
    ],
    duration: "1 day",
  },
  {
    icon: <Terminal className="h-6 w-6" />,
    title: "Build",
    description:
      "I build it with AI and you watch it happen. A live preview link from day one, updated as it fills in.",
    benefits: [
      "See progress daily, not at the end",
      "Change your mind early, while it is cheap",
      "You talk to me, not a project manager",
    ],
    duration: "3 to 10 days",
  },
  {
    icon: <KeyRound className="h-6 w-6" />,
    title: "Hand off",
    description:
      "Deployed, connected and documented. The code and the accounts go in your name, including the domain you own.",
    benefits: [
      "Repo, hosting and domain all yours",
      "Any other developer can pick it up",
      "First month of small tweaks included",
    ],
    duration: "1 day",
  },
];

function StepCard({ icon, title, description, benefits, duration, index }) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-hairline bg-ink-soft p-6 text-paper",
        "transition-all duration-300 ease-in-out",
        "hover:-translate-y-1 hover:border-paper/30 hover:shadow-lg hover:shadow-black/40"
      )}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink text-paper">
          {icon}
        </div>
        <span className="font-mono text-[0.625rem] tracking-[0.14em] text-graphite uppercase">
          {duration}
        </span>
      </div>

      <h3 className="mb-2 font-display text-xl">
        <span className="mr-2 text-graphite lg:hidden">
          {String(index + 1).padStart(2, "0")}
        </span>
        {title}
      </h3>
      <p className="mb-6 text-sm leading-relaxed text-graphite">{description}</p>

      <ul className="space-y-3">
        {benefits.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <span className="mt-1.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-paper/15">
              <span className="h-1.5 w-1.5 rounded-full bg-paper" />
            </span>
            <span className="text-sm leading-snug text-graphite">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HowItWorks() {
  const n = STEPS.length;
  const half = 100 / n / 2;

  return (
    <section
      id="process"
      className="w-full border-t border-hairline px-5 py-20 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="display reveal text-big">How a build runs</h2>
          <p className="reveal mt-5 text-lg text-graphite">
            Four steps, about a week for most jobs, and you know the number
            before step three starts.
          </p>
        </div>

        {/* number row with connector, only where all steps sit on one line */}
        <div className="relative mx-auto mb-8 hidden w-full lg:block">
          <div
            aria-hidden="true"
            className="absolute top-1/2 h-px -translate-y-1/2 bg-hairline"
            style={{ left: `${half}%`, width: `${100 - half * 2}%` }}
          />
          <div
            className="relative grid"
            style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
          >
            {STEPS.map((s, i) => (
              <span
                key={s.title}
                className="flex h-8 w-8 items-center justify-center justify-self-center rounded-full bg-ink-soft font-mono text-xs font-semibold text-paper ring-4 ring-ink"
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <StepCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
