'use client';

import { useState } from 'react';
import { Button } from '@/components/qbutton';
import Logo from '@/public/icons/logo.svg';
import { UnlockMoreDialog } from '@/components/unlock-more-dialog';

export function GenerateAssessmentButton({
  assignee,
  currentUser,
}: {
  assignee?: string;
  currentUser?: string | null;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div>
      <Button
        size="sm"
        className="bg-orange-500 hover:bg-orange-400"
        onClick={() => setDialogOpen(true)}
        disabled={assignee?.toLowerCase() !== currentUser?.toLowerCase()}
      >
        <Logo className="w-8 h-8" />
        <span>Generate Assessment</span>
      </Button>
      <UnlockMoreDialog isOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </div>
  );
}
