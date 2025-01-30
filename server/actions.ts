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
  await fetch(`${process.env.BASE_URL}/api/projects/reset`, {
    method: 'POST',
  });
  revalidatePath('/projects');
  redirect('/projects');
}

export async function updateAssignee({
  projectId,
  assessment,
  assignee,
}: {
  projectId: string;
  assessment: 'esg' | 'financial';
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
  }
  return await resp.json();
}
