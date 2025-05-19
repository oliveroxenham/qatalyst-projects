'use client';
import { driver } from 'driver.js';
import { useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import './driver.css';
import { useTranslation } from '@/i18n/i18n';

type DriverStep = {
  element?: string;
  popover: {
    title: string;
    description: string;
  };
};

export function DriverJs({ children }: { children?: React.ReactNode }) {
  const { t } = useTranslation();
  const pathname = usePathname();
  console.log('driverjs: pathname=', pathname);
  const pageName: string | undefined = pathname.split('/').at(-1);
  
  // Define steps with translations
  const steps: { [key: string]: DriverStep[] } = useMemo(() => ({
    projects: [
      {
        popover: {
          title: t('driverjs.projects.welcome.title'),
          description: t('driverjs.projects.welcome.description'),
        },
      },
      {
        element: '#my-workspace',
        popover: {
          title: t('driverjs.projects.workspace.title'),
          description: t('driverjs.projects.workspace.description'),
        },
      },
      {
        element: '#my-dashboard',
        popover: {
          title: t('driverjs.projects.dashboard.title'),
          description: t('driverjs.projects.dashboard.description'),
        },
      },
      {
        element: '#create-button',
        popover: {
          title: t('driverjs.projects.create.title'),
          description: t('driverjs.projects.create.description'),
        },
      },
    ],
    details: [
      {
        element: '#project-details',
        popover: {
          title: t('driverjs.details.projectDetails.title'),
          description: t('driverjs.details.projectDetails.description'),
        },
      },
      {
        element: '#documents',
        popover: {
          title: t('driverjs.details.documents.title'),
          description: t('driverjs.details.documents.description'),
        },
      },
      {
        element: '#financial-assessment',
        popover: {
          title: t('driverjs.details.financialAssessment.title'),
          description: t('driverjs.details.financialAssessment.description'),
        },
      },
      {
        element: '#esg-assessment',
        popover: {
          title: t('driverjs.details.esgAssessment.title'),
          description: t('driverjs.details.esgAssessment.description'),
        },
      },
      {
        element: '#scorecard',
        popover: {
          title: t('driverjs.details.scorecard.title'),
          description: t('driverjs.details.scorecard.description'),
        },
      },
    ],
    'financial-assessment': [
      {
        element: '#generate-assessment-button',
        popover: {
          title: t('driverjs.financialAssessment.generateAssessment.title'),
          description: t('driverjs.financialAssessment.generateAssessment.description'),
        },
      },
      {
        element: '#final-rating-button',
        popover: {
          title: t('driverjs.financialAssessment.finalRating.title'),
          description: t('driverjs.financialAssessment.finalRating.description'),
        },
      },
      {
        element: '#assignee-selector',
        popover: {
          title: t('driverjs.financialAssessment.assignee.title'),
          description: t('driverjs.financialAssessment.assignee.description'),
        },
      },
      {
        element: '#qatalyst-ai-button',
        popover: {
          title: t('driverjs.financialAssessment.qatalystChat.title'),
          description: t('driverjs.financialAssessment.qatalystChat.description'),
        },
      },
    ],
    'esg-assessment': [
      {
        element: '#generate-assessment-button',
        popover: {
          title: t('driverjs.esgAssessment.generateAssessment.title'),
          description: t('driverjs.esgAssessment.generateAssessment.description'),
        },
      },
      {
        element: '#final-rating-button',
        popover: {
          title: t('driverjs.esgAssessment.finalRating.title'),
          description: t('driverjs.esgAssessment.finalRating.description'),
        },
      },
      {
        element: '#assignee-selector',
        popover: {
          title: t('driverjs.esgAssessment.assignee.title'),
          description: t('driverjs.esgAssessment.assignee.description'),
        },
      },
      {
        element: '#qatalyst-ai-button',
        popover: {
          title: t('driverjs.esgAssessment.qatalystChat.title'),
          description: t('driverjs.esgAssessment.qatalystChat.description'),
        },
      },
    ],
    scorecard: [
      {
        element: '#export-button',
        popover: {
          title: t('driverjs.scorecard.export.title'),
          description: t('driverjs.scorecard.export.description'),
        },
      },
      {
        element: '#compare-button',
        popover: {
          title: t('driverjs.scorecard.compare.title'),
          description: t('driverjs.scorecard.compare.description'),
        },
      },
    ],
    documents: [
      {
        element: '#document-row',
        popover: {
          title: t('driverjs.documents.viewDocument.title'),
          description: t('driverjs.documents.viewDocument.description'),
        },
      },
    ],
  }), [t]);
  
  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      overlayColor: '#4A4E51',
      steps: pageName && steps[pageName] ? steps[pageName] : [],
    });
    const runDriver = !window.localStorage.getItem(`driverjs.${pageName}`);
    console.log('runDriver?', runDriver);
    if (!runDriver) {
      return;
    }
    window.setTimeout(() => {
      driverObj.drive();
      window.localStorage.setItem(`driverjs.${pageName}`, 'true');
    }, 1000);
  }, [pageName, t, steps]);

  return <>{children}</>;
}
