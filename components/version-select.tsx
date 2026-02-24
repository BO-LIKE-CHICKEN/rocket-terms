'use client';

import { useRouter } from 'next/navigation';

import { getPolicyDatePath } from '@/lib/policy-route';

interface VersionSelectProps {
  dates: string[];
  value: string;
}

export default function VersionSelect({ dates, value }: VersionSelectProps) {
  const router = useRouter();

  return (
    <label className="version-select-wrap">
      <span className="version-select-label">정책 날짜</span>
      <select
        className="version-select"
        value={value}
        onChange={(event) => {
          router.replace(getPolicyDatePath(event.target.value), { scroll: false });
        }}
      >
        {dates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
    </label>
  );
}
