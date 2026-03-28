import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '한층한층 — 한 층만 더, 귀여운 슬라임이 기다려요',
  description:
    '계단 오르기를 습관으로 만드는 앱. 매일 한 층, 슬라임 수집, D-1 랭킹까지.',
};

const APP_STORE_URL = 'https://apps.apple.com/app/id6742128498';

function HeroSection() {
  return (
    <section className="landing-hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            한 층만 더,
            <br />
            <span className="hero-accent">귀여운 슬라임</span>이 기다려요
          </h1>
          <p className="hero-sub">
            계단 오르기를 습관으로 만드는 앱.
            <br />
            매일 미션, 매일 보상, 20종 슬라임 수집까지.
          </p>
          <a
            href={APP_STORE_URL}
            className="hero-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="20"
              height="24"
              viewBox="0 0 17 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13.545 10.239c-.022-2.234 1.823-3.308 1.905-3.36-.038-.055-1.5-2.165-3.831-2.165-1.629 0-2.953.977-3.741.977-.787 0-2.003-.952-3.293-.927C2.847 4.79 1.266 5.886.603 7.555c-1.366 2.654-.349 6.589.982 8.745.651.941 1.427 1.998 2.446 1.96.982-.04 1.353-.635 2.54-.635 1.187 0 1.52.635 2.562.615 1.057-.019 1.727-.959 2.371-1.904.748-1.092 1.055-2.148 1.073-2.203-.024-.01-2.058-.79-2.08-3.134l.048.24zM11.15 3.292c.541-.654.906-1.563.806-2.468-.78.032-1.724.519-2.283 1.173-.5.579-.938 1.504-.82 2.392.87.068 1.756-.442 2.297-1.097z" />
            </svg>
            App Store에서 다운로드
          </a>
        </div>
        <div className="hero-visual">
          <div className="hero-slime-placeholder" aria-label="슬라임 캐릭터">
            <div className="slime-body">
              <div className="slime-shine" />
              <div className="slime-leaf" />
              <div className="slime-eye left" />
              <div className="slime-eye right" />
              <div className="slime-mouth" />
            </div>
          </div>
          <div className="hero-stairs" aria-hidden="true">
            <div className="stair s1" />
            <div className="stair s2" />
            <div className="stair s3" />
          </div>
        </div>
      </div>
      <div className="hero-particles" aria-hidden="true">
        <span className="particle p1" />
        <span className="particle p2" />
        <span className="particle p3" />
        <span className="particle p4" />
        <span className="particle p5" />
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: '📊',
      title: '정확한 계단 기록',
      desc: '기압 + 모션 센서 결합으로\n평지 보행과 구분되는 정확한 층수 측정',
    },
    {
      icon: '🫧',
      title: '슬라임 수집',
      desc: '20종 슬라임 스킨 수집 & 커스터마이징\n운동인데 게임 같은 느낌',
    },
    {
      icon: '🏆',
      title: 'D-1 랭킹',
      desc: '어제 오른 층수로 다른 사용자와 비교\n완전 익명, 언제든 해제 가능',
    },
  ];

  return (
    <section className="landing-features">
      <h2 className="features-heading">왜 한층한층인가요?</h2>
      <div className="features-grid">
        {features.map((f) => (
          <div key={f.title} className="feature-card">
            <span className="feature-icon">{f.icon}</span>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">
              {f.desc.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="landing-cta">
      <p className="cta-text">
        오늘도 한 층, <strong>한층</strong>
      </p>
      <a
        href={APP_STORE_URL}
        className="cta-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        무료로 시작하기
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="landing-footer">
      <div className="footer-links">
        <a href="/policies/privacy/">개인정보처리방침</a>
        <span className="footer-dot" aria-hidden="true" />
        <a href="/support/">고객지원</a>
        <span className="footer-dot" aria-hidden="true" />
        <a href="mailto:onemorefloor.dev@gmail.com">문의</a>
      </div>
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} 한층한층. All rights reserved.
      </p>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="landing-root">
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
