# AGENTS.md: rules for AI tools working on Henari repos

Read this first, then work with confidence. These rules apply to ChatGPT, Claude, Codex, Cursor, Copilot and any other AI tool.

## About Henari
- Henari Support Services is a family-run disability support provider in Townsville, QLD.
- The live site is https://www.henarisupport.com (Squarespace). These repos supply the interactive tools embedded in it.
- Henari provides SIL support but has no SIL housing or vacancies. Never imply that it offers accommodation.
- Never describe Henari as "NDIS registered" unless a human confirms it in writing.

## Autonomy (default)
You are trusted to work autonomously and creatively. Unless Naga explicitly says he needs to check something, go ahead and:
- Make design, code, wording and UX improvements on your own judgement.
- Propose and build creative ideas, then show the result.
- Fix bugs you find, and add tests for them.
- Refactor toward the shared patterns in this file.
- Open PRs without asking, and explain what changed and why in each PR. Until 1 Nov 2026, while GitHub Actions minutes are nearly used up, open only PRs that change `.md` files. After that, any PR is fine.
Routine work does not need permission. The hard stops below do.

## Hard stops (non-negotiable: legal, compliance, safety)
Stop and get a human's explicit OK before any of these:
- Merging, deploying or publishing anything to the live site (Naga).
- Registration status. Never say "NDIS registered" unless confirmed in writing.
- Legal or privacy commitments, privacy policy, security settings, data retention (also needs Aida).
- Prices.
- Service claims not already verified.
- Testimonials. Never invent testimonials, quotes, numbers or sources.
- Staff names, identities or photos.
- Paid services, subscriptions or ad spend.
- Deletions.
- DNS, domain, email, account or security changes.
- Any participant or HR data: records, health, medications, incident reports, payroll, identity or screening documents. Never access them.
- Changing wording Aida has approved.
Always:
- Use fictional test data only.
- Never commit or paste secrets, tokens or keys.
- Only edit the Squarespace footer or Code Injection with Naga's explicit approval for that specific change, after a backup. Never touch the `cleanLegacyTransport` footer script, the GA and consent code, or the `henari-backlink` blocks.

## Writing style for public copy
- Use Australian English.
- Use plain, warm, short sentences.
- No em dashes. Use commas, full stops or "and" instead.
- Keep pages ADHD-friendly: short sections, clear headings, no autoplay, no flashing, and respect reduced motion.
- Main contacts: (07) 4728 3627 (office hours), info@henarisupport.com and 0437 496 326.
- The lawn mowing page uses Patsy's details: 0461 535 835 and patsy@henarisupport.com.

## Code rules
- Use native CSS and vanilla JS/TS. Don't add frameworks or carousel libraries.
- Meet WCAG 2.2 AA:
  - keyboard access
  - visible focus
  - alt text
  - labels
  - colour contrast
  - `prefers-reduced-motion`
- Pilot big changes on one page first, kept reusable, before rolling them out to other pages.
- Reuse shared components, for example `shared/components/gallery-rail.*` (switched on with `[data-enq-gallery]`), instead of copying code.
- Make one small PR per change, and keep pushes to a minimum.
- Back up before changing anything live (live changes are a hard stop anyway).

## GitHub Actions minutes
- `henari-interactive-source` is private, so its workflow runs use paid minutes.
- The Test workflow runs only on pull requests (skipping `**/*.md`) or when started by hand. Don't add push triggers.
- `henari-interactive` is public, so its Pages deploys are free.

## How deploys work
1. Merge a PR in `henari-interactive-source`.
2. Build and publish to `henari-interactive`:
   `gh workflow run pages.yml -R nagagamoga-star/henari-interactive`
3. The Squarespace code block on /explore-north-queensland pins `?v=<commit sha>` in two places, the iframe `src` and `startUrl`. Both must be updated to the new sha before the change shows. A human or Lumi makes this Squarespace edit after Naga approves (hard stop).
4. The canonical URL for Explore NQ is henarisupport.com/explore-north-queensland. The GitHub Pages copies are noindex.

