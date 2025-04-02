import { Skeleton } from '@/components/ui/skeleton';
import { TopBar } from '@/components/topbar';

export default function ReportPreviewLoading() {
  return (
    <div>
      <TopBar title="reportBuilder.title" />
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[300px]" />
        </div>
        
        {/* Preview page loading state */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-[200px]" />
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-[140px]" />
            <Skeleton className="h-10 w-[140px]" />
            <Skeleton className="h-10 w-[140px]" />
          </div>
        </div>
        
        {/* Report page skeleton */}
        <div className="flex justify-center">
          <div className="w-full max-w-[210mm] mx-auto">
            <Skeleton className="h-[297mm] w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}