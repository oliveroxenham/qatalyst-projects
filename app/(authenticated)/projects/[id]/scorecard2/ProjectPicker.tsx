import CountryBilateralAgreement from './CountryBilateralAgreement';
import CreditForecast from './CreditForecast';
import EsgAssessment from './EsgAssessment';
import Map from './map';
import FinancialAssessment from './FinancialAssessment';
import ProjectBilateralAgreement from './ProjectBilateralAgreement';
import ProjectSummary from './ProjectSummary';
import ProjectTitle from './ProjectTitle';
import RevenueForecast from './RevenueForecast';
import SdgSummary from './SdgSummary';
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
    label: 'Planting Biodiverse Forests in Panama',
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
      <div className="m-4 rounded-lg border border-neutral-200 bg-white p-6">
        <ProjectListComboBox setProjectSelected={setProjectSelected} />
      </div>
    );
  return (
    <div>
      <ProjectTitle title="The Russas Project" countryCode="BR" />
      <ProjectSummary
        benchmarkLayoutVisible
        data={{
          value: '870,000',
          carbonCredits: '1,474,189',
          lifetime: '60',
          area: '41,976',
        }}
      />
      <SdgSummary />
      {/* <CreditForecast project={2} /> */}
      <div
        className={clsx('m-4 grid grid-cols-1 gap-4', {
          'lg:grid-cols-2': false,
        })}
      >
        <CreditForecast project={2} />
        <Map project={2} />
      </div>{' '}
      <div
        className={clsx('m-4 grid grid-cols-1 gap-4', {
          'lg:grid-cols-2': false,
        })}
      >
        <FinancialAssessment />
        <EsgAssessment />
      </div>
      <div
        className={clsx('m-4 grid grid-cols-1 gap-4', {
          'lg:grid-cols-2': false,
        })}
      >
        <CountryBilateralAgreement />
        <ProjectBilateralAgreement />
      </div>
      <RevenueForecast />
    </div>
  );
};

export default ProjectPicker;
