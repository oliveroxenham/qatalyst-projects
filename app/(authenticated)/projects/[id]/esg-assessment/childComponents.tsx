'use client';

import { QatalystAi } from '@/components/qatalyst-ai-esg';
import { Content } from './content';
import { Project } from '@/types/project';
import { useState } from 'react';
import { DocumentViewer } from './document-viewer-drawer';

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
        projectId={projectData?.id}
      />
      <Content projectData={projectData} setAiSidebarOpen={setAiSidebarOpen} setDocumentUrl={setDocumentUrl} />
      <QatalystAi
        projectData={projectData}
        aiSidebarOpen={aiSidebarOpen}
        setAiSidebarOpen={setAiSidebarOpen}
        openDocumentUrl={setDocumentUrl}
      />
    </>
  );
}
