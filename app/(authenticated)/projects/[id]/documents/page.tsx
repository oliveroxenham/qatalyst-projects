import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getDocumentsServer } from '@/server/db';
import DocumentList from './document-list';

export default async function DocumentsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['documents'],
    queryFn: getDocumentsServer,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full bg-white border border-neutral-200 rounded-sm">
        <DocumentList />
      </div>
    </HydrationBoundary>
  );
}
