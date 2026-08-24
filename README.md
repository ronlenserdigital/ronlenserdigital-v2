# ronlenserdigital.com v2

## Positioning

Ron builds with AI: Vercel, Supabase, Claude, Claude Code, Grok. He does not
hand code and the site must never claim he does. He is not a website shop, he
builds whatever the problem needs: sites, apps, portals, internal tools,
automations, AI answering.

The pitch is speed and scope, not craft. One person with an AI stack shipping
in days what a ten person shop quotes in months. Do not reintroduce "written
by hand", "no page builders", or "line by line" copy.

React 18 + Vite 6 + Tailwind v4 + Lenis. Zero animation libraries, all motion
lives in `src/lib/motion.js`.

## Run

```
npm install
npm run dev
```

## Sections

| Order | Component | File |
|---|---|---|
| Preloader, status bar, nav, menu overlay, cursor | Chrome | `components/Chrome.jsx` |
| Hero, claims marquee, statement | Top | `components/Top.jsx` |
| Work filmstrip, capabilities, process, results | Work | `components/Work.jsx` |
| Testimonials, clients, pricing, contact card, closing | Social | `components/Social.jsx` |

## Motion primitives (`src/lib/motion.js`)

| Hook | Does |
|---|---|
| `useInView` | fires once on enter |
| `useCountUp` | eased number count |
| `useScramble` | glyph decode into text |
| `useMagnetic` | element pulls toward cursor |
| `useClock` | live ticking time |
| `useAvailability` | open / closed vs studio hours |

All of them no-op under `prefers-reduced-motion`.

## Editing content

Every section reads from a plain array at the top of its file.

- `PROJECTS` and `FILTERS` in `Work.jsx`
- `CAPS`, `STEPS`, `RESULTS` in `Work.jsx`
- `QUOTES`, `CLIENTS`, `OFFERS`, `ROUTES` in `Social.jsx`
- `LINES`, `CLAIMS` in `Top.jsx`
- `LINKS` in `Chrome.jsx`

## Before launch

- [ ] Replace `QUOTES` with real testimonials. They are placeholders.
- [ ] Replace `PROJECTS` and `CLIENTS` with real work.
- [ ] Drop screenshots or video into the Work cards (marked in `Work.jsx`).
- [ ] Add a headshot for the contact card.
- [ ] Verify every number in `RESULTS` is true.

## Palette and type

Matched to the live ronlenserdigital.com.

| Token | Value | Use |
|---|---|---|
| `ink` | `#000000` | page background |
| `ink-soft` | `#0E0E0E` | cards, form fields, plates |
| `paper` | `#FFFFFF` | text |
| `paper-deep` | `#F5F5F7` | |
| `graphite` | `#A1A1A1` | muted text |
| `hairline` | `#262626` | borders |
| `accent` | `#FFFFFF` | the site is monochrome, there is no colour accent |

Outfit (display and hero name), Geist (body), Geist Mono (labels).

The page is dark by default: `body` is `ink`, text is `paper`. Anything that
needs to sit above the page uses `ink-soft`, never `paper`. Watch for
`text-ink` on a dark surface, that is invisible text.

The site is monochrome: black, white, and the greys between. The only colour
on the page is Ron's skin tone in the ASCII grid, which comes from the photo
itself. There is no yellow, no amber, no blue.

`--color-accent` still exists as a token so a colour can be reintroduced in
one line, but it is currently white. If you set it to a real colour, check
the buttons that use `hover:bg-paper-deep`, since those were switched off
`hover:bg-accent` when white made that hover invisible.

### Chrome

- Header carries the wordmark only.
- The circular dock at top right is the menu: call, text, email, quote.
- The tubelight rail handles section navigation.
- No hamburger, no full screen overlay. One control per job.

### Token mapping (for pasting shadcn components)

| shadcn | ours |
|---|---|
| `bg-background` | `bg-ink` |
| `text-foreground` | `text-paper` |
| `border-input` | `border-hairline` |
| `text-muted-foreground` | `text-graphite` |
| `ring-ring` | `ring-accent` |
| `bg-accent` | `bg-ink-soft` |

## Quote form

`components/Quote.jsx` posts to Web3Forms. Set your key:

```
cp .env.example .env
# paste your key into VITE_WEB3FORMS_KEY
```

Also add `VITE_WEB3FORMS_KEY` in Vercel under Settings, Environment Variables.
Without it the form renders but submissions fail.

Service options live in the `SERVICES` array at the top of the file.

## Quick actions dock

