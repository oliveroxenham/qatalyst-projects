'use client';

import { QATALYST_RESPONSE } from '@/lib/constants';
import { useTranslation } from 'react-i18next';

export function QatalystResponse({ response }: { response?: number }) {
  const { t } = useTranslation();
  
  if (response === QATALYST_RESPONSE.SATISFACTORY) {
    return (
      <div className="flex flex-row gap-1 items-center">
        <div className="flex flex-row gap-[2px]">
          <div className="w-1 h-3 rounded bg-branding-green-500" />
          <div className="w-1 h-3 rounded bg-branding-green-500" />
          <div className="w-1 h-3 rounded bg-branding-green-500" />
        </div>
        <span className="text-xs text-foreground">{t('common.satisfactory')}</span>
      </div>
    );
  } else if (response === QATALYST_RESPONSE.INVESTIGATE) {
    return (
      <div className="flex flex-row gap-1 items-center">
        <div className="flex flex-row gap-[2px]">
          <div className="w-1 h-3 rounded bg-blaze-orange-300" />
          <div className="w-1 h-3 rounded bg-blaze-orange-300" />
          <div className="w-1 h-3 rounded bg-neutral-300" />
        </div>
        <span className="text-xs text-foreground">{t('common.investigate')}</span>
      </div>
    );
  } else if (response === QATALYST_RESPONSE.UNSATISFACTORY) {
    return (
      <div className="flex flex-row gap-1 items-center">
        <div className="flex flex-row gap-[2px]">
          <div className="w-1 h-3 rounded bg-red-500" />
          <div className="w-1 h-3 rounded bg-neutral-300" />
          <div className="w-1 h-3 rounded bg-neutral-300" />
        </div>
        <span className="text-xs text-foreground">{t('common.unsatisfactory')}</span>
      </div>
    );
  } else {
    return null;
  }
}
