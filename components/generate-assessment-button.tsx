'use client';

import { useState } from 'react';
import { Button } from '@/components/qbutton';
import Logo from '@/public/icons/logo.svg';
import { UnlockMoreDialog } from '@/components/unlock-more-dialog';
import { useTranslation } from 'react-i18next';

export function GenerateAssessmentButton({
  assignee,
  size = 'sm',
  currentUser,
}: {
  assignee?: string;
  size?: string;
  currentUser?: string | null;
}) {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div>
      <Button
        size={size as 'sm' | 'big' | 'small' | 'medium' | 'default' | 'icon' | 'lg' | null | undefined}
        id="generate-assessment-button"
        className="bg-orange-500 hover:bg-orange-400 w-full"
        onClick={() => setDialogOpen(true)}
        disabled={assignee?.toLowerCase() !== currentUser?.toLowerCase()}
      >
        <Logo className="w-8 h-8" />
        <span>{t('common.generateAssessment')}</span>
      </Button>
      <UnlockMoreDialog isOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </div>
  );
}
