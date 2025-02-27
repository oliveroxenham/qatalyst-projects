'use client';
import { driver } from 'driver.js';
import { useEffect } from 'react';
import './driver.css';

export function DriverJs({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      steps: [
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
            description: 'Start a new project or group.'
          }
        }
      ],
    });
    driverObj.drive();
  }, []);

  return <>{children}</>;
}
