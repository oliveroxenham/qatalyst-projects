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
      className={clsx('m-2 grid grid-cols-3 gap-x-8 gap-y-4 rounded-lg border border-neutral-200 bg-white p-6', {
        'lg:grid-cols-6': !benchmarkLayoutVisible,
      })}
    >
      <div className='border-r border-neutral-200 text-sm'>
        Project Value
        <p className='pt-2 text-xl font-medium truncate text-ellipsis'>
          {data.value} <span className='text-lg'>USD</span>
        </p>
      </div>
      <div className='border-r border-neutral-200 text-sm'>
        Carbon Credits
        <p className='pt-2 text-xl font-medium truncate text-ellipsis'>
          {data.carbonCredits}{' '}
          <span className='text-lg'>
            tCO<sub>2</sub>e
          </span>
        </p>
      </div>
      <div
        className={clsx('border-neutral-200 text-sm', {
          'border-r-0': benchmarkLayoutVisible,
          'lg:border-r': !benchmarkLayoutVisible,
        })}
      >
        Project Lifetime
        <p className='pt-2 text-xl font-medium truncate text-ellipsis'>
          {data.lifetime} <span className='text-lg'>Years</span>
        </p>
      </div>
      <div className='border-r border-neutral-200 text-sm'>
        Project Area
        <p className='pt-2 text-xl font-medium truncate text-ellipsis'>
          {data.area} <span className='text-lg'>ha</span>
        </p>
      </div>
      <div className='border-r border-neutral-200 text-sm'>
        Registry status
        <p className='pt-2 text-xl font-medium truncate text-ellipsis'>{data.status}</p>
      </div>
      <div className='text-sm '>
        Project type
        <p className='pt-2 text-xl font-medium truncate text-ellipsis'>Nature-Based</p>
      </div>
    </div>
  );
};

export default ProjectSummary;
