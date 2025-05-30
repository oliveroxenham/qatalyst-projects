import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { ProjectInfoTooltip } from '@/components/project-info-tooltip';
import { getProjectByIdServer } from '@/server/db';
import MapClientComponent from './map-client';

export default async function FinancialAssessmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  const projectData = await getProjectByIdServer({ id: projectId });

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar title="AI Estimator">
        <div className="flex justify-between items-center w-full gap-2">
          <div className="flex flex-row items-center gap-2">
            {projectData && (
              <ProjectInfoTooltip
                name={projectData.name || projectData.projectName}
                sourceType={projectData.sourceType || "convex"}
                originalId={projectData.id || projectData._id}
                projectType={projectData.projectType}
              />
            )}
          </div>
          <div className="flex items-center">
            <ThemeSwitcher />
          </div>
        </div>
      </TopBar>
      <div className="w-full h-[calc(100vh-64px)]">
        <MapClientComponent />
      </div>
    </div>
  );
}
