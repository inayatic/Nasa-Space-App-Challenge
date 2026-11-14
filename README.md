# Polar Window

Compare Moon south-pole landing sites and dates: when is the Sun up, when is Earth in view, and when are both.

- Open `index.html` in a browser (self-contained, works offline). Deploy as a static site (Vercel, GitHub Pages).
- `core.js`: Sun/Earth elevation maths. `src.html`: UI source. `index.html` = `src.html` + `core.js` + Astronomy Engine (MIT) inlined.
- Check: `npm i astronomy-engine && node test.js node_modules/astronomy-engine/astronomy.js`

Limits: smooth-sphere model, terrain only as a single horizon-angle slider; site coordinates are approximate.
