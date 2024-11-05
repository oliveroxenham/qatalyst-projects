import { clsx } from 'clsx';

const ProjectSummary = ({ benchmarkLayoutVisible }: { readonly benchmarkLayoutVisible: boolean }) => {
  return (
    <div
      className={clsx('m-4 grid grid-cols-3 gap-x-8 gap-y-4 rounded-lg border border-neutral-200 bg-white p-6', {
        'lg:grid-cols-6': !benchmarkLayoutVisible,
      })}
    >
      <div className='border-r border-neutral-200 text-sm text-neutral-500'>
        Project Value
        <p className='pt-2 text-2xl font-medium text-text-primary'>
          8.5M <span className='text-lg font-normal'>USD</span>
        </p>
      </div>
      <div className='border-r border-neutral-200 text-sm text-neutral-500'>
        Carbon Credits
        <p className='pt-2 text-2xl font-medium text-text-primary'>
          4,784,566{' '}
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
        <p className='pt-2 text-2xl font-medium text-text-primary'>
          60 <span className='text-lg font-normal'>Years</span>
        </p>
      </div>
      <div className='border-r border-neutral-200 text-sm text-neutral-500'>
        Project Area
        <p className='pt-2 text-2xl font-medium text-text-primary'>
          384,566 <span className='text-lg font-normal'>ha</span>
        </p>
      </div>
      <div className='border-r border-neutral-200 text-sm text-neutral-500'>
        Registry status
        <p className='pt-2 text-2xl font-medium text-text-primary'>Verified</p>
      </div>
      <div className='text-sm text-neutral-500'>
        Project type
        <p className='pt-2 text-2xl font-medium text-text-primary'>Nature-Based</p>
      </div>
    </div>
  );
};

export default ProjectSummary;
