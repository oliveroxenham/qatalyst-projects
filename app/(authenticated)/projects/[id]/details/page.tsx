import { getProjectByIdServer } from '@/server/db';
import { currentUser } from '@clerk/nextjs/server';
import ProjectDetailsClient from './pageClient';

export default async function ProjectInfoPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const projectId = (await params).id;
  const sp = await searchParams;
  const language = typeof sp?.lang === 'string' ? sp.lang : undefined;
  
  const projectData = await getProjectByIdServer({ id: projectId, language });
  const user = await currentUser();
  
  // Extract only the needed user properties to avoid serialization issues
  const serializedUser = user ? {
    id: user.id,
    fullName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username
  } : null;
  
  return <ProjectDetailsClient projectData={projectData} projectId={projectId} user={serializedUser} />;
}
