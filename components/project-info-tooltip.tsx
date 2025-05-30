import { Tag } from './tag';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

export const ProjectInfoTooltip = ({
  name,
  originalId,
  projectType,
  sourceType,
}: {
  readonly name: string;
  readonly sourceType?: string;
  readonly originalId?: string;
  readonly projectType?: string;
}) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <div className='flex cursor-pointer items-center justify-center rounded-sm bg-background p-1'>
            <Info className='h-4 w-4' />
          </div>
        </TooltipTrigger>
        <TooltipContent className='flex max-w-96 flex-col gap-2 p-4 z-50 bg-background dark:bg-muted' align='start'>
          <p>{name}</p>
          <div className='flex flex-row gap-2'>
            {sourceType && <Tag type="VERRA" size="sm">{sourceType}</Tag>}
            {originalId && <Tag type="VERRA" size="sm">{originalId}</Tag>}
            {projectType && <Tag type="MANUAL" size="sm">{projectType}</Tag>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
