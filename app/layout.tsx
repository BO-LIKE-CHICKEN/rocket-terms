import './global.css';
import { Bitter, IBM_Plex_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const bodyFont = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const headingFont = Bitter({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-heading',
});

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '한층한층 개인정보 처리방침',
  description: '한층한층 앱 개인정보 처리방침 문서',
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
    <html
      lang="ko"
      className={`${bodyFont.variable} ${headingFont.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