`components/QuickActions.jsx` mounts a fixed circular menu bottom right that
fades in after half a viewport of scroll. Call, text, email, quote.

Phone and email live in the `PHONE` and `EMAIL` constants at the top of that
file. Change them in one place.

Built on `ui/fluid-menu.jsx`, ported from 21st.dev. Changes on the way in:

- JSX, RLD tokens, no dark mode variants
- dropped the unused `Menu` dropdown export, the Nav already covers that
- removed the dead `useRef` / `useEffect` imports in the original
- click outside to close, Escape to close with focus returned to the toggle
- icon-only buttons carry a real `aria-label`
- labels slide out on hover and on keyboard focus
- collapsed items are `tabIndex={-1}` so tabbing does not land on invisible buttons
- container height animates so it never traps clicks under it
- `MenuItem` takes `href` and renders an anchor, so `tel:` and `sms:` work

### Using it elsewhere

```jsx
<MenuContainer label="Quick actions">
  <MenuItem label="Menu" icon={<MenuIcon size={24} strokeWidth={1.5} />} />
  <MenuItem label="Call" href="tel:+15403956493" icon={<Phone size={22} />} />
  <MenuItem label="Do a thing" onClick={fn} icon={<Star size={22} />} />
</MenuContainer>
```

First child is always the toggle. The rest fan out below it.

## Section rail (tubelight navbar)

`components/SectionRail.jsx` wires `ui/tubelight-navbar.jsx` to five section
anchors. Top centre on desktop, bottom centre on mobile as icons.

Ported from 21st.dev. Changes on the way in:

- `<a>` instead of `next/link`, this is Vite
- **no framer-motion.** The lamp glide is a measured sliding indicator using a
  CSS transition. Same effect, saves about 35 kB gzipped, which was more than
  half the entire bundle for one animated pill.
- scroll spy via IntersectionObserver, so the active pill follows the section
  in view rather than only changing on click
- `aria-current` on the active link, `sr-only` labels behind the mobile icons
- re-measures on resize and on `document.fonts.ready` so the pill never drifts
- indicator snaps instead of gliding under `prefers-reduced-motion`

### Collisions this resolved

- Removed the duplicate inline nav links from `Chrome.jsx`. The rail owns
  section navigation now; the header keeps the logo, Book a call, and the
  hamburger for the full menu.
- The original mounts `bottom-0` on mobile, on top of the QuickActions dock.
  QuickActions is now `bottom-44` on mobile to clear it.
- Added `scroll-margin-top` on `section[id]` so anchor jumps do not land
  under the fixed bar.

Adding or removing an item means editing `ITEMS` in `SectionRail.jsx`. Five is
about the ceiling before pills get cramped on a small phone. Deep links
(Capabilities, Results) stay in the menu overlay.

## Footer

`ui/footer-section.jsx`. Ported from the 21st.dev designali footer with
**zero new dependencies**.

| Original | Here | Why |
|---|---|---|
| `dicons` package | lucide (already installed) + the brand paths already inlined in `brand-marks.js` | one less dependency for four icons |
| `next-themes` light/dark toggle | removed | this site is black. The sun and moon buttons had nothing to switch. |
| `next/link` | `<a>` | Vite, not Next |
| Six columns of invented pages | four columns of things that exist on this page | every link resolves to a real anchor |
| "Made with heart by Ali Imam" | Ron's credit line | |
| Placeholder agency blurb | Ron's actual positioning | |

Kept from the original: the dotted borders, the centre pill, and the
lift-on-hover social row, which is the character of that footer.

### Socials

Email, phone, Facebook, LinkedIn, GitHub. Only accounts that exist.

LinkedIn renders as a mono `in` pill rather than an icon. Like OpenAI,
LinkedIn asked to be removed from the Simple Icons CC0 set, so there is no
official path to inline, and redrawing a mark a company specifically asked
not to have redistributed is not worth it for a footer icon.

## Parallax break

`ui/parallax-layers.jsx`, mounted between Statement and Work. Four layers at
different travel speeds: ghost wordmark furthest back, then a back plate, the
message, then a front plate.

Ported from the Osmo / 21st.dev parallax component. Zero new dependencies.

