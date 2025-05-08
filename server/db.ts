import { GET_DOCUMENTS_URL, GET_PROJECTS_URL } from '@/lib/constants';
import { Project } from '@/types/project';

export async function getProjectsServer() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const url = new URL(GET_PROJECTS_URL, baseUrl);
  console.log('getProjectsServer:', url.toString());
  return fetch(url, {
    cache: 'force-cache',
    next: { revalidate: 60 } // Revalidate every 60 seconds
  }).then(async (res) => {
    const resp = (await res.json()) as Project[];
    console.log('resp:', resp);
    return resp;
  });
}

export async function getProjectsClient() {
  console.log('getProjectsClient:', GET_PROJECTS_URL);
  return fetch(GET_PROJECTS_URL, {
    cache: 'force-cache',
    next: { revalidate: 60 } // Revalidate every 60 seconds
  }).then(async (res) => {
    const resp = (await res.json()) as Project[];
    console.log('resp:', resp);
    return resp;
  });
}

export async function getProjectByIdServer({ id, language } : { id: string, language?: string }) {
  // Use absolute URL since GET_PROJECTS_URL is already a path
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  console.log('baseUrl=', baseUrl);
  let url = new URL(`${GET_PROJECTS_URL}?id=${id}`, baseUrl);
  
  // Add language parameter if provided
  if (language) {
    url.searchParams.append('lang', language);
  }
  
  console.log('getProjectByIdServer:', url.toString());
  const resp = await fetch(url, {
    cache: 'force-cache',
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  const json = await resp.json();
  console.log('getProjectByIdServer json:', json);
  return json as Project; 
}

export async function getDocumentsServer() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const url = new URL(GET_DOCUMENTS_URL, baseUrl);
  console.log('getDocumentsServer:', url.toString());
  return fetch(url, {
    cache: 'force-cache',
    next: { revalidate: 60 } // Revalidate every 60 seconds
  }).then(async (res) => {
    const resp = await res.json();
    console.log('resp:', resp);
    return resp;
  });
}

export async function getDocumentsByProjectIdServer({ id, language }: { id: string, language?: string }) {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const url = new URL(GET_DOCUMENTS_URL, baseUrl);
  url.searchParams.set('id', id);
  
  // Add language parameter if provided
  if (language) {
    url.searchParams.append('lang', language);
  }
  
  console.log('getDocumentsByProjectIdServer', url.toString());
  return fetch(url, {
    cache: 'force-cache',
    next: { revalidate: 60 } // Revalidate every 60 seconds
  }).then(async (res) => {
    const resp = await res.json();
    console.log('resp:', resp);
    return resp;
  });
}

export async function getDocumentsClient() {
  console.log('getDocumentsClient:', GET_DOCUMENTS_URL);
  return fetch(GET_DOCUMENTS_URL, {
    cache: 'force-cache',
    next: { revalidate: 60 } // Revalidate every 60 seconds
  }).then(async (res) => {
    const resp = await res.json();
    console.log('resp:', resp);
    return resp;
  });
}

export async function getDocumentsByProjectIdClient({ id }: { id: string }) {
  console.log('getDocumentsByProjectIdClient', `${GET_DOCUMENTS_URL}?id=${id}`);
  return fetch(`${GET_DOCUMENTS_URL}?id=${id}`, {
    cache: 'force-cache',
    next: { revalidate: 60 } // Revalidate every 60 seconds
  }).then(async (res) => {
    const resp = await res.json();
    console.log('resp:', resp);
    return resp;
  });
}
