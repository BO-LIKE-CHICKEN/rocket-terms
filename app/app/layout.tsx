import type { Metadata } from 'next';
import type { ReactNode } from 'react';

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
    url: 'https://one-more-floor.com/',
    images: [
      {
        url: 'https://one-more-floor.com/promo/og-image.png',
        width: 1024,
        height: 1024,
        alt: '한층한층 슬라임',
      },
    ],
  },
};

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <>{children}</>;
}
