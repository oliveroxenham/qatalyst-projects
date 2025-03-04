import { Button } from '@/components/qbutton';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { Upload } from 'lucide-react';
import Link from 'next/link';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getDocumentsByProjectIdServer, getProjectByIdServer } from '@/server/db';
import DocumentList from './document-list';
import { ProjectInfoTooltip } from '@/components/project-info-tooltip';
import { DriverJs } from '@/components/driverjs/driverjs';

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
      <TopBar title="Documents">
        <div className="flex justify-between items-center w-full gap-2">
          {projectData && (
            <ProjectInfoTooltip
              name={projectData.name}
              sourceType={projectData.sourceType}
              originalId={projectData.id}
              projectType={projectData.projectType}
            />
          )}
          <div className="flex flex-row gap-2">
            <Link href="#">
              <Button variant="primary" size="small" disabled>
                <Upload className="w-6 h-6" />
                Upload
              </Button>
            </Link>
            <ThemeSwitcher />
          </div>
        </div>
      </TopBar>
      <div className="p-4 flex justify-center">
        <div className="w-full bg-background border rounded-sm">
          <DocumentList projectId={projectId} />
        </div>
      </div>
      <DriverJs />
    </HydrationBoundary>
  );
}