| Original | Here | Why |
|---|---|---|
| `new Lenis()` inside the component | reads scroll, app's single Lenis drives it | **Two Lenis instances fight over scrollTop every frame and break scrolling site wide.** This was the real bug in that snippet. |
| `gsap` + `ScrollTrigger` | `useParallax` in `lib/motion.js` | ~50 kB gzipped to translate four layers. It is a lerp and a transform. |
| `@studio-freight/lenis` | already have `lenis` | Deprecated package name. Installing it ships two copies of the same library. |
| Osmo CDN images | typography and plates | Someone else's artwork. This site sells original work. |
| `.parallax__*` classes | Tailwind | Those classes were never included in the snippet, so it rendered unstyled as delivered. |

### Only ever one Lenis

`App.jsx` owns the single instance. Any scroll-driven component you add from
here reads position with `useParallax` or a plain listener. If you paste
something that calls `new Lenis()`, delete that line before anything else.

### Swapping in real images

Layer 2 is a wide plate, layer 4 is a smaller front crop. Both are marked in
the file. Replace the `div` with an `img` at the same size and rotation and
the parallax keeps working. Travel amounts live in the `LAYERS` array.

## BlurText

`ui/blur-text.jsx`. Segments text by word or letter and lifts each one out of
a blur when it scrolls into view.

```jsx
<BlurText as="h2" text="Every line of it, typed." animateBy="letters" delay={26} />
```

| Prop | Default | Notes |
|---|---|---|
| `text` | required | plain string, not children |
| `as` | `"p"` | any tag |
| `animateBy` | `"words"` | or `"letters"` |
| `delay` | `60` | ms between segments |
| `direction` | `"top"` | or `"bottom"` |
| `blur` | `10` | starting blur in px |

Used on the hero paragraph, the statement headline, and the parallax heading.
Keep it to a handful of places. Every heading blurring in reads as a gimmick.

### What was left behind

This was extracted from the 21st.dev portfolio-hero. The rest of that
component was not taken, because it would have:

- replaced the pitch headline with a name, turning a sales page into a folio
- toggled a `.dark` class this theme does not use
- hardcoded `#C3E41D` acid lime, a direction already rejected
- added a third navigation on top of the header menu and the section rail
- shipped a stock Unsplash headshot
- pulled in Fira Code, Antic and Brush Script MT against Fraunces

Two bugs fixed on the way in: the original's cleanup reads `ref.current`
inside a stale closure and can skip unobserve, and it animates regardless of
`prefers-reduced-motion`.


## Hero

Name led, adapted from the 21st.dev portfolio-hero.

`RON` / `LENSER` stacked in Fraunces at `clamp(4rem, 17vw, 13rem)`, oxblood
accent, with the portrait masked into a tall oval sitting between the two
lines. Tagline blurs in below, then the CTA, then the scroll cue.

### Headshot

Drop a portrait at `public/ron.jpg`. Roughly 600x1000, face centred in the
upper third. The mask is a tall rounded oval, so a square crop will look
wrong. Until that file exists the hero renders a labelled placeholder rather
than a broken image.

### What was dropped from the original

- the `.dark` class toggle, this theme runs on tokens
- the third navigation, the header menu and section rail already cover it
- the hardcoded `#C3E41D` acid lime
- the stock Unsplash headshot
- Fira Code, Antic and Brush Script MT

### What was added

A CTA. The original hero has no call to action at all, which is fine for a
portfolio and wrong for a page whose job is booking calls.

### Where the old headline went

"Everyone uses the same template. You won't." moved down into the Statement
section, at `text-mega` with the outline treatment on `same`. The pitch is
still on the page, it just sits second now behind the name.

### Hero fonts

The hero matches the source component rather than the site face:

| Element | Face | Token |
|---|---|---|
| RON / LENSER | Fira Code 700 | `--font-name` |
| Tagline | Antic | `--font-tagline` |
| Everything else | Fraunces / Inter Tight / Martian Mono | `--font-display` etc |

Scoped to the hero only, via `.font-name` and `.font-tagline`. To revert the
name to the site face, swap `font-name` for `display` on the `h1`.

## ASCII hero

`ui/ascii-canvas.jsx` renders a source into a grid of monospace glyphs,
brightness mapped to a density ramp, with a barrel curve so the grid bows
like a CRT.

Written from scratch. No gsap, no three, no shader library: a downscaled
offscreen draw, one `getImageData` per frame, and `fillText`.

```jsx
<AsciiCanvas src="/ron.jpg" />          // what the hero uses
<AsciiCanvas src="/reel.mp4" />         // video works the same way
<AsciiCanvas />                         // procedural figure only
```

The default source is a lit head and shoulders figure, drawn on canvas, that
breathes and sways. When `src` is supplied it renders that instead. If the
file is missing or fails to load it falls back to the figure rather than
stalling on a broken frame, so the hero never looks broken.

