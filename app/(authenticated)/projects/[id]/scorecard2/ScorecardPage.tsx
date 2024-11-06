'use client';

import useProject from '@/app/hooks/useProject';
import CountryBilateralAgreement from './CountryBilateralAgreement';
import CreditForecast from './CreditForecast';
import EsgAssessment from './EsgAssessment';
import FinancialAssessment from './FinancialAssessment';
import ProjectBilateralAgreement from './ProjectBilateralAgreement';
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
        <div className="h-full w-full overflow-auto pt-10">
          <div className="flex w-full items-center justify-between border-b border-border-default bg-white p-4">
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
          <div className="flex flex-row gap-2">
            <main
              className={clsx('h-[calc(100%-84px)] bg-neutral-100', {
                'w-1/2': benchmarkLayoutVisible,
                'w-full': !benchmarkLayoutVisible,
              })}
            >
              <ProjectTitle />
              <ProjectSummary
                benchmarkLayoutVisible={benchmarkLayoutVisible}
                data={{
                  value: '8.5M',
                  carbonCredits: '4,784,566',
                  lifetime: '60',
                  area: '384,566',
                }}
              />
              <SdgSummary />
              <CreditForecast project={1} />
              <div
                className={clsx('m-4 grid grid-cols-1 gap-4', {
                  'lg:grid-cols-2': !benchmarkLayoutVisible,
                })}
              >
                <FinancialAssessment />
                <EsgAssessment />
              </div>
              <div
                className={clsx('m-4 grid grid-cols-1 gap-4', {
                  'lg:grid-cols-2': !benchmarkLayoutVisible,
                })}
              >
                <CountryBilateralAgreement />
                <ProjectBilateralAgreement />
              </div>
              <RevenueForecast />
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
