'use client';
import { useState } from 'react';
import { Button } from '@/components/qbutton';
import { UnlockMoreDialog } from '@/components/unlock-more-dialog';
import { Edit } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function EditButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { t } = useTranslation();
  
  return (
    <>
      <Button
        variant="outline"
        size="small"
        onClick={() => setDialogOpen(true)}
      >
        <Edit />
        {t('common.edit')}
      </Button>
      <UnlockMoreDialog isOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </>
  );
}
