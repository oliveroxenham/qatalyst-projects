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
import { DriverJs } from '@/components/driverjs/driverjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FileText, Mail } from 'lucide-react';
import { InviteDeveloperButton } from './invite-developer-button';

export default async function ProjectsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['projects'],
    queryFn: getProjectsServer,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TopBar title="sidebar.myWorkspace">
        <div className="flex justify-end items-center w-full gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild id="create-button">
              <Button variant="primary" size="small">
                <Plus className="w-6 h-6" />
                Create
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href="/new">
                <DropdownMenuItem>
                  <FileText className="w-4 h-4" />
                  Create New Project
                </DropdownMenuItem>
              </Link>
              <InviteDeveloperButton>
                <button className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground w-full text-left">
                  <Mail className="w-4 h-4" />
                  Invite Project Developer
                </button>
              </InviteDeveloperButton>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeSwitcher />
        </div>
      </TopBar>
      <div className="p-4 flex justify-center">
        <ProjectList />
      </div>
      <DriverJs />
    </HydrationBoundary>
  );
}
