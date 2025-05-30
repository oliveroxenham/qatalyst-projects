'use client';

import { TopBar } from '@/components/topbar';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ProjectInfoTooltip } from '@/components/project-info-tooltip';
import { Project } from '@/types/project';
import { useTranslation } from 'react-i18next';

export default function PageClient({
  projectData,
}: {
  projectData: Project | null;
}) {
  const { t } = useTranslation();

  return (
    <div>
      <TopBar title={t('projectDescriptionAndDesign.title')}>
        <div className="flex justify-between items-center w-full gap-2">
          {projectData && (
            <ProjectInfoTooltip
              name={projectData.name || projectData.projectName}
              sourceType={projectData.sourceType || "convex"}
              originalId={projectData.id || projectData._id}
              projectType={projectData.projectType}
            />
          )}
          <div className="flex flex-row gap-2">
            <ThemeSwitcher />
          </div>
        </div>
      </TopBar>
      <div className="p-8 flex flex-col items-center justify-center h-[calc(100vh-170px)]">
        <div className="text-xl text-muted-foreground">
          Project Description and Design will be implemented later.
        </div>
      </div>
    </div>
  );
}