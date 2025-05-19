'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function importProject() {
  await fetch(`${process.env.BASE_URL}/api/projects/add`, {
    method: 'POST',
  });
  revalidatePath('/projects');
  redirect('/projects');
}

export async function resetAppState() {
  // Clear the Redis cache
  await fetch(`${process.env.BASE_URL}/api/projects/reset`, {
    method: 'POST',
    cache: 'no-store', // Bypass cache for this request
  });
  
  // Revalidate all project-related paths
  revalidatePath('/projects');
  revalidatePath('/dashboard');
  revalidatePath('/', 'layout');
  
  // Don't redirect immediately to allow client-side cache clearing
}

export async function updateAssignee({
  projectId,
  assessment,
  assignee,
}: {
  projectId: string;
  assessment: 'esg' | 'financial' | 'carbonQuality';
  assignee: string;
}) {
  const resp = await fetch(`${process.env.BASE_URL}/api/projects/assignTo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectId,
      assessment,
      assignee,
    }),
  });
  if (assessment === 'esg') {
    revalidatePath(`/projects/${projectId}/esg-assessment`);
  } else if (assessment === 'financial') {
    revalidatePath(`/projects/${projectId}/financial-assessment`);
  } else if (assessment === 'carbonQuality') {
    revalidatePath(`/projects/${projectId}/carbon-quality-assessment`);
  }
  return await resp.json();
}

export async function updateFinalRating({
  projectId,
  assessment,
  rating,
}: {
  projectId: string;
  assessment: 'esg' | 'financial' | 'carbonQuality';
  rating: string;
}) {
  const resp = await fetch(
    `${process.env.BASE_URL}/api/projects/updateRating`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId,
        assessment,
        rating,
      }),
    }
  );
  if (assessment === 'esg') {
    revalidatePath(`/projects/${projectId}/esg-assessment`);
  } else if (assessment === 'financial') {
    revalidatePath(`/projects/${projectId}/financial-assessment`);
  } else if (assessment === 'carbonQuality') {
    revalidatePath(`/projects/${projectId}/carbon-quality-assessment`);
  }
  return await resp.json();
}
