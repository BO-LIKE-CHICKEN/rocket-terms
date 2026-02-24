'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { resolvePolicyDateByVersionMap, type AppVersionMapEntry } from '@/lib/app-version';
import { getPolicyDatePath } from '@/lib/policy-route';

interface AppVersionRedirectProps {
  selectedPolicyDate: string;
  versionMap: AppVersionMapEntry[];
}

export default function AppVersionRedirect({
  selectedPolicyDate,
  versionMap,
}: AppVersionRedirectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const appVersion = searchParams.get('appVersion')?.trim();
    if (!appVersion) {
      return;
    }

    const mappedDate = resolvePolicyDateByVersionMap(versionMap, appVersion);
    if (!mappedDate || mappedDate === selectedPolicyDate) {
      return;
    }

    router.replace(getPolicyDatePath(mappedDate), { scroll: false });
  }, [router, searchParams, selectedPolicyDate, versionMap]);

  return null;
}

