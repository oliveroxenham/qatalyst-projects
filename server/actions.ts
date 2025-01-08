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