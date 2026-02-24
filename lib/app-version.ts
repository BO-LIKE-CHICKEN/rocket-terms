export interface AppVersionMapEntry {
  minAppVersion: string;
  policyDate: string;
}

function parseAppVersion(version: string): number[] | null {
  const core = version.trim().split('+')[0].split('-')[0];
  if (!core) return null;

  const parts = core.split('.');
  if (parts.length === 0) return null;

  const numbers: number[] = [];
  for (const part of parts) {
    if (!/^\d+$/.test(part)) {
      return null;
    }
    numbers.push(Number(part));
  }

  return numbers;
}

function compareParsedVersion(left: number[], right: number[]): number {
  const maxLength = Math.max(left.length, right.length);

  for (let index = 0; index < maxLength; index += 1) {
    const leftValue = left[index] ?? 0;
    const rightValue = right[index] ?? 0;

    if (leftValue > rightValue) return 1;
    if (leftValue < rightValue) return -1;
  }

  return 0;
}

export function compareAppVersionDesc(left: string, right: string): number {
  const leftParsed = parseAppVersion(left);
  const rightParsed = parseAppVersion(right);

  if (leftParsed && rightParsed) {
    return compareParsedVersion(rightParsed, leftParsed);
  }

  if (leftParsed) return -1;
  if (rightParsed) return 1;

  return right.localeCompare(left, undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

export function isAppVersionGte(appVersion: string, minAppVersion: string): boolean {
  const appParsed = parseAppVersion(appVersion);
  const minParsed = parseAppVersion(minAppVersion);

  if (!appParsed || !minParsed) return false;
  return compareParsedVersion(appParsed, minParsed) >= 0;
}

export function sortVersionMapDesc<T extends AppVersionMapEntry>(entries: T[]): T[] {
  return [...entries].sort((left, right) =>
    compareAppVersionDesc(left.minAppVersion, right.minAppVersion),
  );
}

export function resolvePolicyDateByVersionMap(
  entries: AppVersionMapEntry[],
  appVersion: string,
): string | null {
  if (!parseAppVersion(appVersion)) {
    return null;
  }

  for (const entry of sortVersionMapDesc(entries)) {
    if (isAppVersionGte(appVersion, entry.minAppVersion)) {
      return entry.policyDate;
    }
  }

  return null;
}

