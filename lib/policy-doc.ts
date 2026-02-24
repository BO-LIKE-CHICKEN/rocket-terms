import { promises as fs } from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import {
  resolvePolicyDateByVersionMap,
  sortVersionMapDesc,
  type AppVersionMapEntry,
} from '@/lib/app-version';

const POLICY_VERSIONS_DIR = path.join(
  process.cwd(),
  'docs',
  'policies',
  'privacy',
  'versions',
);

const POLICY_VERSION_MAP_PATH = path.join(
  process.cwd(),
  'docs',
  'policies',
  'privacy',
  'version-map.json',
);

export interface PolicyDoc {
  title: string;
  description: string;
  policyDate: string;
  effectiveDate: string;
  markdown: string;
}

export interface PolicyVersionMapEntry extends AppVersionMapEntry {}

function comparePolicyDateDesc(left: string, right: string): number {
  return right.localeCompare(left, undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const source = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(source) as T;
  } catch {
    return fallback;
  }
}

export async function getPolicyDates(): Promise<string[]> {
  const entries = await fs.readdir(POLICY_VERSIONS_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
    .map((entry) => entry.name.replace(/\.mdx$/, ''))
    .sort(comparePolicyDateDesc);
}

export async function getLatestPolicyDate(): Promise<string | null> {
  const dates = await getPolicyDates();
  return dates[0] ?? null;
}

export async function getPolicyDoc(policyDate: string): Promise<PolicyDoc | null> {
  const filePath = path.join(POLICY_VERSIONS_DIR, `${policyDate}.mdx`);

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
    typeof parsed.data.effectiveDate === 'string' ? parsed.data.effectiveDate : policyDate;
  const dateFromFrontmatter =
    typeof parsed.data.policyDate === 'string' ? parsed.data.policyDate : policyDate;

  return {
    title,
    description,
    policyDate: dateFromFrontmatter,
    effectiveDate,
    markdown: parsed.content,
  };
}

export async function getPolicyVersionMap(): Promise<PolicyVersionMapEntry[]> {
  const data = await readJson<PolicyVersionMapEntry[]>(POLICY_VERSION_MAP_PATH, []);

  return sortVersionMapDesc(
    data
    .filter(
      (entry) =>
        Boolean(entry) &&
        typeof entry.minAppVersion === 'string' &&
        typeof entry.policyDate === 'string',
    ),
  );
}

export async function resolvePolicyDateByAppVersion(
  appVersion: string,
): Promise<string | null> {
  const mapEntries = await getPolicyVersionMap();
  return resolvePolicyDateByVersionMap(mapEntries, appVersion);
}

export async function selectPolicyDate(appVersion?: string): Promise<string | null> {
  if (appVersion) {
    const mappedDate = await resolvePolicyDateByAppVersion(appVersion);
    if (mappedDate) {
      return mappedDate;
    }
  }

  return getLatestPolicyDate();
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const rendered = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);

  return rendered.toString();
}