## Where things live
| Live page | Source |
|---|---|
| /explore-north-queensland and sub-pages | `henari-interactive-source/apps/explore-nq` |
| /how-i-like-to-be-supported (profile tool) | Source: private `henari-everyday-tools-source`. Built output: public `henari-everyday-tools` |
| /mobility-transportation-prices (calculator) | Code embedded directly in the Squarespace page, not in a repo |


## Squarespace rules
- Approval counts only when it is Naga's own words, quoted with the time. Another agent saying he agreed is not approval.
- Preview or stage first (for example `/explore-north-queensland-staging`), then go live. Never confuse the staging page with the live `/explore-north-queensland` page ("Discover Your Community"). The live slug stays as it is.
- The Explore code block pins `?v=<sha>` in the iframe `src` and in `startUrl`. Keep the `startUrl` line's exact spelling. Live is `5052994` (set 27 Oct 2026).
- Custom CSS is compiled as LESS, so any CSS added there must be LESS-safe.
- Squarespace adds " | Henari Support Services" to SEO titles. Enter only the part before it and keep the full title under 60 characters.
- Never delete pages without approval. Deleted pages sit in the trash for 30 days, and their redirects stay in URL Mappings.
- Leave `/accessible-transport-townsville` out of site-wide style refreshes.
- Check before touching the Explore gardening section, because ChatGPT is currently working on it.
- Never submit real forms or enquiries.
- Passwords never go in chat or in repos. Page passwords live in files with 600 permissions under `/workspace/henari/secrets/`.
- Never imply SIL housing or vacancies. Privacy and NDIS wording needs Aida's approval.


