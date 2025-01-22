'use client';

import { Button } from '@/components/qbutton';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { Copy } from 'lucide-react';
import Content from './content';
import { useState } from 'react';
import { Project } from '@/types/project';
import { ProjectInfoTooltip } from '@/components/project-info-tooltip';

export default function PageClient({
  projectData,
}: {
  projectData: Project | null;
}) {
  const [isCompare, setIsCompare] = useState(false);
  return (
    <div>
      <TopBar title="Scorecard">
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
            <Button
              variant="primary"
              size="small"
              onClick={() => setIsCompare(!isCompare)}
            >
              <Copy className="w-6 h-6" />
              Compare
            </Button>
            <ThemeSwitcher />
          </div>
        </div>
      </TopBar>
      <Content benchmarkLayoutVisible={isCompare} projectData={projectData} />
    </div>
  );
}
