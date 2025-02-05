'use client';
import { useState } from 'react';
import { Button } from '@/components/qbutton';
import { UnlockMoreDialog } from '@/components/unlock-more-dialog';
import { Edit } from 'lucide-react';

export function EditButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        size="small"
        onClick={() => setDialogOpen(true)}
      >
        <Edit />
        Edit
      </Button>
      <UnlockMoreDialog isOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </>
  );
}
