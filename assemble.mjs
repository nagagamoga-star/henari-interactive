import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { verifySite } from './verify-site.mjs';

const siteDir = process.env.SITE_DIR;
const wildlifeDist = process.env.WILDLIFE_DIST;
const profileDist = process.env.PROFILE_DIST;
const repoName = process.env.PAGES_REPOSITORY_NAME ?? 'henari-interactive';

if (!siteDir || !wildlifeDist || !profileDist) {
  console.error('SITE_DIR, WILDLIFE_DIST and PROFILE_DIST are required.');
  process.exit(1);
}

await rm(siteDir, { recursive: true, force: true });
await mkdir(join(siteDir, 'wildlife-memory'), { recursive: true });
await mkdir(join(siteDir, 'profile-builder'), { recursive: true });
await cp(wildlifeDist, join(siteDir, 'wildlife-memory'), { recursive: true });
await cp(profileDist, join(siteDir, 'profile-builder'), { recursive: true });
await writeFile(join(siteDir, '.nojekyll'), '');
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
      </ul>
    </main>
  </body>
</html>
`,
);

const { errors, notes } = await verifySite(siteDir, repoName);
for (const note of notes) console.log(note);
if (errors.length > 0) {
  for (const error of errors) console.error(error);
  process.exit(1);
}
console.log(`Assembled ${siteDir}`);
