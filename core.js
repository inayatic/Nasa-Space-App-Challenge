// Pure maths: Sun/Earth elevation at a lunar site. Needs the astronomy-engine global `Astronomy`.
const D2R = Math.PI / 180, RM = 1737.4, AU = 149597870.7, SUN_R = 0.2665; // Moon radius km, AU km, Sun semi-diameter deg
// IAU/IAU-2009 Moon orientation incl. libration terms (Archinal et al. 2011). d = days since J2000.
function moonFrame(d) {
  const T = d / 36525, s = Math.sin, c = Math.cos;
  const E = [0, [125.045, -0.0529921], [250.089, -0.1059842], [260.008, 13.0120009], [176.625, 13.3407154],
    [357.529, 0.9856003], [311.589, 26.4057084], [134.963, 13.0649930], [276.617, 0.3287146],
    [34.226, 1.7484877], [15.134, -0.1589763], [119.743, 0.0036096], [239.961, 0.1643573], [25.053, 12.9590088]]
    .map(e => e && (e[0] + e[1] * d) * D2R);
  const a0 = 269.9949 + 0.0031 * T - 3.8787 * s(E[1]) - 0.1204 * s(E[2]) + 0.07 * s(E[3]) - 0.0172 * s(E[4]) + 0.0072 * s(E[6]) - 0.0052 * s(E[10]) + 0.0043 * s(E[13]);
  const d0 = 66.5392 + 0.013 * T + 1.5419 * c(E[1]) + 0.0239 * c(E[2]) - 0.0278 * c(E[3]) + 0.0068 * c(E[4]) - 0.0029 * c(E[6]) + 0.0009 * c(E[7]) + 0.0008 * c(E[10]) - 0.0009 * c(E[13]);
  const W = 38.3213 + 13.17635815 * d - 1.4e-12 * d * d + 3.561 * s(E[1]) + 0.1208 * s(E[2]) - 0.0642 * s(E[3]) + 0.0158 * s(E[4]) + 0.0252 * s(E[5]) - 0.0066 * s(E[6]) - 0.0047 * s(E[7]) - 0.0046 * s(E[8]) + 0.0028 * s(E[9]) + 0.0052 * s(E[10]) + 0.004 * s(E[11]) + 0.0019 * s(E[12]) - 0.0044 * s(E[13]);
  return [a0 * D2R, d0 * D2R, W * D2R];
}
// J2000 equatorial vector -> Moon body-fixed vector
function toBody(v, [a0, d0, W]) {
  const a = a0 + Math.PI / 2, p = Math.PI / 2 - d0;
  let [x, y, z] = v;
  [x, y] = [x * Math.cos(a) + y * Math.sin(a), -x * Math.sin(a) + y * Math.cos(a)];
  [y, z] = [y * Math.cos(p) + z * Math.sin(p), -y * Math.sin(p) + z * Math.cos(p)];
  return [x * Math.cos(W) + y * Math.sin(W), -x * Math.sin(W) + y * Math.cos(W), z];
}
// Sun and Earth position (km, Moon-centred, body-fixed) at each hourly step
function ephemeris(startMs, steps) {
  const out = [];
  for (let i = 0; i < steps; i++) {
    const ms = startMs + i * 3600e3, t = Astronomy.MakeTime(new Date(ms));
    const m = Astronomy.GeoMoon(t), s = Astronomy.GeoVector('Sun', t, false);
    const f = moonFrame(ms / 864e5 + 2440587.5 - 2451545);
    out.push({
      ms, sun: toBody([(s.x - m.x) * AU, (s.y - m.y) * AU, (s.z - m.z) * AU], f),
      earth: toBody([-m.x * AU, -m.y * AU, -m.z * AU], f)
    });
  }
  return out;
}
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
function siteBasis(lat, lon) {
  const p = lat * D2R, l = lon * D2R, sp = Math.sin(p), cp = Math.cos(p), sl = Math.sin(l), cl = Math.cos(l);
  return { up: [cp * cl, cp * sl, sp], east: [-sl, cl, 0], north: [-sp * cl, -sp * sl, cp] };
}
// elevation / azimuth (deg) of a body seen from the site surface
function look(b, v) {
  const r = [v[0] - RM * b.up[0], v[1] - RM * b.up[1], v[2] - RM * b.up[2]], n = Math.hypot(...r);
  return [Math.asin(dot(r, b.up) / n) / D2R, Math.atan2(dot(r, b.east), dot(r, b.north)) / D2R];
}
function evalSite(site, eph) {
  const b = siteBasis(site.lat, site.lon);
  return eph.map(e => { const s = look(b, e.sun), r = look(b, e.earth); return { sun: s[0], sunAz: s[1], earth: r[0], earthAz: r[1] }; });
}
// share of time + longest run of "false" (hours), given horizon mask hz (deg)
function metrics(series, hz) {
  const n = series.length; let sun = 0, earth = 0, both = 0, curDark = 0, dark = 0, curOut = 0, out = 0, breaks = 0, prev = false;
  for (const p of series) {
    const S = p.sun + SUN_R > hz, E = p.earth > hz;
    sun += S; earth += E; both += S && E; if (prev && !(S && E)) breaks++; prev = S && E;
    curDark = S ? 0 : curDark + 1; dark = Math.max(dark, curDark);
    curOut = E ? 0 : curOut + 1; out = Math.max(out, curOut);
  }
  return { sun: sun / n, earth: earth / n, both: both / n, dark, out, breaks };
}
if (typeof module !== 'undefined') module.exports = { moonFrame, toBody, ephemeris, evalSite, metrics, siteBasis, look };
