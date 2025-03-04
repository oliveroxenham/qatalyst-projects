import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getDocumentsByProjectIdServer, getProjectByIdServer } from '@/server/db';
import DocumentsClient from './pageClient';

export default async function DocumentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  const projectData = await getProjectByIdServer({ id: projectId });
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['documents', projectId],
    queryFn: () => getDocumentsByProjectIdServer({ id: projectId }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DocumentsClient projectData={projectData} projectId={projectId} />
    </HydrationBoundary>
  );
}
