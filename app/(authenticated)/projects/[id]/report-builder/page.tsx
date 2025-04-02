import { redirect } from "next/navigation";
import { ReportBuilderClient } from './pageClient';

export default async function ReportBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  
  // For server components, we can't directly check localStorage
  // The client component will handle redirect if a report exists
  return <ReportBuilderClient projectId={projectId} />;
}