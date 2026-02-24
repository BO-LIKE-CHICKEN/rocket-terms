export const PUBLIC_APP_SLUG = 'one-more-floor';
export const PUBLIC_DOC_KIND = 'privacy';

export const POLICY_BASE_PATH = `/docs/apps/${PUBLIC_APP_SLUG}/${PUBLIC_DOC_KIND}`;

export function getPolicyVersionPath(version: string): string {
  return `${POLICY_BASE_PATH}/${encodeURIComponent(version)}/`;
}

