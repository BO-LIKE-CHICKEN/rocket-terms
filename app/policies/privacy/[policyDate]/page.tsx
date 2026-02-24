import { notFound } from 'next/navigation';

import PolicyView from '@/components/policy-view';
import {
  getPolicyDates,
  getPolicyDoc,
  getPolicyVersionMap,
  markdownToHtml,
} from '@/lib/policy-doc';

interface PrivacyPolicyDatePageProps {
  params: Promise<{
    policyDate: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const policyDates = await getPolicyDates();
  return policyDates.map((policyDate) => ({ policyDate }));
}

export default async function PrivacyPolicyDatePage({ params }: PrivacyPolicyDatePageProps) {
  const { policyDate } = await params;
  const policyDates = await getPolicyDates();
  const versionMap = await getPolicyVersionMap();

  if (!policyDates.includes(policyDate)) {
    notFound();
  }

  const doc = await getPolicyDoc(policyDate);
  if (!doc) {
    notFound();
  }

  const html = await markdownToHtml(doc.markdown);

  return (
    <PolicyView
      doc={doc}
      html={html}
      policyDates={policyDates}
      selectedPolicyDate={policyDate}
      versionMap={versionMap}
    />
  );
}
