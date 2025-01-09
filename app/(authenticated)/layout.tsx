import { AppSidebar } from '@/components/AppSidebar/app-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { currentUser } from '@clerk/nextjs/server';

export default async function AuthenticatedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await currentUser();
  return (
    <SidebarProvider>
      <AppSidebar
        user={{
          name: user?.fullName ? user.fullName : '',
          email: user?.emailAddresses[0]
            ? user.emailAddresses[0].emailAddress
            : '',
        }}
      />
      <SidebarInset className="bg-neutral-100">{children}</SidebarInset>
    </SidebarProvider>
  );
}
