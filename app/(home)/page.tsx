import Link from 'next/link';
import { DOC_KIND_LABEL, getAppSummaries } from '@/lib/legal-docs';

export default async function HomePage() {
  const summaries = getAppSummaries();

  return (
    <div className="legal-shell">
      <section className="hero-card">
        <p className="hero-kicker">Terms & Privacy Registry</p>
        <h1>앱별 약관/개인정보 문서를 버전 단위로 공개</h1>
        <p>
          MDX 기반(Fumadocs) 문서를 HTML로 제공하고, 버전 히스토리를 한 화면에서
          확인할 수 있습니다.
        </p>
        <Link href="/docs" className="hero-link">
          문서 센터 열기
        </Link>
      </section>

      <section className="summary-section">
        <div>
          <h2>앱 문서 현황</h2>
          <p>각 앱의 최신 이용약관/개인정보 처리방침으로 이동합니다.</p>
        </div>

        {summaries.length === 0 ? (
          <article className="empty-state">
            <h3>등록된 문서가 없습니다.</h3>
            <p>
              <code>content/docs/apps/&lt;app&gt;/(terms|privacy)/&lt;version&gt;.mdx</code>{' '}
              형태로 파일을 추가하세요.
            </p>
          </article>
        ) : (
          <div className="summary-grid">
            {summaries.map((summary) => (
              <article key={summary.appSlug} className="summary-card">
                <header>
                  <p>{summary.appSlug}</p>
                  <h3>{summary.appName}</h3>
                </header>

                <ul>
                  {(['terms', 'privacy'] as const).map((kind) => {
                    const latest = summary.latest[kind];
                    if (!latest) {
                      return (
                        <li key={kind}>
                          <div className="doc-pill disabled">
                            <span>{DOC_KIND_LABEL[kind]}</span>
                            <small>문서 없음</small>
                          </div>
                        </li>
                      );
                    }

                    return (
                      <li key={kind}>
                        <Link href={latest.url} className="doc-pill">
                          <span>{DOC_KIND_LABEL[kind]}</span>
                          <small>
                            v{latest.version} · {latest.effectiveDate}
                          </small>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
