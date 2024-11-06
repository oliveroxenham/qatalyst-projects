import { clsx } from 'clsx';

const ProjectSummary = ({ benchmarkLayoutVisible, data }: { readonly benchmarkLayoutVisible: boolean, data: {
  value: string;
  carbonCredits: string;
  lifetime: string;
  area: string;
  status: string;
} }) => {
  return (
    <div
      className={clsx('m-4 grid grid-cols-3 gap-x-8 gap-y-4 rounded-lg border border-neutral-200 bg-white p-6', {
        'lg:grid-cols-6': !benchmarkLayoutVisible,
      })}
    >
      <div className='border-r border-neutral-200 text-sm text-neutral-500'>
        Project Value
        <p className='pt-2 text-2xl font-medium text-primary truncate text-ellipsis'>
          {data.value} <span className='text-lg font-normal'>USD</span>
        </p>
      </div>
      <div className='border-r border-neutral-200 text-sm text-neutral-500'>
        Carbon Credits
        <p className='pt-2 text-2xl font-medium text-primary truncate text-ellipsis'>
          {data.carbonCredits}{' '}
          <span className='text-lg font-normal'>
            tCO<sub>2</sub>e
          </span>
        </p>
      </div>
      <div
        className={clsx('border-neutral-200 text-sm text-neutral-500', {
          'border-r-0': benchmarkLayoutVisible,
          'lg:border-r': !benchmarkLayoutVisible,
        })}
      >
        Project Lifetime
        <p className='pt-2 text-2xl font-medium text-primary truncate text-ellipsis'>
          {data.lifetime} <span className='text-lg font-normal'>Years</span>
        </p>
      </div>
      <div className='border-r border-neutral-200 text-sm text-neutral-500'>
        Project Area
        <p className='pt-2 text-2xl font-medium text-primary truncate text-ellipsis'>
          {data.area} <span className='text-lg font-normal'>ha</span>
        </p>
      </div>
      <div className='border-r border-neutral-200 text-sm text-neutral-500'>
        Registry status
        <p className='pt-2 text-2xl font-medium text-primary truncate text-ellipsis'>{data.status}</p>
      </div>
      <div className='text-sm text-neutral-500 '>
        Project type
        <p className='pt-2 text-2xl font-medium text-primary truncate text-ellipsis'>Nature-Based</p>
      </div>
    </div>
  );
};

export default ProjectSummary;
