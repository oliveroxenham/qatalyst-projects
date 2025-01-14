import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Check, Plus, X } from 'lucide-react';
import Logo from '@/public/icons/logo.svg';
import { QatalystResponse } from './qatalyst-response';
import { QATALYST_RESPONSE } from '@/lib/constants';
import { Button } from '@/components/qbutton';
import QuestionMark from '@/public/icons/question-mark.svg';

const QatalystResponseBoxed = ({ response }: { response: number }) => (
  <div className="border rounded-sm px-2 flex flex-row justify-between bg-white h-10 items-center">
    <QatalystResponse response={response} />
    <div className="rounded-full bg-blaze-orange-500 flex items-center justify-center w-[17px] h-[17px] ml-2">
      <Logo className="w-[10px] h-[10px]" />
    </div>
  </div>
);

const UserRatingBoxed = () => (
  <div className="border rounded-sm flex flex-row w-36 items-center justify-center h-10 bg-white">
    <Button variant="ghost" size="sm">
      <Check />
    </Button>
    <Button variant="ghost" size="sm">
      <X />
    </Button>
    <Button variant="ghost" size="sm">
      <QuestionMark />
    </Button>
  </div>
);

const SourcesBoxed = ({ num = 0 }: { num: number }) => (
  <div className="border rounded-sm flex items-center justify-center bg-white min-w-20 h-10">
    <span className="text-xs">{num} sources</span>
  </div>
);

export function Content() {
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
          <TableRow>
            <TableCell>
              <span className="">Risk 1: Human Rights</span>
            </TableCell>
            <TableCell>
              <QatalystResponseBoxed
                response={QATALYST_RESPONSE.SATISFACTORY}
              />
            </TableCell>
            <TableCell>
              <UserRatingBoxed />
            </TableCell>
            <TableCell>
              <SourcesBoxed num={6} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="">Risk 2: Gender Equality</span>
            </TableCell>
            <TableCell>
              <QatalystResponseBoxed response={QATALYST_RESPONSE.INVESTIGATE} />
            </TableCell>
            <TableCell>
              <UserRatingBoxed />
            </TableCell>
            <TableCell>
              <SourcesBoxed num={7} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="">
                Risk 3: Community health, safety and security
              </span>
            </TableCell>
            <TableCell>
              <QatalystResponseBoxed
                response={QATALYST_RESPONSE.UNSATISFACTORY}
              />
            </TableCell>
            <TableCell>
              <UserRatingBoxed />
            </TableCell>
            <TableCell>
              <SourcesBoxed num={3} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="">
                Risk 4: Labour rights of working conditions
              </span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="">Risk 5: Cultural Heritage</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="">
                Risk 6: Indigenous People and Local Communities (IPLCs)
              </span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="">
                Risk 7: Land acquisition, displacement and resettlement
              </span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">Risk 8: Corruption</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">
                Risk 9: Economic impact and community welfare
              </span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">
                Risk 10: Climate change and disaster risks
              </span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">
                Risk 11: Resource efficiency and pollution prevention ; Energy
              </span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">Risk 12: Water</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">
                Risk 13: Biodiversity conservation and sustainable natural
                resource management
              </span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell className="flex flex-row gap-1 items-center">
              <Plus className="w-4 h-4" />
              <span className="text-xs">Add risk</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
