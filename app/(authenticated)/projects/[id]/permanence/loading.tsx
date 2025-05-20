import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { Button } from '@/components/qbutton';
import { Lock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function PermanenceLoading() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar title="sidebar.permanence">
        <div className="flex justify-between items-center w-full gap-2">
          <div className="flex flex-row items-center gap-2">
            <Skeleton className="w-48 h-8" />
            <Button variant="ghost" size="sm">
              <Lock />
            </Button>
            <div className="flex flex-row items-center gap-1">
              <span className="text-sm">Assignee:</span>
              <Skeleton className="w-32 h-8" />
            </div>
            <div className="flex flex-row items-center gap-1">
              <span className="text-sm">Final Rating:</span>
              <Skeleton className="w-32 h-8" />
            </div>
          </div>
          <div className="flex items-center">
            <Skeleton className="w-32 h-10 mr-2" />
            <ThemeSwitcher />
          </div>
        </div>
      </TopBar>
      <div className="w-full flex justify-center p-2 pb-[53px] h-full">
        <div className="w-full p-4 bg-background rounded-sm border mr-2 overflow-scroll">
          <Skeleton className="w-full h-[600px]" />
        </div>
        <Skeleton className="w-[320px] h-[600px]" />
      </div>
    </div>
  );
}