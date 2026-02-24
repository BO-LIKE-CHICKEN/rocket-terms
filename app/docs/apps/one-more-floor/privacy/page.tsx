import { notFound } from 'next/navigation';

import PolicyView from '@/components/policy-view';
import {
  getLatestPolicyVersion,
  getPolicyDoc,
  getPolicyVersions,
  markdownToHtml,
} from '@/lib/policy-doc';

export default async function PrivacyLatestPage() {
  const versions = await getPolicyVersions();
  const latestVersion = (await getLatestPolicyVersion()) ?? versions[0];

  if (!latestVersion) {
    notFound();
  }

  const doc = await getPolicyDoc(latestVersion);
  if (!doc) {
    notFound();
  }

  const html = await markdownToHtml(doc.markdown);

  return <PolicyView doc={doc} html={html} versions={versions} selectedVersion={latestVersion} />;
}

