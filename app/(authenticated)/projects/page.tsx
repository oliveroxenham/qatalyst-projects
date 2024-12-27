'use client';
import { TopBar } from '@/components/TopBar/TopBar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';

function ProjectCard() {
  return (
    <div className="border rounded-lg p-4 hover:border-neutral-500 group">
      <div className="flex gap-2 items-start mb-2">
        <ReactCountryFlag countryCode="US" svg className="mt-[2px]" />
        <span className="text-sm line-clamp-2">Project Title</span>
      </div>

      <div className="w-full h-1 bg-neutral-300 rounded-sm mb-2">
        <div className="bg-emerald-600 h-1 w-1/2 rounded-sm" />
      </div>

      <div className="mb-2">
        <span className="text-xs">Created 24 Feb 2024</span>
      </div>

      <div className="mb-2">
        <p className="line-clamp-5 text-xs">
          Project description Project description Project description Project
          description Project description Project description Project
          description Project description Project description Project
          description Project description Project description Project
          description Project description Project description Project
          description Project description Project description
        </p>
      </div>

      <div className="mb-2 grid grid-cols-[60px_auto] gap-1">
        <div>
          <span className="text-xs">Financial</span>
        </div>
        <div className="text-center bg-emerald-100 text-emerald-800">
          <span className="text-xs">Eligible</span>
        </div>
        <div>
          <span className="text-xs">ESG</span>
        </div>
        <div className="text-center bg-yellow-100 text-yellow-800">
          <span className="text-xs">Medium risk</span>
        </div>
        <div>
          <span className="text-xs">KYC</span>
        </div>
        <div className="text-center bg-blue-100 text-blue-800">
          <span className="text-xs">In progress</span>
        </div>
      </div>

      <div className="mb-2">
        <span className="text-xs">Project contributors</span>
        <div className="rounded-full w-6 h-6 bg-neutral-300"></div>
      </div>

      <Button className="w-full group-hover:bg-neutral-800 group-hover:text-white" variant="secondary">
        Open Project
      </Button>
    </div>
  );
}

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
        <div className="my-2">
          <p className="font-semibold">Projects</p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
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
