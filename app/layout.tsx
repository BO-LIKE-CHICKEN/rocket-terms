import './global.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL('https://one-more-floor.com'),
  title: '한층한층 — 한 층 더 오를수록, 한층 더 건강해져요',
  description:
    '귀여운 슬라임과 매일 계단 오르기. 캡슐 보상, 6마리 슬라임 수집, 에베레스트까지 정복하세요.',
  keywords: [
    '계단 오르기',
    '피트니스',
    '슬라임',
    '건강',
    '한층한층',
    '운동',
    'stair climbing',
  ],
  authors: [{ name: '한층한층' }],
  alternates: {
    canonical: 'https://one-more-floor.com',
  },
  openGraph: {
    title: '한층한층 — 한 층 더 오를수록, 한층 더 건강해져요',
    description: '귀여운 슬라임과 매일 계단 오르기. 캡슐 보상, 6마리 슬라임 수집, 에베레스트까지 정복하세요.',
    type: 'website',
    url: 'https://one-more-floor.com/',
    siteName: '한층한층',
    locale: 'ko_KR',
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
    title: '한층한층 — 한 층 더 오를수록, 한층 더 건강해져요',
    description: '귀여운 슬라임과 매일 계단 오르기. 캡슐 보상, 6마리 슬라임 수집, 에베레스트까지 정복하세요.',
    images: ['/promo/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '한층한층',
  url: 'https://one-more-floor.com',
  logo: 'https://one-more-floor.com/promo/og-image.png',
};

const jsonLdApp = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '한층한층',
  operatingSystem: 'iOS',
  applicationCategory: 'HealthApplication',
  description:
    '귀여운 슬라임과 함께 매일 계단 오르기 습관을 만들어보세요. 클라임, 미션, 캡슐, 정복까지 — 건강한 일상을 게임처럼.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  },
  image: 'https://one-more-floor.com/promo/og-image.png',
  url: 'https://one-more-floor.com/app',
};

export default function Layout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrganization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdApp),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
