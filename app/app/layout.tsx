import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '한층한층 — 한 층 더 오를수록, 한층 더 건강해져요',
  description:
    '귀여운 슬라임과 매일 계단 오르기. 캡슐 보상, 6마리 슬라임 수집, 에베레스트까지 정복하세요.',
  other: {
    'apple-itunes-app': 'app-id=6759623745',
  },
  alternates: {
    canonical: 'https://one-more-floor.com/app',
  },
  openGraph: {
    title: '한층한층 — 슬라임과 함께하는 계단 오르기',
    description:
      '귀여운 슬라임과 함께 매일 계단 오르기 습관을 만들어보세요.',
    type: 'website',
    url: 'https://one-more-floor.com/app',
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
    title: '한층한층 — 슬라임과 함께하는 계단 오르기',
    description:
      '귀여운 슬라임과 함께 매일 계단 오르기 습관을 만들어보세요.',
    images: ['/promo/og-image.png'],
  },
};

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <>{children}</>;
}
