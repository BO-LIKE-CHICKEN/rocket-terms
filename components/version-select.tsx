'use client';

import { useRouter } from 'next/navigation';

import { getPolicyVersionPath } from '@/lib/policy-route';

interface VersionSelectProps {
  versions: string[];
  value: string;
}

export default function VersionSelect({ versions, value }: VersionSelectProps) {
  const router = useRouter();

  return (
    <label className="version-select-wrap">
      <span className="version-select-label">버전</span>
      <select
        className="version-select"
        value={value}
        onChange={(event) => {
          router.replace(getPolicyVersionPath(event.target.value), { scroll: false });
        }}
      >
        {versions.map((version) => (
          <option key={version} value={version}>
            v{version}
          </option>
        ))}
      </select>
    </label>
  );
}