### Getting a good headshot into the grid

Put it at `public/ron.jpg`. The grid reads contrast, not detail:

- head and shoulders, centred
- one strong light source, one side of the face clearly brighter
- plain or blown out background
- about 1200x900 landscape
- high contrast beats high resolution every time

| Prop | Default | Notes |
|---|---|---|
| `src` | none | image or video URL. Omit for procedural metaballs. |
| `cols` | `132` | grid width in characters. Higher is finer and slower. |
| `fps` | `24` | frame cap. The grid does not need 60. |
| `curve` | `0.16` | barrel bow. `0` is flat. |

### Colour

Glyphs take their colour from the source pixel, so the face renders in Ron's
actual skin tone rather than a tint. Sampled off the original photo:

| | |
|---|---|
| skin highlight | `#ECC6AF` |
| skin midtone | `#E0A887` |

`public/ron.jpg` is kept in colour for this reason. It is processed with the
tone curve applied to luminance only, chroma carried along, so skin stays
skin through the contrast lift. Saturation is pushed 1.45x, because a face
reduced to 6px glyphs loses apparent colour.

The renderer lifts hot spots toward white and floors dark cells so they read
as glyphs rather than mud. The hood and jacket stay neutral on their own,
since they are neutral in the photo.

### Motion

Three behaviours, all driven off one `reveal` value per cell:

| | |
|---|---|
| **Resolve** | on load the grid is noise and the image assembles out of it, cell by cell. Order is fixed by a per-cell threshold field biased toward the centre, so the face lands before the edges. Not a fade: each glyph scrambles, then locks. |
| **Breathe** | once settled, cells flicker on a slow sine offset by their own noise value, so it never reads as a static image. |
| **Dissolve** | scrolling past the hero runs the resolve backwards and the face falls apart into noise. |

`intro` controls the resolve duration in ms, default `1900`.

Performance: pauses via IntersectionObserver when off screen, capped at 24fps,
renders one settled frame under `prefers-reduced-motion`. If it stutters on a
low end phone, drop `cols` to about 90.

There is no page preloader. The resolve is the load animation.

### Hero structure

Pill nav top left, grid filling the frame, headline bottom left, scroll dot on
the right edge. The tubelight rail and the old header are gone: the pill nav
handles sections, the dock at top right handles contact.

### On the reference

The technique is reproduced, not the page. The grid content is procedural and
ours. Do not paste in their copy, their layout proportions, or their assets.


## FAQ

`ui/faq-section.jsx`, two columns, one open item per column.

Ported from the 21st.dev faqsection with **zero new dependencies**. The
original wants `@radix-ui/react-accordion`, `@radix-ui/react-slot`,
`@radix-ui/react-icons`, `class-variance-authority` and `tw-animate-css`,
plus the shadcn Button and Accordion files, to open and close a panel.

The open/close is a `grid-template-rows` transition from `0fr` to `1fr`,
which animates to auto height in pure CSS with no measurement, no keyframes
and no library. The plus icon rotates 45 degrees into a minus.

Questions live in the `LEFT` and `RIGHT` arrays at the top of the file. They
are the real objections that come up on a call, including the AI one head on.
Keep them that way: an FAQ full of questions nobody asks is filler.

## Removed: portfolio

The Work filmstrip is gone. It was five placeholder cards and a filter bar
with nothing behind it, which read worse than having no work section at all.
When there are real projects with real screenshots, it can come back from
git history.

Section numbers now run 01 to 09 with no gaps:

`01` Statement · `02` Capabilities · `03` Process · `04` Results ·
`05` Testimonials · `06` FAQ · `07` Pricing · `08` Contact · `09` Quote


## Hero (hero-section-9)

Centred headline, subhead, two CTAs, then a tilted plate. Ported from the
21st.dev hero-section-9.

| Original | Here |
|---|---|
| `next/link` | `<a>`, this is Vite |
| shadcn `Button` + radix slot + cva | plain anchors. Three packages to style a link. |
| `bg-white` with `dark:` variants | our tokens |
| Two `<img>` from the Tailark CDN | **a live browser frame rendering this site** |
| "Your favorite companies are our partners" + 11 scraped customer logos | "The tools I build with" + the actual stack |

### The plate is not a screenshot

`SiteFrame` in `Top.jsx` is browser chrome with `ronlenserdigital.com` in the
URL bar and a real `AsciiCanvas` running inside it. There is no image to
re-export every time the page changes, and nothing to go stale.

