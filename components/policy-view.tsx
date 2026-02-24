import AppVersionRedirect from '@/components/app-version-redirect';
import VersionSelect from '@/components/version-select';
import { Suspense } from 'react';
import type { PolicyDoc } from '@/lib/policy-doc';
import type { AppVersionMapEntry } from '@/lib/app-version';

interface PolicyViewProps {
  doc: PolicyDoc;
  html: string;
  policyDates: string[];
  selectedPolicyDate: string;
  versionMap: AppVersionMapEntry[];
}

export default function PolicyView({
  doc,
  html,
  policyDates,
  selectedPolicyDate,
  versionMap,
}: PolicyViewProps) {
  return (
    <main className="policy-shell">
      <Suspense fallback={null}>
        <AppVersionRedirect selectedPolicyDate={selectedPolicyDate} versionMap={versionMap} />
      </Suspense>

      <header className="policy-header">
        <div>
          <p className="policy-kicker">One More Floor</p>
          <h1>{doc.title}</h1>
          <p className="policy-description">{doc.description}</p>
        </div>

        <VersionSelect dates={policyDates} value={selectedPolicyDate} />

        <dl className="policy-meta">
          <div>
            <dt>공고일자</dt>
            <dd>{doc.effectiveDate || '-'}</dd>
          </div>
          <div>
            <dt>시행일자</dt>
            <dd>{doc.effectiveDate || '-'}</dd>
          </div>
          <div>
            <dt>정책 날짜</dt>
            <dd>{doc.policyDate || '-'}</dd>
          </div>
        </dl>
      </header>

      <article className="policy-body" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
