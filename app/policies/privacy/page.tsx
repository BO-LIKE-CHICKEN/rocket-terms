import { notFound } from 'next/navigation';

import PolicyView from '@/components/policy-view';
import {
  getPolicyDates,
  getPolicyDoc,
  getPolicyVersionMap,
  markdownToHtml,
  selectPolicyDate,
} from '@/lib/policy-doc';

export default async function PrivacyLatestPage() {
  const policyDates = await getPolicyDates();
  const versionMap = await getPolicyVersionMap();
  const selectedPolicyDate = (await selectPolicyDate()) ?? policyDates[0];

  if (!selectedPolicyDate) {
    notFound();
  }

  const doc = await getPolicyDoc(selectedPolicyDate);
  if (!doc) {
    notFound();
  }

  const html = await markdownToHtml(doc.markdown);

  return (
    <PolicyView
      doc={doc}
      html={html}
      policyDates={policyDates}
      selectedPolicyDate={selectedPolicyDate}
      versionMap={versionMap}
    />
  );
}
