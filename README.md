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

## Visual directions

Three complete directions live in `src/index.css`. Switch with the control
bottom left in dev, or append `?pick` to any deployed URL.

| id | Palette | Display face |
|---|---|---|
| `volt` | black, bone, acid lime `#D6FF3E` | Syne 800 |
| `steel` | concrete, charcoal, safety orange `#FF5C00` | Archivo 900 at 118 width |
| `oxblood` | near black, warm bone, deep red `#9B1B1B` | Fraunces 700 |

Token names stay the same across all three, so every component keeps working:
`ink`, `ink-soft`, `paper`, `paper-deep`, `graphite`, `hairline`, `accent`,
`accent-ink`.

Once a direction is picked: set `data-dir` on `<html>` in `index.html`, delete
the other two blocks in `index.css`, delete `components/DirectionSwitch.jsx`
and its mount in `App.jsx`, and trim `index.html` to just that direction's
fonts.

### Token mapping (for pasting shadcn components)

## Deploy

Vercel auto-detects Vite. Build `npm run build`, output `dist`.

## UI primitives

`src/components/ui/` holds reusable form primitives. Ported from shadcn /
originui, but mapped onto our own tokens with no external dependencies.

| File | Exports |
|---|---|
| `ui/select-native.jsx` | `SelectNative` |
| `ui/label.jsx` | `Label` |
| `ui/field.jsx` | `Input`, `Textarea` |
| `lib/utils.js` | `cn()` |

Why `components/ui/` and not just `components/`: it separates dumb reusable
primitives from page sections that hold copy and layout. When you need a
button or an input in a future section you look in one folder, not through
five section files. It is also where shadcn expects components to live, so
anything you pull from 21st.dev drops in without changing its imports.

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
