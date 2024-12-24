'use client';
import { Button } from '@/components/ui/button';
import { useClerk } from '@clerk/nextjs';

export default function Projects() {
  const { signOut } = useClerk();
  return (
    <div>
      <p>Projects</p>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
