import { Phone, Mail, MapPin } from "lucide-react";
import { useAvailability, useClock } from "../../lib/motion.js";
import { cn } from "../../lib/utils.js";

/**
 * Site footer.
 *
 * Ported from the 21st.dev footer-section. Changes on the way in:
 *   - zero new dependencies. The original pulls six (radix slot, cva, radix
 *     label, switch, tooltip, plus the shadcn Button/Input/Label/Switch/
 *     Textarea files). Tooltips are CSS hover labels here, same pattern as
 *     the fluid menu.
 *   - dropped the dark mode Switch. This site themes off data-dir, not a
 *     .dark class, so that toggle would have fought the direction system.
 *   - dropped the newsletter form. There is no newsletter. Replaced with a
 *     live availability panel, which is a real thing a local business can
 *     act on.
 *   - dropped Twitter and Instagram. Only the accounts that exist are linked.
 *   - real address, phone and email instead of the placeholder ones.
 *   - removed the dead Textarea import from the original.
 */

const PHONE_HREF = "tel:+15403956493";
const PHONE = "(540) 395-6493";
const EMAIL = "ron@ronlenserdigital.com";

const LINKS = [
  ["What I do", "#capabilities"],
  ["Capabilities", "#capabilities"],
  ["Process", "#process"],
  ["Results", "#results"],
  ["Pricing", "#pricing"],
  ["Get a quote", "#quote"],
];

/* lucide-react 1.x dropped all brand icons for trademark reasons, so these
   two are inlined rather than pulling in another icon package. */
function FacebookMark(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function LinkedInMark(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 21.5h5.16V9.75H2.4V21.5ZM10.1 9.75h4.95v1.6h.07c.69-1.24 2.37-2.55 4.88-2.55 5.22 0 6.18 3.32 6.18 7.63V21.5h-5.15v-4.98c0-1.19-.02-2.72-1.7-2.72-1.7 0-1.96 1.29-1.96 2.63V21.5H10.1V9.75Z" />
    </svg>
  );
}

const SOCIAL = [
  { name: "Facebook", href: "https://facebook.com/remakerony", Icon: FacebookMark },
  { name: "LinkedIn", href: "https://linkedin.com/in/ronlenser", Icon: LinkedInMark },
];

function Social({ name, href, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative grid h-11 w-11 place-items-center rounded-full",
        "border border-hairline text-graphite transition-colors",
        "hover:border-paper hover:bg-paper hover:text-ink",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">{name}</span>

      <span
        className={cn(
          "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-full",
          "bg-ink px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.14em] whitespace-nowrap text-ink uppercase",
          "translate-y-1 opacity-0 transition-all duration-200",
          "group-hover:translate-y-0 group-hover:opacity-100",
          "group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        )}
      >
        {name}
      </span>
    </a>
  );
}

export function Footer() {
  const open = useAvailability();
  const time = useClock("America/New_York");

  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-transparent text-paper">
      <div className="px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* availability, replaces the newsletter box */}
          <div className="relative">
            <span className="pointer-events-none absolute -top-8 -right-6 h-28 w-28 rounded-full bg-accent/15 blur-3xl" />

            <h2 className="display text-mid">Still building.</h2>

            <p className="mt-4 flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] text-graphite uppercase">
              <span
                className={cn(
                  "inline-block h-1.5 w-1.5 rounded-full",
                  open ? "animate-pulse bg-accent" : "bg-graphite"
                )}
              />
              {open ? "Taking calls now" : "Closed, leave a message"}
            </p>

            <p className="mt-1 font-mono text-[0.6875rem] tracking-[0.16em] text-graphite tabular-nums uppercase">
              Local time {time}
            </p>

            <a
              href={PHONE_HREF}
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-accent py-2.5 pr-3 pl-6 text-accent-ink transition-transform hover:scale-[1.03]"
            >
              <span className="text-sm font-medium">Call now</span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink/15">
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </a>
          </div>

          {/* links */}
          <div>
            <h3 className="font-mono text-[0.6875rem] tracking-[0.16em] text-graphite uppercase">
              Sections
            </h3>
            <nav className="mt-5 space-y-2.5 text-sm">
              {LINKS.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="link-swap block w-fit text-paper hover:text-accent"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* contact */}
          <div>
            <h3 className="font-mono text-[0.6875rem] tracking-[0.16em] text-graphite uppercase">
              Contact
            </h3>
            <address className="mt-5 space-y-3 text-sm not-italic">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-3 text-paper hover:text-accent"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 break-all text-paper hover:text-accent"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {EMAIL}
              </a>
              <p className="flex items-center gap-3 text-paper">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                Fredericksburg, Virginia
              </p>
            </address>
          </div>

          {/* social */}
          <div>
            <h3 className="font-mono text-[0.6875rem] tracking-[0.16em] text-graphite uppercase">
              Elsewhere
            </h3>
            <div className="mt-5 flex gap-3">
              {SOCIAL.map((s) => (
                <Social key={s.name} {...s} />
              ))}
            </div>
            <p className="mt-6 max-w-[26ch] text-sm leading-snug text-graphite">
              One person, one phone. You get me, not a queue.
            </p>
          </div>
        </div>

        {/* legal row */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-graphite uppercase">
            &copy; {new Date().getFullYear()} Ron Lenser Digital
          </p>
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-graphite uppercase">
            Built with AI in Fredericksburg
          </p>
        </div>
      </div>
    </footer>
  );
}
