import { TopBar } from '@/components/TopBar/TopBar';
import { WorldMap } from '@/components/WorldMap/world-map';

export default function DashboardPage() {
  return (
    <div>
      <TopBar title="My Dashboard">
        <div className="flex justify-end w-full" />
      </TopBar>

      {/* Big dashboard numbers */}
      <div className="bg-white m-2 p-2 rounded-lg grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 shadow-md">
        <div className="flex justify-end">
          <div className="flex flex-col gap-2 justify-center items-center p-2 grow">
            <span className="font-bold text-2xl">48</span>
            <span className="text-neutral-500 text-sm">
              Total projects in portfolio
            </span>
          </div>
          <div className="border-r border-neutral-300" />
        </div>

        <div className="flex justify-end">
          <div className="flex flex-col gap-2 justify-center items-center p-2 grow">
            <span className="font-bold text-2xl">56M</span>
            <span className="text-neutral-500 text-sm">
              Projects under review (USD)
            </span>
          </div>
          <div className="border-r border-neutral-300" />
        </div>

        <div className="flex justify-end">
          <div className="flex flex-col gap-2 justify-center items-center p-2 grow">
            <span className="font-bold text-2xl">30M</span>
            <span className="text-neutral-500 text-sm">
              Amount contracted (USD)
            </span>
          </div>
          <div className="border-r border-neutral-300" />
        </div>

        <div className="flex justify-end">
          <div className="flex flex-col gap-2 justify-center items-center p-2 grow">
            <span className="font-bold text-2xl">18.6M</span>
            <span className="text-neutral-500 text-sm">
              Amount disbursed (USD)
            </span>
          </div>
          <div className="border-r border-neutral-300" />
        </div>

        <div className="flex justify-end">
          <div className="flex flex-col gap-2 justify-center items-center p-2 grow">
            <span className="font-bold text-2xl">75,800,600</span>
            <span className="text-neutral-500 text-sm">
              Total portfolio value (USD)
            </span>
          </div>
        </div>
      </div>

      {/* Map & Issuance */}

      <div className="m-2 grid lg:grid-cols-2 grid-cols-1 gap-2">
        <div className="bg-white rounded-lg p-4 shadow">
          <span>Projects by Geographic Distribution</span>
          <WorldMap />
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          Annual Carbon Credit Issuance
        </div>
      </div>

      <div className="absolute top-0 bottom-0 left-0 right-0 bg-neutral-200 opacity-70 flex items-center justify-center">
        <span className='text-black text-xl'>The dashboard can be easily tailored to each user’s preferences.</span>
      </div>
    </div>
  );
}
