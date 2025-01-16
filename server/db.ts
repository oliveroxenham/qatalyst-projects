import { GET_DOCUMENTS_URL, GET_PROJECTS_URL } from '@/lib/constants';

export async function getProjectsServer() {
  const url = new URL(GET_PROJECTS_URL, process.env.BASE_URL);
  console.log('getProjectsServer:', url.toString());
  return fetch(url).then(async (res) => {
    const resp = await res.json();
    console.log('resp:', resp);
    return resp;
  });
}

export async function getProjectsClient() {
  console.log('getProjectsClient:', GET_PROJECTS_URL);
  return fetch(GET_PROJECTS_URL).then(async (res) => {
    const resp = await res.json();
    console.log('resp:', resp);
    return resp;
  });
}

export async function getDocumentsServer() {
  const url = new URL(GET_DOCUMENTS_URL, process.env.BASE_URL);
  console.log('getDocumentsServer:', url.toString());
  return fetch(url).then(async (res) => {
    const resp = await res.json();
    console.log('resp:', resp);
    return resp;
  });
}

export async function getDocumentsByProjectIdServer({ id }: { id: string }) {
  const url = new URL(GET_DOCUMENTS_URL, process.env.BASE_URL);
  url.searchParams.set('id', id);
  console.log('getDocumentsByProjectIdServer', url.toString());
  return fetch(url).then(async (res) => {
    const resp = await res.json();
    console.log('resp:', resp);
    return resp;
  });
}

export async function getDocumentsClient() {
  console.log('getDocumentsClient:', GET_DOCUMENTS_URL);
  return fetch(GET_DOCUMENTS_URL).then(async (res) => {
    const resp = await res.json();
    console.log('resp:', resp);
    return resp;
  });
}

export async function getDocumentsByProjectIdClient({ id }: { id: string }) {
  console.log('getDocumentsByProjectIdClient', `${GET_DOCUMENTS_URL}?id=${id}`);
  return fetch(`${GET_DOCUMENTS_URL}?id=${id}`).then(async (res) => {
    const resp = await res.json();
    console.log('resp:', resp);
    return resp;
  });
}
