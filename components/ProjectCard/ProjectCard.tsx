import clsx from 'clsx';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import ReactCountryFlag from 'react-country-flag';

export function ProjectCard({ loading }: { loading?: boolean }) {
  return (
    <div
      className={clsx('border rounded-lg p-4 bg-white', {
        'hover:border-neutral-500 group': !loading,
      })}
    >
      {loading ? (
        <div className="flex gap-2 items-start mb-2">
          <Skeleton className="w-full h-10 rounded-md" />
        </div>
      ) : (
        <>
          <div className="flex gap-2 items-start mb-2">
            <ReactCountryFlag countryCode="US" svg className="mt-[2px]" />
            <span className="text-sm line-clamp-2">Project Title</span>
          </div>
          <div className="w-full h-1 bg-neutral-300 rounded-sm mb-2">
            <div className="bg-emerald-600 h-1 w-1/2 rounded-sm" />
          </div>
        </>
      )}

      {loading ? (
        <Skeleton className="w-full h-[200px]" />
      ) : (
        <>
          <div className="mb-2">
            <span className="text-xs">Created 24 Feb 2024</span>
          </div>

          <div className="mb-2">
            <p className="line-clamp-5 text-xs">
              Project description Project description Project description
              Project description Project description Project description
              Project description Project description Project description
              Project description Project description Project description
              Project description Project description Project description
              Project description Project description Project description
            </p>
          </div>

          <div className="mb-2 grid grid-cols-[60px_auto] gap-1">
            <div>
              <span className="text-xs">Financial</span>
            </div>
            <div className="text-center bg-emerald-100 text-emerald-800">
              <span className="text-xs">Eligible</span>
            </div>
            <div>
              <span className="text-xs">ESG</span>
            </div>
            <div className="text-center bg-yellow-100 text-yellow-800">
              <span className="text-xs">Medium risk</span>
            </div>
            <div>
              <span className="text-xs">KYC</span>
            </div>
            <div className="text-center bg-blue-100 text-blue-800">
              <span className="text-xs">In progress</span>
            </div>
          </div>
        </>
      )}

      {loading ? (
        <Skeleton className="rounded-full w-8 h-8 my-4" />
      ) : (
        <div className="mb-2">
          <span className="text-xs">Project contributors</span>
          <div className="rounded-full w-6 h-6 bg-neutral-300"></div>
        </div>
      )}

      {loading ? (
        <Skeleton className="w-full h-10" />
      ) : (
        <Button
          className="w-full group-hover:bg-neutral-800 group-hover:text-white"
          variant="secondary"
        >
          Open Project
        </Button>
      )}
    </div>
  );
}