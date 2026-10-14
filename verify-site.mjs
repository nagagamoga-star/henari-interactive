import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const TEXT = new Set(['.html', '.js', '.css', '.svg', '.json', '.txt', '.webmanifest']);
const FORBIDDEN_NAME = /(\.env$|credentials|henari-support-profile|\.pem$|\.key$|\.p12$)/i;
const FORBIDDEN_TEXT = [
  /BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bghp_[A-Za-z0-9]{20,}/,
  /\bgithub_pat_[A-Za-z0-9_]{20,}/,
  /googletagmanager\.com|google-analytics\.com|connect\.facebook\.net|doubleclick\.net/i,
];
const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

function postMessageUsesWildcard(source) {
  const calls = source.split('postMessage(').slice(1);
  return calls.some((call) => /['"]\*['"]/.test(call.slice(0, 160)));
}

export async function verifySite(siteDir, repoName) {
  const errors = [];
  const notes = [];
  const files = await walk(siteDir);
  const rel = (file) => relative(siteDir, file).replaceAll('\\', '/');

  for (const file of files) {
    const name = rel(file);
    if (FORBIDDEN_NAME.test(name)) errors.push(`forbidden file: ${name}`);
    if (name.endsWith('.map')) errors.push(`source map published: ${name}`);
  }

  for (const app of ['wildlife-memory', 'profile-builder', 'calm-bubbles']) {
    const indexPath = join(siteDir, app, 'index.html');
    let html;
    try {
      html = await readFile(indexPath, 'utf8');
    } catch {
      errors.push(`missing ${app}/index.html`);
      continue;
    }
    const prefix = `/${repoName}/${app}/`;
    const refs = [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)].map((match) => match[1]);
    const assets = refs.filter((ref) => /\.(?:js|css)(?:\?|$)/.test(ref));
    if (assets.length === 0) errors.push(`${app} index has no JS or CSS reference`);
    for (const ref of assets) {
      if (/^https?:\/\//i.test(ref)) errors.push(`${app} loads an external asset: ${ref}`);
      else if (!ref.startsWith(prefix)) errors.push(`${app} asset is outside ${prefix}: ${ref}`);
    }
  }

  const profileJs = files.filter((file) => rel(file).startsWith('profile-builder/') && file.endsWith('.js'));
  const profileSource = (await Promise.all(profileJs.map((file) => readFile(file, 'utf8')))).join('\n');
  if (profileJs.length > 0 && !/fictional example/i.test(profileSource)) {
    errors.push('profile-builder bundle is missing the fictional-example marker');
  }

  for (const file of files) {
    if (!TEXT.has(extname(file))) continue;
    const source = await readFile(file, 'utf8');
    const name = rel(file);
    if (postMessageUsesWildcard(source)) errors.push(`${name} posts messages to *`);
    for (const pattern of FORBIDDEN_TEXT) {
      if (pattern.test(source)) errors.push(`${name} matches ${pattern}`);
    }
    const email = source.match(EMAIL);
    if (email) errors.push(`${name} contains an email address (${email[0]})`);
  }

  const wildlifeFonts = files.some((file) => rel(file).startsWith('wildlife-memory/') && /\.woff2?$/.test(file));
  if (!wildlifeFonts) errors.push('wildlife-memory is missing self-hosted font files');

  const profileCss = (
    await Promise.all(
      files
        .filter((file) => rel(file).startsWith('profile-builder/') && file.endsWith('.css'))
        .map((file) => readFile(file, 'utf8')),
    )
  ).join('\n');
  const profileFonts = files.some((file) => rel(file).startsWith('profile-builder/') && /\.woff2?$/.test(file));
  if (!profileFonts && !profileCss.includes('@font-face')) {
    errors.push('profile-builder is missing self-hosted fonts');
  }

  let bytes = 0;
  for (const file of files) bytes += (await stat(file)).size;
  notes.push(`Site files: ${files.length}. Total size: ${(bytes / 1024 / 1024).toFixed(2)} MB.`);
  return { errors, notes };
}

const isDirect = process.argv[1] && process.argv[1].endsWith('verify-site.mjs');
if (isDirect) {
  const siteDir = process.env.SITE_DIR;
  const repoName = process.env.PAGES_REPOSITORY_NAME ?? 'henari-interactive';
  if (!siteDir) {
    console.error('SITE_DIR is required');
    process.exit(1);
  }
  const { errors, notes } = await verifySite(siteDir, repoName);
  for (const note of notes) console.log(note);
  if (errors.length > 0) {
    for (const error of errors) console.error(error);
    process.exit(1);
  }
  console.log('Site verification passed.');
}
