import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getDocumentsByProjectIdServer, getProjectByIdServer } from '@/server/db';
import DocumentsClient from './pageClient';

export default async function DocumentsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const projectId = (await params).id;
  const language = typeof searchParams?.lang === 'string' ? searchParams.lang : undefined;
  
  const projectData = await getProjectByIdServer({ id: projectId, language });
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['documents', projectId, language],
    queryFn: () => getDocumentsByProjectIdServer({ id: projectId, language }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DocumentsClient projectData={projectData} projectId={projectId} />
    </HydrationBoundary>
  );
}
