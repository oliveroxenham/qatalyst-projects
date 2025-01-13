import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus } from 'lucide-react';

export function Content() {
  return (
    <div className="w-full p-4 bg-background rounded-sm border mr-2 overflow-scroll">
      <div className="p-4">
        <span className="text-lg font-semibold">Volumes</span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Source</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <span className="">Project Value (Investment Amount)</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="">
                Estimated Reductions (over Project Duration)
              </span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="">Total Estimated Reductions</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="">Project Duration</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="">Project Area</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="">
                Estimated Reduction Per Unit of Area Per Year
              </span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell className="flex flex-row gap-1 items-center">
              <Plus className="w-4 h-4" />
              <span className="text-xs">Add criteria</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>

      <div className="p-4">
        <span className="text-lg font-semibold">Cost of Production</span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Source</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <span className="">Land Acquisition Cost</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="">Land Per Unit Area Cost</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">
                Plantation Establishment and Maintenance Cost
              </span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">Cost of Goods Sold (COGS)</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">Overheads</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">Total Gross Costs</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">Alternate Revenue Sources (Non-carbon)</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">Cost of Financing</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">Tax</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">Capital Expense Intensity</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="">Operating Expense Intensity</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">Total Expense Intensity</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>
              <span className="">
                Cost of Production (Including Non Carbon Revenues)
              </span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">Total Net Costs</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell>
              <span className="">
                Cost of Production (Net - including Financing)
              </span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell className="flex flex-row gap-1 items-center">
              <Plus className="w-4 h-4" />
              <span className="text-xs">Add criteria</span>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
