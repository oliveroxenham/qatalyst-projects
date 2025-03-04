'use client';

import { Button } from '@/components/qbutton';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { Upload } from 'lucide-react';
import Link from 'next/link';
import DocumentList from './document-list';
import { ProjectInfoTooltip } from '@/components/project-info-tooltip';
import { DriverJs } from '@/components/driverjs/driverjs';
import { useTranslation } from 'react-i18next';
import { Project } from '@/types/project';

interface DocumentsClientProps {
  projectData: Project | null;
  projectId: string;
}

export default function DocumentsClient({ projectData, projectId }: DocumentsClientProps) {
  const { t } = useTranslation();

  return (
    <>
      <TopBar title={t('documents.title')}>
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
            <Link href="#">
              <Button variant="primary" size="small" disabled>
                <Upload className="w-6 h-6" />
                {t('documents.upload')}
              </Button>
            </Link>
            <ThemeSwitcher />
          </div>
        </div>
      </TopBar>
      <div className="p-4 flex justify-center">
        <div className="w-full bg-background border rounded-sm">
          <DocumentList projectId={projectId} />
        </div>
      </div>
      <DriverJs />
    </>
  );
}