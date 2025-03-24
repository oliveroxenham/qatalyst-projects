import { ReportBuilderClient } from './pageClient';

export default async function ReportBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  return <ReportBuilderClient projectId={projectId} />;
}