'use client';

import { QatalystAi } from '@/components/qatalyst-ai-esg';
import { Content } from './content';
import { Project } from '@/types/project';
import { useState } from 'react';

export function ChildComponents({
  projectData,
}: {
  projectData: Project | null;
}) {
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false);
  return (
    <>
      <Content projectData={projectData} setAiSidebarOpen={setAiSidebarOpen} />
      <QatalystAi
        projectData={projectData}
        aiSidebarOpen={aiSidebarOpen}
        setAiSidebarOpen={setAiSidebarOpen}
      />
    </>
  );
}
