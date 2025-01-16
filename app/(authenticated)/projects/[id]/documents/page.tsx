import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getDocumentsByProjectIdServer } from '@/server/db';
import DocumentList from './document-list';

export default async function DocumentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['documents', projectId],
    queryFn: () => getDocumentsByProjectIdServer({ id: projectId }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full bg-white border border-neutral-200 rounded-sm">
        <DocumentList projectId={projectId} />
      </div>
    </HydrationBoundary>
  );
}
