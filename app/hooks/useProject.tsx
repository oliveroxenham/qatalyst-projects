import { Project } from '../types/project';
import { useQuery } from '@tanstack/react-query';

const useProject = (id?: string) => {
  return useQuery<Project>({ queryKey: [`/projects/${id}`] });
};

export default useProject;
