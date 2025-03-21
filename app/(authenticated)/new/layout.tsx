import { TopBar } from '@/components/topbar';
import { Button } from '@/components/qbutton';
import { X } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopBar title="topbar.newProject">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Link href="/projects">
              <Button variant="secondary" size="small">
                <X className="w-6 h-6" />
              </Button>
            </Link>
          </div>
          <ThemeSwitcher />
        </div>
      </TopBar>
      <div className="p-4">{children}</div>
    </div>
  );
}
