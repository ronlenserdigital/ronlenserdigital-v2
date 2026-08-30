import { Mail, ArrowUp, Phone } from "lucide-react";
import { SOCIAL_PATHS } from "./brand-marks.js";
import { AREAS } from "../../areas.js";

/**
 * Footer.
 *
 * Ported from the 21st.dev designali footer. Changes:
 *   - no `dicons` package. Icons are lucide, already installed, plus the
 *     official brand paths already inlined in brand-marks.js.
 *   - no `next-themes` and no light/dark toggle. This site is black. The
 *     sun/moon buttons are gone and the pill keeps only scroll to top.
 *   - `<a>` instead of next/link.
 *   - six columns of invented pages collapsed to what actually exists on
 *     this one page, plus the two things a visitor really wants: call, email.
 *   - the author credit line points at Ron.
 *
 * Kept: the dotted borders, the centre pill, the lift-on-hover social row.
 */

const PHONE = "(540) 395-6493";
const PHONE_HREF = "tel:+15403956493";
const EMAIL = "ron@ronlenserdigital.com";

const COLUMNS = [
  {
    heading: "What I build",
    items: [
      ["All services", "/services"],
      ["Websites", "#capabilities"],
      ["Apps and tools", "#capabilities"],
      ["Local SEO", "/services/local-seo"],
    ],
  },
  {
    heading: "How it works",
    items: [
      ["Process", "#process"],
      ["What I do", "#capabilities"],
      ["Pricing", "#pricing"],
      ["Questions", "#faq"],
    ],
  },
  {
    heading: "Areas served",
    items: AREAS.map((a) => [`${a.city}, VA`, `/${a.slug}`]),
  },
  {
    heading: "Get started",
    items: [
      ["Get a quote", "#quote"],
      ["Call me", PHONE_HREF],
      ["Email me", `mailto:${EMAIL}`],
      ["Back to top", "#top"],
    ],
  },
];

const pill =
  "rounded-xl border border-dotted border-hairline p-2.5 text-graphite " +
  "transition-transform transition-colors duration-200 hover:-translate-y-1 " +
  "hover:border-paper/40 hover:text-paper " +
  "focus-visible:ring-2 focus-visible:ring-paper focus-visible:outline-none";

function BrandLink({ label, href, path }) {
  return (
    <a
      href={href}
      aria-label={label}
      rel="noreferrer"
      target="_blank"
      className={pill}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d={path} />
      </svg>
    </a>
  );
}

function handleScrollTop() {
  window.scroll({ top: 0, behavior: "smooth" });
}

export function Footer({ home = true }) {
  const h = (href) => (home || !href.startsWith("#") ? href : `/${href}`);
  return (
    <footer className="mx-auto w-full border-t border-hairline px-2 pb-20 md:px-4 md:pb-0">
      {/* intro */}
      <div className="relative mx-auto grid max-w-7xl items-center justify-center gap-6 p-10 pb-0 md:flex">
        <a href="/" aria-label="Home" className="flex justify-center">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-dotted border-hairline font-mono text-sm font-semibold">
            R
          </span>
        </a>
        <p className="max-w-3xl bg-transparent text-center text-xs leading-5 text-graphite md:text-left">
          Ron Lenser Digital is an agency of one in Fredericksburg, Virginia. I
          build software with AI, which is the reason one person can ship in
          days what a ten person shop quotes months for. Websites, customer
          portals, internal dashboards, automations, and AI that answers your
          phone and books the work. I do not sell templates and I do not hand
          you off to an account manager. You talk to me, I build the thing, and
          you own all of it when it is done. If software is not the right fix
          for what is slowing your business down, I will tell you that on the
          first call.
        </p>
      </div>

      {/* link columns */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="border-b border-dotted border-hairline" />
        <div className="grid grid-cols-2 gap-8 py-10 leading-6 sm:grid-cols-3 md:flex md:justify-between">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="mb-3 font-mono text-[0.625rem] tracking-[0.16em] text-paper uppercase">
                {col.heading}
              </p>
              <ul className="flex flex-col space-y-2">
                {col.items.map(([label, href]) => (
                  <li key={label} className="flow-root">
                    <a
                      href={h(href)}
                      className="text-sm text-graphite transition-colors hover:text-paper md:text-xs"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="mb-3 font-mono text-[0.625rem] tracking-[0.16em] text-paper uppercase">
              Direct
            </p>
            <ul className="flex flex-col space-y-2">
              <li>
                <a
                  href={PHONE_HREF}
                  className="text-sm text-graphite transition-colors hover:text-paper md:text-xs"
                >
                  {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-sm break-all text-graphite transition-colors hover:text-paper md:text-xs"
                >
                  {EMAIL}
                </a>
              </li>
              <li className="text-sm text-graphite md:text-xs">
                Fredericksburg, Virginia 22401
              </li>
              <li className="text-sm text-graphite md:text-xs">
                Mon to Sat, 8 to 7
              </li>
            </ul>
          </div>
        </div>
        <div className="border-b border-dotted border-hairline" />
      </div>

      {/* socials + top */}
      <div className="flex flex-wrap justify-center gap-y-6">
        <div className="flex flex-wrap items-center justify-center gap-4 px-6">
          <a href={`mailto:${EMAIL}`} aria-label="Email" className={pill}>
            <Mail strokeWidth={1.5} className="h-5 w-5" />
          </a>
          <a href={PHONE_HREF} aria-label="Phone" className={pill}>
            <Phone strokeWidth={1.5} className="h-5 w-5" />
          </a>
          <BrandLink
            label="Facebook"
            href="https://www.facebook.com/ronlenserdigital"
            path={SOCIAL_PATHS.facebook}
          />
          <a
            href="https://linkedin.com/in/ronlenser"
            aria-label="LinkedIn"
            rel="noreferrer"
            target="_blank"
            className={pill}
          >
            <span className="grid h-5 w-5 place-items-center font-mono text-xs font-semibold">
              in
            </span>
          </a>
          <BrandLink
            label="GitHub"
            href="https://github.com/ronlenserdigital"
            path={SOCIAL_PATHS.github}
          />

          <div className="ml-2 flex items-center rounded-full border border-dotted border-hairline px-4 py-2">
            <button
              type="button"
              onClick={handleScrollTop}
              className="text-graphite transition-colors hover:text-paper"
            >
              <ArrowUp className="h-4 w-4" />
              <span className="sr-only">Back to top</span>
            </button>
          </div>
        </div>
      </div>

      {/* credit */}
      <div className="mx-auto mt-10 mb-10 flex flex-col justify-between text-center text-xs md:max-w-7xl">
        <div className="flex flex-row flex-wrap items-center justify-center gap-1 text-graphite">
          <span>&copy;</span>
          <span>{new Date().getFullYear()}</span>
          <span>Ron Lenser Digital. Built with AI in Fredericksburg, Virginia by</span>
          <a
            href={PHONE_HREF}
            className="cursor-pointer font-bold text-paper transition-colors hover:text-graphite"
          >
            Ron Lenser
          </a>
        </div>
        <nav aria-label="Legal" className="mt-3 flex justify-center gap-5 text-graphite">
          <a href="/privacy" className="transition-colors hover:text-paper">
            Privacy
          </a>
          <a href="/terms" className="transition-colors hover:text-paper">
            Terms
          </a>
          <a href="/sitemap.xml" className="transition-colors hover:text-paper">
            Sitemap
          </a>
        </nav>
      </div>
    </footer>
  );
}
