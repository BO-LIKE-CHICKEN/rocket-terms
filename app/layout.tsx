import './global.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

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
    <html lang="ko" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
