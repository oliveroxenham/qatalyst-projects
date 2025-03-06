import { Skeleton } from '@/components/ui/skeleton'
import { TopBar } from '@/components/topbar'

export default function NewProjectLoadingPage() {
  return (
    <>
      <TopBar title="New Project">
        <div className="flex justify-end items-center w-full gap-2">
          <Skeleton className="h-9 w-24" />
        </div>
      </TopBar>
      <div className="p-6 max-w-3xl mx-auto space-y-8">
        <Skeleton className="h-12 w-3/4 rounded-md" />
        <div className="space-y-6">
          <Skeleton className="h-[80px] w-full rounded-md" />
          <Skeleton className="h-[80px] w-full rounded-md" />
          <Skeleton className="h-[80px] w-full rounded-md" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>
      </div>
    </>
  )
}