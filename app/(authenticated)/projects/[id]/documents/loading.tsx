import { Skeleton } from '@/components/ui/skeleton'
import { TopBar } from '@/components/topbar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { File } from 'lucide-react'

export default function DocumentsLoadingPage() {
  return (
    <>
      <TopBar title="Documents">
        <div className="flex justify-between items-center w-full gap-2">
          <Skeleton className="h-8 w-1/3 rounded-md" />
          <div className="flex flex-row gap-2">
            <Skeleton className="h-9 w-32 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </div>
      </TopBar>
      <div className="p-4 flex justify-center">
        <div className="w-full bg-background border rounded-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="flex gap-1 items-center">
                  <File />
                  Filename
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(5).fill(0).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="flex items-center gap-2">
                    <Skeleton className="h-7 w-7 rounded-sm" />
                    <Skeleton className="h-5 w-40 rounded-sm" />
                  </TableCell>
                  <TableCell><Skeleton className="h-5 w-20 rounded-sm" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16 rounded-sm" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24 rounded-sm" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24 rounded-sm" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-28 rounded-sm" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
