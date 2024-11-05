import { BarLoader } from 'react-spinners';

export const Loading = () => {
  return (
    <div className='mt-1 flex w-full'>
      <BarLoader aria-label='Loading Spinner' color='#00B894' data-testid='loader' width='100%' />
    </div>
  );
};
