import { getProjectId } from '@/mock/data';
import PageClient from './pageClient';

export default async function ScorecardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  const projectData = getProjectId(projectId);
  console.log('projectData=', projectData);

  return <PageClient projectData={projectData} />;
}
