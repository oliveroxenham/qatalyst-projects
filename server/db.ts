import { PROJECTS_API_URL } from '@/lib/constants';

export async function getProjects() {
  return fetch(PROJECTS_API_URL).then((res) => res.json());
}
