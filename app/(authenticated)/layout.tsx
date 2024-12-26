'use client';
import { AppSidebar } from '@/components/AppSidebar/app-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const AuthenticatedLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AuthenticatedLayout;
