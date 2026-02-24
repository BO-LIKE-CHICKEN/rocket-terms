import { notFound } from 'next/navigation';

import PolicyView from '@/components/policy-view';
import { getPolicyDoc, getPolicyVersions, markdownToHtml } from '@/lib/policy-doc';

interface PrivacyVersionPageProps {
  params: Promise<{
    version: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const versions = await getPolicyVersions();
  return versions.map((version) => ({ version }));
}

export default async function PrivacyVersionPage({ params }: PrivacyVersionPageProps) {
  const { version } = await params;
  const versions = await getPolicyVersions();

  if (!versions.includes(version)) {
    notFound();
  }

  const doc = await getPolicyDoc(version);
  if (!doc) {
    notFound();
  }

  const html = await markdownToHtml(doc.markdown);

  return <PolicyView doc={doc} html={html} versions={versions} selectedVersion={version} />;
}

