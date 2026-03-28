import '@/app/app/promo.css';
import HeroSection from '@/app/app/_sections/hero-section';
import FeaturesSection from '@/app/app/_sections/features-section';
import CharactersSection from '@/app/app/_sections/characters-section';
import ComicSection from '@/app/app/_sections/comic-section';
import CtaSection from '@/app/app/_sections/cta-section';
import FooterSection from '@/app/app/_sections/footer-section';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '한층한층 — 슬라임과 함께하는 계단 오르기',
  description:
    '귀여운 슬라임과 함께 매일 계단 오르기 습관을 만들어보세요. 클라임, 미션, 캡슐, 정복까지 — 건강한 일상을 게임처럼.',
  other: {
    'apple-itunes-app': 'app-id=6759623745',
  },
  openGraph: {
    title: '한층한층 — 슬라임과 함께하는 계단 오르기',
    description:
      '귀여운 슬라임과 함께 매일 계단 오르기 습관을 만들어보세요.',
    type: 'website',
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
