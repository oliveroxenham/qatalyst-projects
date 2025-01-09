import { Button } from '@/components/qbutton';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/TopBar/TopBar';
import { Upload } from 'lucide-react';
import Link from 'next/link';

export default function DocumentsLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopBar title="Documents">
        <div className="flex justify-end items-center w-full gap-2">
          <Link href="#">
            <Button variant="primary" size="small">
              <Upload className="w-6 h-6" />
              Upload
            </Button>
          </Link>
          <ThemeSwitcher />
        </div>
      </TopBar>
      <div className="p-4 flex justify-center">{children}</div>
    </div>
  );
}
