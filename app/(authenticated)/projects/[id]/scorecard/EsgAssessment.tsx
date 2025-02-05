import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { EsgRisk } from '@/types/project';
import { UserRatingBoxed } from '@/components/user-rating';
import { QatalystResponseBoxed } from '@/components/qatalyst-response-boxed';

function EsgAssessment({
  risk = 'Low',
  data,
}: {
  risk: string;
  data?: EsgRisk[];
}) {
  const bgColor = risk === 'Low' ? 'bg-[#00938C]' : 'bg-[#F69339]';
  console.log('risks=', data);
  return (
    <div className="rounded-lg border border-neutral-200 bg-background p-6">
      <div className="pb-4">
        <span className="text-xl font-semibold">ESG Assessment</span>
      </div>
      <div className={`flex w-full items-center rounded ${bgColor} p-2`}>
        <span className="text-sm text-white">{risk} Risk</span>
      </div>
      <div className="flex flex-col rounded border-neutral-200 p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Qatalyst Response</TableHead>
              <TableHead>User Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  {typeof item.qatalystResponse !== 'undefined' && (
                    <QatalystResponseBoxed response={item.qatalystResponse} />
                  )}
                </TableCell>
                <TableCell>
                  <UserRatingBoxed currentRating={0} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                <span className="text-xs text-neutral-400">
                  Completed by Kopal on 15 Oct 2024
                </span>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

export default EsgAssessment;
