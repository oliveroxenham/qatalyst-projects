import { ReportBuilderClient } from './pageClient';

export default function ReportBuilderPage({
  params,
}: {
  params: { id: string };
}) {
  return <ReportBuilderClient projectId={params.id} />;
}