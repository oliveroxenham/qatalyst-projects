'use client';

import React, { useState } from 'react';
import { InviteDeveloperDialog } from '@/components/invite-developer-dialog';

interface InviteDeveloperButtonProps {
  children: React.ReactNode;
}

export function InviteDeveloperButton({ children }: InviteDeveloperButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDialogOpen(true);
  };

  return (
    <>
      <div onClick={handleClick} className="w-full">
        {children}
      </div>
      <InviteDeveloperDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}