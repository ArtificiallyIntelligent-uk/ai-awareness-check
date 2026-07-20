# AI Awareness Check

A short self-assessment for Artificially Intelligent — six branching
scenarios that give a person a read on where their AI instincts lean
(technical, ethical, or commercial), and whether any of their answers
reflect a genuine misunderstanding rather than a values trade-off.

This is an awareness tool, not a pass/fail test. It's designed as a
predecessor to a fuller AI readiness assessment.

## Getting started

```bash
npm install
npm run dev
```

This starts a local dev server (Vite) with hot reload. Open the printed
URL in your browser.

To build a production version:

```bash
npm run build
```

Output goes to `dist/`. Preview the production build locally with:

```bash
npm run preview
```

## Before deploying

**Update `SITE_URL`** in `src/data/constants.js`. It's currently a
placeholder (`artificiallyintelligent.uk`) used on the share links and
the shareable result image. It needs to point to wherever this
assessment actually lives once it has a permanent home.

## Deploying to GitHub Pages

This repo includes a GitHub Actions workflow
(`.github/workflows/deploy.yml`) that builds and deploys automatically
on every push to `main`.

1. Push this repo to GitHub (see below).
2. In the repo on GitHub: **Settings → Pages → Source**, select
   **GitHub Actions**.
3. Push to `main` (or re-run the workflow from the **Actions** tab).
   The site will be live at `https://<username>.github.io/<repo-name>/`
   within a couple of minutes.

**If the repo isn't at the root of that URL** — i.e. you're using the
default `username.github.io/repo-name` address rather than a custom
domain — add a `base` to `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  base: "/repo-name/",
});
```

Without this, the built page will load with broken asset paths.

**If you're pointing a custom domain at this** (e.g. a subdomain of
artificiallyintelligent.uk): leave `base` as-is, add a file called
`CNAME` inside `public/` (create that folder) containing just the
domain, e.g. `awareness.artificiallyintelligent.uk`, and add a DNS
record with your domain provider pointing that subdomain at
`<username>.github.io`. GitHub's own docs cover the exact record type
depending on whether it's an apex domain or subdomain.

## Project structure

```
src/
  main.jsx                     Entry point
  App.jsx                      Top-level state machine (screen routing,
                                answer tracking, navigation)

  data/
    scenarios.js                The six scenarios — questions, branches,
                                 and all answer options with their type
    archetypes.js                The eight result archetypes (copy only)
    constants.js                 Confidence options, step count, the
                                  misconception threshold, and SITE_URL

  logic/
    scoring.js                   Pure functions: classifying a triangle
                                  position into an archetype, computing
                                  the full result from a set of answers,
                                  and generating the calibration /
                                  misconception insight text

  components/
    Intro.jsx
    ConfidenceScreen.jsx
    ScenarioScreen.jsx
    Results.jsx                  Renders the archetype, triangle,
                                  insights, and recommendations
    TriangleChart.jsx            The ternary (3-axis) result plot
    ShareModal.jsx                Preview card + native share + link
                                   fallbacks (copy link, Facebook, X,
                                   LinkedIn)
    RetakeConfirmModal.jsx
    Footer.jsx

  utils/
    clipboard.js                  Copy-to-clipboard with a fallback for
                                   older browsers
    shareImage.js                 Generates the downloadable/shareable
                                   result image (canvas) and triggers
                                   the native share sheet where supported

  styles/
    theme.js                      Brand color and font tokens
    styles.js                     All component styles (inline-style
                                   objects, not CSS modules — this was
                                   ported from a single-file build)
    global.css                    Minimal reset (box-sizing, margins)
    print.css                     Hides interactive chrome and strips
                                   shadows when "Download full results
                                   (PDF)" triggers the browser's print
                                   dialog

  assets/
    logo.png                      Brand mark, used on the intro screen
                                   and the share preview/image
```

## How scoring works

Every answer across the twelve decision points (six scenarios, two
steps each) is tagged as `technical`, `ethical`, `commercial`, or
`misconception` — never a numeric score. A person's result is the
*proportion* of their technical/ethical/commercial answers, plotted as
a single point inside a triangle (see `classifyPct` in
`logic/scoring.js`) to determine which of the eight archetypes they
land on.

Misconceptions are tracked separately and never affect the triangle
position. If more than `NEWCOMER_FLAG_THRESHOLD` (currently 5, out of
12) of a person's answers are misconceptions, a "Newcomer indicator" is
shown *alongside* their real archetype — never replacing it.

## A note on the styling approach

Styles are plain JS objects passed via the `style` prop, not CSS
Modules or a CSS-in-JS library. This was carried over directly from
how the piece was originally built and tested as a single file. It
works fine as-is, but if this project grows, moving `styles.js` to CSS
Modules or Tailwind would be a reasonable next step — nothing in the
component structure would need to change to support that.
