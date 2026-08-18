# ronlenserdigital.com v2

React 18 + Vite 6 + Tailwind v4 + Lenis. Zero animation libraries, all motion
is hand written in `src/lib/motion.js`.

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

## Direction: Oxblood

Locked. The other two directions were removed.

| Token | Value |
|---|---|
| `ink` | `#12100E` |
| `ink-soft` | `#1E1B18` |
| `paper` | `#F4F1E9` |
| `paper-deep` | `#E6E1D5` |
| `graphite` | `#79726A` |
| `hairline` | `#CFC7B8` |
| `accent` | `#9B1B1B` |
| `accent-ink` | `#F4F1E9` |

Fraunces (display, opsz 144 with WONK on) / Inter Tight (body) / Martian Mono
(labels). All in `src/index.css` under `@theme`.

## Layout grid

Every section runs through the shared `Section` shell in `Work.jsx`:
a sticky numbered label in a narrow left column, content offset to the right.
Page padding is `px-5 md:px-8` everywhere, no exceptions.

```jsx
<Section id="pricing" num="08" label="What it costs">...</Section>
<Section id="results" num="06" label="The numbers" bare>...</Section>
```

`bare` drops the offset so content spans full width under the label.

### Token mapping (for pasting shadcn components)

Any shadcn component you paste in uses these variable names. Swap them:

| shadcn | ours |
|---|---|
| `bg-background` | `bg-paper` |
| `text-foreground` | `text-ink` |
| `border-input` | `border-hairline` |
| `text-muted-foreground` | `text-graphite` |
| `ring-ring` | `ring-accent` |
| `bg-accent` | `bg-paper-deep` |

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

`ui/footer-section.jsx`. Ported from 21st.dev with **zero new dependencies**.

The original wanted six: `@radix-ui/react-slot`, `class-variance-authority`,
`@radix-ui/react-label`, `@radix-ui/react-switch`, `@radix-ui/react-tooltip`,
plus the shadcn Button / Input / Label / Switch / Textarea files. All of that
for a footer. Skipped every one.

What changed and why:

| Original | Here | Why |
|---|---|---|
| Dark mode `Switch` | removed | This site themes off `data-dir`, not a `.dark` class. That toggle would have fought the direction system. |
| Newsletter form | live availability panel + Call now | There is no newsletter. A subscribe box that goes nowhere is a dead CTA. |
| Facebook, Twitter, Instagram, LinkedIn | Facebook, LinkedIn | Only the accounts that exist. |
| Radix `Tooltip` | CSS hover label | Same pattern as `fluid-menu.jsx`. One dependency saved. |
| Placeholder address and phone | real ones | |
| `Textarea` imported, never used | removed | Dead import in the source. |

### Brand icons

`lucide-react` v1 dropped all brand icons (Facebook, LinkedIn, Twitter, etc)
for trademark reasons. They are inlined as SVG in `footer-section.jsx` rather
than adding a second icon package. If you add another social account, write
its mark the same way.

### No legal links yet

The original footer links Privacy Policy, Terms of Service and Cookie
Settings. Those are not linked here because those pages do not exist. Linking
to 404s on a site selling web work is worse than omitting them. Add the pages,
then add the links.

### Duplicate rows removed

`Closing` in `Social.jsx` used to repeat phone, email, location and the
copyright line. Those rows were trimmed. `Closing` is now the big CTA and the
three routes; the footer owns contact details.

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
