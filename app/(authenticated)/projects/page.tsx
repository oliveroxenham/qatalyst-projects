import { TopBar } from '@/components/TopBar/TopBar';
import { Button } from '@/components/qbutton';
import { Plus, ListFilter } from 'lucide-react';
import { SecondaryTopBar } from '@/components/SecondaryTopBar/SecondaryTopBar';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default async function Projects() {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
  return (
    <div>
      <TopBar title="My Workspace">
        <div className="flex justify-end w-full gap-2">
          <Button variant="primary">
            <Plus className="w-6 h-6" />
            Create
          </Button>
          <ThemeSwitcher />
        </div>
      </TopBar>
      <SecondaryTopBar title="All Projects">
        <div>
          <Button variant="secondary">
            <ListFilter />
            Filters
          </Button>
        </div>
      </SecondaryTopBar>
      <div className="p-2">
        <div className="flex flex-wrap gap-2">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </div>
  );
}
