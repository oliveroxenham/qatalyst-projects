import { TopBar } from '@/components/TopBar/TopBar';
import { Button } from '@/components/ui/button';
import { Plus, ListFilter } from 'lucide-react';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';
import { SecondaryTopBar } from '@/components/SecondaryTopBar/SecondaryTopBar';

export default function Projects() {
  return (
    <div>
      <TopBar title="My Workspace">
        <div className="flex justify-end w-full">
          <Button>
            <Plus className="w-6 h-6" />
            Create
          </Button>
        </div>
      </TopBar>
      <div className="p-2">
        <SecondaryTopBar title="Projects">
          <div>
            <Button variant="secondary">
              <ListFilter />
              Filters
            </Button>
          </div>
        </SecondaryTopBar>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          <ProjectCard loading />
          <ProjectCard loading />
          <ProjectCard loading />
          <ProjectCard loading />
        </div>
      </div>
    </div>
  );
}
