import { Skeleton } from '../ui/skeleton';
import { Tag } from '@/components/tag';
import ReactCountryFlag from 'react-country-flag';
import { Separator } from '../ui/separator';
import Link from 'next/link';

export function ProjectCard({ loading }: { loading?: boolean }) {
  if (loading) {
    return (
      <div className="flex flex-col border rounded-lg p-4 bg-white w-[344px] h-[490px] gap-2 shadow-md">
        <Skeleton className="h-[145px] rounded-sm" />
        <Skeleton className="flex-grow h-[210px] rounded-sm" />
      </div>
    );
  }
  return (
    <Link className="group border rounded-lg shadow bg-white w-[344px] hover:border-neutral-400 hover:cursor-pointer hover:shadow-lg" href="/id/{project_id}">
      <div className="flex-grow bg-neutral-300 h-[161px] rounded-t-lg" />
      <div className="p-4">
        <div className="">
          <span className="line-clamp-2">Project Title</span>
        </div>
        <div className="flex flex-row gap-2 flex-wrap my-4">
          <Tag type="VERRA" size="small">
            Verra
          </Tag>
          <Tag type="VERRA" size="small">
            1650
          </Tag>
          <Tag type="manual" size="small">
            15.3m tCO2e
          </Tag>
          <Tag type="manual" size="small">
            Nature-based
          </Tag>
          <Tag type="manual" size="small">
            Verified
          </Tag>
        </div>

        <div className="flex gap-2 items-start my-4">
          <ReactCountryFlag
            countryCode="US"
            svg
            style={{
              width: 20,
              height: 20,
            }}
          />
          <span className="text-sm">United States</span>
        </div>

        <div className="flex my-4 items-center justify-between">
          <div className="flex gap-2 items-center">
            <div className="rounded-full w-6 h-6 bg-neutral-300"></div>
            <span className="text-sm">Kopal Agarwal</span>
          </div>
          <span className="text-sm">Jan 4, 2022</span>
        </div>

        <Separator />

        <div className="my-4 grid grid-cols-[60px_auto] gap-1">
          <div>
            <span className="text-xs">Financial</span>
          </div>
          <div className="flex gap-2 items-center">
            <Tag
              size="small"
              type="manual"
              className="flex flex-row items-center gap-1"
            >
              <div className="h-1 w-1 rounded-full bg-orange-500" />
              In progress
            </Tag>
            <div className="grow h-1 w-fit rounded-md bg-neutral-200">
              <div className="w-1/2 bg-gradient-to-r from-branding-green-500 to-branding-green-800 h-1 rounded-md"></div>
            </div>
          </div>
          <div>
            <span className="text-xs">ESG</span>
          </div>
          <div className="flex gap-2 items-center">
            <Tag
              size="small"
              type="manual"
              className="flex flex-row items-center gap-1"
            >
              <div className="h-1 w-1 rounded-full bg-neutral-500" />
              Not Started
            </Tag>
            <div className="grow h-1 w-fit rounded-md bg-neutral-200">
              <div className="w-0 bg-gradient-to-r from-branding-green-500 to-branding-green-800 h-1 rounded-md"></div>
            </div>
          </div>
          <div>
            <span className="text-xs">KYC</span>
          </div>
          
          <div className="flex gap-2 items-center">
            <Tag
              size="small"
              type="manual"
              className="flex flex-row items-center gap-1"
            >
              <div className="h-1 w-1 rounded-full bg-orange-500" />
              Eligible
            </Tag>
            <div className="grow h-1 w-fit rounded-md bg-neutral-200">
              <div className="w-1/2 bg-gradient-to-r from-branding-green-500 to-branding-green-800 h-1 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