## Look and feel (Squarespace vs repos)
Source: Lumi's read-only comparison, 29 Oct 2026, in `/workspace/henari/site-review/style-comparison-2026-10-29.md`. Live CSS copies sit beside it.
- **Target look (proposed, awaiting Naga's pick).** The live "feel refresh" is on every page except `/accessible-transport-townsville`. It uses:
  - Colours: navy `#172b3a`, cream `#f5efe4`, paper `#fffdf9`, sand `#f0e2c9`, eucalyptus `#e8f0ea`, accent `#a66a2c` and accessible orange `#8a5520`.
  - Shape and layout: 24px radius, pill buttons and a 72rem max width.
- **Repos today:** navy `#08233b`, cream `#fff8ef`, orange `#a85a25` and teal `#5fc8c0`, with an 18px radius (16px in Everyday Tools) and 12px-rounded rectangle buttons. Don't add new colours. Move toward the target through the existing `--henari-*` tokens, one page first.
- **Fonts are the biggest mismatch [Certain]:**
  - Refresh pages: Figtree and Fraunces.
  - Buttons and the header: DM Sans.
  - Repos: DM Sans and Lora.
  - Squarespace Site Styles: Manrope and Poppins.
  - **Standard (Naga, 29 Oct 2026): Figtree for body and UI, Fraunces for headings, everywhere.** Migrate DM Sans, Lora, Manrope and Poppins to these one page at a time. Don't add any other font.
- **Buttons:** live buttons are 48px teal pills with navy bold text (currently DM Sans; move to Figtree). Repo buttons should match when the target is approved.
- **Teals:** four dark teals are in use (`#438f8c`, `#0f766e`, `#0b5e57` and `#286663`). Settle on one token rather than adding a fifth.
- **Contrast:** `#438f8c` (3.79:1) and `#c96d2d` (3.68:1) fail for small text on white. Use them only for large text or decoration.
- **Focus:** keep the repo pattern of a 3px light outline plus a 6px navy ring, shown with `:focus-visible` only, with a forced-colours fallback. The refresh's orange outline is the outlier.
- **Squarespace should adopt these from the repos:** the forced-colours focus fallback, `:focus-visible`-only rings, `color-scheme: light` and fuller `prefers-reduced-motion` coverage.
- **Shadows:** the live site is flatter. Prefer the flatter look when aligning.
- **Custom CSS** is compiled as LESS, so changes there must be LESS-safe. Back up and log each save. The live version is v92, and one save was not logged.

## Standards that work
Verified in `henari-interactive-source` at commit `3b16e4e` (29 Oct 2026). Paths are relative to that repo unless stated.

### CSS
- **Where styles live**
  - Tokens: `shared/styles/tokens.css`. Base and print: `shared/styles/base.css`, `shared/styles/print.css`.
  - Shared components: `shared/components/*.css` (`focus.css`, `buttons.css`, `checklist.css`, `gallery-rail.css`).
  - Explore app: `apps/explore-nq/src/styles.css`, plus `explore-today.css` for Explore Today.
- **Tokens:** custom properties on `.henari-app`, prefixed `--henari-`. Use them, don't hard-code colours.
  ```css
  --henari-navy: #08233b;  --henari-dark-teal: #438f8c;  --henari-orange: #a85a25;
  --henari-radius: 18px;
  --henari-focus: 0 0 0 3px var(--henari-cream), 0 0 0 6px var(--henari-navy);
  ```
  Fonts: `--henari-font-body` (DM Sans) and `--henari-font-heading` (Lora).
- **Class naming:** BEM style with an app prefix. `henari-` for shared, `enq-` for Explore NQ. Examples: `.enq-gallery__viewport`, `.enq-gallery__dot`, `.enq-today-card__image`, `.henari-checklist__check`. State classes use `is-` (for example `.is-expanded`). Explore rules are scoped under `.henari-app.enq`.
- **Opt-in by data attribute:** behaviour is switched on with attributes, not new classes. Example: `[data-enq-gallery]` (gallery rail), `[data-landmark]` (embed mode), `data-scroll-rail` (set by `setUpScrollArrows`).
- **Breakpoints:** rem based. In use: `40rem`, `48rem`, `64rem`, `68rem`. Hover effects only inside `@media (hover: hover) and (pointer: fine)`.
- **Focus:** one shared rule in `shared/components/focus.css`. Don't restyle focus per component unless needed.
  ```css
  .henari-app :focus-visible { outline: 3px solid var(--henari-cream); outline-offset: 2px; box-shadow: var(--henari-focus); }
  ```
- **Reduced motion:** every animation or transition needs a matching block.
  ```css
  @media (prefers-reduced-motion: reduce) {
    .henari-app.enq * { transition: none !important; scroll-behavior: auto !important; }
  }
  ```
  In JS, check `window.matchMedia('(prefers-reduced-motion: reduce)')` before smooth scrolling (see `gallery-rail.ts`).
- **Forced colours and print:** components include `@media (forced-colors: active)` (using `CanvasText`, `Highlight`) and `@media print` blocks. Keep them when you copy a pattern.
- **Scroll-snap rail pattern** (`shared/components/gallery-rail.css`):
  ```css
  .enq-gallery__viewport { display: flex; overflow-x: auto; scroll-snap-type: inline mandatory; overscroll-behavior-inline: contain; }
  .enq-gallery__viewport > .enq-gallery__slide { flex: 0 0 min(78vw, 18.5rem); scroll-snap-align: start; }
  ```
  - Scrollbars stay visible (thin). Don't hide them.
  - Slides past 6 are hidden until "Show all" (`<details class="enq-gallery__more">`), which also works without JS.
  - Gallery colours come from local vars that fall back to the tokens, for example `--enq-gallery-accent: var(--h-accent, var(--henari-dark-teal, #286663))`.
- **Colour and contrast:** use the token pairs (navy on cream or paper). [Likely] they meet AA; I did not run a contrast tool. Check any new pairing.
- Touch targets: controls use `min-height: 44px`.

### Data (content files)
- [Certain] Explore content is **typed TypeScript, not JSON**. It lives in `apps/explore-nq/src/content/*.ts` (`places.ts`, `explore-today.ts`, `photos.ts`, `guide-images.ts`, `sources.ts`, `birds.ts`, `fishing.ts`, `garden.ts`, `safety.ts` and others). Add to these files. Don't create parallel JSON.
- **Sources** (`sources.ts`): `id, title, publisher, url, use ('link' | 'facts-restated'), checkedAt, check ('fetched' | 'audited' | 'browser' | 'blocked')`. Every listing points to a source by `SourceId`. Henari never republishes third-party content.
- **Places** (`places.ts`): `id, name, category[], summary, source, costLabel, accessNotes, checkedAt, reviewAfter, photo?, guideImage?`.
- **Explore Today items** (`render/explore-today.ts`, `ExploreTodayItem`): `id, category, title, tag, image { src, alt, width, height, srcset?, sizes?, credit { label, url? } }, location, schedule, when?`. The `when` text must be copied word for word from `schedule`.
- **Photos** (`photos.ts`): `id, width, height, alt, caption, takenAt, addedAt, creditLabel?, focus?: 'top', attribution?`. Files are `public/photos/<id>-640.webp` and `<id>-1024.webp`.
  - Open licence photos need `attribution { author, licence, licenceUrl, sourceUrl, changes, checkedAt }`. Allowed licences are typed (CC0, public domain, CC BY, CC BY-SA). Without it, the credit is `PHOTO_CREDIT` (Henari).
- **Dates:** ISO `YYYY-MM-DD`, Brisbane time (`src/dates.ts`, `brisbaneDate()`, `isIsoDate()`). Every dated item has `checkedAt` and `reviewAfter`. `npm run check:explore-freshness` flags overdue items.
- **Validation:** types plus Vitest tests (`content.test.ts`, `render.test.ts`). Lookups throw on unknown ids (`sourceById`, `photoById`). Alt text is required on every image.
- Directions links: [Guessing] I did not find a dedicated field for these. Check the existing cards before adding one.

### TS and JS
- **Structure** (`apps/explore-nq/src`): `content/` (data), `render/` (HTML strings, run at build time), `enhance.ts` (progressive enhancement), `catch/`, `count/`, `planner/` (feature modules with their own `storage.ts` and `model`).
- **Shared code** is imported with the `@shared` alias, for example `import { mountGalleryRails } from '@shared/components/gallery-rail'`.
- **Shared helpers to reuse:**
  - `shared/components/gallery-rail.ts`: `mountGalleryRails(root)`. Adds arrows, dots, a counter (`aria-live="polite"`) and Show all handling.
  - `apps/explore-nq/src/enhance.ts`: `setUpScrollArrows(root)` (older rail arrows, still used by fishing, garden, birds and guide grids).
  - `shared/utils/escape-html.ts`: `escapeHtml()` for any text put into HTML strings.
  - `shared/utils/file-save.ts`: `serialiseJson`, `parseJson`, `readDocumentHeader` (`schema` + integer `version`), `DEFAULT_MAX_FILE_BYTES = 500_000`.
  - `shared/utils/embed-bridge.ts`: iframe height and modal messages, only to allowed parent origins (`isAllowedParentOrigin`).
  - `shared/utils/page-shell.ts` (`isEmbeddedFrame`), `shared/utils/announce.ts`, `shared/components/checklist.ts`.
- **No-JS first:** `vite.config.ts` renders every page into static HTML at build time, so content is readable without JS. JS only adds filters, date checks and controls. Gallery "Show all" uses `<details>` so it works without JS.
- **Storage and privacy:**
  - `localStorage` only, one named key per feature, written only on a user action. Example: `CATCH_KEY = 'henari-explore-my-catch'`, `CHECKLIST_KEY = 'henari-explore-fishing-checklist'`.
  - Wrap every read and write in `try/catch`, and return `false` or `[]` on failure. Remove the key when the data is empty.
  - Export files are made in the browser with a Blob and downloaded by the user. Nothing is sent anywhere. No analytics or trackers.
- **Iframe handling:** `embed-mode.ts` swaps `header/main/footer` landmarks for divs when framed (`enq--embedded`). The Squarespace snippet builds `startUrl = APP_URL + PAGES[page] + '?v=<sha>'` and only allows known page keys.

### Testing
- Unit (Vitest): `npm test`. Tests sit next to the code as `*.test.ts`.
- Type check: `npm run typecheck`.
- Browser (Playwright, Chromium): `npm run test:e2e:explore` (builds, then runs `apps/explore-nq/e2e/*.spec.ts`). Set `PLAYWRIGHT_CHROMIUM_PATH` if the bundled Chromium is missing.
- Content dates and links: `npm run check:explore-freshness` (add `--no-links` to skip link checks).
- **Add per change:**
  - New data: a `content.test.ts` or `render.test.ts` case.
  - New markup or opt-in: a render test (for example `explore-today.test.ts` counts `data-enq-gallery`).
  - New interaction: an e2e spec covering keyboard, reduced motion and no-JS where relevant.
- Run tests locally before pushing, so CI minutes are not used for fixes.

### Build, deploy and versioning
- Build: `npm run build:explore` (type check then Vite). Output goes to `apps/explore-nq/dist`. `EXPLORE_BUILD_DATE=YYYY-MM-DD` pins the date for repeatable builds.
- The build also writes `sw.js`, `offline.html` and `sitemap.xml`. Waterways and fishing pages are never cached offline (rules and safety advice).
- The Pages repo `henari-interactive` assembles all apps with `assemble.mjs` and `verify-site.mjs`, then deploys with `.github/workflows/pages.yml`.
- Cache busting: the Squarespace code block pins `?v=<short sha>`. Update both places. [Certain] the copy in `deploy/squarespace-explore-embed.html` is out of date (`9745b63`), so treat the live block as the source of truth.
- SEO: built Pages copies have `<meta name="robots" content="noindex, follow">` and a canonical to `https://www.henarisupport.com/explore-north-queensland`. Keep both on any new page.
- Project state notes: `docs/ai/HANDOVER.md`, `docs/ai/STATE.json`, and `docs/` (`ARCHITECTURE.md`, `ACCESSIBILITY.md`, `DEPLOYMENT.md`). [Likely] `STATE.json` is out of date (last updated 22 Oct 2026).

### henari-everyday-tools (profile tool)
- [Certain] The public `henari-everyday-tools` repo holds only the built React bundle (`site/henari-everyday-tools.js` and `.css`), deployed by `.github/workflows/pages.yml` on push to main and on manual runs. Edit the source in the private `henari-everyday-tools-source` repo instead, and never hand-edit the minified bundle.

## Do not duplicate / leave out
- **Reuse, don't copy:**
  - Tokens in `shared/styles/tokens.css`. Don't add a new token if one already exists for that colour or size.
  - Focus styles from `shared/components/focus.css`.
  - The gallery rail (`gallery-rail.css/.ts`, `[data-enq-gallery]`) for any new card rail.
  - `escapeHtml`, `file-save.ts`, `embed-bridge.ts`, `page-shell.ts`, `announce.ts`, `checklist.*`.
  - Existing content files and `SourceId`, `PhotoId` and `GuideImageId` lookups. Never copy a listing, source or photo record into a second place.
  - `.henari-sr-only` for screen-reader text.
- **Legacy to phase out, not extend:** `setUpScrollArrows` and `.enq-scroll-rail` / `.enq-scroll-arrow`. Move a page to the gallery rail one page at a time instead of adding features to the old one.
- **Don't add:**
  - Frameworks, carousel or UI libraries, CSS frameworks, or icon fonts.
  - Inline `style=""` or per-page copies of shared CSS.
  - JSON copies of data that already lives in `content/*.ts`.
  - Hidden scrollbars, autoplay, or motion without a reduced-motion block.
  - Hotlinked images without credit and alt text. Use local `webp` with width and height.
  - Network calls, analytics or cookies for saved user data.
  - New workflow triggers on push.
- Remove dead CSS when you replace a pattern, in the same PR.

## Tools: weather and games

### Henari Weather (Townsville Weather & Day Planner)
- **Live page:** henarisupport.com/townsville-weather [Certain].
- **Repo:** `nagagamoga-star/henari-weather-widget` (private). `henari-weather` is empty; do not use it [Certain].
- **Version gap:** repo `master` and `package.json` say `1.2.1-rc.2`. The live block reports `1.4.0-rc.1`, built from open draft PRs #3 (v1.3 greetings, summaries, Ideas for Today) and #4 (v1.4.0-rc.1, includes v1.3.1). Treat the live code block plus PR #4 branch as current until those PRs are merged [Certain].
- **Embedded how:** inline Squarespace code block (about 110 KB), not an iframe. Exactly four inline blocks: weather style, weather script, Fishing Tides & Moon style, Fishing Tides & Moon script. Keep it to four. `node build.mjs` writes `dist/townsville-weather-code-block.html`. Squarespace and the Cloudflare Worker are updated by hand; nothing in CI deploys [Certain].
- **Release lock:** `scripts/verify-live-hashes.mjs` checks SHA-256 prefixes of the four blocks. Update the recorded hashes in the same PR as any approved change [Certain].
- **Data and APIs:**
  - Forecast: MET Norway (`api.met.no`) through the Worker `henari-weather.naga-gamoga.workers.dev` (`worker/met-norway-proxy.js`, route `/townsville`). Do not switch to Open-Meteo (decision of 21 Oct 2026) [Certain]. Open-Meteo appears in source only as an older or fallback reference [Likely].
  - Tides: official Maritime Safety Queensland high/low CSVs in `data/tides/source/`, converted by `scripts/tides/convert-tides.mjs`, embedded in the Worker by `npm run tides:build`, served at `GET /tides?place=<id>`. No KV, no fetch [Certain].
  - Sun and moon: SunCalc 1.9.0 in `third-party/suncalc/`, unmodified, BSD 2-Clause, hash-checked by `npm run check:suncalc` [Certain].
  - Links: BoM warnings (`BOM_WARN` in `src/htw.js`), SunSmart, Townsville disaster dashboard, 13 HEALTH, 000 [Certain].
- **REUSE:** `BOM_WARN` for any warnings link (no second link); existing tip states for reminder icon labels; the existing "Feels like" line; the existing `henari-a11y-prefs` key for any new toggle (for example Easy Read); the existing forecast cache key in `src/htw.js` [Certain].
- **LEAVE OUT:** new storage keys, cookies, new third-party hosts, a second weather provider, a fifth code block, autoplay or animated backgrounds, copies of tide data in the page, edits to `archive/v1.0-openweather/` [Certain]. Do not copy weather CSS into Explore or games; it is self-contained by design [Likely].
- **Approved wording (do not change without Aida):** the greetings, summaries and "Ideas for Today" wording library; the hot-tip line "Outdoor plans may be more comfortable outside 11am to 3pm."; the UV-tip BoM/SunSmart link line; the SunSmart line; "This is an estimate." after Feels like; the reference-gauge labels for Magnetic Island and Ingham coast. Source: `/workspace/henari/ai-updates/2026-10-21-weather-v1.4-decisions.md` [Certain]. Parked, do not add: `RAINHOUR-DRY` (reads as a promise) and WARMNIGHT (no approved threshold) [Certain].
- **Approved rules:** 3-hour rain line uses 0.5 mm on `rainNext3hMm`. Ayr / Burdekin shows sun and moon only (no tide data) [Certain].
- **Privacy, consent, analytics:** forecast is cached in localStorage on the device only. Tide data is held in memory for 10 minutes, no cookies, no browser storage. Google Analytics (`G-46Y36GCHC9`) loads site-wide from the footer injection behind the consent banner; the weather block must not add its own analytics or bypass consent [Likely]. The weather and tides paragraph on /privacy-policy was approved by Aida; any new data, host or storage needs an updated paragraph and Aida's approval first [Certain].
- **Tide data expiry:** predictions are `validUntil 2026-12-31T23:59+10:00`. The page refuses expired data, so the tab goes blank for tides from 1 Jan 2027 unless 2027 MSQ files are loaded [Certain].

### Games (henari-interactive-source)
| Game | Path | Live embed | Shared code used | Saves anything? |
|---|---|---|---|---|
| Calm Bubbles | `apps/calm-bubbles` | iframe to `nagagamoga-star.github.io/henari-interactive/calm-bubbles/` | `announce`, `escape-html` | No [Likely] |
| Crossword | `apps/crossword` | iframe to `.../henari-interactive/crossword/` | `announce`, `embed-bridge`, `page-shell` | localStorage progress (`storage.ts`) [Certain] |
| Line Puzzles (dot to dot, one line) | `apps/line-puzzles` | iframe to `.../henari-interactive/line-puzzles/` | `shared/game/dot-board`, `announce`, `embed-bridge`, `page-shell` | localStorage progress (`progress.ts`) [Certain] |
| Wildlife Memory | `apps/wildlife-memory` | [Guessing] not currently embedded live; check before claiming | `announce`, `escape-html`, `format-duration`, `shuffle` | No [Likely] |

- Docs: `docs/CALM-BUBBLES.md`, `docs/CROSSWORD.md`, `docs/LINE-PUZZLES.md`, `docs/SQUARESPACE-INTEGRATION.md`, `docs/GITHUB-PAGES-DEPLOYMENT.md` [Certain].
- **Deploy:** same as Explore. Build in the source repo, publish to `henari-interactive` with `pages.yml`, then pin `?v=<sha>` in the Squarespace code block if the block uses one [Likely]. Games are listed on the Everyday Tools page cards; that page is a separate code block [Certain].
- **REUSE:** `shared/utils/announce.ts` for screen reader messages, `embed-bridge.ts` for iframe height and messaging, `page-shell.ts` for the page frame, `shuffle.ts`, `format-duration.ts`, `escape-html.ts`, `shared/game/dot-board.*` for any grid or dot game, `shared/styles/tokens.css` and `base.css`, `shared/components/buttons.css` and `focus.css` [Certain]. Copy the shape of an existing app (`embed.ts` + `embed.test.ts`, `hygiene.test.ts`, `routing.ts`, e2e `embed.spec.ts`) for a new game [Certain].
- **LEAVE OUT:** game engines or libraries, timers that pressure the player, scores tied to names, leaderboards, accounts, network calls during play, analytics inside the iframe, sounds that play without a tap, copies of shared utils inside an app [Certain for no network; Likely for the rest]. Store only game progress, never personal details.
- **Wording:** game copy has no Aida approval record; treat it as normal public copy (Australian English, no em dashes, calm, ADHD-friendly) [Likely].

### Checks before any change (weather or games)
1. Back up the live code block and page first to `/workspace/henari/rollback/<name>-before-<change>-<date>.<ext>` (.html, .md or .txt; for example `townsville-weather-codeblock-before-v1.4-2026-10-21.html`). Log every live change in `/workspace/henari/site-review/CHANGELOG.md`.
2. Weather: `npm ci && npx playwright install chromium && npm test` (worker, tides worker, tides converter, widget, Fishing Tides & Moon). Run `npm run tides:check` and `npm run check:suncalc` if tides or SunCalc are touched. Games: `npm test` and `npm run test:e2e` in `henari-interactive-source`, including the app's hygiene and embed tests.
3. Draft PR only. No merge, deploy or paste without Naga's explicit OK; wording changes also need Aida.
4. Weather: paste into a hidden staging page first and check the snippet size and the four hashes. Games: check the Pages build URL before pinning `?v=`.
5. Real phone (iPhone Safari and Android Chrome) and desktop Edge, at 320 px and 1280 px.
6. Reduced motion on: no animation or smooth scroll. Keyboard only, visible focus, axe clean (`axe-core` is in the weather tests).
7. Offline or Worker down: weather shows the cached or "unavailable" state without breaking the page; games still load from cache or fail gracefully.
8. Check consent: no GA request before the banner is accepted; no new hosts in the network tab.
9. Do not touch the footer. Re-check /privacy-policy still matches what the tool stores.
10. Rollback: paste the backup file back into the code block (weather) or re-pin the previous `?v=<sha>` (games), then re-verify live.

## Cross-tool patterns that worked

Learn from the reference tool. Do not copy its code into another tool; move shared code into `shared/` (henari-interactive-source) or reuse the existing helper.

| Pattern | Reference implementation | Adopt in | Do not duplicate |
| --- | --- | --- | --- |
| Accessibility preferences key | Weather widget, `henari-a11y-prefs` [Certain] | Explore NQ, games, calculator (Easy Read, text size, reduced motion toggles) | No second prefs key per tool |
| Reduced motion | Explore `gallery-rail.css/.ts`, calculator CSS (4 blocks) [Certain] | Profile tool, games animations | One `@media (prefers-reduced-motion: reduce)` block per component, JS checks `matchMedia` before smooth scroll |
| Focus styles | Calculator `:focus-visible` (11 rules) and Explore tokens [Certain] | Profile tool (none found in bundle) [Likely] | Use the shared focus token, no per-page outline colours |
| Design tokens | Explore `shared` CSS tokens [Certain] | Calculator, weather when next edited | No hard-coded colours or spacing |
| Review / summary step before sending | Calculator booking review, profile preview with include/exclude [Certain] | Any future form | Review must show only confirmed values |
| Labelled estimate vs calculated value | Calculator "Estimate" wording [Certain]; but its "Total calculated distance" shows the 10 km default when no route ran [Certain] | All tools showing numbers | Never call a default, stale or manual value "calculated". Use states: not supplied, pending, calculated, manual, failed |
| Export / print | Profile tool `window.print` for Print and Save as PDF, editable file export [Certain] | Calculator summary, My Week, Ready Plan | Editable draft must say it includes excluded answers. One print stylesheet, no PDF library |
| No-JS fallback | Profile `noscript`, Explore static content [Certain] | Calculator (no `noscript` found) [Certain] | Show phone and email if the tool fails |
| Live announcements and errors | `shared/announce` (Explore, games), calculator `aria-live` and `role="alert"` [Certain] | Profile tool, weather | Use `announce`, not a new live region helper |
| Form validation | Calculator: integer cents, rejects negative km, date/time checks, inline error blocks advance [Certain] | Profile import (already checks format, version, size) | Validate completeness before the review step; blank km must not silently become 0 |
| Storage | Explore: `localStorage` in try/catch, one named key, write on user action only [Certain]; weather forecast cache [Certain] | Games progress, calculator if it ever saves | No autosave of personal text; no cookies; profile keeps answers on device only |
| Consent and analytics | Site-wide GA behind the Squarespace cookie banner (`isCookieBannerEnabled: true`) [Certain] | All tools | Never add a tool's own analytics or send form text, addresses or profile answers anywhere |
| Request ordering | Calculator `routeSeq` [Certain] | Weather fetches, any autocomplete | Invalidate the sequence on every edit, abort old fetches (calculator gap) [Likely] |

## SEO rules

- **Canonical:** the henarisupport.com Squarespace page is canonical. GitHub Pages copies (`nagagamoga-star.github.io/...`) must be `noindex` and never in a sitemap [Certain for the rule; check each app].
- **One URL per page.** Fix duplicates with a 301 in Squarespace Settings > URL Mappings, then update internal links. Known duplicate: `/waterways-and-wildlife` and `/explore-north-queensland/waterways-and-wildlife`, both self-canonical [Certain]. Sitemap lists `/home`, which canonicalises to `/` [Certain]. Any URL Mapping change needs Naga's OK.
- **Titles** under about 60 characters, **meta descriptions** about 150 to 160, unique per page.
- **One H1** per page in the Squarespace page itself, then H2, H3 in order. An H1 inside an iframe does not count for the parent page. Explore wrapper pages need their own native H1 and intro [Likely: crawl shows H1 tags only from injected snippets].
- **Anchor ids must match links.** `/understanding-the-ndis` links to `#am-i-eligible` and `#using-your-plan` with no matching ids [Certain].
- **Images:** meaningful alt text (empty alt for decoration), webp, `srcset`, explicit `width` and `height`, lazy load below the fold. Wikimedia images still lack srcset [Certain].
- **Internal links:** link related tools and Explore pages with descriptive text, not "click here".
- **Sitemap hygiene:** only canonical, indexable URLs. Fix redirects and noindex pages out of it.
- **Structured data:** keep the existing LocalBusiness and Service JSON-LD (Aitkenvale, Townsville) [Certain]. FAQPage only where a real visible Q&A exists. Never add reviews or ratings that are not real.
- **Local keywords:** use Townsville and North Queensland naturally in headings and copy. No stuffing.
- **Never** describe Henari as NDIS registered unless confirmed and approved.
- **Search Console:** after a fix, request indexing via URL Inspection (Naga does this). Pending: `/mobility-transportation-prices`, `/understanding-the-ndis`, `/ready-plan`, `/resources`, `/what-to-expect`.
- **Iframes:** embedded app text is not treated as the Squarespace page's text. Key headings, intro and contact info must be on the Squarespace page, with a link to open the tool.

## Before you say "done"
- Run tests locally where possible.
- Report what changed, with links.
- Tag claims as [Certain], [Likely] or [Guessing].
- Say clearly what still needs human approval.
