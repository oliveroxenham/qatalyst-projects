'use client';

import { QatalystAi } from '@/components/qatalyst-ai-financial';
import { Content } from './content';
import { Project } from '@/types/project';
import { DocumentViewer } from './document-viewer-drawer';
import { useState } from 'react';

export function ChildComponents({
  projectData,
}: {
  projectData: Project | null;
}) {
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false);
  const [documentUrl, setDocumentUrl] = useState<string | undefined>();
  return (
    <>
      <DocumentViewer
        documentUrl={documentUrl}
        setDocumentUrl={setDocumentUrl}
      />
      <Content projectData={projectData} setAiSidebarOpen={setAiSidebarOpen} />
      <QatalystAi
        openDocumentUrl={setDocumentUrl}
        projectData={projectData}
        aiSidebarOpen={aiSidebarOpen}
        setAiSidebarOpen={setAiSidebarOpen}
      />
    </>
  );
}
