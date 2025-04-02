import { ReportPreviewClient } from "./previewClient";

export default async function ReportPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  
  // For server components, we can't directly check localStorage
  // The client component will handle redirect if no report exists
  return <ReportPreviewClient projectId={projectId} />;
}