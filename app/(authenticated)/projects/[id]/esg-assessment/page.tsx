import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { Button } from '@/components/qbutton';
import { ChevronDown, Lock } from 'lucide-react';
import Logo from '@/public/icons/logo.svg';
import { getProjectId } from '@/mock/data';
import { ProjectInfoTooltip } from '@/components/project-info-tooltip';
import { ChildComponents } from './childComponents';
import clsx from 'clsx';

export default async function EsgAssessmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  const projectData = getProjectId(projectId);
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
            <Button variant="secondary" size="sm">
              <span>Assignee:</span>
              <div className="w-5 h-5 rounded-full bg-neutral-400 flex items-center justify-center text-xs text-white p-2">
                K
              </div>
              <span>Kopal</span>
              <ChevronDown />
            </Button>
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
            <Button size="sm">
              <Logo className="w-8 h-8" />
              <span>Generate Assessment</span>
            </Button>
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
