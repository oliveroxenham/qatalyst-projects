import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/TopBar/TopBar';

export default function FinancialAssessmentPage() {
  return (
    <div>
      <TopBar title="Quality Assessment">
        <div className="flex justify-end items-center w-full gap-2">
          <ThemeSwitcher />
        </div>
      </TopBar>
      <div className="p-4 flex justify-center"></div>
    </div>
  );
}
