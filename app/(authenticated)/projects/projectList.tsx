'use client';

import { useQuery } from '@tanstack/react-query';
import type { Project } from '@/types/project';
import { getProjectsClient } from '@/server/db';
import { ProjectCard } from '@/components/project-card';

export function ProjectList() {
  const { data: projectsData } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: getProjectsClient,
  });

  return (
    <div className="flex flex-wrap gap-4">
      {projectsData?.map((project) => (
        <ProjectCard key={project.id} data={project} />
      ))}
    </div>
  );
}
