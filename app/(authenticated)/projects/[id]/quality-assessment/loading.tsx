import { Skeleton } from '@/components/ui/skeleton'
import { TopBar } from '@/components/topbar'
import { Separator } from '@/components/ui/separator'

export default function QualityAssessmentLoadingPage() {
  return (
    <>
      <TopBar title="">
        <div className="flex justify-end items-center w-full gap-2">
          <Skeleton className="h-9 w-24" />
        </div>
      </TopBar>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-1/3 rounded-md" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24 rounded-md" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
        <Separator />
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4 rounded-md" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-[180px] w-full rounded-lg" />
              <Skeleton className="h-[180px] w-full rounded-lg" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4 rounded-md" />
            <Skeleton className="h-[250px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </>
  )
}