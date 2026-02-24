import semver from 'semver';

import { source } from '@/lib/source';

export const DOC_KIND_LABEL: Record<LegalDocKind, string> = {
  terms: '이용약관',
  privacy: '개인정보 처리방침',
};

export type LegalDocKind = 'terms' | 'privacy';

export interface LegalDocVersion {
  appSlug: string;
  appName: string;
  kind: LegalDocKind;
  label: string;
  title: string;
  description?: string;
  version: string;
  effectiveDate: string;
  url: string;
}

export interface AppLegalSummary {
  appSlug: string;
  appName: string;
  latest: Partial<Record<LegalDocKind, LegalDocVersion>>;
}

interface LegalPageData {
  title?: string;
  description?: string;
  app?: string;
  kind?: string;
  version?: string;
  effectiveDate?: string;
}

function toAppName(appSlug: string): string {
  return appSlug
    .split(/[-_]/g)
    .filter(Boolean)
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join(' ');
}

function compareVersionsDesc(left: string, right: string): number {
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

function isLegalKind(kind: string): kind is LegalDocKind {
  return kind === 'terms' || kind === 'privacy';
}

function parsePage(page: ReturnType<typeof source.getPages>[number]): LegalDocVersion | null {
  const data = page.data as LegalPageData;
  if (!data.app || !data.kind || !data.version || !data.effectiveDate) {
    return null;
  }

  if (!isLegalKind(data.kind)) {
    return null;
  }

  return {
    appSlug: data.app,
    appName: toAppName(data.app),
    kind: data.kind,
    label: DOC_KIND_LABEL[data.kind],
    title: data.title ?? `${DOC_KIND_LABEL[data.kind]} ${data.version}`,
    description: data.description,
    version: data.version,
    effectiveDate: data.effectiveDate,
    url: page.url,
  };
}

export function getAllLegalDocVersions(): LegalDocVersion[] {
  return source
    .getPages()
    .map(parsePage)
    .filter((value): value is LegalDocVersion => value !== null)
    .sort((left, right) => {
      if (left.appSlug !== right.appSlug) {
        return left.appSlug.localeCompare(right.appSlug);
      }

      if (left.kind !== right.kind) {
        return left.kind.localeCompare(right.kind);
      }

      return compareVersionsDesc(left.version, right.version);
    });
}

export function getAppSummaries(): AppLegalSummary[] {
  const grouped = new Map<string, AppLegalSummary>();

  for (const version of getAllLegalDocVersions()) {
    const existing = grouped.get(version.appSlug);

    if (!existing) {
      grouped.set(version.appSlug, {
        appSlug: version.appSlug,
        appName: version.appName,
        latest: {
          [version.kind]: version,
        },
      });
      continue;
    }

    const latestForKind = existing.latest[version.kind];
    if (!latestForKind) {
      existing.latest[version.kind] = version;
      continue;
    }

    if (compareVersionsDesc(version.version, latestForKind.version) > 0) {
      continue;
    }

    existing.latest[version.kind] = version;
  }

  return [...grouped.values()].sort((left, right) =>
    left.appSlug.localeCompare(right.appSlug),
  );
}

export function getVersionsFor(
  appSlug: string,
  kind: LegalDocKind,
): LegalDocVersion[] {
  return getAllLegalDocVersions()
    .filter((version) => version.appSlug === appSlug && version.kind === kind)
    .sort((left, right) => compareVersionsDesc(left.version, right.version));
}
