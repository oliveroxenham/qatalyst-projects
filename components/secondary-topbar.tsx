'use client';

import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/i18n/i18n';

export function SecondaryTopBar({ title, children }: { title: string, children?: React.ReactNode }) {
  const { t } = useTranslation();
  
  return (
    <div>
      <div className="flex flex-row justify-between items-center bg-white p-2 rounded-lg">
        <p className="font-semibold">{t(title)}</p>
        {children}
      </div>
      <Separator />
    </div>
  );
}
