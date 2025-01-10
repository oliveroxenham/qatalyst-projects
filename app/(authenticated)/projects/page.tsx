import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { TopBar } from '@/components/topbar';
import { Button } from '@/components/qbutton';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ProjectList } from './projectList';
import { getProjectsServer } from '@/server/db';

export default async function ProjectsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['projects'],
    queryFn: getProjectsServer,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TopBar title="My Workspace">
        <div className="flex justify-end items-center w-full gap-2">
          <Link href="/new">
            <Button variant="primary" size="small">
              <Plus className="w-6 h-6" />
              Create
            </Button>
          </Link>
          <ThemeSwitcher />
        </div>
      </TopBar>
      <div className="p-4 flex justify-center">
        <ProjectList />
      </div>
    </HydrationBoundary>
  );
}
