import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { ProjectInfoTooltip } from '@/components/project-info-tooltip';
import { currentUser } from '@clerk/nextjs/server';
import { getProjectByIdServer } from '@/server/db';
import MapboxExample from './map';

export default async function FinancialAssessmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  const projectData = await getProjectByIdServer({ id: projectId });
  const user = await currentUser();

  console.log('projectData=', projectData);
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar title="AI Estimator">
        <div className="flex justify-between items-center w-full gap-2">
          <div className="flex flex-row items-center gap-2">
            {projectData && (
              <ProjectInfoTooltip
                name={projectData.name}
                sourceType={projectData.sourceType}
                originalId={projectData.id}
                projectType={projectData.projectType}
              />
            )}
          </div>
          <div className="flex items-center">
            <ThemeSwitcher />
          </div>
        </div>
      </TopBar>
      <div className="w-full flex justify-center p-2 pb-[53px] h-full">
        <MapboxExample />
      </div>
    </div>
  );
}
