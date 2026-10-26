import { spawnSync } from 'node:child_process';
import { access, cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { verifySite } from './verify-site.mjs';

const siteDir = process.env.SITE_DIR;
const wildlifeDist = process.env.WILDLIFE_DIST;
const profileDist = process.env.PROFILE_DIST;
const calmDist = process.env.CALM_DIST;
const readyDist = process.env.READY_DIST;
const linesDist = process.env.LINES_DIST;
const weekDist = process.env.MY_WEEK_DIST;
const crosswordDist = process.env.CROSSWORD_DIST;
const exploreDist = process.env.EXPLORE_DIST;
const repoName = process.env.PAGES_REPOSITORY_NAME ?? 'henari-interactive';
const guideDist = process.env.GUIDE_DIST;
const guideSnippet = process.env.GUIDE_SNIPPET;
const guideReleases = process.env.GUIDE_RELEASES;

if (!siteDir || !wildlifeDist || !profileDist || !calmDist || !readyDist || !linesDist || !weekDist || !crosswordDist || !exploreDist) {
  console.error('SITE_DIR, WILDLIFE_DIST, PROFILE_DIST, CALM_DIST, READY_DIST, LINES_DIST, MY_WEEK_DIST, CROSSWORD_DIST and EXPLORE_DIST are required.');
  process.exit(1);
}

await rm(siteDir, { recursive: true, force: true });
await mkdir(join(siteDir, 'wildlife-memory'), { recursive: true });
await mkdir(join(siteDir, 'profile-builder'), { recursive: true });
await mkdir(join(siteDir, 'calm-bubbles'), { recursive: true });
await mkdir(join(siteDir, 'ready-plan'), { recursive: true });
await mkdir(join(siteDir, 'line-puzzles'), { recursive: true });
await mkdir(join(siteDir, 'my-week'), { recursive: true });
await mkdir(join(siteDir, 'crossword'), { recursive: true });
await mkdir(join(siteDir, 'explore-nq'), { recursive: true });
await cp(wildlifeDist, join(siteDir, 'wildlife-memory'), { recursive: true });
await cp(profileDist, join(siteDir, 'profile-builder'), { recursive: true });
await cp(calmDist, join(siteDir, 'calm-bubbles'), { recursive: true });
await cp(readyDist, join(siteDir, 'ready-plan'), { recursive: true });
await copyReadyPlanDirect(siteDir, await readyPlanDirectDir(readyDist));
await cp(linesDist, join(siteDir, 'line-puzzles'), { recursive: true });
await cp(weekDist, join(siteDir, 'my-week'), { recursive: true });
await copyMyWeekDirect(siteDir, await myWeekDirectDir(weekDist));
await cp(crosswordDist, join(siteDir, 'crossword'), { recursive: true });
await cp(exploreDist, join(siteDir, 'explore-nq'), { recursive: true });
await copyGuide(siteDir);
await writeFile(join(siteDir, '.nojekyll'), '');
await writeFile(
  join(siteDir, 'robots.txt'),
  `User-agent: *
Allow: /
Sitemap: https://nagagamoga-star.github.io/henari-interactive/sitemap.xml
`,
);
await writeFile(
  join(siteDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://nagagamoga-star.github.io/henari-interactive/</loc></url>
  <url><loc>https://nagagamoga-star.github.io/henari-interactive/explore-nq/</loc></url>
  <url><loc>https://nagagamoga-star.github.io/henari-interactive/explore-nq/birds/</loc></url>
  <url><loc>https://nagagamoga-star.github.io/henari-interactive/explore-nq/birds/count/</loc></url>
  <url><loc>https://nagagamoga-star.github.io/henari-interactive/explore-nq/garden/</loc></url>
  <url><loc>https://nagagamoga-star.github.io/henari-interactive/explore-nq/waterways-wildlife/</loc></url>
  <url><loc>https://nagagamoga-star.github.io/henari-interactive/explore-nq/fishing/</loc></url>
  <url><loc>https://nagagamoga-star.github.io/henari-interactive/explore-nq/fishing/my-catch/</loc></url>
  <url><loc>https://nagagamoga-star.github.io/henari-interactive/explore-nq/places/</loc></url>
</urlset>
`,
);
await writeFile(
  join(siteDir, 'llms.txt'),
  `# Henari Support Services

> Person-centred disability support and accessible everyday tools for people in Townsville and North Queensland.

## Discover Your Community

- [Explore Today](https://nagagamoga-star.github.io/henari-interactive/explore-nq/): Townsville activities, markets, parks, community groups, churches, food support and social events. Confirm current details with official sources.
- [Birds of Townsville](https://nagagamoga-star.github.io/henari-interactive/explore-nq/birds/): Common Townsville birds, where to look, and the Aussie Bird Count.
- [Garden in the Dry Tropics](https://nagagamoga-star.github.io/henari-interactive/explore-nq/garden/): Month-by-month Townsville wet- and dry-season gardening.
- [Waterways and wildlife](https://nagagamoga-star.github.io/henari-interactive/explore-nq/waterways-wildlife/): Crocodile safety, local wildlife, invasive species, mud crab and fishing rules.
- [Free and community places](https://nagagamoga-star.github.io/henari-interactive/explore-nq/places/): Free parks, paths, libraries, galleries, nature spots and community groups.
- [Fishing in Townsville](https://nagagamoga-star.github.io/henari-interactive/explore-nq/fishing/): Local fish, fishing places, basics, official Queensland rules and My Catch.
- [Townsville weather and tides](https://www.henarisupport.com/townsville-weather): Forecast, warnings, tides and moon information for planning local outings.

## Source and freshness

The Explore routes are static guides. Weather and tide information is linked to official services and the Henari Townsville weather page; this file does not claim live or real-time data. Confirm conditions, warnings, rules, opening hours and access details before travelling.
`,
);
await writeFile(
  join(siteDir, 'index.html'),
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Henari Interactive</title>
    <style>
      body { margin: 0; font-family: Georgia, serif; background: #fff8ef; color: #08233b; }
      main { max-width: 40rem; margin: 0 auto; padding: 2rem 1.25rem; }
      a { color: #438f8c; }
    </style>
  </head>
  <body>
    <main>
      <h1>Henari Interactive</h1>
      <p>Static experiments for Henari Support Services. These pages do not collect personal information.</p>
      <ul>
        <li><a href="wildlife-memory/">Australian Wildlife Memory Game</a></li>
        <li><a href="profile-builder/">How I Like to Be Supported</a></li>
        <li><a href="calm-bubbles/">Calm Bubbles</a></li>
        <li><a href="ready-plan/">Ready Plan</a></li>
        <li><a href="line-puzzles/">Line Puzzles</a></li>
        <li><a href="my-week/">My Week</a></li>
        <li><a href="crossword/">Crossword</a></li>
        <li><a href="explore-nq/">Discover Your Community</a></li>
      </ul>
    </main>
  </body>
</html>
`,
);

const { errors, notes } = await verifySite(siteDir, repoName, {
  snippet: (await pathExists(guideSnippet ?? '')) ? await readFile(guideSnippet, 'utf8') : undefined,
  releases: (await pathExists(guideReleases ?? '')) ? JSON.parse(await readFile(guideReleases, 'utf8')).published : undefined,
});
for (const note of notes) console.log(note);
if (errors.length > 0) {
  for (const error of errors) console.error(error);
  process.exit(1);
}
console.log(`Assembled ${siteDir}`);

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function readyPlanDirectDir(distPath) {
  const override = process.env.READY_PLAN_DIRECT?.trim();
  if (override) return override;
  // READY_DIST is source/wildlife/apps/ready-plan/dist, so three levels up is the
  // source checkout. Resolve it: a relative vite.js path is looked up again from
  // cwd and becomes source/wildlife/source/wildlife/node_modules/vite/bin/vite.js.
  const sourceRoot = resolve(distPath, '..', '..', '..');
  const config = join(sourceRoot, 'apps', 'ready-plan', 'vite.direct.config.ts');
  if (!(await pathExists(config))) return null;
  const vite = join(sourceRoot, 'node_modules', 'vite', 'bin', 'vite.js');
  const result = spawnSync(process.execPath, [vite, 'build', '--config', config], {
    cwd: sourceRoot,
    stdio: 'inherit',
    env: process.env,
  });
  if ((result.status ?? 1) !== 0) {
    console.error('The Ready Plan direct embed build failed.');
    process.exit(result.status ?? 1);
  }
  return join(sourceRoot, 'apps', 'ready-plan', 'dist-direct');
}

async function copyReadyPlanDirect(site, directDir) {
  if (!directDir) return;
  const names = ['henari-ready-plan.css', 'henari-ready-plan.js'];
  for (const name of names) {
    if (!(await pathExists(join(directDir, name)))) {
      console.error(`Ready Plan direct embed is missing ${name} in ${directDir}`);
      process.exit(1);
    }
  }
  const dest = join(site, 'ready-plan');
  await mkdir(dest, { recursive: true });
  for (const name of names) await cp(join(directDir, name), join(dest, name));
}

async function myWeekDirectDir(distPath) {
  const override = process.env.MY_WEEK_DIRECT?.trim();
  if (override) return override;
  // MY_WEEK_DIST is source/wildlife/apps/my-week/dist, so three levels up is the
  // source checkout. Resolve it so vite.js is not looked up again from that cwd.
  const sourceRoot = resolve(distPath, '..', '..', '..');
  const config = join(sourceRoot, 'apps', 'my-week', 'vite.direct.config.ts');
  if (!(await pathExists(config))) return null;
  const vite = join(sourceRoot, 'node_modules', 'vite', 'bin', 'vite.js');
  const result = spawnSync(process.execPath, [vite, 'build', '--config', config], {
    cwd: sourceRoot,
    stdio: 'inherit',
    env: process.env,
  });
  if ((result.status ?? 1) !== 0) {
    console.error('The My Week direct embed build failed.');
    process.exit(result.status ?? 1);
  }
  return join(sourceRoot, 'apps', 'my-week', 'dist-direct');
}

async function copyMyWeekDirect(site, directDir) {
  if (!directDir) return;
  const names = ['henari-my-week.css', 'henari-my-week.js'];
  for (const name of names) {
    if (!(await pathExists(join(directDir, name)))) {
      console.error(`My Week direct embed is missing ${name} in ${directDir}`);
      process.exit(1);
    }
  }
  const dest = join(site, 'my-week');
  await mkdir(dest, { recursive: true });
  for (const name of names) await cp(join(directDir, name), join(dest, name));
}

/**
 * The Henari Guide is loaded by a Squarespace snippet that pins one file by its hash, so a published
 * file must stay online and never change. Released files are kept in this repository's guide/ folder
 * and published every time. The fresh build is added beside them, and must match any archived file
 * of the same name byte for byte.
 */
async function copyGuide(site) {
  const archive = new URL('./guide/', import.meta.url).pathname;
  const dest = join(site, 'guide');
  const archived = (await pathExists(archive)) ? (await readdir(archive)).filter((name) => /^guide\.\d+\.\d+\.\d+\.js$/.test(name)) : [];
  const built = guideDist && (await pathExists(guideDist)) ? (await readdir(guideDist)).filter((name) => /^guide\.\d+\.\d+\.\d+\.js$/.test(name)) : [];
  if (archived.length === 0 && built.length === 0) return;
  await mkdir(dest, { recursive: true });
  for (const name of archived) await cp(join(archive, name), join(dest, name));
  for (const name of built) {
    const bytes = await readFile(join(guideDist, name));
    if (archived.includes(name) && !bytes.equals(await readFile(join(archive, name)))) {
      console.error(`guide/${name} is already released with different bytes. Bump GUIDE_VERSION in the source repository.`);
      process.exit(1);
    }
    await writeFile(join(dest, name), bytes);
  }
}
