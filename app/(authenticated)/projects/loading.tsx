import { TopBar } from '@/components/TopBar/TopBar';
import { Button } from '@/components/qbutton';
import { Plus, ListFilter } from 'lucide-react';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';
import { SecondaryTopBar } from '@/components/SecondaryTopBar/SecondaryTopBar';
import { Sun } from 'lucide-react';

export default function Projects() {
  return (
    <div>
      <TopBar title="My Workspace">
        <div className="flex justify-end w-full gap-2">
          <Button variant="primary">
            <Plus className="w-6 h-6" />
            Create
          </Button>
          <Button variant='ghost'><Sun /></Button>
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
          <ProjectCard loading />
          <ProjectCard loading />
          <ProjectCard loading />
          <ProjectCard loading />
        </div>
      </div>
    </div>
  );
}
