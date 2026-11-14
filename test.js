global.Astronomy = require(process.argv[2]);
const assert = require('assert'), c = require('./core.js');
const start = Date.UTC(2026, 10, 14), eph = c.ephemeris(start, 24 * 30);
// 1) sub-Earth point must match astronomy-engine's libration (a few tenths of a degree: mean-Earth vs principal-axis frame)
let worst = 0;
for (let i = 0; i < eph.length; i += 24) {
  const e = eph[i].earth, lat = Math.asin(e[2] / Math.hypot(...e)) * 180 / Math.PI, lon = Math.atan2(e[1], e[0]) * 180 / Math.PI;
  const L = Astronomy.Libration(new Date(eph[i].ms));
  worst = Math.max(worst, Math.abs(lat - L.elat), Math.abs(lon - L.elon));
}
console.log('max sub-Earth diff vs Libration(): ' + worst.toFixed(2) + ' deg');
assert(worst < 0.5);
// 2) Sun is within 1.6 deg of horizon at the pole (obliquity 1.54 + parallax); Earth at pole is within libration
const pole = c.evalSite({ lat: -89.9, lon: 0 }, eph);
assert(Math.max(...pole.map(p => Math.abs(p.sun))) < 2);
for (const s of [{ n: 'Shackleton', lat: -89.9, lon: 0 }, { n: 'Malapert', lat: -85.9, lon: 0 }, { n: 'Nobile', lat: -85.2, lon: 53.5 }])
  console.log(s.n, JSON.stringify(c.metrics(c.evalSite(s, eph), 0)));
