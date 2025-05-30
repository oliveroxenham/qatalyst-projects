'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { clsx } from 'clsx';
import type { Project } from '@/types/project';
import { UserRatingBoxed } from '@/components/user-rating';
import { QatalystResponseBoxed } from '@/components/qatalyst-response-boxed';
import { useTranslation } from 'react-i18next';
import { translateRiskName } from '@/mock/translations';

function EsgAssessment({
  projectData,
}: {
  projectData: Project;
}) {
  const { t } = useTranslation();
  
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="pb-4">
        <span className="text-xl font-semibold">{t('esgAssessment.title')}</span>
      </div>
      <div
        className={clsx(
          'flex items-center border rounded-sm p-2 h-10 text-white',
          {
            'bg-neutral-500':
              projectData?.esgAssessment?.status.toLowerCase() === 'not started',
            'bg-blue-500':
              projectData?.esgAssessment?.status.toLowerCase() === 'in progress',
            'bg-branding-green-600':
              projectData?.esgAssessment?.status.toLowerCase() === 'eligible',
            'bg-destructive':
              projectData?.esgAssessment?.status.toLowerCase() ===
              'not eligible',
          }
        )}
      >
        <span className="text-white capitalize text-sm">
          {projectData?.esgAssessment?.status ?? t('projectDetails.status.not_started')}
        </span>
      </div>
      <div className="flex flex-col rounded p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>{t('esgAssessment.qatalystResponses')}</TableHead>
              <TableHead>{t('esgAssessment.userRating')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectData?.esgAssessment?.risks?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{translateRiskName(item.name)}</TableCell>
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
                  {t('scorecard.completedBy', { name: 'Kopal', date: '15 Oct 2024' })}
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
