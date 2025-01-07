import { TopBar } from '@/components/TopBar/TopBar';
import { Button } from '@/components/qbutton';
import { Plus } from 'lucide-react';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopBar title="My Workspace">
        <div className="flex justify-end items-center w-full gap-2">
          <Button variant="primary" size="small">
            <Plus className="w-6 h-6" />
            Create
          </Button>
          <ThemeSwitcher />
        </div>
      </TopBar>
      <div className="p-4">{children}</div>
    </div>
  );
}
