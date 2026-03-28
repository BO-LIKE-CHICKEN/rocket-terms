import './global.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '한층한층 — 계단 오르기를 습관으로',
  description:
    '한 층만 더 올라가면 귀여운 슬라임이 기다려요. 계단 오르기 기록, 슬라임 수집, D-1 랭킹.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-image-preview': 'none',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function Layout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
