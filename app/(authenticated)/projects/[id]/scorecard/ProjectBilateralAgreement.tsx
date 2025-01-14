import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from '@/components/ui/table';
import { clsx } from 'clsx';
import { CircleCheckIcon, CircleXIcon } from 'lucide-react';

const data = [
  {
    agreement: false,
    id: 1,
    title: <span>None</span>,
  },
];

const Pill = ({
  boxed = true,
  children,
  type,
}: {
  readonly children: React.ReactNode;
  readonly type: string;
  readonly boxed?: boolean;
}) => {
  if (type === 'satisfactory') {
    return (
      <div className={clsx('rounded-sm text-center', { 'border border-[#22C55E33] bg-[#DCFCE7] p-1 px-2': boxed })}>
        <span className='flex flex-row items-center gap-2 text-xs text-[#166534]'>{children}</span>
      </div>
    );
  }

  return (
    <div className={clsx('rounded-sm text-center', { 'border border-[#D1D5DB] bg-[#E5E7EB] p-1 px-2': boxed })}>
      <span className='flex flex-row items-center gap-2 text-xs'>{children}</span>
    </div>
  );
};

const ProjectBilateralAgreement: React.FC = () => {
  return (
    <div className='rounded-lg border border-neutral-200 bg-white p-6'>
      <div className='pb-4'>
        <span className='text-2xl font-semibold'>Project Bilateral Agreements & Cooperation</span>
      </div>
      <div className='flex w-full flex-row gap-4'>
        <Pill type='unsatisfactory'>Not found</Pill>
      </div>
      <div className='flex flex-col rounded border-neutral-200 p-2'>
        <Table className='h-full'>
          <TableHeader className='border-b'>
            <TableCell className='text-neutral-500'>Bilateral agreement with</TableCell>
            <TableCell className='text-neutral-500'>MOU</TableCell>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className='font-medium'>{item.title}</TableCell>
                <TableCell>
                  <Pill type={item.agreement ? 'satisfactory' : 'unsatisfactory'} boxed={false}>
                    {item.agreement ? <CircleCheckIcon className='h-5 w-5' /> : <CircleXIcon className='h-5 w-5' />}
                  </Pill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>
                <div className='mt-2'>
                  <span className='text-xs text-neutral-500'>Last updated on 24 Jun, 2024</span>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default ProjectBilateralAgreement;
