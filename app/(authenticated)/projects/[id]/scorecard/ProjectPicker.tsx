import CountryBilateralAgreement from './CountryBilateralAgreement';
import CreditForecast from './CreditForecast';
import EsgAssessment from './EsgAssessment';
import Map from './map';
import FinancialAssessment from './FinancialAssessment';
// import ProjectBilateralAgreement from './ProjectBilateralAgreement';
import ProjectSummary from './ProjectSummary';
import ProjectTitle from './ProjectTitle';
import RevenueForecast from './RevenueForecast';
import SdgSummary from '../../../../../components/sdg-summary';
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

const projects = [
  {
    label: 'The Russas Project',
    value: '1',
  },
  {
    label:
      'Mangrove Restoration Project with Sine Saloum and Casamance communities, Senegal',
    value: '2',
  },
  {
    label: 'Yambone REDD+ Project',
    value: '3',
  },
  {
    label:
      'The Katingan Restoration and Conservation Projecte Forests in Panama',
    value: '4',
  },
  {
    label: 'Planting Biodiverse Forests in Panama',
    value: '5',
  },
];

const ProjectListComboBox = ({
  setProjectSelected,
}: {
  readonly setProjectSelected: (project: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

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
      <PopoverContent className="w-full p-0">
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
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const ProjectPicker = () => {
  const [projectSelected, setProjectSelected] = useState<string | undefined>();
  if (!projectSelected)
    return (
      <div className="m-2 rounded-lg border border-neutral-200 bg-white p-4">
        <ProjectListComboBox setProjectSelected={setProjectSelected} />
      </div>
    );
  return (
    <div>
      <ProjectTitle
        title="The Russas Project"
        countryCode="BR"
        projectId="1112"
      />
      <ProjectSummary
        benchmarkLayoutVisible
        data={{
          value: '870,000',
          carbonCredits: '1,474,189',
          lifetime: '60',
          area: '41,976',
          status: 'Registered',
        }}
      />
      <SdgSummary project={2} />
      {/* <CreditForecast project={2} /> */}
      <div
        className={clsx('m-2 grid grid-cols-1 gap-4', {
          'lg:grid-cols-2': false,
        })}
      >
        <CreditForecast project={2} />
        <Map project={2} />
      </div>{' '}
      <div
        className={clsx('m-2 grid grid-cols-1 gap-4', {
          'lg:grid-cols-2': false,
        })}
      >
        <FinancialAssessment data={[
                    {
                      id: 1,
                      title: 'Capital expense intensity',
                      unit: (
                        <span>
                          USD/tCO<sub>2</sub>e
                        </span>
                      ),
                      value: 0.022,
                    },
                    {
                      id: 2,
                      title: 'Operating expense intensity',
                      unit: (
                        <span>
                          USD/tCO<sub>2</sub>e
                        </span>
                      ),
                      value: 0,
                    },
                    {
                      id: 3,
                      title: 'Total expense intensity',
                      unit: (
                        <span>
                          USD/tCO<sub>2</sub>e
                        </span>
                      ),
                      value: 0.023,
                    },
                    {
                      id: 4,
                      title:
                        'Cost of production (including non carbon revenues)',
                      unit: (
                        <span>
                          USD/tCO<sub>2</sub>e
                        </span>
                      ),
                      value: 0.023,
                    },
                    {
                      id: 5,
                      title: 'Total net costs',
                      unit: <span>kUSD</span>,
                      value: 8.5,
                    },
                    {
                      id: 6,
                      title: 'Cost of production (net - including financing)',
                      unit: (
                        <span>
                          USD/tCO<sub>2</sub>e
                        </span>
                      ),
                      value: 0.023,
                    },
                    {
                      id: 7,
                      title: 'Estimated reduction per unit of area per year',
                      unit: (
                        <span>
                          tCO<sub>2</sub>e/ha/yr
                        </span>
                      ),
                      value: 0.654,
                    },
                  ]}/>
        <EsgAssessment
          risk="Medium"
          data={[
            {
              id: 1,
              satisfactory: true,
              title: 'Human Rights',
            },
            {
              id: 2,
              satisfactory: false,
              title: 'Gender Equality',
            },
            {
              id: 3,
              satisfactory: true,
              title: 'Community health, safety and security',
            },
            {
              id: 4,
              satisfactory: true,
              title: 'Labour rights of working conditions',
            },
            {
              id: 5,
              satisfactory: true,
              title: 'Indigenous People and Local Communities (IPLCs)',
            },
            {
              id: 6,
              satisfactory: true,
              title: 'Land acquisition, displacement and resettlement',
            },
            {
              id: 7,
              satisfactory: false,
              title: 'Corruption',
            },
            {
              id: 8,
              satisfactory: true,
              title: 'Climate change and disaster risks',
            },
            {
              id: 9,
              satisfactory: true,
              title: 'Resource efficiency and pollution prevention; Energy',
            },
            {
              id: 10,
              satisfactory: true,
              title: 'Water',
            },
            {
              id: 11,
              satisfactory: true,
              title:
                'Biodiversity conservation and sustainable natural resource management',
            },
          ]}
        />
      </div>
      <div
        className={clsx('m-2 grid grid-cols-1 gap-4', {
          'lg:grid-cols-2': false,
        })}
      >
        <CountryBilateralAgreement project={2} />
        <RevenueForecast />
      </div>
    </div>
  );
};

export default ProjectPicker;
