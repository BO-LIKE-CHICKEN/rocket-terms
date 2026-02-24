import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Bitter, IBM_Plex_Sans } from 'next/font/google';

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

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="ko"
      className={`${bodyFont.variable} ${headingFont.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-[#f4efe6] text-zinc-900 antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
