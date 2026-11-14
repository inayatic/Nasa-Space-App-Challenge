# Polar Window

Compare Moon south-pole landing sites and dates: when is the Sun up, when is Earth in view, and when are both.

- Open `index.html` in a browser (self-contained, works offline). Deploy as a static site (Vercel, GitHub Pages).
- `core.js`: Sun/Earth elevation maths. `src.html`: UI source. `index.html` = `src.html` + `core.js` + Astronomy Engine (MIT) inlined.
- Check: `npm i astronomy-engine && node test.js node_modules/astronomy-engine/astronomy.js`

Limits: smooth-sphere model, terrain only as a single horizon-angle slider; site coordinates are approximate.

## NASA data
Map background: LRO WAC south-pole mosaic (`LRO_WAC_Mosaic_SPole60_100mp`, NASA/GSFC/Arizona State University) loaded live as tiles from NASA Moon Trek (trek.nasa.gov). Sun/Earth positions are computed with Astronomy Engine and the IAU Moon rotation model; they are not NASA data.
