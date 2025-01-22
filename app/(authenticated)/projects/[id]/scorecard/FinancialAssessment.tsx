import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
} from '@/components/ui/table';

// const data = [
//   {
//     id: 1,
//     title: 'Capital expense intensity',
//     unit: (
//       <span>
//         USD/tCO<sub>2</sub>e
//       </span>
//     ),
//     value: 0.03,
//   },
//   {
//     id: 2,
//     title: 'Operating expense intensity',
//     unit: (
//       <span>
//         USD/tCO<sub>2</sub>e
//       </span>
//     ),
//     value: 0.1,
//   },
//   {
//     id: 3,
//     title: 'Total expense intensity',
//     unit: (
//       <span>
//         USD/tCO<sub>2</sub>e
//       </span>
//     ),
//     value: 0.025,
//   },
//   {
//     id: 4,
//     title: 'Cost of production (including non carbon revenues)',
//     unit: (
//       <span>
//         USD/tCO<sub>2</sub>e
//       </span>
//     ),
//     value: 0.025,
//   },
//   {
//     id: 5,
//     title: 'Total net costs',
//     unit: <span>kUSD</span>,
//     value: 9.5,
//   },
//   {
//     id: 6,
//     title: 'Cost of production (net - including financing)',
//     unit: (
//       <span>
//         USD/tCO<sub>2</sub>e
//       </span>
//     ),
//     value: 0.025,
//   },
//   {
//     id: 7,
//     title: 'Estimated reduction per unit of area per year',
//     unit: (
//       <span>
//         tCO<sub>2</sub>e/ha/yr
//       </span>
//     ),
//     value: 0.0754,
//   },
// ];

function FinancialAssessment({
  data,
}: {
  data: { id: number; title: string; unit: React.ReactElement; value: number }[];
}) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-background p-6">
      <div className="pb-4">
        <span className="text-xl font-semibold">Financial Assessment</span>
      </div>
      <div className="flex w-full items-center rounded bg-[#00938C] p-2">
        <span className="text-sm text-white">Eligible</span>
      </div>
      <div className="flex flex-col rounded border-neutral-200 p-2">
        <Table>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell className="text-neutral-500">{item.unit}</TableCell>
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

export default FinancialAssessment;
