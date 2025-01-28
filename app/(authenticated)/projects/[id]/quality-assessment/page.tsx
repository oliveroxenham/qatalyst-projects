import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { Button } from '@/components/qbutton';
import { ChevronDown, Info, Lock } from 'lucide-react';
import Logo from '@/public/icons/logo.svg';
import { QatalystAi } from '@/components/qatalyst-ai-financial';
import { Content } from './content';

export default function QualityAssessmentPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar title="Quality Assessment">
        <div className="flex justify-between items-center w-full gap-2">
          <div className="flex flex-row items-center gap-1">
            <Button variant="ghost" size="sm">
              <Info />
            </Button>
            <Button variant="ghost" size="sm">
              <Lock />
            </Button>
            <Button variant="secondary" size="sm">
              <span>Assignee:</span>
              <div className="w-5 h-5 rounded-full bg-neutral-400 flex items-center justify-center text-xs text-white p-2">
                K
              </div>
              <span>Kopal</span>
              <ChevronDown />
            </Button>
            <Button className="bg-neutral-500 text-white" size="sm">
              <span>Final Rating: Not Started</span>
              <ChevronDown />
            </Button>
          </div>
          <div className="flex items-center">
            <Button size="sm">
              <Logo className="w-8 h-8" />
              <span>Generate Assessment</span>
            </Button>
            <ThemeSwitcher />
          </div>
        </div>
      </TopBar>
      <div className="w-full flex justify-center p-2 pb-[53px] h-full">
        <Content />
        <QatalystAi projectData={null} />
      </div>
    </div>
  );
}
