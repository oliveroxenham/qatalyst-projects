'use client';

import useProject from '@/app/hooks/useProject';
import Map from './map';
import CountryBilateralAgreement from './CountryBilateralAgreement';
import CreditForecast from './CreditForecast';
import EsgAssessment from './EsgAssessment';
import FinancialAssessment from './FinancialAssessment';
// import ProjectBilateralAgreement from './ProjectBilateralAgreement';
import ProjectPicker from './ProjectPicker';
import ProjectSummary from './ProjectSummary';
import ProjectTitle from './ProjectTitle';
import RevenueForecast from './RevenueForecast';
import SdgSummary from './SdgSummary';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/Loading';
import { clsx } from 'clsx';
import { useState } from 'react';
import SideBar from '@/components/SideBar';

export default function ScoreCardPage({ id }: { id: string }) {
  const [isOpenSideBarMobile, setIsOpenSideBarMobile] =
    useState<boolean>(false);
  const [benchmarkLayoutVisible, setBenchmarkLayoutVisible] = useState(false);
  const { data, error, isPending } = useProject(id);

  if (isPending) {
    return (
      <div className="flex w-full justify-center p-4">
        <Loading />
      </div>
    );
  }

  if (error) {
    return 'An error has occurred: ' + error.message;
  }

  console.log('data=', data);

  return (
    <div className="flex flex-row bg-neutral-100">
      <SideBar
        isOpenSideBarMobile={isOpenSideBarMobile}
        setIsOpenSideBarMobile={setIsOpenSideBarMobile}
      />
      <div className="wrapper w-full overflow-scroll">
        <div className="h-full w-full overflow-auto">
          <div className="flex w-full items-center justify-between border-b border-border-default bg-white p-2">
            <div className="text-sm font-medium text-neutral-900">
              Scorecard
            </div>
            <Button
              variant="outline"
              onClick={() => setBenchmarkLayoutVisible(!benchmarkLayoutVisible)}
            >
              Compare
            </Button>
          </div>
          <div className="flex flex-row gap-0">
            <main
              className={clsx('h-[calc(100%-84px)] bg-neutral-100', {
                'w-1/2': benchmarkLayoutVisible,
                'w-full': !benchmarkLayoutVisible,
              })}
            >
              <ProjectTitle
                projectId="1650"
                title="Reduced Emissions From Deforestation And Degradation In Keo Seima Wildlife Sanctuary"
                countryCode="KH"
              />
              <ProjectSummary
                benchmarkLayoutVisible={benchmarkLayoutVisible}
                data={{
                  value: '8.5M',
                  carbonCredits: '4,784,566',
                  lifetime: '60',
                  area: '384,566',
                  status: 'Verified',
                }}
              />
              <SdgSummary />
              <div
                className={clsx('m-2 grid grid-cols-1 gap-4', {
                  'lg:grid-cols-2': !benchmarkLayoutVisible,
                })}
              >
                <CreditForecast project={1} />
                <Map project={1} />
              </div>
              <div
                className={clsx('m-2 grid grid-cols-1 gap-4', {
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
                className={clsx('m-2 grid grid-cols-1 gap-4', {
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
