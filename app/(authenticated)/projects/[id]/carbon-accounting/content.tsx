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
import { Button } from '@/components/qbutton';
import QuestionMark from '@/public/icons/question-mark.svg';
import { Project } from '@/types/project';
import clsx from 'clsx';
import { QatalystResponseBoxed } from '@/components/qatalyst-response-boxed';
import { useTranslation } from 'react-i18next';
import { translateRiskName } from '@/mock/translations';

const UserRatingBoxed = ({ currentRating }: { currentRating: number }) => {
  const [rating, setRating] = useState<number>(currentRating);
  return (
    <div className="border rounded-lg bg-background w-[122px]">
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

const SourcesBoxed = ({ num = 0 }: { num: number }) => {
  const { t } = useTranslation();
  return (
    <div className="border rounded-sm flex items-center justify-center bg-background min-w-20 h-[36px]">
      <span className="text-xs">{num} {t('common.sources')}</span>
    </div>
  );
};

export function Content({
  projectData,
  setAiSidebarOpen,
}: {
  projectData: Project | null;
  setAiSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();
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
    childEl.classList.add('dark:bg-orange-800');
    setTimeout(() => {
      childEl.classList.remove('bg-orange-100');
      childEl.classList.remove('dark:bg-orange-800');
    }, 2000);
  }, [elId]);

  const handleRowClick = (elementId: string) => {
    if (!elementId) return;
    setAiSidebarOpen(true);
    setElId(elementId);
  };

  // Temporary fallback to use carbonQualityAssessment data 
  // since we've renamed the field in the UI but the data structure is still the same
  if (!projectData || (!projectData.carbonAccounting && !projectData.carbonQualityAssessment)) {
    return (
      <div className="w-full p-4 bg-background rounded-sm border mr-2 flex items-center justify-center">
        <span>{t('carbonAccounting.title')} data is not available for this project.</span>
      </div>
    );
  }

  // Use carbonAccounting if available, otherwise fallback to carbonQualityAssessment
  const carbonAccounting = projectData.carbonAccounting || projectData.carbonQualityAssessment;
  return (
    <div className="w-full p-4 bg-background rounded-sm border mr-2 overflow-scroll">
      <div className="p-4">
        <span className="text-lg font-semibold">{t('carbonAccounting.categories')}</span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('carbonAccounting.name')}</TableHead>
            <TableHead>{t('carbonAccounting.qatalystResponses')}</TableHead>
            <TableHead>{t('carbonAccounting.userRating')}</TableHead>
            <TableHead>{t('common.source')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carbonAccounting?.risks?.filter(risk => 
            risk.name.startsWith('Risk 3:')
          ).map((risk) => {
            return (
              <TableRow
                key={risk.id}
                className="hover:cursor-pointer"
                onClick={() => handleRowClick(risk.id)}
              >
                <TableCell>
                  <span className="font-semibold">{translateRiskName(risk.name)}</span>
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