import { currentUser } from '@clerk/nextjs/server';
import { getProjectByIdServer } from '@/server/db';
import FinancialAssessmentClient from './pageClient';

export default async function FinancialAssessmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  const projectData = await getProjectByIdServer({ id: projectId });
  const user = await currentUser();
  
  // Extract only the needed user properties to avoid serialization issues
  const serializedUser = user ? {
    id: user.id,
    fullName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username
  } : null;
  
  return <FinancialAssessmentClient projectData={projectData} projectId={projectId} user={serializedUser} />;
}
