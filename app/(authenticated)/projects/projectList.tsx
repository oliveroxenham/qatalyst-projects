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

interface ProjectListProps {
  activeFilter: string | null;
}

export function ProjectList({ activeFilter }: ProjectListProps) {
  const { data: projectsData } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: getProjectsClient,
    staleTime: 0, // Consider data stale immediately
    gcTime: 0, // Don't cache
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });

  // Filter projects based on the active filter
  const filteredProjects = projectsData?.filter((project) => {
    if (!activeFilter) return true; // Show all projects if no filter is active
    
    // Normalize both strings for comparison (case-insensitive)
    const projectType = project.projectType?.toLowerCase();
    const filter = activeFilter.toLowerCase();
    
    if (filter === 'nature-based projects') {
      return projectType === 'nature-based';
    } else if (filter === 'cookstove projects') {
      return projectType === 'cookstove';
    } else if (filter === 'early stage projects') {
      return projectType === 'early stage';
    }
    
    return true;
  });

  return (
    <div className="flex flex-wrap gap-4 w-full">
      {filteredProjects && filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
          <ProjectCard key={project.id} data={project} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center w-full py-12 text-neutral-500">
          <p className="text-lg font-medium">No projects found</p>
          <p className="text-sm mt-2">Try adjusting your filters to see more projects</p>
        </div>
      )}
    </div>
  );
}