import type { ReactNode } from 'react';

interface HomeLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: HomeLayoutProps) {
  return children;
}
