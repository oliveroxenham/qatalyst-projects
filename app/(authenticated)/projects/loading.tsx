import { ProjectCard } from '@/components/ProjectCard/ProjectCard';

export default function ProjectsLoadingPage() {
  return (
    <div className="flex flex-wrap gap-2">
      <ProjectCard loading />
      <ProjectCard loading />
      <ProjectCard loading />
    </div>
  );
}
