import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';

import { getVersionsFor, type LegalDocKind } from '@/lib/legal-docs';
import { source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';

interface LegalFrontmatter {
  app?: string;
  kind?: LegalDocKind;
  version?: string;
  effectiveDate?: string;
}

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const frontmatter = page.data as LegalFrontmatter;
  const legalInfo =
    typeof frontmatter.app === 'string' &&
    (frontmatter.kind === 'terms' || frontmatter.kind === 'privacy') &&
    typeof frontmatter.version === 'string';
  const versionState = legalInfo
    ? {
        app: frontmatter.app as string,
        kind: frontmatter.kind as LegalDocKind,
        version: frontmatter.version as string,
        effectiveDate: frontmatter.effectiveDate,
      }
    : null;
  const versions = versionState
    ? getVersionsFor(versionState.app, versionState.kind)
    : [];
  const latest = versions[0];

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>

      {versionState ? (
        <section className="version-panel">
          <div className="version-panel-head">
            <strong>
              버전 v{versionState.version}
              {versionState.effectiveDate
                ? ` · 시행일 ${versionState.effectiveDate}`
                : ''}
            </strong>
            {latest && latest.version !== versionState.version ? (
              <Link href={latest.url}>최신(v{latest.version}) 보기</Link>
            ) : null}
          </div>

          <div className="version-chip-row">
            {versions.map((version) => {
              const active = version.version === versionState.version;
              return (
                <Link
                  key={version.version}
                  href={version.url}
                  className={active ? 'version-chip active' : 'version-chip'}
                  aria-current={active ? 'page' : undefined}
                >
                  v{version.version}
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
