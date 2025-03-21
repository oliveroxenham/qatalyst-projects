'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import { Project } from '@/types/project';
import { clsx } from 'clsx'; 
import { useTranslation } from 'react-i18next';

function FinancialAssessment({
  data,
  projectData
}: {
  data: { id: number; title: string; unit: React.ReactElement; value: number }[];
  projectData: Project
}) {
  const { t } = useTranslation();
  
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="pb-4">
        <span className="text-xl font-semibold">{t('financialAssessment.title')}</span>
      </div>
      <div
        className={clsx(
          'flex items-center border rounded-sm p-2 h-10 text-white',
          {
            'bg-neutral-500':
              projectData?.financialAssessment.status.toLowerCase() === 'not started',
            'bg-blue-500':
              projectData?.financialAssessment.status.toLowerCase() === 'in progress',
            'bg-branding-green-600':
              projectData?.financialAssessment.status.toLowerCase() === 'eligible',
            'bg-destructive':
              projectData?.financialAssessment.status.toLowerCase() ===
              'not eligible',
          }
        )}
      >
        <span className="text-white capitalize text-sm">
          {projectData?.financialAssessment.status ?? t('projectDetails.status.not_started')}
        </span>
      </div>
      <div className="flex flex-col rounded p-2">
        <Table>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell className="text-neutral-500">{item.unit}</TableCell>
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

export default FinancialAssessment;
