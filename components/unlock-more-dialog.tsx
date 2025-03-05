import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useTranslation } from '@/i18n/i18n';

export function UnlockMoreDialog({
  isOpen,
  setDialogOpen,
}: {
  isOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}) {
  const { t } = useTranslation();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className='bg-muted'>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('unlockMoreDialog.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('unlockMoreDialog.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              setDialogOpen(false);
            }}
          >
            {t('unlockMoreDialog.ok')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
