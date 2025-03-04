'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Project, Source } from '@/types/project';
import { Plus, Sigma } from 'lucide-react';
import Logo from '@/public/icons/logo.svg';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const QatalystIcon = () => (
  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-blaze-orange-600 ml-2">
    <Logo className="w-[12px] h-[12px] fill-white" />
  </div>
);

const TableCellWithValue = ({
  children,
  icon,
  disabled,
}: {
  children: React.ReactNode;
  icon?: React.ReactElement | null;
  disabled?: boolean;
}) => (
  <TableCell>
    <div
      className={`border flex items-center justify-between w-full rounded-sm h-9 p-2 ${
        disabled ? 'bg-muted' : 'bg-background'
      }`}
    >
      {children}
      {icon}
    </div>
  </TableCell>
);

const TableCellWithValueSource = ({ sources }: { sources: Source[] }) => {
  const { t } = useTranslation();
  
  return (
    <TableCell>
      <div className="border flex items-center justify-center bg-background w-full rounded-sm h-9 p-2">
        {sources.length === 0 ? (
          <span className="flex flex-row gap-2 items-center text-muted-foreground">
            <Plus className="h-4 w-4" /> {t('financialAssessment.source')}
          </span>
        ) : (
          <span>
            {sources.length} {sources.length > 1 ? t('financialAssessment.sources') : t('financialAssessment.source')}
          </span>
        )}
      </div>
    </TableCell>
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
    childEl.classList.add('dark:bg-orange-800')
    setTimeout(() => {
      childEl.classList.remove('bg-orange-100');
      childEl.classList.remove('dark:bg-orange-800')
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
        <span>{t('financialAssessment.noData')}</span>
      </div>
    );
  }
  const data = projectData.financialAssessment;
  return (
    <div className="w-full p-4 bg-background rounded-sm border mr-2 overflow-scroll">
      <div className="p-4 flex flex-row justify-between items-center">
        <span className="text-lg font-semibold">{t('financialAssessment.volumes')}</span>
        <span className="text-xs bg-neutral-200 p-1 px-2 rounded-lg text-muted-foreground">
          {t('financialAssessment.demoNotice')}
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">{t('financialAssessment.name')}</TableHead>
            <TableHead className="w-[17%]">{t('financialAssessment.value')}</TableHead>
            <TableHead className="w-[17%]">{t('financialAssessment.unit')}</TableHead>
            <TableHead className="w-[17%]">{t('financialAssessment.source')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            className="hover:cursor-pointer"
            onClick={() => handleRowClick(data.projectValue.id)}
          >
            <TableCell>
              <span className="">{t('financialAssessment.projectValue')}</span>
            </TableCell>
            <TableCellWithValue
              icon={
                data.projectValue.qatalystGenerated ? <QatalystIcon /> : null
              }
            >
              <span>{data.projectValue.formatted}</span>
            </TableCellWithValue>
            <TableCellWithValue>
              <span>{data.projectValue.unit}</span>
            </TableCellWithValue>
            <TableCellWithValueSource sources={data.projectValue.sources} />
          </TableRow>
          <TableRow
            className="hover:cursor-pointer"
            onClick={() => handleRowClick(data.estimatedReductions.id)}
          >
            <TableCell>
              <span>{t('financialAssessment.estimatedReductions')}</span>
            </TableCell>
            <TableCellWithValue
              icon={
                data.estimatedReductions.qatalystGenerated ? (
                  <QatalystIcon />
                ) : null
              }
            >
              <span>{data.estimatedReductions.formatted}</span>
            </TableCellWithValue>
            <TableCellWithValue>
              <span>{data.estimatedReductions.unit}</span>
            </TableCellWithValue>
            <TableCellWithValueSource
              sources={data.estimatedReductions.sources}
            />
          </TableRow>
          <TableRow
            className="hover:cursor-pointer"
            onClick={() => handleRowClick(data.totalEstimatedReductions.id)}
          >
            <TableCell>
              <span className="">{t('financialAssessment.totalEstimatedReductions')}</span>
            </TableCell>
            <TableCellWithValue
              icon={
                data.totalEstimatedReductions.qatalystGenerated ? (
                  <QatalystIcon />
                ) : null
              }
            >
              <span>{data.totalEstimatedReductions.formatted}</span>
            </TableCellWithValue>
            <TableCellWithValue>
              <span>{data.totalEstimatedReductions.unit}</span>
            </TableCellWithValue>
            <TableCellWithValueSource
              sources={data.totalEstimatedReductions.sources}
            />
          </TableRow>
          <TableRow
            className="hover:cursor-pointer"
            onClick={() => handleRowClick(data.projectDuration.id)}
          >
            <TableCell>
              <span className="">{t('financialAssessment.projectDuration')}</span>
            </TableCell>
            <TableCellWithValue
              icon={
                data.projectDuration.qatalystGenerated ? <QatalystIcon /> : null
              }
            >
              <span>{data.projectDuration.formatted}</span>
            </TableCellWithValue>
            <TableCellWithValue>
              <span>{data.projectDuration.unit}</span>
            </TableCellWithValue>
            <TableCellWithValueSource sources={data.projectDuration.sources} />
          </TableRow>
          <TableRow
            className="hover:cursor-pointer"
            onClick={() => handleRowClick(data.projectArea.id)}
          >
            <TableCell>
              <span className="">{t('financialAssessment.projectArea')}</span>
            </TableCell>
            <TableCellWithValue
              icon={
                data.projectArea.qatalystGenerated ? <QatalystIcon /> : null
              }
            >
              <span>{data.projectArea.formatted}</span>
            </TableCellWithValue>
            <TableCellWithValue>
              <span>{data.projectArea.unit}</span>
            </TableCellWithValue>
            <TableCellWithValueSource sources={data.projectArea.sources} />
          </TableRow>
          <TableRow
            className="hover:cursor-pointer"
            onClick={() =>
              handleRowClick(data.estimatedReductionsPerUnitAreaPerYear.id)
            }
          >
            <TableCell>
              <span className="">
                Estimated Reduction Per Unit of Area Per Year
              </span>
            </TableCell>
            <TableCellWithValue
              icon={
                data.estimatedReductionsPerUnitAreaPerYear.qatalystGenerated ? (
                  <QatalystIcon />
                ) : null
              }
            >
              <span>
                {data.estimatedReductionsPerUnitAreaPerYear.formatted}
              </span>
            </TableCellWithValue>
            <TableCellWithValue>
              <span>{data.estimatedReductionsPerUnitAreaPerYear.unit}</span>
            </TableCellWithValue>
            <TableCellWithValueSource
              sources={data.estimatedReductionsPerUnitAreaPerYear.sources}
            />
          </TableRow>
          <TableRow
            className="hover:cursor-pointer"
            onClick={() =>
              handleRowClick(data.estimatedReductionsPerUnitAreaPerYear.id)
            }
          >
            <TableCell>
              <span className="">Estimated Reduction Per Unit of Area</span>
            </TableCell>
            <TableCellWithValue
              icon={
                data.estimatedReductionsPerUnitArea.qatalystGenerated ? (
                  <QatalystIcon />
                ) : null
              }
            >
              <span>{data.estimatedReductionsPerUnitArea.formatted}</span>
            </TableCellWithValue>
            <TableCellWithValue>
              <span>{data.estimatedReductionsPerUnitArea.unit}</span>
            </TableCellWithValue>
            <TableCellWithValueSource
              sources={data.estimatedReductionsPerUnitArea.sources}
            />
          </TableRow>
          <TableRow>
            <TableCell className="flex flex-row gap-1 items-center">
              <Plus className="w-4 h-4" />
              <span className="text-xs">{t('financialAssessment.addCriteria')}</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>

      <div className="p-4 flex flex-row justify-between items-center">
        <span className="text-lg font-semibold">{t('financialAssessment.costOfProduction')}</span>
        <span className="text-xs bg-neutral-200 p-1 px-2 rounded-lg text-muted-foreground">
          {t('financialAssessment.demoNotice')}
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">{t('financialAssessment.name')}</TableHead>
            <TableHead className="w-[17%]">{t('financialAssessment.value')}</TableHead>
            <TableHead className="w-[17%]">{t('financialAssessment.unit')}</TableHead>
            <TableHead className="w-[17%]">{t('financialAssessment.source')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            className="hover:cursor-pointer"
            onClick={() => handleRowClick(data.landAcquisitionCost.id)}
          >
            <TableCell>
              <span className="">Land Acquisition Cost</span>
            </TableCell>
            <TableCellWithValue
              icon={
                data.landAcquisitionCost.qatalystGenerated ? (
                  <QatalystIcon />
                ) : null
              }
            >
              <span>{data.landAcquisitionCost.formatted}</span>
            </TableCellWithValue>
            <TableCellWithValue>
              <span>{data.landAcquisitionCost.unit}</span>
            </TableCellWithValue>
            <TableCellWithValueSource
              sources={data.landAcquisitionCost.sources}
            />
          </TableRow>
          <TableRow
            className="hover:cursor-pointer"
            onClick={() => handleRowClick(data.landPerUnitAreaCost.id)}
          >
            <TableCell>
              <span className="">Land Per Unit Area Cost</span>
            </TableCell>
            <TableCellWithValue
              icon={
                data.landPerUnitAreaCost.qatalystGenerated ? (
                  <QatalystIcon />
                ) : null
              }
            >
              <span>{data.landPerUnitAreaCost.formatted}</span>
            </TableCellWithValue>
            <TableCellWithValue>
              <span>{data.landPerUnitAreaCost.unit}</span>
            </TableCellWithValue>
            <TableCellWithValueSource
              sources={data.landPerUnitAreaCost.sources}
            />
          </TableRow>

          <TableRow
            className="hover:cursor-pointer"
            onClick={() =>
              handleRowClick(data.plantationEstablishmentMaintenanceCost.id)
            }
          >
            <TableCell>
              <span className="">
                Plantation Establishment and Maintenance Cost
              </span>
            </TableCell>
            <TableCellWithValue
              icon={
                data.plantationEstablishmentMaintenanceCost
                  .qatalystGenerated ? (
                  <QatalystIcon />
                ) : null
              }
            >
              <span>
                {data.plantationEstablishmentMaintenanceCost.formatted}
              </span>
            </TableCellWithValue>
            <TableCellWithValue>
              <span>{data.plantationEstablishmentMaintenanceCost.unit}</span>
            </TableCellWithValue>
            <TableCellWithValueSource
              sources={data.plantationEstablishmentMaintenanceCost.sources}
            />
          </TableRow>

          <TableRow
            className="hover:cursor-pointer"
            onClick={() => handleRowClick(data.costOfGoodsSold.id)}
          >
            <TableCell>
              <span className="">Cost of Goods Sold (COGS)</span>
            </TableCell>
            <TableCellWithValue
              icon={
                data.costOfGoodsSold.qatalystGenerated ? <QatalystIcon /> : null
              }
            >
              <span>{data.costOfGoodsSold.formatted}</span>
            </TableCellWithValue>
            <TableCellWithValue>
              <span>{data.costOfGoodsSold.unit}</span>
            </TableCellWithValue>
            <TableCellWithValueSource sources={data.costOfGoodsSold.sources} />
          </TableRow>

          <TableRow
            className="hover:cursor-pointer"
            onClick={() => handleRowClick(data.overheads.id)}
          >
            <TableCell>
              <span className="">Overheads</span>
            </TableCell>
            <TableCellWithValue
              icon={data.overheads.qatalystGenerated ? <QatalystIcon /> : null}
            >
              <span>{data.overheads.formatted}</span>
            </TableCellWithValue>
            <TableCellWithValue>
              <span>{data.overheads.unit}</span>
            </TableCellWithValue>
            <TableCellWithValueSource sources={data.overheads.sources} />
          </TableRow>

          <TableRow
            className="hover:cursor-pointer"
            onClick={() => handleRowClick(data.totalGrossCosts.id)}
          >
            <TableCell>
              <span className="">Total Gross Costs</span>
            </TableCell>
            <TableCellWithValue
              icon={
                data.totalGrossCosts.qatalystGenerated ? <QatalystIcon /> : null
              }
            >
              <span>{data.totalGrossCosts.formatted}</span>
            </TableCellWithValue>
            <TableCellWithValue>
              <span>{data.totalGrossCosts.unit}</span>
            </TableCellWithValue>
            <TableCellWithValueSource sources={data.totalGrossCosts.sources} />
          </TableRow>

          <TableRow
            className="hover:cursor-pointer"
            onClick={() => handleRowClick(data.alternateRevenueSources.id)}
          >
            <TableCell>
              <span className="">Alternate Revenue Sources (Non-carbon)</span>
            </TableCell>
            <TableCellWithValue
              icon={
                data.alternateRevenueSources.qatalystGenerated ? (
                  <QatalystIcon />
                ) : null
              }
            >
              <span>{data.alternateRevenueSources.formatted}</span>
            </TableCellWithValue>
            <TableCellWithValue>
              <span>{data.alternateRevenueSources.unit}</span>
            </TableCellWithValue>
            <TableCellWithValueSource
              sources={data.alternateRevenueSources.sources}
            />
          </TableRow>

          <TableRow
            className="hover:cursor-pointer"
            onClick={() => handleRowClick(data.costOfFinancing.id)}
          >
            <TableCell>
              <span className="">Cost of Financing</span>
            </TableCell>
            <TableCellWithValue
              icon={
                data.costOfFinancing.qatalystGenerated ? <QatalystIcon /> : null
              }
            >
              <span>{data.costOfFinancing.formatted}</span>
            </TableCellWithValue>
            <TableCellWithValue>
              <span>{data.costOfFinancing.unit}</span>
            </TableCellWithValue>
            <TableCellWithValueSource sources={data.costOfFinancing.sources} />
          </TableRow>

          <TableRow
            className="hover:cursor-pointer"
            onClick={() => handleRowClick(data.tax.id)}
          >
            <TableCell>
              <span className="">Tax</span>
            </TableCell>
            <TableCellWithValue
              icon={data.tax.qatalystGenerated ? <QatalystIcon /> : null}
            >
              <span>{data.tax.formatted}</span>
            </TableCellWithValue>
            <TableCellWithValue>
              <span>{data.tax.unit}</span>
            </TableCellWithValue>
            <TableCellWithValueSource sources={data.tax.sources} />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">Capital Expense Intensity</span>
            </TableCell>
            <TableCellWithValue icon={<Sigma className="w-4 h-4" />} disabled>
              <span>Auto</span>
            </TableCellWithValue>
            <TableCellWithValue disabled>
              <span>USD/tCO₂e</span>
            </TableCellWithValue>
            <TableCellWithValueSource sources={[]} />
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="">Operating Expense Intensity</span>
            </TableCell>
            <TableCellWithValue icon={<Sigma className="w-4 h-4" />} disabled>
              <span>Auto</span>
            </TableCellWithValue>
            <TableCellWithValue disabled>
              <span>USD/tCO₂e</span>
            </TableCellWithValue>
            <TableCellWithValueSource sources={[]} />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">Total Expense Intensity</span>
            </TableCell>
            <TableCellWithValue icon={<Sigma className="w-4 h-4" />} disabled>
              <span>Auto</span>
            </TableCellWithValue>
            <TableCellWithValue disabled>
              <span>USD/tCO₂e</span>
            </TableCellWithValue>
            <TableCellWithValueSource sources={[]} />
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="">
                Cost of Production (Including Non Carbon Revenues)
              </span>
            </TableCell>
            <TableCellWithValue icon={<Sigma className="w-4 h-4" />} disabled>
              <span>Auto</span>
            </TableCellWithValue>
            <TableCellWithValue disabled>
              <span>USD</span>
            </TableCellWithValue>
            <TableCellWithValueSource sources={[]} />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">Total Net Costs</span>
            </TableCell>
            <TableCellWithValue icon={<Sigma className="w-4 h-4" />} disabled>
              <span>Auto</span>
            </TableCellWithValue>
            <TableCellWithValue disabled>
              <span>kUSD</span>
            </TableCellWithValue>
            <TableCellWithValueSource sources={[]} />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">
                Cost of Production (Net - including Financing)
              </span>
            </TableCell>
            <TableCellWithValue icon={<Sigma className="w-4 h-4" />} disabled>
              <span>Auto</span>
            </TableCellWithValue>
            <TableCellWithValue disabled>
              <span>USD/tCO₂e</span>
            </TableCellWithValue>
            <TableCellWithValueSource sources={[]} />
          </TableRow>
          <TableRow>
            <TableCell className="flex flex-row gap-1 items-center">
              <Plus className="w-4 h-4" />
              <span className="text-xs">{t('financialAssessment.addCriteria')}</span>
            </TableCell>
            <TableCellWithValue icon={<Sigma className="w-4 h-4" />} disabled>
              <span>{t('financialAssessment.auto')}</span>
            </TableCellWithValue>
            <TableCellWithValue disabled>
              <span>USD/tCO₂e</span>
            </TableCellWithValue>
            <TableCellWithValueSource sources={[]} />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