### Stack strip

`ui/stack-strip.jsx` renders `BRANDS` from `ui/brand-marks.js`.

Real brand marks. Path data comes from **Simple Icons**, which is CC0. The
trademarks stay with their owners; using them to say "these are the tools I
build with" is nominative use, which is exactly what this strip is.

Paths are **inlined, not hotlinked**. Nothing breaks when a company
redesigns, and the page makes no third party request on load. `simple-icons`
is a devDependency only and is never shipped.

Everything renders in `currentColor` so the strip stays monochrome: grey at
rest, white on hover. Each entry keeps its official `hex` in case the strip
ever goes full colour.

Current marks: Claude, Claude Code, Grok, GitHub, Vercel, Supabase,
Cloudflare, React, Tailwind, Figma, Stripe, Resend.

**Two notes on what is missing.** OpenAI and ChatGPT are not in the CC0 set,
OpenAI asked to be removed from it, so there is no official mark to inline and
ChatGPT is not in the strip. Grok uses the X mark, since xAI ships Grok and
there is no separate Grok icon in the set.

To regenerate or add one:

```
npm i -D simple-icons
node -e "const si=require('simple-icons'); ..."   // pull path and hex by title
```

## Removed: portfolio

The Work filmstrip is gone. It was five placeholder cards and a filter bar
with nothing behind it, which read worse than having no work section at all.
When there are real projects with real screenshots, it can come back from
git history.

Section numbers now run 01 to 09 with no gaps:

`01` Statement · `02` Capabilities · `03` Process · `04` Results ·
`05` Testimonials · `06` FAQ · `07` Pricing · `08` Contact · `09` Quote


## Hero (hero-section-9)

Centred headline, subhead, two CTAs, then a tilted plate. Ported from the
21st.dev hero-section-9.

| Original | Here |
|---|---|
| `next/link` | `<a>`, this is Vite |
| shadcn `Button` + radix slot + cva | plain anchors. Three packages to style a link. |
| `bg-white` with `dark:` variants | our tokens |
| Two `<img>` from the Tailark CDN | **a live browser frame rendering this site** |
| "Your favorite companies are our partners" + 11 scraped customer logos | "The tools I build with" + the actual stack |

### The plate is not a screenshot

`SiteFrame` in `Top.jsx` is browser chrome with `ronlenserdigital.com` in the
URL bar and a real `AsciiCanvas` running inside it. There is no image to
re-export every time the page changes, and nothing to go stale.

### Stack strip

`ui/stack-strip.jsx`. Claude, Claude Code, Grok, ChatGPT, GitHub, Vercel,
Supabase, Cloudflare, Figma, Stripe, Resend, Tailwind.

Original geometric glyphs at one size with the wordmark in mono, not scraped
brand SVGs. Hotlinking eleven companies' logo files gives eleven different
visual weights, dead links when any of them redesigns, and reproduced
trademarks on a commercial page. Add a tool by pushing to `TOOLS`.

## Removed

- **QuickActions dock.** The new nav carries Call and Get a quote in the same
  corner. Two controls for one job.
- **Clients marquee.** It listed six invented businesses.
- **Testimonials.** Every quote read "Placeholder".

Sections now run `01` Statement, `02` Capabilities, `03` Process,
`04` Results, `05` FAQ, `06` Pricing, `07` Contact, `08` Quote.


## No hover cursor

The cursor disc is gone: the component, the CSS, and every `data-cursor`
attribute. Do not reintroduce it. Buttons show state through their own
background and border, which is enough.


## No prices on the page

Deliberate. There is no price list anywhere on the site and no dollar figure
in any section, FAQ answer, form option or stat tile. The form is the only
route to a number.

If you reintroduce a price, you have to keep it true in five places at once:
the pricing section, the FAQ, the quote form dropdown, the results grid and
the meta description. That is why they are all gone instead.

`Pricing` in `Social.jsx` now explains *how* pricing works (fixed not hourly,
scoped per project, nothing monthly for the build) and sends people to the
form.

## Domain and hosting

The client buys and owns their own domain and hosting, in their name, on their
card. Ron sets it up and connects it, but the accounts stay theirs. This is
answered directly in the FAQ, because it is the thing that causes arguments
later if it is left vague.

## FAQ layout

Centred heading, no numbered section label, two balanced columns of six and
five underneath. Sections either side are numbered `05` Pricing, `06` Contact,
`07` Quote.


## Runtime dependencies

Four, after fourteen component ports: `react`, `react-dom`, `lenis`,
`lucide-react`.

