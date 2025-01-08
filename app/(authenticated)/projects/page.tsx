import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { ProjectList } from './projectList';
import { getProjects } from '@/server/db';

export default async function ProjectsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectList />
    </HydrationBoundary>
  );
}
