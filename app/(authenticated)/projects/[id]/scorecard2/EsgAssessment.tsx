import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from '@/components/ui/table';

// const data = [
//   {
//     id: 1,
//     satisfactory: true,
//     title: 'Human Rights',
//   },
//   {
//     id: 2,
//     satisfactory: false,
//     title: 'Gender Equality',
//   },
//   {
//     id: 3,
//     satisfactory: true,
//     title: 'Community health, safety and security',
//   },
//   {
//     id: 4,
//     satisfactory: true,
//     title: 'Labour rights of working conditions',
//   },
//   {
//     id: 5,
//     satisfactory: true,
//     title: 'Indigenous People and Local Communities (IPLCs)',
//   },
//   {
//     id: 6,
//     satisfactory: true,
//     title: 'Land acquisition, displacement and resettlement',
//   },
//   {
//     id: 7,
//     satisfactory: false,
//     title: 'Corruption',
//   },
//   {
//     id: 8,
//     satisfactory: true,
//     title: 'Climate change and disaster risks',
//   },
//   {
//     id: 9,
//     satisfactory: true,
//     title: 'Resource efficiency and pollution prevention; Energy',
//   },
//   {
//     id: 10,
//     satisfactory: true,
//     title: 'Water',
//   },
//   {
//     id: 11,
//     satisfactory: true,
//     title: 'Biodiversity conservation and sustainable natural resource management',
//   },
// ];

const Pill = ({
  children,
  type,
}: {
  readonly children: React.ReactNode;
  readonly type: string;
}) => {
  if (type === 'satisfactory') {
    return (
      <div className="w-[99px] rounded-sm border border-[#22C55E33] bg-[#DCFCE7] p-1 text-center text-white">
        <span className="text-xs font-semibold text-[#166534]">{children}</span>
      </div>
    );
  }

  return (
    <div className="w-[100px] rounded-sm border border-[#FECDD4] bg-[#FFE4E6] p-1 text-center text-white">
      <span className="text-xs font-semibold text-[#9F1239]">{children}</span>
    </div>
  );
};

function EsgAssessment({
  risk = 'Low',
  data,
}: {
  risk: string;
  data: { id: number; satisfactory: boolean; title: string }[];
}) {
  const bgColor = risk === 'Low' ? 'bg-[#00938C]' : 'bg-[#F69339]';
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6">
      <div className="pb-4">
        <span className="text-xl font-semibold">ESG Assessment</span>
      </div>
      <div className={`flex w-full items-center rounded ${bgColor} p-2`}>
        <span className="text-sm text-white">{risk} Risk</span>
      </div>
      <div className="flex flex-col rounded border-neutral-200 p-2">
        <Table>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>
                  <Pill
                    type={item.satisfactory ? 'satisfactory' : 'unsatisfactory'}
                  >
                    {item.satisfactory ? 'Satisfactory' : 'Unsatisfactory'}
                  </Pill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                <span className="text-xs text-neutral-400">
                  Completed by Kopal on 15 Oct 2024
                </span>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

export default EsgAssessment;
