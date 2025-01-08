'use client';

import { useQuery } from '@tanstack/react-query';
import type { Project } from '@/app/types/project';
import { getProjects } from '@/server/db';
import LoadingPage from './loading';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';

export function ProjectList() {
  const { data: projectsData, isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <div className="flex flex-wrap gap-4">
      {projectsData?.map((project) => <ProjectCard key={project.id} data={project} />)}
    </div>
  );
}