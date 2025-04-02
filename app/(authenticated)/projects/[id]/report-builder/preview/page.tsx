import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReportPreviewClient } from "./previewClient";

export default async function ReportPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  
  // Check if a report exists in the cookie
  const reportExists = cookies().get(`report-exists-${projectId}`)?.value === 'true';
  
  // If no report exists, redirect to the input page
  if (!reportExists) {
    redirect(`/projects/${projectId}/report-builder`);
  }
  
  return <ReportPreviewClient projectId={projectId} />;
}