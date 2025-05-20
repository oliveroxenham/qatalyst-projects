import PageClient from './pageClient';
import { getProjectByIdServer } from '@/server/db';

export default async function ProjectDescriptionAndDesignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  const projectData = await getProjectByIdServer({ id: projectId });

  return <PageClient projectData={projectData} />;
}