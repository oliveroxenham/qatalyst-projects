'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useClerk } from '@clerk/nextjs';

export default function Projects() {
  const { signOut } = useClerk();
  return (
    <div>
      <p>Projects</p>
      <Link href="/projects/Io7hJkUHqEcSdZknSIUT-/scorecard2">Scorecard</Link>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
