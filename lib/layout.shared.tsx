import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const gitConfig = {
  user: 'bosung',
  repo: 'rocket-terms',
  branch: 'main',
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Rocket Terms',
    },
    links: [
      {
        text: '문서',
        url: '/docs',
        active: 'nested-url',
      },
    ],
  };
}
