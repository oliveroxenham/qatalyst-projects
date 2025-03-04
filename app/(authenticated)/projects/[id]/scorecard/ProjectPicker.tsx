import CreditForecast from './CreditForecast';
import EsgAssessment from './EsgAssessment';
import Map from './map';
import FinancialAssessment from './FinancialAssessment';
import ProjectSummary from './ProjectSummary';
import ProjectTitle from './ProjectTitle';
import { SdgSummary } from '@/components/sdg-summary';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { clsx } from 'clsx';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { getProjectId } from '@/mock/data';
import { CollaboratorTag } from '@/components/collaborator-tag';

const ProjectListComboBox = ({
  setProjectSelected,
  currentProjectId,
}: {
  readonly setProjectSelected: (project: string) => void;
  currentProjectId: string;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const projects = [
    {
      label: 'DelAgua Clean Cooking Grouped Project',
      value: '2749',
    },
    {
      label:
        'Reduced Emissions from Deforestation and Degradation in Keo Seima Wildlife Sanctuary',
      value: '1650',
    },
  ].filter((p) => p.value !== currentProjectId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? projects.find((project) => project.value === value)?.label
            : 'Select a project...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandInput placeholder="Search a project..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {projects.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setProjectSelected(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === framework.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <span className="bg-background p-1 rounded-lg text-xs">
                    {framework.value}
                  </span>
                  <span>{framework.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const ProjectPicker = ({ currentProjectId }: { currentProjectId: string }) => {
  const [projectSelected, setProjectSelected] = useState<string | undefined>();
  if (!projectSelected)
    return (
      <div className="m-2 rounded-lg border bg-background p-4">
        <ProjectListComboBox
          setProjectSelected={setProjectSelected}
          currentProjectId={currentProjectId}
        />
      </div>
    );

  const projectData = getProjectId(projectSelected);
  console.log('projectData=', projectData);
  if (!projectData) return null;
  return (
    <div>
      <ProjectTitle
        projectId={projectData.id}
        title={projectData.name}
        countryCode={projectData.country}
      />
      <ProjectSummary benchmarkLayoutVisible projectData={projectData} />
      <div
        className={clsx('m-2 grid grid-cols-1 gap-2', {
          'lg:grid-cols-2': false,
        })}
      >
        <div className="flex flex-col gap-2 rounded-lg border bg-background p-6">
          <span className="text-muted-foreground text-sm">
            Sustainable Development Goals
          </span>
          <SdgSummary sdgs={projectData.sdgs} />
        </div>
        <div className="flex flex-col gap-2 rounded-lg border bg-background p-6">
          <span className="text-muted-foreground text-sm">Collaborators</span>
          <div className="flex flex-wrap gap-1">
            {projectData?.collaborators.map((collaborator) => (
              <CollaboratorTag key={collaborator} collaborator={collaborator} />
            ))}
          </div>
        </div>
      </div>
      <div
        className={clsx('m-2 grid grid-cols-1 gap-2', {
          'lg:grid-cols-2': false,
        })}
      >
        <CreditForecast
          issuanceRecords={[
            { totalQuantity: 2000000, year: '2025' },
            { totalQuantity: 500000, year: '2024' },
            { totalQuantity: 1000000, year: '2023' },
            { totalQuantity: 1900000, year: '2022' },
            { totalQuantity: 2500000, year: '2021' },
            { totalQuantity: 1500000, year: '2020' },
            { totalQuantity: 1200000, year: '2019' },
          ]}
          creditingStartDate="2021-01-01"
          creditingEndDate="2028-12-31"
          carbonCredits={projectData.estimatedAnnualCredits.value}
        />
        <Map projectData={projectData} />
      </div>
      <div
        className={clsx('m-2 grid grid-cols-1 gap-2', {
          'lg:grid-cols-2': false,
        })}
      >
        <FinancialAssessment
          projectData={projectData}
          data={[
            {
              id: 1,
              title: 'Capital expense intensity',
              unit: (
                <span>
                  USD/tCO<sub>2</sub>e
                </span>
              ),
              value: 0.03,
            },
            {
              id: 2,
              title: 'Operating expense intensity',
              unit: (
                <span>
                  USD/tCO<sub>2</sub>e
                </span>
              ),
              value: 0.1,
            },
            {
              id: 3,
              title: 'Total expense intensity',
              unit: (
                <span>
                  USD/tCO<sub>2</sub>e
                </span>
              ),
              value: 0.025,
            },
            {
              id: 4,
              title: 'Cost of production (including non carbon revenues)',
              unit: (
                <span>
                  USD/tCO<sub>2</sub>e
                </span>
              ),
              value: 0.025,
            },
            {
              id: 5,
              title: 'Total net costs',
              unit: <span>kUSD</span>,
              value: 9.5,
            },
            {
              id: 6,
              title: 'Cost of production (net - including financing)',
              unit: (
                <span>
                  USD/tCO<sub>2</sub>e
                </span>
              ),
              value: 0.025,
            },
            {
              id: 7,
              title: 'Estimated reduction per unit of area per year',
              unit: (
                <span>
                  tCO<sub>2</sub>e/ha/yr
                </span>
              ),
              value: 0.0754,
            },
          ]}
        />
        <EsgAssessment projectData={projectData} />
      </div>
    </div>
  );
};

export default ProjectPicker;
