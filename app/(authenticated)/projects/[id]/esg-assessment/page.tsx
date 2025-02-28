import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { Button } from '@/components/qbutton';
import { Lock } from 'lucide-react';
import { ProjectInfoTooltip } from '@/components/project-info-tooltip';
import { AssigneeSelector } from '@/components/assignee-selector';
import { currentUser } from '@clerk/nextjs/server';
import { GenerateAssessmentButton } from '@/components/generate-assessment-button';
import { ChildComponents } from './childComponents';
import { getProjectByIdServer } from '@/server/db';
import { FinalRatingSelector } from '@/components/final-rating-selector';
import { DriverJs } from '@/components/driverjs/driverjs';

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
      <TopBar title="ESG Assessment">
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
            <Button variant="ghost" size="sm">
              <Lock />
            </Button>
            <div className="flex flex-row items-center gap-1">
              <span className="text-sm">Assignee:</span>
              <AssigneeSelector
                projectId={projectId}
                currentUser={user?.fullName}
                assessment="esg"
                assignedTo={projectData?.esgAssessment.assignedTo}
              />
            </div>
            <FinalRatingSelector
              projectData={projectData}
              assessment="esg"
              currentUser={user?.fullName}
            />
          </div>
          <div className="flex items-center">
            <GenerateAssessmentButton
              currentUser={user?.fullName}
              assignee={projectData?.esgAssessment.assignedTo}
            />
            <ThemeSwitcher />
          </div>
        </div>
      </TopBar>
      <div className="w-full flex justify-center p-2 pb-[53px] h-full">
        <ChildComponents projectData={projectData} />
      </div>
      <DriverJs />
    </div>
  );
}
