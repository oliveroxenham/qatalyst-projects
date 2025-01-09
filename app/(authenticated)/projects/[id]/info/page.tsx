import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/TopBar/TopBar';

export default function ProjectInfoPage() {
  return (
    <div>
      <TopBar title="Project Info">
        <div className="flex justify-end items-center w-full gap-2">
          <ThemeSwitcher />
        </div>
      </TopBar>
      <div className="p-4 flex justify-center"></div>
    </div>
  );
}
