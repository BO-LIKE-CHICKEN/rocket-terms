import VersionSelect from '@/components/version-select';
import type { PolicyDoc } from '@/lib/policy-doc';

interface PolicyViewProps {
  doc: PolicyDoc;
  html: string;
  versions: string[];
  selectedVersion: string;
}

export default function PolicyView({
  doc,
  html,
  versions,
  selectedVersion,
}: PolicyViewProps) {
  return (
    <main className="policy-shell">
      <header className="policy-header">
        <div>
          <p className="policy-kicker">One More Floor</p>
          <h1>{doc.title}</h1>
          <p className="policy-description">{doc.description}</p>
        </div>

        <VersionSelect versions={versions} value={selectedVersion} />

        <dl className="policy-meta">
          <div>
            <dt>공고일자</dt>
            <dd>{doc.effectiveDate || '-'}</dd>
          </div>
          <div>
            <dt>시행일자</dt>
            <dd>{doc.effectiveDate || '-'}</dd>
          </div>
        </dl>
      </header>

      <article className="policy-body" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}

