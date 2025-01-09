import { Button } from '@/components/qbutton';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';
import { TopBar } from '@/components/TopBar/TopBar';

export default function ProjectsLoadingPage() {
  return (
    <>
      <TopBar title="My Workspace">
        <div className="flex justify-end items-center w-full gap-2">
          <Link href="/new">
            <Button variant="primary" size="small">
              <Plus className="w-6 h-6" />
              Create
            </Button>
          </Link>
          <ThemeSwitcher />
        </div>
      </TopBar>
      <div className="p-4 flex justify-center">
        <div className="flex flex-wrap gap-2">
          <ProjectCard loading />
          <ProjectCard loading />
          <ProjectCard loading />
        </div>
      </div>
    </>
  );
}
