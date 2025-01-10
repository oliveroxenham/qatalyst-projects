import { Button } from '@/components/qbutton';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { Copy } from 'lucide-react';
import Link from 'next/link';

export default function ScorecardPage() {
  return (
    <div>
      <TopBar title="Scorecard">
        <div className="flex justify-end items-center w-full gap-2">
          <Link href="/new">
            <Button variant="primary" size="small">
              <Copy className="w-6 h-6" />
              Compare
            </Button>
          </Link>
          <ThemeSwitcher />
        </div>
      </TopBar>
      <div className="p-4 flex justify-center"></div>
    </div>
  );
}
