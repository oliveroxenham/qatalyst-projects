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
            {projectData?.id === '1650' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild id="export-button">
                  <Button variant="secondary" size="small">
                    <Download className="w-6 h-6" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link
                      href="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/Reduced%20Emissions%20Deforestation%20Keo%20Seima-GanpsWvKb5zX3d7zXrRTnXnRlK9mdT.docx"
                      download="Reduced Emissions Deforestation Keo Seima.doc"
                    >
                      Word Document
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      target="_blank"
                      href="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/Reduced%20Emissions%20Deforestation%20Keo%20Seima-T37dnRlThffccheE1qE4gfI751usqq.pdf"
                      download="Reduced Emissions Deforestation Keo Seima.pdf"
                    >
                      PDF Document
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
              Compare
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
