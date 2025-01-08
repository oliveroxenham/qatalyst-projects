import { GET_PROJECTS_URL } from '@/lib/constants';

export async function getProjects() {
  return fetch(GET_PROJECTS_URL).then((res) => res.json());
}
