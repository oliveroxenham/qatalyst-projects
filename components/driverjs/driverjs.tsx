'use client';
import { driver } from 'driver.js';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import './driver.css';

type DriverStep = {
  element?: string;
  popover: {
    title: string;
    description: string;
  };
};

export const steps: { [key: string]: DriverStep[] } = {
  projects: [
    {
      popover: {
        title: 'Welcome to Qatalyst',
        description:
          "<img src='https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/onboarding-cover-5Zva9QsgWitUNHzAvqIFlCQHswEnYL.png' /><p style='text-align: center;'>You're now inside Qatalyst!<br/>Please follow the guided tour tooltip to learn how to navigate the app and import your first project.</p>",
      },
    },
    {
      element: '#my-workspace',
      popover: {
        title: 'My Workspace',
        description: 'Store and manage your sustainability projects.',
      },
    },
    {
      element: '#my-dashboard',
      popover: {
        title: 'My Dashboard',
        description: 'View insights from your project portfolio.',
      },
    },
    {
      element: '#create-button',
      popover: {
        title: 'Create New Project / Group',
        description: 'Start a new project or group.',
      },
    },
  ],
  details: [
    {
      element: '#project-details',
      popover: {
        title: 'Project Details',
        description:
          'View comprehensive information about your sustainability project.',
      },
    },
    {
      element: '#documents',
      popover: {
        title: 'Documents',
        description:
          'Store and access all relevant project documents in one place.',
      },
    },
    {
      element: '#financial-assessment',
      popover: {
        title: 'Financial Assessment',
        description: 'Evaluate project financials to ensure sustainability.',
      },
    },
    {
      element: '#esg-assessment',
      popover: {
        title: 'ESG Assessment',
        description: 'Evaluate project ESG to ensure sustainability.',
      },
    },
    {
      element: '#scorecard',
      popover: {
        title: 'Scorecard',
        description:
          'Summarize project insights, value, and compare performance with others.',
      },
    },
  ],
  'financial-assessment': [
    {
      element: '#generate-assessment-button',
      popover: {
        title: 'Generate Full Assessment',
        description:
          'Use Qatalyst to generate all answers from project documents. Only the project assignee can generate an assessment.',
      },
    },
    {
      element: '#final-rating-button',
      popover: {
        title: 'Final Rating',
        description:
          'Provide a final project rating based on your assessment results. Only the project assignee can update the final rating.',
      },
    },
    {
      element: '#assignee-selector',
      popover: {
        title: 'Project Assignee',
        description: 'Update the project assignee.',
      },
    },
    {
      element: '#qatalyst-ai-button',
      popover: {
        title: 'Qatalyst Chat',
        description:
          'Engage with Qatalyst to get personalized project insights and support.',
      },
    },
  ],
  'esg-assessment': [
    {
      element: '#generate-assessment-button',
      popover: {
        title: 'Generate Full Assessment',
        description:
          'Use Qatalyst to generate all answers from project documents. Only the project assignee can generate an assessment.',
      },
    },
    {
      element: '#final-rating-button',
      popover: {
        title: 'Final Rating',
        description:
          'Provide a final project rating based on your assessment results. Only the project assignee can update the final rating.',
      },
    },
    {
      element: '#assignee-selector',
      popover: {
        title: 'Project Assignee',
        description: 'Update the project assignee.',
      },
    },
    {
      element: '#qatalyst-ai-button',
      popover: {
        title: 'Qatalyst Chat',
        description:
          'Engage with Qatalyst to get personalized project insights and support.',
      },
    },
  ],
  scorecard: [
    {
      element: '#export-button',
      popover: {
        title: 'Export Project',
        description: 'Easily export project to Word or PDF document.',
      },
    },
    {
      element: '#compare-button',
      popover: {
        title: 'Compare Projects',
        description: 'Easily compare two projects scorecard side-by-side.',
      },
    },
  ],
  documents: [
    {
      element: '#document-row',
      popover: {
        title: 'View Document',
        description: 'Open and review documents thoroughly.',
      },
    },
  ],
};

export function DriverJs({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  console.log('driverjs: pathname=', pathname);
  const pageName: string | undefined = pathname.split('/').at(-1);
  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      overlayColor: '#cccccc',
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
  }, []);

  return <>{children}</>;
}
