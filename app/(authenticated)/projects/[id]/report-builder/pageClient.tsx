'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/qbutton';
import { Card } from '@/components/ui/card';
import { TopBar } from '@/components/topbar';
import { useTranslation } from 'react-i18next';
import { Lock } from 'lucide-react';

export function ReportBuilderClient({ projectId }: { projectId: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if there's a saved report draft in localStorage
    const savedReport = localStorage.getItem(`report_draft_${projectId}`);
    if (savedReport) {
      // If a draft exists, redirect to the preview page
      router.push(`/projects/${projectId}/report-builder/preview`);
    }
  }, [projectId, router]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <TopBar title="sidebar.reportBuilder">
        <div className="flex justify-end w-full"></div>
      </TopBar>
      <div className="p-8 flex flex-col items-center">
        <div className="max-w-2xl w-full">
          <h1 className="text-2xl font-semibold mb-6">{t('reportBuilder.title')}</h1>
          <p className="text-muted-foreground mb-8">
            {t('reportBuilder.description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 border-2 border-blue-200 hover:border-blue-300 transition-colors cursor-pointer">
              <h3 className="text-lg font-medium mb-2">{t('reportBuilder.basicReport')}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t('reportBuilder.basicReportDescription')}
              </p>
              <Button
                onClick={() => router.push(`/projects/${projectId}/report-builder/preview`)}
                className="w-full"
              >
                {t('reportBuilder.generate')}
              </Button>
            </Card>

            <Card className="p-6 border-2 border-gray-200 bg-gray-50 dark:bg-gray-800">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                {t('reportBuilder.premiumReport')}
                <Lock className="ml-2 h-4 w-4" />
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t('reportBuilder.premiumReportDescription')}
              </p>
              <Button disabled className="w-full">
                {t('reportBuilder.unlock')}
              </Button>
            </Card>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h4 className="font-medium">{t('reportBuilder.tipsTitle')}</h4>
            <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
              <li>{t('reportBuilder.tip1')}</li>
              <li>{t('reportBuilder.tip2')}</li>
              <li>{t('reportBuilder.tip3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}