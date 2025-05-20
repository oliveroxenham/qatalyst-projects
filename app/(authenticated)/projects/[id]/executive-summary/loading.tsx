import { Skeleton } from '@/components/ui/skeleton';
import { TopBar } from '@/components/topbar';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function Loading() {
  return (
    <div>
      <TopBar title="Executive Summary">
        <div className="flex justify-between items-center w-full gap-2">
          <Skeleton className="h-8 w-64" />
          <div className="flex flex-row gap-2">
            <ThemeSwitcher />
          </div>
        </div>
      </TopBar>
      <div className="p-8">
        <Skeleton className="h-[600px] w-full" />
      </div>
    </div>
  );
}