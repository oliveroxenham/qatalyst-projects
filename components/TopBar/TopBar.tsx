import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const TopBar = ({ children, title }: { readonly title: string; readonly children?: React.ReactNode }) => {
  return (
    <div className='sticky z-10 flex min-h-[53px] w-full flex-row items-center gap-3 border-b border-border-default bg-white px-4 py-2'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='h-4' />
      <div className='text-nowrap text-sm font-medium text-neutral-900'>{title}</div>
      {children}
    </div>
  );
};
