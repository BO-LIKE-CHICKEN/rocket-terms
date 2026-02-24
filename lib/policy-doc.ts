import { promises as fs } from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import semver from 'semver';
import { PUBLIC_APP_SLUG, PUBLIC_DOC_KIND } from '@/lib/policy-route';

const DOC_DIR = path.join(
  process.cwd(),
  'content',
  'docs',
  'apps',
  PUBLIC_APP_SLUG,
  PUBLIC_DOC_KIND,
);

export interface PolicyDoc {
  title: string;
  description: string;
  version: string;
  effectiveDate: string;
  markdown: string;
}

function compareVersionDesc(left: string, right: string): number {
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
}

export async function getPolicyVersions(): Promise<string[]> {
  const entries = await fs.readdir(DOC_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
    .map((entry) => entry.name.replace(/\.mdx$/, ''))
    .sort(compareVersionDesc);
}

export async function getLatestPolicyVersion(): Promise<string | null> {
  const versions = await getPolicyVersions();
  return versions[0] ?? null;
}

export async function getPolicyDoc(version: string): Promise<PolicyDoc | null> {
  const filePath = path.join(DOC_DIR, `${version}.mdx`);

  let source: string;
  try {
    source = await fs.readFile(filePath, 'utf-8');
  } catch {
    return null;
  }

  const parsed = matter(source);

  const title =
    typeof parsed.data.title === 'string' ? parsed.data.title : '개인정보 처리방침';
  const description =
    typeof parsed.data.description === 'string' ? parsed.data.description : '';
  const effectiveDate =
    typeof parsed.data.effectiveDate === 'string' ? parsed.data.effectiveDate : '';

  return {
    title,
    description,
    version,
    effectiveDate,
    markdown: parsed.content,
  };
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const rendered = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);

  return rendered.toString();
}
