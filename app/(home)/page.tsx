import '@/app/app/promo.css';
import HeroSection from '@/app/app/_sections/hero-section';
import FeaturesSection from '@/app/app/_sections/features-section';
import CharactersSection from '@/app/app/_sections/characters-section';
import ComicSection from '@/app/app/_sections/comic-section';
import CtaSection from '@/app/app/_sections/cta-section';
import FooterSection from '@/app/app/_sections/footer-section';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '한층한층 — 귀여운 슬라임과 함께하는 계단 오르기 앱',
  description:
    '지금 다운로드하고 귀여운 슬라임과 함께 매일 계단 오르기 습관을 시작하세요! 클라임 기록, 미션 달성, 캡슐 수집, 건물 정복 — 건강한 일상을 게임처럼 즐기는 무료 피트니스 앱.',
  other: {
    'apple-itunes-app': 'app-id=6759623745',
  },
  alternates: {
    canonical: 'https://one-more-floor.com',
  },
  openGraph: {
    title: '한층한층 — 귀여운 슬라임과 함께하는 계단 오르기 앱',
    description:
      '지금 다운로드! 귀여운 슬라임과 함께 매일 계단 오르기 습관을 만들어보세요.',
    type: 'website',
    url: 'https://one-more-floor.com/',
    images: [
      {
        url: '/promo/og-image.png',
        width: 1024,
        height: 1024,
        alt: '한층한층 슬라임',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '한층한층 — 귀여운 슬라임과 함께하는 계단 오르기 앱',
    description:
      '지금 다운로드! 귀여운 슬라임과 함께 매일 계단 오르기 습관을 만들어보세요.',
    images: ['/promo/og-image.png'],
  },
};

export default function PromoPage() {
  return (
    <div className="promo-root">
      <HeroSection />
      <FeaturesSection />
      <CharactersSection />
      <ComicSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
