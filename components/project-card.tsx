import { Skeleton } from './ui/skeleton';
import { Tag } from '@/components/tag';
import ReactCountryFlag from 'react-country-flag';
import { Separator } from './ui/separator';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/types/project';
import { Progress } from './ui/progress';
import { CollaboratorTag } from './collaborator-tag';
import { clsx } from 'clsx';

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
      className="group border rounded-lg shadow bg-white w-[344px] hover:border-neutral-400 hover:cursor-pointer hover:shadow-lg transition-all"
      href={`/projects/${data.id}/details`}
    >
      {(data.id === '1650' || data.id === '2749') && <span className="absolute bg-blaze-orange-300 text-[10px] mt-1 ml-1 px-1 rounded-xl font-semibold">SAMPLE</span>}
      <div className={`flex-grow bg-neutral-300 h-[161px] rounded-t-lg`}>
        <Image
          src={data.imgUrl}
          alt={data.name}
          width={344}
          height={161}
          style={{ height: 161 }}
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <div className="h-12">
          <span className="line-clamp-2">{data.name}</span>
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
            <span className="text-xs">Owner</span>
            <CollaboratorTag collaborator={data.owner} />
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
              <div
                className={clsx('h-1 w-1 rounded-full', {
                  'bg-neutral-500':
                    data.financialAssessment.status.toLowerCase() ===
                    'not started',
                  'bg-orange-500':
                    data.financialAssessment.status.toLowerCase() ===
                    'in progress',
                  'bg-branding-green-600':
                    data.financialAssessment.status.toLowerCase() ===
                    'completed',
                })}
              />
              <span className="capitalize">
                {data.financialAssessment.status}
              </span>
            </Tag>
            <Progress
              value={
                data.financialAssessment ? data.financialAssessment.progress : 0
              }
              className="w-1/2"
            />
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
              <div
                className={clsx('h-1 w-1 rounded-full', {
                  'bg-neutral-500':
                    data.esgAssessment.status.toLowerCase() === 'not started',
                  'bg-orange-500':
                    data.esgAssessment.status.toLowerCase() === 'in progress',
                  'bg-branding-green-600':
                    data.esgAssessment.status.toLowerCase() === 'completed',
                })}
              />
              <span className="capitalize">{data.esgAssessment.status}</span>
            </Tag>
            <Progress
              value={data.esgAssessment ? data.esgAssessment.progress : 0}
              className="w-1/2"
            />
          </div>
          {data.projectType.toLowerCase() === 'cookstove' && (
            <>
              <div>
                <span className="text-xs">Quality</span>
              </div>

              <div className="flex gap-2 items-center">
                <Tag
                  size="small"
                  type="manual"
                  className="flex flex-row items-center gap-1 w-1/2"
                >
                  <div
                    className={clsx('h-1 w-1 rounded-full', {
                      'bg-neutral-500':
                        data.kycAssessment.status.toLowerCase() ===
                        'not started',
                      'bg-orange-500':
                        data.kycAssessment.status.toLowerCase() ===
                        'in progress',
                      'bg-branding-green-600':
                        data.kycAssessment.status.toLowerCase() === 'completed',
                    })}
                  />
                  <span className="capitalize">
                    {data.kycAssessment.status}
                  </span>
                </Tag>
                <Progress
                  value={
                    data.kycAssessment.progress
                      ? data.kycAssessment.progress
                      : 0
                  }
                  className="w-1/2"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
