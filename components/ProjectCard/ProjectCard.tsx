import { Skeleton } from '../ui/skeleton';
import { Tag } from '@/components/tag';
import ReactCountryFlag from 'react-country-flag';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/types/project';
import { Progress } from '../ui/progress';

export function ProjectCard({
  loading,
  data,
}: {
  loading?: boolean;
  data?: Project;
}) {
  if (loading || !data) {
    return (
      <div className="flex flex-col border rounded-lg p-4 bg-white w-[344px] h-[490px] gap-2 shadow-md">
        <Skeleton className="h-[145px] rounded-sm" />
        <Skeleton className="flex-grow h-[210px] rounded-sm" />
      </div>
    );
  }
  return (
    <Link
      className="group border rounded-lg shadow bg-white w-[344px] hover:border-neutral-400 hover:cursor-pointer hover:shadow-lg"
      href="/id/{project_id}"
    >
      <div className={`flex-grow bg-neutral-300 h-[161px] rounded-t-lg`}>
        <Image
          src={data.imgUrl}
          alt={data.title}
          width={344}
          height={161}
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <div className="">
          <span className="line-clamp-2">{data.title}</span>
        </div>
        <div className="flex flex-row gap-2 flex-wrap my-4">
          {data.tags.map((tag, index) => (
            <Tag key={index} size="small" type={tag.type}>
              {tag.value}
            </Tag>
          ))}
        </div>

        <div className="flex gap-2 items-center my-4">
          <ReactCountryFlag
            countryCode={data.country}
            svg
            className="bg-white rounded-full border border-neutral-400"
            style={{
              width: 24,
              height: 24,
            }}
          />
          <span className="text-sm">{data.countryName}</span>
        </div>

        <div className="flex my-4 items-center justify-between">
          <div className="flex gap-2 items-center">
            <div className="rounded-full w-6 h-6 bg-neutral-300"></div>
            <span className="text-sm">{data.owner}</span>
          </div>
          <span className="text-sm">{data.lastUpdated}</span>
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
              className="flex flex-row items-center gap-1 w-1/2"
            >
              <div className="h-1 w-1 rounded-full bg-orange-500" />
              {data.financialStatus}
            </Tag>
            <Progress
              value={data.financialProgress ? data.financialProgress : 0}
              className="w-1/2"
            />{' '}
          </div>
          <div>
            <span className="text-xs">ESG</span>
          </div>
          <div className="flex gap-2 items-center">
            <Tag
              size="small"
              type="manual"
              className="flex flex-row items-center gap-1 w-1/2"
            >
              <div className="h-1 w-1 rounded-full bg-neutral-500" />
              {data.esgStatus}
            </Tag>
            <Progress
              value={data.esgProgress ? data.esgProgress : 0}
              className="w-1/2"
            />
          </div>
          <div>
            <span className="text-xs">KYC</span>
          </div>

          <div className="flex gap-2 items-center">
            <Tag
              size="small"
              type="manual"
              className="flex flex-row items-center gap-1 w-1/2"
            >
              <div className="h-1 w-1 rounded-full bg-orange-500" />
              {data.kycStatus}
            </Tag>
            <Progress
              value={data.kycProgress ? data.kycProgress : 0}
              className="w-1/2"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
