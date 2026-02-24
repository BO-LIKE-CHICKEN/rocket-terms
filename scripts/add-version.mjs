import { promises as fs } from 'node:fs';
import path from 'node:path';

import semver from 'semver';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function usage() {
  console.log(
    [
      'Usage:',
      '  yarn add-version -- --min-app-version <x.y.z> --policy-date <YYYY-MM-DD> [--effective-date <YYYY-MM-DD>] [--title <text>] [--description <text>]',
      '',
      'Example:',
      '  yarn add-version -- --min-app-version 1.1.0 --policy-date 2026-04-01 --effective-date 2026-04-01',
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

function asString(value) {
  return JSON.stringify(String(value));
}

async function readJson(filePath, fallback) {
  try {
    const source = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(source);
  } catch {
    return fallback;
  }
}

async function pathExists(targetPath) {
  try {
    await fs.stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

function compareMapEntryDesc(left, right) {
  const leftValid = semver.valid(left.minAppVersion) !== null;
  const rightValid = semver.valid(right.minAppVersion) !== null;

  if (leftValid && rightValid) {
    return semver.rcompare(left.minAppVersion, right.minAppVersion);
  }

  if (leftValid) return -1;
  if (rightValid) return 1;

  return right.minAppVersion.localeCompare(left.minAppVersion, undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

function validateDate(value, fieldName) {
  if (!DATE_PATTERN.test(value)) {
    console.error(`\`${fieldName}\` must be in YYYY-MM-DD format.`);
    process.exit(1);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const minAppVersion = String(
    args['min-app-version'] ?? args.minAppVersion ?? '',
  ).trim();
  const policyDate = String(args['policy-date'] ?? args.policyDate ?? args.date ?? '').trim();
  const effectiveDate = String(
    args['effective-date'] ?? args.effectiveDate ?? policyDate,
  ).trim();

  if (!minAppVersion || !policyDate) {
    usage();
    process.exit(1);
  }

  if (!semver.valid(minAppVersion)) {
    console.error('`--min-app-version` must be a valid semver (e.g. 1.2.0).');
    process.exit(1);
  }

  validateDate(policyDate, '--policy-date');
  validateDate(effectiveDate, '--effective-date');

  const root = process.cwd();
  const versionsDir = path.join(root, 'docs', 'policies', 'privacy', 'versions');
  const versionMapPath = path.join(root, 'docs', 'policies', 'privacy', 'version-map.json');
  const mdxPath = path.join(versionsDir, `${policyDate}.mdx`);

  await fs.mkdir(versionsDir, { recursive: true });

  if (await pathExists(mdxPath)) {
    console.error(`Policy file already exists: ${path.relative(root, mdxPath)}`);
    process.exit(1);
  }

  const title = String(args.title ?? '개인정보 처리방침').trim();
  const description = String(args.description ?? '한층한층 개인정보 처리방침').trim();

  const mdxSource = `---\ntitle: ${asString(title)}\ndescription: ${asString(description)}\npolicyDate: ${asString(policyDate)}\neffectiveDate: ${asString(effectiveDate)}\n---\n\n## 변경 사항\n\n- 여기에 변경 사항을 기록하세요.\n`;

  await fs.writeFile(mdxPath, mdxSource, 'utf-8');

  const versionMap = await readJson(versionMapPath, []);
  if (!Array.isArray(versionMap)) {
    console.error(`Invalid JSON format: ${path.relative(root, versionMapPath)}`);
    process.exit(1);
  }

  const duplicatedMinVersion = versionMap.find(
    (entry) => entry && entry.minAppVersion === minAppVersion,
  );
  if (duplicatedMinVersion) {
    console.error(
      `Mapping for minAppVersion ${minAppVersion} already exists (${duplicatedMinVersion.policyDate}).`,
    );
    process.exit(1);
  }

  const nextVersionMap = [...versionMap, { minAppVersion, policyDate }].sort(
    compareMapEntryDesc,
  );
  await fs.writeFile(versionMapPath, `${JSON.stringify(nextVersionMap, null, 2)}\n`, 'utf-8');

  console.log(`Created: ${path.relative(root, mdxPath)}`);
  console.log(`Updated: ${path.relative(root, versionMapPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

