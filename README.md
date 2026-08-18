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

## Tokens

`src/index.css` under `@theme`. paper `#E9E5DA`, ink `#12110F`, cobalt `#2536FF`.
Bricolage Grotesque / Instrument Sans / IBM Plex Mono.

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

### Token mapping

Any shadcn component you paste in uses these variable names. Swap them:

| shadcn | ours |
|---|---|
| `bg-background` | `bg-paper` |
| `text-foreground` | `text-ink` |
| `border-input` | `border-hairline` |
| `text-muted-foreground` | `text-graphite` |
| `ring-ring` | `ring-cobalt` |
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
