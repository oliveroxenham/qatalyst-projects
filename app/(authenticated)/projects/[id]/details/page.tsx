import { Button } from '@/components/qbutton';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { TopBar } from '@/components/topbar';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, Edit } from 'lucide-react';

export default function ProjectInfoPage() {
  return (
    <div>
      <TopBar title="Project Details">
        <div className="flex justify-end items-center w-full gap-2">
          <ThemeSwitcher />
        </div>
      </TopBar>
      <div className="p-4 flex justify-center w-full gap-4">
        <div className="bg-background w-[60%] rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between py-2 px-4">
            <span className="font-semibold">Details</span>
            <Button variant="outline" size="small">
              <Edit />
              Edit
            </Button>
          </div>
          <Separator />
          <div>
            <div className="flex p-4 gap-3">
              <div className="flex flex-col gap-1 grow">
                <span>Registry Project ID</span>
                <p className="text-sm p-2 border rounded bg-slate-100">1650</p>
              </div>
              <div className="flex flex-col gap-1 grow">
                <span>Qatalyst Project Type</span>
                <p className="text-sm p-2 border rounded bg-slate-100">
                  Nature-Based
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Project Name</span>
              <p className="text-sm p-2 border rounded bg-slate-100">
                Family Forest Carbon Project
              </p>
            </div>

            <div className="flex p-4 gap-3">
              <div className="flex flex-col gap-1 grow">
                <span>Country</span>
                <p className="text-sm p-2 border rounded bg-slate-100">
                  United States
                </p>
              </div>
              <div className="flex flex-col gap-1 grow">
                <span>State / Province</span>
                <p className="text-sm p-2 border rounded bg-slate-100">WA</p>
              </div>
            </div>

            <div className="flex m-4 gap-3 h-[220px] bg-slate-100 border justify-center items-center">
              <span>Map</span>
            </div>

            <div className="flex p-4 gap-3">
              <div className="flex flex-col gap-1 grow">
                <span>Latitude</span>
                <p className="text-sm p-2 border rounded bg-slate-100">
                  47.7511
                </p>
              </div>
              <div className="flex flex-col gap-1 grow">
                <span>Longitude</span>
                <p className="text-sm p-2 border rounded bg-slate-100">
                  -120.7401
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Background</span>
              <p className="text-sm p-2 border rounded bg-slate-100">
                Background info
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Proponent</span>
              <p className="text-sm p-2 border rounded bg-slate-100">
                Forest Carbon Works PBC
                <br />
                MN, United States
                <br />
                1 (800) 399-5246
                <br />
                julian@forestcarbonworks.com
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Project Status</span>
              <p className="text-sm p-2 border rounded bg-slate-100">
                Registered
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Project Type</span>
              <p className="text-sm p-2 border rounded bg-slate-100">
                Reforestation
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Estimated Annual Credits</span>
              <p className="text-sm p-2 border rounded bg-slate-100">
                13,000 Tons
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Methodology</span>
              <p className="text-sm p-2 border rounded bg-slate-100">
                Methodology
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Project Area</span>
              <p className="text-sm p-2 border rounded bg-slate-100">
                1,300 Hectares
              </p>
            </div>

            <div className="flex flex-col gap-1 grow p-4">
              <span>Sustainable Development Goals</span>
              <p className="text-sm p-2 border rounded bg-slate-100">
                1, 2, 3, 4
              </p>
            </div>
          </div>
        </div>
        <div className="bg-background w-[40%] rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between py-2 px-4">
            <span className="font-semibold">Task Manager</span>
            <Button size="sm" variant="ghost">
              <ChevronDown />
            </Button>
          </div>
          <Separator />
          <div></div>
        </div>
      </div>
    </div>
  );
}
