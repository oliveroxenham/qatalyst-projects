'use client';
import { NavUser } from '@/components/app-sidebar/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import Logo from '@/public/icons/logo.svg';
import Qatalyst from '@/public/icons/qatalyst.svg';
import {
  BookCopy,
  ChartNoAxesCombined,
  Clipboard,
  ClipboardCheck,
  Earth,
  FilePen,
  Files,
  Fingerprint,
  LayoutList,
  ListChecks,
  NotebookText,
  ShieldAlert,
  ShieldCheck,
  SquareSigma,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import pkgjson from '@/package.json';
import type { User } from '@/types/user';
import { getProjectId } from '@/mock/data';
import { useEffect, useState } from 'react';

const data = {
  overview: [
    {
      icon: LayoutList,
      key: 'my-workspace',
      name: 'My Workspace',
      url: '/projects',
    },
    {
      icon: ChartNoAxesCombined,
      key: 'my-dashboard',
      name: 'My Dashboard',
      url: '/dashboard',
    },
  ],
  projects: [
    {
      disabled: false,
      icon: Clipboard,
      key: 'project-details',
      name: 'Project Details',
      url: '/projects/{id}/details',
    },
    {
      disabled: false,
      icon: Files,
      key: 'documents',
      name: 'Documents',
      url: '/projects/{id}/documents',
    },
    {
      disabled: false,
      icon: ClipboardCheck,
      key: 'financial-assessment',
      name: 'Financial Assessment',
      url: '/projects/{id}/financial-assessment',
    },
    {
      disabled: false,
      icon: Earth,
      key: 'esg-assessment',
      name: 'ESG Assessment',
      url: '/projects/{id}/esg-assessment',
    },
    {
      disabled: false,
      icon: ShieldCheck,
      key: 'quality-assessment',
      name: 'Quality Assessment',
      cookstoveOnly: true,
      url: '/projects/{id}/quality-assessment',
    },
    {
      disabled: false,
      icon: Star,
      key: 'scorecard',
      name: 'Scorecard',
      url: '/projects/{id}/scorecard',
    },
    {
      disabled: true,
      icon: Fingerprint,
      key: 'kyc-assessment',
      name: 'KYC Assessment',
      url: '/projects/{id}/kyc',
    },
    {
      disabled: true,
      icon: SquareSigma,
      key: 'ai-estimator',
      name: 'AI Estimator',
      url: '/projects/{id}/ai',
    },
    {
      disabled: true,
      icon: BookCopy,
      key: 'benchmark',
      name: 'Benchmark',
      url: '/projects/{id}/benchmark',
    },
    {
      disabled: true,
      icon: ShieldAlert,
      key: 'insurance',
      name: 'Insurance',
      url: '/projects/{id}/insurance',
    },
    {
      disabled: true,
      icon: FilePen,
      key: 'contract',
      name: 'Contract',
      url: '/projects/{id}/contract',
    },
    {
      disabled: true,
      icon: NotebookText,
      key: 'pdd',
      name: 'PDD',
      url: '/projects/{id}/pdd',
    },
    {
      disabled: true,
      icon: ListChecks,
      key: 'verification',
      name: 'Verification',
      url: '/projects/{id}/verification',
    },
  ],
};

const getProjectPathUrl = (url: string, projectId?: string) => {
  if (projectId) {
    return url.replace('{id}', projectId);
  } else {
    return url;
  }
};

export const AppSidebar = ({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User }) => {
  const pathname = usePathname();
  const { open } = useSidebar();
  const [isCookstove, setIsCookstove] = useState(false);
  const nonProjectPaths = data.overview.map((item) => item.url).join('/new');
  const splitPathname = pathname.split('/');
  const projectId = splitPathname.length > 2 ? splitPathname[2] : undefined;

  useEffect(() => {
    const isProjectTypeCookstove = () => {
      if (!projectId) {
        return false;
      }
      const projectData = getProjectId(projectId);
      return projectData?.projectType.toLowerCase() === 'cookstove';
    };
    setIsCookstove(isProjectTypeCookstove());
  }, [projectId]);

  return (
    <Sidebar collapsible="icon" {...props} className='z-50'>
      <SidebarHeader>
        <div className="py-2">
          <Link href="/projects">
            {open ? (
              <Qatalyst className="ml-2 max-w-full fill-slate-50" />
            ) : (
              <Logo className="ml-2 fill-slate-50 w-8 h-8" />
            )}
          </Link>
          <div className={open ? 'text-left ml-3' : 'text-center'}>
            <span className="text-xs text-neutral-500">{pkgjson.version}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            {data.overview.map((item) => (
              <SidebarMenuItem key={item.key} className="pl-2">
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  tooltip={item.name}
                >
                  <Link href={item.url}>
                    <item.icon />
                    <span className="text-xs">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator className="opacity-50" />
        {!nonProjectPaths.includes(pathname) && (
          <SidebarGroup>
            <SidebarGroupLabel>Project</SidebarGroupLabel>
            <SidebarMenu>
              {data.projects.map((item) => (
                <SidebarMenuItem key={item.key} className="pl-2">
                  {item.cookstoveOnly && isCookstove && (
                    <SidebarMenuButton
                      asChild
                      disabled={item.disabled}
                      isActive={
                        pathname === getProjectPathUrl(item.url, projectId)
                      }
                      tooltip={item.name}
                    >
                      <Link href={getProjectPathUrl(item.url, projectId)}>
                        <item.icon />
                        <span className="text-xs">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                  {item.disabled && (
                    <SidebarMenuButton className="cursor-not-allowed text-xs text-neutral-500 hover:bg-disabled/20 hover:text-white/50">
                      <item.icon /> {item.name}
                    </SidebarMenuButton>
                  )}
                  {!item.cookstoveOnly && !item.disabled && (
                    <SidebarMenuButton
                      asChild
                      disabled={item.disabled}
                      isActive={
                        pathname === getProjectPathUrl(item.url, projectId)
                      }
                      tooltip={item.name}
                    >
                      <Link href={getProjectPathUrl(item.url, projectId)}>
                        <item.icon />
                        <span className="text-xs">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="mx-auto w-full">
        {user ? <NavUser user={user} /> : null}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
