import { GET_DOCUMENTS_URL, GET_PROJECTS_URL } from '@/lib/constants';

export async function getProjectsServer() {
  console.log('getProjectsServer');
  const url = new URL(GET_PROJECTS_URL, process.env.BASE_URL);
  return fetch(url).then((res) => res.json());
}

export async function getProjectsClient() {
  console.log('getProjectsClient');
  return fetch(GET_PROJECTS_URL).then((res) => res.json());
}

export async function getDocumentsServer() {
  console.log('getDocumentsServer');
  const url = new URL(GET_DOCUMENTS_URL, process.env.BASE_URL);
  return fetch(url).then((res) => res.json());
}

export async function getDocumentsClient() {
  console.log('getDocumentsClient');
  return fetch(GET_DOCUMENTS_URL).then((res) => {
    console.log('getDocumentsClient res', res);
    return res.json()
  });
}