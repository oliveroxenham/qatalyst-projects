'use client';

import { useState } from 'react';
import { TopBar } from '@/components/topbar';
import { Button } from '@/components/qbutton';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ProjectList } from './projectList';
import { DriverJs } from '@/components/driverjs/driverjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FileText, Mail } from 'lucide-react';
import { InviteDeveloperButton } from './invite-developer-button';
import { cn } from '@/lib/utils';

const filters = [
  { 
    label: 'All projects', 
    value: null,
  },
  { 
    label: 'Nature-based', 
    value: 'nature-based projects',
  },
  { 
    label: 'Cookstove', 
    value: 'cookstove projects',
  },
  { 
    label: 'Early stage', 
    value: 'early stage projects',
  },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterClick = (filterValue: string | null) => {
    // Toggle filter - if the same filter is clicked, deactivate it
    setActiveFilter(activeFilter === filterValue ? null : filterValue);
  };

  return (
    <>
      <TopBar title="sidebar.myWorkspace">
        <div className="flex items-center gap-2 mr-auto ml-6">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;
            
            return (
              <button
                key={filter.label}
                onClick={() => handleFilterClick(filter.value)}
                className={cn(
                  'inline-flex items-center px-3.5 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ease-in-out',
                  'whitespace-nowrap',
                  isActive
                    ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-neutral-100 dark:border-neutral-200 dark:text-neutral-900'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:border-neutral-600'
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
        <div className="flex justify-end items-center w-full gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild id="create-button">
              <Button variant="primary" size="small">
                <Plus className="w-6 h-6" />
                Create
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href="/new">
                <DropdownMenuItem>
                  <FileText className="w-4 h-4" />
                  Create New Project
                </DropdownMenuItem>
              </Link>
              <InviteDeveloperButton>
                <button className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground w-full text-left">
                  <Mail className="w-4 h-4" />
                  Invite Project Developer
                </button>
              </InviteDeveloperButton>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeSwitcher />
        </div>
      </TopBar>
      <div className="p-4 flex justify-center">
        <ProjectList activeFilter={activeFilter} />
      </div>
      <DriverJs />
    </>
  );
}