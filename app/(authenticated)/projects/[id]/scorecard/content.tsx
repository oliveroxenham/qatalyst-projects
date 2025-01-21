import Map from './map';
import CountryBilateralAgreement from './CountryBilateralAgreement';
import CreditForecast from './CreditForecast';
import EsgAssessment from './EsgAssessment';
import FinancialAssessment from './FinancialAssessment';
import ProjectPicker from './ProjectPicker';
import ProjectSummary from './ProjectSummary';
import ProjectTitle from './ProjectTitle';
import RevenueForecast from './RevenueForecast';
import { SdgSummary } from '../../../../../components/sdg-summary';
import { clsx } from 'clsx';
import { Project } from '@/types/project';

export default function ScoreCardPage({
  benchmarkLayoutVisible,
  projectData,
}: {
  benchmarkLayoutVisible: boolean;
  projectData: Project | null;
}) {
  if (!projectData) {
    return null;
  }
  return (
    <div className="flex flex-row bg-neutral-100">
      <div className="wrapper w-full overflow-scroll">
        <div className="h-full w-full overflow-auto">
          <div className="flex flex-row gap-0">
            <main
              className={clsx('h-[calc(100%-84px)] bg-neutral-100', {
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
              <div className="m-2 flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-6">
                <span className="text-muted-foreground text-sm">Sustainable Development Goals</span>
                <SdgSummary sdgs={projectData.sdgs} />
              </div>
              <div
                className={clsx('m-2 grid grid-cols-1 gap-2', {
                  'lg:grid-cols-2': !benchmarkLayoutVisible,
                })}
              >
                <CreditForecast project={1} />
                <Map project={1} />
              </div>
              <div
                className={clsx('m-2 grid grid-cols-1 gap-2', {
                  'lg:grid-cols-2': !benchmarkLayoutVisible,
                })}
              >
                <FinancialAssessment
                  data={[
                    {
                      id: 1,
                      title: 'Capital expense intensity',
                      unit: (
                        <span>
                          USD/tCO<sub>2</sub>e
                        </span>
                      ),
                      value: 0.03,
                    },
                    {
                      id: 2,
                      title: 'Operating expense intensity',
                      unit: (
                        <span>
                          USD/tCO<sub>2</sub>e
                        </span>
                      ),
                      value: 0.1,
                    },
                    {
                      id: 3,
                      title: 'Total expense intensity',
                      unit: (
                        <span>
                          USD/tCO<sub>2</sub>e
                        </span>
                      ),
                      value: 0.025,
                    },
                    {
                      id: 4,
                      title:
                        'Cost of production (including non carbon revenues)',
                      unit: (
                        <span>
                          USD/tCO<sub>2</sub>e
                        </span>
                      ),
                      value: 0.025,
                    },
                    {
                      id: 5,
                      title: 'Total net costs',
                      unit: <span>kUSD</span>,
                      value: 9.5,
                    },
                    {
                      id: 6,
                      title: 'Cost of production (net - including financing)',
                      unit: (
                        <span>
                          USD/tCO<sub>2</sub>e
                        </span>
                      ),
                      value: 0.025,
                    },
                    {
                      id: 7,
                      title: 'Estimated reduction per unit of area per year',
                      unit: (
                        <span>
                          tCO<sub>2</sub>e/ha/yr
                        </span>
                      ),
                      value: 0.0754,
                    },
                  ]}
                />
                <EsgAssessment
                  risk="Low"
                  data={[
                    {
                      id: 1,
                      satisfactory: true,
                      title: 'Human Rights',
                    },
                    {
                      id: 2,
                      satisfactory: true,
                      title: 'Gender Equality',
                    },
                    {
                      id: 3,
                      satisfactory: true,
                      title: 'Community health, safety and security',
                    },
                    {
                      id: 4,
                      satisfactory: true,
                      title: 'Labour rights of working conditions',
                    },
                    {
                      id: 5,
                      satisfactory: true,
                      title: 'Indigenous People and Local Communities (IPLCs)',
                    },
                    {
                      id: 6,
                      satisfactory: true,
                      title: 'Land acquisition, displacement and resettlement',
                    },
                    {
                      id: 7,
                      satisfactory: true,
                      title: 'Corruption',
                    },
                    {
                      id: 8,
                      satisfactory: true,
                      title: 'Climate change and disaster risks',
                    },
                    {
                      id: 9,
                      satisfactory: true,
                      title:
                        'Resource efficiency and pollution prevention; Energy',
                    },
                    {
                      id: 10,
                      satisfactory: true,
                      title: 'Water',
                    },
                    {
                      id: 11,
                      satisfactory: true,
                      title:
                        'Biodiversity conservation and sustainable natural resource management',
                    },
                  ]}
                />
              </div>
              <div
                className={clsx('m-2 grid grid-cols-1 gap-2', {
                  'lg:grid-cols-2': !benchmarkLayoutVisible,
                })}
              >
                <CountryBilateralAgreement project={1} />
                {/* <ProjectBilateralAgreement /> */}
                <RevenueForecast />
              </div>
            </main>
            {benchmarkLayoutVisible && (
              <div className="h-[calc(100%-84px)] w-1/2">
                <ProjectPicker />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
