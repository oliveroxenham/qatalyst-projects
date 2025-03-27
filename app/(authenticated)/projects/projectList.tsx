'use client';

import { useQuery } from '@tanstack/react-query';
import type { Project } from '@/types/project';
import { GET_PROJECTS_URL } from '@/lib/constants';
import { cachedFetch } from '@/lib/utils';
import { ProjectCard } from '@/components/project-card';

// Client-side fetch function using our cached utility
const getProjectsClient = async (): Promise<Project[]> => {
  console.log('getProjectsClient:', GET_PROJECTS_URL);
  return cachedFetch<Project[]>(GET_PROJECTS_URL, {
    revalidate: 60 // Revalidate every 60 seconds
  });
};

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
