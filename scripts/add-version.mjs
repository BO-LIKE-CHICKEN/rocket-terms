import { promises as fs } from 'node:fs';
import path from 'node:path';

import semver from 'semver';

const KIND_LABEL = {
  terms: '이용약관',
  privacy: '개인정보 처리방침',
};

function toYamlString(value) {
  return JSON.stringify(String(value));
}

function usage() {
  console.log(
    [
      'Usage:',
      '  npm run add-version -- --app <slug> --kind <terms|privacy> --version <x.y.z> --effective-date <YYYY-MM-DD> [--title <text>] [--description <text>]',
      '',
      'Example:',
      '  npm run add-version -- --app rocket-chat --kind terms --version 1.2.0 --effective-date 2026-03-01',
    ].join('\n'),
  );
}

function parseArgs(argv) {
  const args = {};

  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    if (!key.startsWith('--')) continue;

    const value = argv[i + 1];
    if (!value || value.startsWith('--')) {
      args[key.slice(2)] = true;
      continue;
    }

    args[key.slice(2)] = value;
    i += 1;
  }

  return args;
}

function normalizeSlug(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function toAppName(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}

async function pathExists(targetPath) {
  try {
    await fs.stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath, fallback) {
  if (!(await pathExists(filePath))) {
    return fallback;
  }

  const source = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(source);
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
}

function sortVersionPages(pages) {
  return [...new Set(pages)].sort((left, right) => {
    const leftValid = semver.valid(left) !== null;
    const rightValid = semver.valid(right) !== null;

    if (leftValid && rightValid) {
      return semver.rcompare(left, right);
    }

    if (leftValid) return -1;
    if (rightValid) return 1;

    return right.localeCompare(left, undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const app = normalizeSlug(args.app);
  const kind = args.kind ?? args.doc;
  const version = String(args.version ?? '').trim();
  const effectiveDate = String(args['effective-date'] ?? args.effectiveDate ?? '').trim();

  if (!app || !kind || !version || !effectiveDate) {
    usage();
    process.exit(1);
  }

  if (!['terms', 'privacy'].includes(kind)) {
    console.error('`--kind` must be either `terms` or `privacy`.');
    process.exit(1);
  }

  const root = process.cwd();
  const appsDir = path.join(root, 'content', 'docs', 'apps');
  const appDir = path.join(appsDir, app);
  const kindDir = path.join(appDir, kind);
  const mdxPath = path.join(kindDir, `${version}.mdx`);

  await fs.mkdir(kindDir, { recursive: true });

  if (await pathExists(mdxPath)) {
    console.error(`Version already exists: ${mdxPath}`);
    process.exit(1);
  }

  const title = args.title?.trim() || `${toAppName(app)} ${KIND_LABEL[kind]}`;
  const description =
    args.description?.trim() || `${toAppName(app)} ${KIND_LABEL[kind]} ${version}`;

  const content = `---\ntitle: ${toYamlString(title)}\ndescription: ${toYamlString(description)}\napp: ${toYamlString(app)}\nkind: ${toYamlString(kind)}\nversion: ${toYamlString(version)}\neffectiveDate: ${toYamlString(effectiveDate)}\n---\n\n## 변경 사항\n\n- 여기에 변경 사항을 기록하세요.\n`;

  await fs.writeFile(mdxPath, content, 'utf-8');

  const appsMetaPath = path.join(appsDir, 'meta.json');
  const appMetaPath = path.join(appDir, 'meta.json');
  const kindMetaPath = path.join(kindDir, 'meta.json');

  const appsMeta = await readJson(appsMetaPath, {
    title: '앱 문서',
    pages: [],
  });
  appsMeta.pages = [...new Set([...(appsMeta.pages ?? []), app])].sort();

  const appMeta = await readJson(appMetaPath, {
    title: toAppName(app),
    pages: ['terms', 'privacy'],
  });
  appMeta.title = appMeta.title || toAppName(app);
  appMeta.pages = [...new Set([...(appMeta.pages ?? []), kind])];

  const kindMeta = await readJson(kindMetaPath, {
    title: KIND_LABEL[kind],
    pages: [],
  });
  kindMeta.title = kindMeta.title || KIND_LABEL[kind];
  kindMeta.pages = sortVersionPages([...(kindMeta.pages ?? []), version]);

  await Promise.all([
    writeJson(appsMetaPath, appsMeta),
    writeJson(appMetaPath, appMeta),
    writeJson(kindMetaPath, kindMeta),
  ]);

  console.log(`Created: ${path.relative(root, mdxPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
