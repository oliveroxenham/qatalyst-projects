import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { Button } from '@/components/qbutton';
import { ChevronDown, Lock } from 'lucide-react';
import { getProjectId } from '@/mock/data';
import { ProjectInfoTooltip } from '@/components/project-info-tooltip';
import clsx from 'clsx';
import { AssigneeSelector } from '@/components/assignee-selector';
import { currentUser } from '@clerk/nextjs/server';
import { GenerateAssessmentButton } from '@/components/generate-assessment-button';
import { ChildComponents } from './childComponents';

export default async function FinancialAssessmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  const projectData = getProjectId(projectId);
  const user = await currentUser();

  console.log('projectData=', projectData);
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar title="Financial Assessment">
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
                currentUser={user?.fullName}
                assignedTo={projectData?.financialAssessment.assignedTo}
                // onChange={(assignee) => {
                //   console.log('new assignee=', assignee);
                // }}
              />
            </div>
            <Button
              className={clsx('text-white', {
                'bg-neutral-500':
                  projectData?.financialAssessment.status.toLowerCase() ===
                  'not started',
                'bg-blue-500':
                  projectData?.financialAssessment.status.toLowerCase() ===
                  'in progress',
                'bg-branding-green-600':
                  projectData?.financialAssessment.status.toLowerCase() ===
                  'completed',
                'hover:bg-current/50': true,
              })}
              size="sm"
            >
              <span className="capitalize">
                Final Rating: {projectData?.financialAssessment.status}
              </span>
              <ChevronDown />
            </Button>
          </div>
          <div className="flex items-center">
            <GenerateAssessmentButton
              currentUser={user?.fullName}
              assignee={projectData?.financialAssessment.assignedTo}
            />
            <ThemeSwitcher />
          </div>
        </div>
      </TopBar>
      <div className="w-full flex justify-center p-2 pb-[53px] h-full">
        <ChildComponents projectData={projectData} />
      </div>
    </div>
  );
}
