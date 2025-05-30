import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-12 w-64" />
      <div className="flex items-center justify-center h-[400px]">
        <Skeleton className="h-32 w-96" />
      </div>
    </div>
  );
}