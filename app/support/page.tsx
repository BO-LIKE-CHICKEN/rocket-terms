import Image from 'next/image';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <main className="support-shell">
      <section className="support-hero">
        <Image
          className="support-app-icon"
          src="/support/one-more-floor-app-icon.png"
          alt="한층한층 앱 아이콘"
          width={144}
          height={144}
        />
        <div>
          <p className="support-kicker">Support</p>
          <h1>한층한층 고객지원</h1>
          <p className="support-description">
            한 층, 한층 더 건강해지는 습관을 돕는 앱 <strong>한층한층</strong> 지원 페이지입니다.
          </p>
        </div>
      </section>

      <section className="support-card">
        <h2>문의</h2>
        <ul>
          <li>
            이메일: <a href="mailto:onemorefloor.dev@gmail.com">onemorefloor.dev@gmail.com</a>
          </li>
          <li>답변 시간: 영업일 기준 2~3일 이내</li>
        </ul>
      </section>

      <section className="support-card">
        <h2>자주 묻는 질문 (FAQ)</h2>

        <h3>Q. 기록이 사라졌어요.</h3>
        <p>
          현재 시즌 0에서는 기록이 내 기기에만 저장됩니다.
          <br />
          앱 삭제, 기기 초기화, 기기 변경 시 기록이 사라질 수 있습니다.
        </p>

        <h3>Q. 계단 기록이 시작되지 않아요.</h3>
        <p>iPhone 설정에서 한층한층 &gt; 모션 및 피트니스 권한을 허용해 주세요.</p>

        <h3>Q. 개인정보는 어디서 확인하나요?</h3>
        <p>
          개인정보처리방침:{' '}
          <Link href="/policies/privacy/2026-02-24/">/policies/privacy/2026-02-24/</Link>
        </p>
      </section>

      <section className="support-card">
        <h2>앱 정보</h2>
        <ul>
          <li>앱 이름: 한층한층</li>
          <li>카테고리: 건강 및 피트니스</li>
        </ul>
      </section>

      <p className="support-updated">최종 업데이트: 2026-02-26</p>
    </main>
  );
}
