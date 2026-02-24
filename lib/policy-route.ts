export const POLICY_BASE_PATH = '/policies/privacy';

export function getPolicyDatePath(policyDate: string): string {
  return `${POLICY_BASE_PATH}/${encodeURIComponent(policyDate)}/`;
}

export function getPolicyLatestPath(): string {
  return `${POLICY_BASE_PATH}/`;
}
