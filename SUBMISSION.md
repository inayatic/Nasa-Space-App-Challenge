# Polar Window: text for the Space Apps form (English)

Replace [BRACKETS] with your real data before pasting.

## Project Name
Polar Window: see when the Sun and Earth are up at the Moon's south pole

## High-Level Project Summary
Polar Window is a web tool that lets mission planners, teachers and curious people compare lunar south-pole landing sites and dates in seconds. For any site and any 7 to 90 day period it shows when the Sun is above the horizon (power) and when Earth is in view (direct-to-Earth communication), and highlights the windows when both are available. A map of the pole, drawn over NASA's LRO imagery, changes as you drag a clock, and two sites can be compared side by side. It replaces complicated ephemeris tools with one screen that answers: which site is steadier, and when should we go?

## Link to Project Demo
[Public link to your 30-second video or 7-slide deck]

## Link to Final Project
[Your Vercel link] and https://github.com/inayatic/Nasa-Space-App-Challenge

## Detailed Project Description
**What it does.** The user picks a start date and a span, then clicks sites on a map of the lunar south pole (latitudes -80 to -90). For each site Polar Window computes the elevation of the Sun and of Earth above the local horizon every hour and shows:
- the share of time the Sun is up, Earth is in view, and both together;
- the number of link breaks (times the combined power + communication window is interrupted), the longest darkness and the longest time without Earth;
- a timeline with Sun and Earth elevation curves and coloured windows;
- a sky dial for any moment, and hours per day with both Sun and Earth up, with the best 7-day window;
- a map coloured by what is available at each point (Sun and Earth, Sun only, Earth only, neither) that changes as the time slider is dragged or played, so the movement of light across the pole is visible.
Two sites, A and B, can be compared directly with a plain-language verdict on which is steadier. A "local horizon" slider approximates hills and crater walls, and users can add any custom latitude/longitude.

**Who it is for.** Mission planners get a fast first look at candidate sites. Teachers and the public get an intuitive picture of why the lunar poles have long shadows, nearly constant Sun on some ridges and a Sun and Earth that skim the horizon.

**How it works.** Sun and Moon positions come from Astronomy Engine. The Moon's orientation uses the IAU/WGCCRE rotation model with libration terms (Archinal et al., 2011). We checked our sub-Earth point against Astronomy Engine's libration and it agrees within 0.03 degrees. Elevation is computed for a point on the surface of a 1737.4 km sphere, counting the Sun's upper edge as lit. The map uses a polar stereographic projection that we aligned with NASA's tiles using the Schroedinger basin as a check.

**Limitations (stated in the app).** The colour map treats the Moon as a smooth sphere, so it does not show shadows cast by real terrain; permanently shadowed craters are therefore shown too bright. Terrain is only approximated by one horizon-angle slider. Site coordinates are approximate. A next step is to compute real horizons from LOLA elevation data.

**Stack.** HTML, CSS and JavaScript in a single static page (canvas for charts and map), Astronomy Engine, deployed on Vercel. No server and no user data.

## Use of Super Intelligence (SI)
The idea and concept were chosen by our team [CONFIRM: describe in one or two sentences what your team decided, e.g. the audience and the A/B comparison with a draggable timeline]. We used Claude (Anthropic) as an assistant to write the code of the web app, to design the interface, to check the calculations against a reference library, and to draft the English texts of this submission. We reviewed and tested the results ourselves.

## NASA Data
NASA Moon Trek (https://trek.nasa.gov/moon/): the LRO WAC south-pole mosaic (LRO_WAC_Mosaic_SPole60_100mp, NASA/GSFC/Arizona State University) is loaded live as map tiles and used as the background of the south-pole map. Sun and Earth positions are computed by Astronomy Engine and the IAU Moon rotation model; these are not NASA data.

## Space Agency Partner Data and Other References
- NASA Moon Trek, LRO WAC mosaic (NASA/GSFC/Arizona State University): map background.
- Astronomy Engine by Don Cross (MIT licence): positions of the Sun and Moon.
- Archinal et al., 2011, "Report of the IAU Working Group on Cartographic Coordinates and Rotational Elements: 2009" (Celestial Mechanics and Dynamical Astronomy): Moon orientation model.
- Approximate site coordinates from the IAU/USGS Gazetteer of Planetary Nomenclature and published Artemis candidate-region descriptions.
- Fonts: system fonts only. No images other than NASA map tiles. Code written with help from Claude (Anthropic).

---

# 7-slide deck (English, Google Slides)
1. **Title.** Polar Window. Team name and member names. Challenge: "Lunar South Pole: Sun and Earth positions". Screenshot of the map.
2. **Problem.** South-pole missions depend on light and a link to Earth; existing tools are complicated.
3. **Our idea.** One screen: pick sites and dates, see Sun, Earth and both.
4. **Demo.** Screenshot of the map plus comparison card (A vs B).
5. **User story.** A planner compares two sites near Shackleton and sees which has fewer link breaks.
6. **NASA data and method.** NASA Moon Trek LRO WAC tiles, Astronomy Engine, IAU model. Honest note on limits.
7. **Next steps.** Real horizons from LOLA, Artemis site list, shareable links. Link to the app.

# 30-second video script (add English subtitles)
- 0-4 s: "We are [team name]: [names]. Challenge: Sun and Earth at the Moon's south pole."
- 4-10 s: Show the map. "Polar Window shows where the Sun and Earth are above the horizon, on NASA LRO imagery."
- 10-20 s: Drag the slider, click A and B. "Drag time, pick two sites, and see which has fewer power and link breaks."
- 20-27 s: Show the timeline. "Planners get windows in seconds; teachers get a picture of the Moon's poles."
- 27-30 s: "Polar Window: [your link]."

# Before you submit
- Link must work in incognito, and Vercel Deployment Protection must be off.
- No people under 18 in the video or images; no NASA logos.
- Video 30 s or less, or deck 7 slides or fewer.
- Tick Terms and Conditions and "Confirm All Work is Original", then Submit for Judging.
