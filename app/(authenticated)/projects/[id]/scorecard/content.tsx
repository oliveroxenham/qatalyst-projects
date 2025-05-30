'use client';

import Map from './map';
import CreditForecast from './CreditForecast';
import EsgAssessment from './EsgAssessment';
import FinancialAssessment from './FinancialAssessment';
import ProjectPicker from './ProjectPicker';
import ProjectSummary from './ProjectSummary';
import ProjectTitle from './ProjectTitle';
import { SdgSummary } from '@/components/sdg-summary';
import { clsx } from 'clsx';
import { Project } from '@/types/project';
import { CollaboratorTag } from '@/components/collaborator-tag';
import { useTranslation } from 'react-i18next';

export default function ScoreCardPage({
  benchmarkLayoutVisible,
  projectData,
}: {
  benchmarkLayoutVisible: boolean;
  projectData: Project | null;
}) {
  const { t } = useTranslation();
  
  if (!projectData) {
    return null;
  }
  return (
    <div className="flex flex-row">
      <div className="wrapper w-full overflow-scroll">
        <div className="h-full w-full overflow-auto">
          <div className="flex flex-row gap-0">
            <main
              className={clsx('h-[calc(100%-84px)]', {
                'w-1/2': benchmarkLayoutVisible,
                'w-full': !benchmarkLayoutVisible,
              })}
            >
              <ProjectTitle
                projectId={projectData.id}
                title={projectData.name}
                countryCode={projectData.country}
              />
              <ProjectSummary
                benchmarkLayoutVisible={benchmarkLayoutVisible}
                projectData={projectData}
              />
              <div
                className={clsx('m-2 grid grid-cols-1 gap-2', {
                  'lg:grid-cols-2': !benchmarkLayoutVisible,
                })}
              >
                <div className="flex flex-col gap-2 rounded-lg border bg-background p-6">
                  <span className="text-muted-foreground text-sm">
                    {t('scorecard.sustainableDevelopmentGoals')}
                  </span>
                  <SdgSummary sdgs={projectData.sdgs} />
                </div>
                <div className="flex flex-col gap-2 rounded-lg border bg-background p-6">
                  <span className="text-muted-foreground text-sm">
                    {t('scorecard.collaborators')}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {projectData?.collaborators?.map((collaborator) => (
                      <CollaboratorTag
                        key={collaborator}
                        collaborator={collaborator}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={clsx('m-2 grid grid-cols-1 gap-2', {
                  'lg:grid-cols-2': !benchmarkLayoutVisible,
                })}
              >
                <CreditForecast
                  issuanceRecords={[
                    { totalQuantity: 1804031, year: '2025' },
                    { totalQuantity: 439129, year: '2024' },
                    { totalQuantity: 955477, year: '2023' },
                    { totalQuantity: 1868973, year: '2022' },
                    { totalQuantity: 2437137, year: '2021' },
                  ]}
                  creditingStartDate="2021-01-01"
                  creditingEndDate="2028-12-31"
                  carbonCredits={projectData.estimatedAnnualCredits.value}
                />
                <Map projectData={projectData} />
              </div>
              <div
                className={clsx('m-2 grid grid-cols-1 gap-2', {
                  'lg:grid-cols-2': !benchmarkLayoutVisible,
                })}
              >
                <FinancialAssessment
                  projectData={projectData}
                  data={[
                    {
                      id: 1,
                      title: t('scorecard.capitalExpenseIntensity'),
                      unit: (
                        <span>
                          USD/tCO<sub>2</sub>e
                        </span>
                      ),
                      value: 0.03,
                    },
                    {
                      id: 2,
                      title: t('scorecard.operatingExpenseIntensity'),
                      unit: (
                        <span>
                          USD/tCO<sub>2</sub>e
                        </span>
                      ),
                      value: 0.1,
                    },
                    {
                      id: 3,
                      title: t('scorecard.totalExpenseIntensity'),
                      unit: (
                        <span>
                          USD/tCO<sub>2</sub>e
                        </span>
                      ),
                      value: 0.025,
                    },
                    {
                      id: 4,
                      title: t('scorecard.costOfProduction'),
                      unit: (
                        <span>
                          USD/tCO<sub>2</sub>e
                        </span>
                      ),
                      value: 0.025,
                    },
                    {
                      id: 5,
                      title: t('scorecard.totalNetCosts'),
                      unit: <span>kUSD</span>,
                      value: 9.5,
                    },
                    {
                      id: 6,
                      title: t('scorecard.costOfProductionNet'),
                      unit: (
                        <span>
                          USD/tCO<sub>2</sub>e
                        </span>
                      ),
                      value: 0.025,
                    },
                    {
                      id: 7,
                      title: t('scorecard.estimatedReductionPerUnit'),
                      unit: (
                        <span>
                          tCO<sub>2</sub>e/ha/yr
                        </span>
                      ),
                      value: 0.0754,
                    },
                  ]}
                />
                <EsgAssessment projectData={projectData} />
              </div>
            </main>
            {benchmarkLayoutVisible && (
              <div className="h-[calc(100%-84px)] w-1/2">
                <ProjectPicker currentProjectId={projectData.id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
