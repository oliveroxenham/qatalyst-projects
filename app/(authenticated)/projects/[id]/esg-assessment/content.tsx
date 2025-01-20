import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Check, X } from 'lucide-react';
import Logo from '@/public/icons/logo.svg';
import { QatalystResponse } from './qatalyst-response';
import { Button } from '@/components/qbutton';
import QuestionMark from '@/public/icons/question-mark.svg';
import { Project } from '@/types/project';

const QatalystResponseBoxed = ({ response }: { response?: number }) => (
  <div className="border rounded-sm px-2 flex flex-row justify-between bg-white h-[46px] items-center">
    <QatalystResponse response={response} />
    <div className="rounded-full bg-blaze-orange-500 flex items-center justify-center w-[17px] h-[17px] ml-2">
      <Logo className="w-[10px] h-[10px]" />
    </div>
  </div>
);

const UserRatingBoxed = () => (
  <div className="border rounded-sm bg-white w-[146px]">
    <Button variant="ghost">
      <Check />
    </Button>
    <Button variant="ghost">
      <X />
    </Button>
    <Button variant="ghost">
      <QuestionMark />
    </Button>
  </div>
);

const SourcesBoxed = ({ num = 0 }: { num: number }) => (
  <div className="border rounded-sm flex items-center justify-center bg-white min-w-20 h-[46px]">
    <span className="text-xs">{num} sources</span>
  </div>
);

export function Content({ projectData }: { projectData: Project | null }) {
  const esgAssessment = projectData?.esgAssessment;
  return (
    <div className="w-full p-4 bg-background rounded-sm border mr-2 overflow-scroll">
      <div className="p-4">
        <span className="text-lg font-semibold">Categories</span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Qatalyst Responses</TableHead>
            <TableHead>User Rating</TableHead>
            <TableHead>Source</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {esgAssessment?.risks?.map((risk) => {
            return (
              <TableRow key={risk.id}>
                <TableCell>
                  <span className="font-semibold">{risk.name}</span>
                </TableCell>
                <TableCell>
                  {typeof risk.qatalystResponse !== 'undefined' ? (
                    <QatalystResponseBoxed response={risk.qatalystResponse} />
                  ) : null}
                </TableCell>
                <TableCell>
                  <UserRatingBoxed />
                </TableCell>
                <TableCell>
                  <SourcesBoxed num={risk.sources?.length ?? 0} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
