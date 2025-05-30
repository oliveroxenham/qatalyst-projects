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
  Calculator,
  ChartNoAxesCombined,
  ClipboardCheck,
  Clock,
  Database,
  FilePen,
  FileText,
  LayoutList,
  Plus,
  ShieldCheck,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import pkgjson from '@/package.json';
import type { User } from '@/types/user';
import { getProjectId } from '@/mock/data';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Define interface for menu items
interface MenuItem {
  icon: React.ComponentType;
  key: string;
  name: string;
  url: string;
  disabled?: boolean;
  cookstoveOnly?: boolean;
  hidden?: boolean;
}

const getMenuData = (t: (key: string) => string): { overview: MenuItem[], projects: MenuItem[] } => ({
  overview: [
    {
      icon: LayoutList,
      key: 'my-workspace',
      name: t('sidebar.myWorkspace'),
      url: '/workspace',
    },
    {
      icon: ChartNoAxesCombined,
      key: 'my-dashboard',
      name: t('sidebar.myDashboard'),
      url: '/dashboard',
    },
  ],
  projects: [
    {
      disabled: false,
      icon: Star,
      key: 'project-overview',
      name: t('sidebar.projectOverview'),
      url: '/projects/{id}/project-overview',
    },
    {
      disabled: false,
      icon: FileText,
      key: 'executive-summary',
      name: t('sidebar.executiveSummary'),
      url: '/projects/{id}/executive-summary',
    },
    {
      disabled: false,
      icon: Calculator,
      key: 'carbon-accounting',
      name: t('sidebar.carbonAccounting'),
      url: '/projects/{id}/carbon-accounting',
    },
    {
      disabled: false,
      icon: Plus,
      key: 'additionality',
      name: t('sidebar.additionality'),
      url: '/projects/{id}/additionality',
    },
    {
      disabled: false,
      icon: Clock,
      key: 'permanence',
      name: t('sidebar.permanence'),
      url: '/projects/{id}/permanence',
    },
    {
      disabled: false,
      icon: ShieldCheck,
      key: 'co-benefits-safeguarding',
      name: t('sidebar.coBenefitsSafeguarding'),
      url: '/projects/{id}/co-benefits',
    },
    {
      disabled: false,
      icon: ClipboardCheck,
      key: 'financial-assessment',
      name: t('sidebar.financialAssessment'),
      url: '/projects/{id}/financial-assessment',
    },
    {
      disabled: false,
      icon: FilePen,
      key: 'report-builder',
      name: t('sidebar.reportBuilder'),
      url: '/projects/{id}/report-builder',
    },
    {
      disabled: false,
      icon: Database,
      key: 'data-room',
      name: t('sidebar.dataRoom'),
      url: '/projects/{id}/data-room',
    },
  ],
});

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
  const { t } = useTranslation();
  const data = getMenuData(t);
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
    <Sidebar collapsible="icon" {...props}>
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
          <SidebarGroupLabel>{t('sidebar.overview')}</SidebarGroupLabel>
          <SidebarMenu>
            {data.overview.map((item) => (
              <div id={item.key} key={item.key}>
                <SidebarMenuItem className="pl-2">
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
              </div>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        {!nonProjectPaths.includes(pathname) && (
          <SidebarGroup>
            <SidebarGroupLabel>{t('sidebar.project')}</SidebarGroupLabel>
            <SidebarMenu>
              {data.projects
                // Filter out hidden menu items
                .filter(item => !item.hidden) 
                .map((item) => (
                <div id={item.key} key={item.key}>
                  <SidebarMenuItem className="pl-2">
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
                </div>
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
