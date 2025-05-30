import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { Button } from '@/components/qbutton';
import { Lock } from 'lucide-react';
import { Content } from './content';
import { currentUser } from '@clerk/nextjs/server';
import { getProjectByIdServer } from '@/server/db';
import { ProjectInfoTooltip } from '@/components/project-info-tooltip';
import { AssigneeSelector } from '@/components/assignee-selector';
import { FinalRatingSelector } from '@/components/final-rating-selector';
import { GenerateAssessmentButton } from '@/components/generate-assessment-button';

export default async function QualityAssessmentPage({
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
      <TopBar title="sidebar.qualityAssessment">
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
            <Button variant="ghost" size="sm">
              <Lock />
            </Button>
            <div className="flex flex-row items-center gap-1">
              <span className="text-sm">Assignee:</span>
              <AssigneeSelector
                projectId={projectData.id}
                currentUser={user?.fullName}
                assessment="financial"
                assignedTo={projectData?.financialAssessment?.assignedTo}
              />
            </div>
            <FinalRatingSelector
              projectData={projectData}
              assessment="financial"
              currentUser={user?.fullName}
            />
          </div>
          <div className="flex items-center">
            <GenerateAssessmentButton
              currentUser={user?.fullName}
              assignee={projectData?.financialAssessment?.assignedTo}
            />
            <ThemeSwitcher />
          </div>
        </div>
      </TopBar>
      <div className="w-full flex justify-center p-2 pb-[53px] h-full">
        <Content />
      </div>
    </div>
  );
}
