'use client';

import { Button } from '@/components/qbutton';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { Copy, Download } from 'lucide-react';
import Content from './content';
import { useState } from 'react';
import { Project } from '@/types/project';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProjectInfoTooltip } from '@/components/project-info-tooltip';
import Link from 'next/link';
import { DriverJs } from '@/components/driverjs/driverjs';
import { useTranslation } from 'react-i18next';

export default function PageClient({
  projectData,
}: {
  projectData: Project | null;
}) {
  const { t } = useTranslation();
  const [isCompare, setIsCompare] = useState(false);
  return (
    <div>
      <TopBar title={t('scorecard.title')}>
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
            {projectData?.id === '1650' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild id="export-button">
                  <Button variant="outline" size="small">
                    <Download className="w-6 h-6" />
                    {t('common.export')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link
                      href="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/Reduced%20Emissions%20Deforestation%20Keo%20Seima-GanpsWvKb5zX3d7zXrRTnXnRlK9mdT.docx"
                      download="Reduced Emissions Deforestation Keo Seima.doc"
                    >
                      {t('common.wordDocument')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      target="_blank"
                      href="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/Reduced%20Emissions%20Deforestation%20Keo%20Seima-T37dnRlThffccheE1qE4gfI751usqq.pdf"
                      download="Reduced Emissions Deforestation Keo Seima.pdf"
                    >
                      {t('common.pdfDocument')}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Button
              id="compare-button"
              variant="primary"
              size="small"
              onClick={() => setIsCompare(!isCompare)}
            >
              <Copy className="w-6 h-6" />
              {t('common.compare')}
            </Button>
            <ThemeSwitcher />
          </div>
        </div>
      </TopBar>
      <Content benchmarkLayoutVisible={isCompare} projectData={projectData} />
      <DriverJs />
    </div>
  );
}