Everything else those components asked for was declined and rebuilt: radix
accordion, radix slot, radix tooltip, radix label, radix switch, radix icons,
class-variance-authority, clsx, tailwind-merge, framer-motion, gsap,
@studio-freight/lenis, dicons, next-themes, tw-animate-css.


## Process (how-it-works)

`ui/how-it-works.jsx`. Four step cards with an icon, a duration, a
description and three bullets each.

Ported from the 21st.dev how-it-works. Changes:

- shadcn theme variables mapped to ours: `bg-card` to `bg-ink-soft`,
  `text-primary` to `text-paper`, `bg-muted` to `bg-ink`, `border` to hairline
- **generalised from hardcoded three columns to N.** The connector line and the
  number row are computed from `STEPS.length`, so a fifth step will not break
  the alignment. The original hardcodes `left-[16.6667%] w-[66.6667%]`, which
  is only correct for exactly three.
- four across on desktop, two on tablet, one on phone. The connector only
  draws where all four sit on one row; below that each card carries its own
  number instead.
- a duration chip per card, since "how long does this take" is the question
  the section exists to answer.

Steps live in `STEPS` at the top of the file.

## Removed

`Testimonials` in `Social.jsx` was dead code, exported but unmounted since the
placeholder quotes were pulled. Deleted.

Sections now run `01` Statement, `02` Capabilities, Process (its own card
layout, unnumbered), `03` Results, FAQ (centred, unnumbered), `04` Pricing,
`05` Contact, `06` Quote.


## What I do (process overview)

`ui/what-i-do.jsx`. Pitch column on the left, six capability cards on the
right in two columns.

Ported from the 21st.dev how-we-do-it process overview. Changes:

- no shadcn `Button`, so no `@radix-ui/react-slot` and no
  `class-variance-authority`. Three packages to style one link.
- shadcn theme variables mapped to ours: `bg-card` to `bg-ink-soft`,
  `text-primary` to `text-paper`, `border` to hairline
- the decorative rule is sized to the card instead of hanging a pixel outside
  it, which the original does with `-left-[1px]`

Cards live in `ITEMS`: Websites, Web apps, Internal tools, Automations, AI
answering, Getting found.

The left column leads with "Not a website guy" and the line that matters:
most of the time the site is not the thing costing you money.

## File rename

`components/Work.jsx` is now `components/Sections.jsx`. It has held no work
section since the portfolio was removed; what is left is the shared `Section`
shell and `Results`.


## No section numbers

The `01 / WHY IT MATTERS` labels are gone from every section. Do not
reintroduce them.

They existed to justify a narrow left column that held nothing else, which
meant a quarter of the width on most sections was empty. With the numbers
removed, the shell was rebuilt.

## Section shell

`Section` in `Sections.jsx` is now a centred header over full width content:

```jsx
<Section id="results" title="..." intro="...">{children}</Section>
```

`eyebrow`, `title` and `intro` are all optional; pass none and you get a plain
centred container. There is no label column and no `bare` flag any more.

Sections rebuilt to remove dead space:

- **Statement** — centred, rule under the headline, two columns of body text
  instead of one column offset right
- **Results** — even three across on a hairline grid, filled cells. The old
  version staggered every second tile down with a margin, which left holes.
- **Pricing** — centred header, cards edge to edge, CTA centred
- **Contact** — photo column widened and the empty gutter column between it
  and the copy removed, then filled with call and form buttons
- **Quote** — centred header over a single column form rather than a sticky
  label beside it

## SEO and AEO layer

Everything a crawler or AI engine needs is baked into static HTML at build
time. `npm run build` runs Vite, then `scripts/prerender.mjs`, which renders
every route to HTML with its own head tags and writes `sitemap.xml` and
`404.html`. React hydrates on top in the browser.

- `src/seo.js` is the only place business facts, titles, descriptions and
  JSON-LD live. Change it once.
- Schema on the home page: ProfessionalService + LocalBusiness, Person,
  WebSite, WebPage, FAQPage (fed from the visible FAQ so they cannot drift).
- `public/robots.txt` allows every search and AI crawler by name.
- `public/llms.txt` is a plain text fact sheet for AI engines.
- `vercel.json` sets security headers, long cache on hashed assets, clean URLs.
- Analytics: Vercel Web Analytics and Speed Insights, cookieless, production only,
  visible only in the Vercel dashboard.

Routes: `/`, `/privacy`, `/terms`. Anything else is the custom 404.
