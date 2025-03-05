'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { LanguageSwitcher } from '@/components/language-switcher';
// import { useTranslation } from 'react-i18next';

export const TopBar = ({ children, title }: { readonly title: string; readonly children?: React.ReactNode }) => {
  // const { t } = useTranslation();
  
  return (
    <div className='sticky top-0 z-10 flex min-h-[53px] w-full flex-row items-center gap-3 border-b border-border-default bg-background/50 dark:bg-black/50 px-4 py-2 backdrop-blur'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='h-4' />
      <div className='text-nowrap text-sm font-medium text-foreground'>{title}</div>
      <div className="flex-1"></div>
      {children}
      <LanguageSwitcher />
    </div>
  );
};
