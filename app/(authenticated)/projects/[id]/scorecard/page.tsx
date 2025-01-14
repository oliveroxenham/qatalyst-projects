'use client';

import { Button } from '@/components/qbutton';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { Copy } from 'lucide-react';
import Content from './content';
import { useState } from 'react';

export default function ScorecardPage() {
  const [isCompare, setIsCompare] = useState(false);
  return (
    <div>
      <TopBar title="Scorecard">
        <div className="flex justify-end items-center w-full gap-2">
          <Button variant="primary" size="small" onClick={() => setIsCompare(!isCompare)}>
            <Copy className="w-6 h-6" />
            Compare
          </Button>
          <ThemeSwitcher />
        </div>
      </TopBar>
      <Content benchmarkLayoutVisible={isCompare} />
    </div>
  );
}
