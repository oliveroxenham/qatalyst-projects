'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
import clsx from 'clsx';

const QatalystResponseBoxed = ({ response }: { response?: number }) => (
  <div className="border rounded-sm px-2 flex flex-row justify-between bg-white h-[36px] items-center">
    <QatalystResponse response={response} />
    <div className="rounded-full bg-blaze-orange-500 flex items-center justify-center w-[17px] h-[17px] ml-2">
      <Logo className="w-[10px] h-[10px]" />
    </div>
  </div>
);

const UserRatingBoxed = ({ currentRating }: { currentRating: number }) => {
  const [rating, setRating] = useState<number>(currentRating);
  return (
    <div className="border rounded-lg bg-white w-[122px]">
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setRating(1);
        }}
        className={clsx({
          'bg-branding-green-600 text-white': rating === 1,
          'hover:bg-branding-green-700 hover:text-white': rating == 1,
        })}
      >
        <Check />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setRating(2);
        }}
        className={clsx({
          'bg-[#f34062] text-white': rating === 2,
          'hover:bg-[#D11C47] hover:text-white': rating === 2,
        })}
      >
        <X />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setRating(3);
        }}
        className={clsx({
          'bg-[#F59E0B] text-white': rating === 3,
          'hover:bg-[#cc8d20] hover:text-white': rating === 3,
        })}
      >
        <QuestionMark />
      </Button>
    </div>
  );
};

const SourcesBoxed = ({ num = 0 }: { num: number }) => (
  <div className="border rounded-sm flex items-center justify-center bg-white min-w-20 h-[36px]">
    <span className="text-xs">{num} sources</span>
  </div>
);

export function Content({
  projectData,
  setAiSidebarOpen,
}: {
  projectData: Project | null;
  setAiSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [elId, setElId] = useState<string | undefined>();
  useEffect(() => {
    if (!elId) {
      return;
    }
    const parentEl = document.getElementById('qatalyst-ai');
    const childEl = document.getElementById(elId);
    if (!childEl || !parentEl) return;
    parentEl.scroll({
      top: childEl.offsetTop - 78,
      behavior: 'smooth',
    });
    childEl.classList.add('bg-orange-100');
    setTimeout(() => {
      childEl.classList.remove('bg-orange-100');
    }, 2000);
  }, [elId]);

  const handleRowClick = (elementId: string) => {
    if (!elementId) return;
    setAiSidebarOpen(true);
    setElId(elementId);
  };

  if (!projectData) {
    return (
      <div className="w-full p-4 bg-background rounded-sm border mr-2 flex items-center justify-center">
        <span>No ESG assessment data is available for this project.</span>
      </div>
    );
  }

  const esgAssessment = projectData.esgAssessment;
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
          {esgAssessment.risks?.map((risk) => {
            return (
              <TableRow
                key={risk.id}
                className="hover:cursor-pointer"
                onClick={() => handleRowClick(risk.id)}
              >
                <TableCell>
                  <span className="font-semibold">{risk.name}</span>
                </TableCell>
                <TableCell>
                  {typeof risk.qatalystResponse !== 'undefined' ? (
                    <QatalystResponseBoxed response={risk.qatalystResponse} />
                  ) : null}
                </TableCell>
                <TableCell>
                  <UserRatingBoxed currentRating={0} />
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
