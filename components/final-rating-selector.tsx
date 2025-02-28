'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { Button } from '@/components/qbutton';
import { Project } from '@/types/project';
import { updateFinalRating } from '@/server/actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export function FinalRatingSelector({
  projectData,
  assessment,
  currentUser,
}: {
  projectData: Project;
  assessment: 'esg' | 'financial';
  currentUser?: string | null;
}) {
  const assessmentKey =
    assessment === 'esg' ? 'esgAssessment' : 'financialAssessment';

  const [finalRating, setFinalRating] = useState(
    projectData?.[assessmentKey].status.toLowerCase()
  );

  const handleUpdateFinalRating = async (newFinalRating: string) => {
    setFinalRating(newFinalRating);
    await updateFinalRating({
      projectId: projectData.id,
      assessment,
      rating: newFinalRating,
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={projectData?.[assessmentKey].assignedTo !== currentUser}
        asChild
      >
        <Button
          id="final-rating-button"
          className={clsx('text-white', {
            'bg-neutral-500': finalRating.toLowerCase() === 'not started',
            'bg-blue-500': finalRating.toLowerCase() === 'in progress',
            'bg-branding-green-600': finalRating.toLowerCase() === 'eligible',
            'bg-destructive': finalRating.toLowerCase() === 'not eligible',
            'hover:bg-current/50': true,
          })}
          size="sm"
        >
          <span className="capitalize">Final Rating: {finalRating}</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[200px]">
        <DropdownMenuItem
          onClick={() => handleUpdateFinalRating('not started')}
        >
          <div className="rounded-full w-2 h-2 bg-neutral-400" />
          <span className="text-neutral-500">Not started</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleUpdateFinalRating('in progress')}
        >
          <div className="rounded-full w-2 h-2 bg-blue-500" />
          <span className="text-blue-600">In progress</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleUpdateFinalRating('eligible')}>
          <div className="rounded-full w-2 h-2 bg-branding-green-600" />
          <span className="text-branding-green-700">Eligible</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleUpdateFinalRating('not eligible')}
        >
          <div className="rounded-full w-2 h-2 bg-destructive" />
          <span className="text-destructive">Not Eligible</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
