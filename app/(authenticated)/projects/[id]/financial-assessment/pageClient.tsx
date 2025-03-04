'use client';

import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { Button } from '@/components/qbutton';
import { Lock } from 'lucide-react';
import { ProjectInfoTooltip } from '@/components/project-info-tooltip';
import { AssigneeSelector } from '@/components/assignee-selector';
import { GenerateAssessmentButton } from '@/components/generate-assessment-button';
import { ChildComponents } from './childComponents';
import { FinalRatingSelector } from '@/components/final-rating-selector';
import { DriverJs } from '@/components/driverjs/driverjs';
import { useTranslation } from 'react-i18next';
import { Project } from '@/types/project';

interface SerializedUser {
  id: string;
  fullName: string | null;
}

interface FinancialAssessmentClientProps {
  projectData: Project | null;
  projectId: string;
  user: SerializedUser | null;
}

export default function FinancialAssessmentClient({
  projectData,
  projectId,
  user,
}: FinancialAssessmentClientProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar title={t('financialAssessment.title')}>
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
              <span className="text-sm">
                {t('financialAssessment.assignee')}:
              </span>
              <AssigneeSelector
                projectId={projectId}
                currentUser={user?.fullName}
                assessment="financial"
                assignedTo={projectData?.financialAssessment.assignedTo}
              />
            </div>
            {projectData && (
              <FinalRatingSelector
                projectData={projectData}
                assessment="financial"
                currentUser={user?.fullName}
              />
            )}
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
      <DriverJs />
    </div>
  );
}
