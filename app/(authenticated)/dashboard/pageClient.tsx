'use client';

import { TopBar } from '@/components/topbar';
import { WorldMap } from '@/components/WorldMap/world-map';
import { useTranslation } from 'react-i18next';

export default function DashboardClient() {
  const { t } = useTranslation();
  
  return (
    <div>
      <TopBar title={t('topbar.dashboard')}>
        <div className="flex justify-end w-full" />
      </TopBar>

      {/* Big dashboard numbers */}
      <div className="bg-white dark:bg-gray-800 m-2 p-2 rounded-lg grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 shadow-md">
        <div className="flex justify-end">
          <div className="flex flex-col gap-2 justify-center items-center p-2 grow">
            <span className="font-bold text-2xl">48</span>
            <span className="text-neutral-500 dark:text-neutral-400 text-sm">
              {t('dashboard.totalProjects')}
            </span>
          </div>
          <div className="border-r border-neutral-300 dark:border-neutral-700" />
        </div>

        <div className="flex justify-end">
          <div className="flex flex-col gap-2 justify-center items-center p-2 grow">
            <span className="font-bold text-2xl">56M</span>
            <span className="text-neutral-500 dark:text-neutral-400 text-sm">
              {t('dashboard.projectsUnderReview')} (USD)
            </span>
          </div>
          <div className="border-r border-neutral-300 dark:border-neutral-700" />
        </div>

        <div className="flex justify-end">
          <div className="flex flex-col gap-2 justify-center items-center p-2 grow">
            <span className="font-bold text-2xl">30M</span>
            <span className="text-neutral-500 dark:text-neutral-400 text-sm">
              {t('dashboard.amountContracted')} (USD)
            </span>
          </div>
          <div className="border-r border-neutral-300 dark:border-neutral-700" />
        </div>

        <div className="flex justify-end">
          <div className="flex flex-col gap-2 justify-center items-center p-2 grow">
            <span className="font-bold text-2xl">18.6M</span>
            <span className="text-neutral-500 dark:text-neutral-400 text-sm">
              {t('dashboard.amountDisbursed')} (USD)
            </span>
          </div>
          <div className="border-r border-neutral-300 dark:border-neutral-700" />
        </div>

        <div className="flex justify-end">
          <div className="flex flex-col gap-2 justify-center items-center p-2 grow">
            <span className="font-bold text-2xl">75,800,600</span>
            <span className="text-neutral-500 dark:text-neutral-400 text-sm">
              {t('dashboard.portfolioValue')} (USD)
            </span>
          </div>
        </div>
      </div>

      {/* Map & Issuance */}

      <div className="m-2 grid lg:grid-cols-2 grid-cols-1 gap-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <span>{t('dashboard.geographicDistribution')}</span>
          <WorldMap />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          {t('dashboard.annualIssuance')}
        </div>
      </div>

      <div className="absolute top-0 bottom-0 left-0 right-0 bg-neutral-200 dark:bg-neutral-800 opacity-70 flex items-center justify-center">
        <span className='text-black dark:text-white text-xl'>{t('dashboard.customizationMessage')}</span>
      </div>
    </div>
  );
}