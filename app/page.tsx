import { redirect } from 'next/navigation';

export default async function HomePage() {
  // NOTE: this page.tsx is kept in order to later load unauthenticated content.
  await fetch(`${process.env.BASE_URL}/api/projects/reset`, {
    method: 'POST',
  }).then(redirect('/projects'));
  return null;
}
