'use client';
import { driver } from 'driver.js';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import './driver.css';

type DriverStep = {
  element: string;
  popover: {
    title: string;
    description: string;
  };
};

const steps: { [key: string]: DriverStep[] } = {
  projects: [
    {
      element: '#my-workspace',
      popover: {
        title: 'My Workspace',
        description: 'Store and manage your sustainability projects.',
      },
    },
    // {
    //   element: '#my-dashboard',
    //   popover: {
    //     title: 'My Dashboard',
    //     description: 'View insights from your project portfolio.'
    //   }
    // },
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
        description:
          'Evaluate project financials to ensure sustainability.',
      },
    },
    {
      element: '#esg-assessment',
      popover: {
        title: 'ESG Assessment',
        description:
          'Evaluate project ESG to ensure sustainability.',
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
};

export function DriverJs({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  console.log('driverjs: pathname=', pathname);
  const pageName: string | undefined = pathname.split('/').at(-1);
  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      overlayColor: '#cccccc',
      steps: pageName && steps[pageName] ? steps[pageName] : [],
    });
    driverObj.drive();
  }, []);

  return <>{children}</>;
}
