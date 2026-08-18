# ronlenserdigital.com v2

React 18 + Vite 6 + Tailwind v4 + Lenis smooth scroll.

## Run it

```
npm install
npm run dev
```

Open http://localhost:5173

## Deploy to Vercel

Push to GitHub, import the repo in Vercel. It auto-detects Vite.
Framework: Vite. Build: `npm run build`. Output: `dist`.

## Design tokens

All in `src/index.css` under `@theme`. Change one value, whole site updates.

| Token | Value |
|---|---|
| paper | #E9E5DA |
| ink | #12110F |
| cobalt | #2536FF |
| graphite | #6E6A61 |
| hairline | #C9C3B4 |

Display: Bricolage Grotesque. Body: Instrument Sans. Utility: IBM Plex Mono.

## Where to put your content

- `src/components/Body.jsx` -> `PROJECTS` array. Swap the placeholder div for
  `<img>` or `<video autoplay muted loop playsinline>`.
- `src/components/Body.jsx` -> `STEPS` and `OFFERS` arrays.
- `src/components/Top.jsx` -> `HERO_LINES` and `CLAIMS`.

## Notes

- Work section is a pinned horizontal scroll. Its height is `340vh`. If you add
  or remove projects, adjust that height and the `shift` multiplier (currently 62).
- Add `data-cursor="LABEL"` to any element to make the cobalt disc appear over it.
- Everything respects `prefers-reduced-motion`.
