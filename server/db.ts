import { GET_PROJECTS_URL } from '@/lib/constants';

export async function getProjectsServer() {
  console.log('getProjectsServer');
  const url = new URL(GET_PROJECTS_URL, process.env.BASE_URL);
  return fetch(url).then((res) => res.json());
}

export async function getProjectsClient() {
  console.log('getProjectsClient');
  return fetch(GET_PROJECTS_URL).then((res) => res.json());
}
