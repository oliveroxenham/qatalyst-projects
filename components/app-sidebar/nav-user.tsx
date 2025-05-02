'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useClerk } from '@clerk/nextjs';
import type { User } from '@/types/user';
import { resetAppState } from '@/server/actions';
import { Bell, ChevronsUpDown, LogOut, RotateCcw, MessageCircleQuestion } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const NavUser = ({ user }: { readonly user: User }) => {
  const { isMobile } = useSidebar();
  const { signOut } = useClerk();
  const { t } = useTranslation();

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
    : '';
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent mx-auto"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg text-foreground bg-muted">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg text-foreground bg-muted">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Bell />
                {t('user.notifications')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={resetAppState}>
                <RotateCcw />
                {t('user.resetAppState')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                window.localStorage.removeItem('driverjs.projects');
                window.localStorage.removeItem('driverjs.details');
                window.localStorage.removeItem('driverjs.documents');
                window.localStorage.removeItem('driverjs.scorecard');
                window.localStorage.removeItem('driverjs.financial-assessment');
                window.localStorage.removeItem('driverjs.esg-assessment');
                window.setTimeout(() => {
                  window.location.reload();
                }, 500)
              }}>
                <MessageCircleQuestion />
                {t('user.resetOnboarding')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ redirectUrl: '/sign-in' })}>
              <LogOut />
              {t('user.signOut')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
