import { Skeleton } from '@/components/ui/skeleton'
import { TopBar } from '@/components/topbar'

export default function DashboardLoadingPage() {
  return (
    <>
      <TopBar title="Dashboard">
        <div className="flex justify-end items-center w-full gap-2">
          <Skeleton className="h-9 w-24" />
        </div>
      </TopBar>
      <div className="p-6 space-y-6">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-[200px] rounded-lg" />
          <Skeleton className="h-[200px] rounded-lg" />
          <Skeleton className="h-[200px] rounded-lg" />
        </div>
      </div>
    </>
  )
}