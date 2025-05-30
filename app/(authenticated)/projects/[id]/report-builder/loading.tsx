import { Skeleton } from '@/components/ui/skeleton';
import { TopBar } from '@/components/topbar';

export default function ReportBuilderLoading() {
  return (
    <div>
      <TopBar title="reportBuilder.title" />
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-[120px]" />
          </div>
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    </div>
  );
}