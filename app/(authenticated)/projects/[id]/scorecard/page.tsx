import PageClient from './pageClient';
import { getProjectByIdServer } from '@/server/db';

export default async function ScorecardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  const projectData = await getProjectByIdServer({ id: projectId });
  console.log('projectData=', projectData);

  return <PageClient projectData={projectData} />;
}
