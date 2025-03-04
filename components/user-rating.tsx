import { useState } from 'react';
import { Button } from './ui/button';
import clsx from 'clsx';
import { X, Check } from 'lucide-react';
import QuestionMark from '@/public/icons/question-mark.svg';

export const UserRatingBoxed = ({ currentRating }: { currentRating: number }) => {
  const [rating, setRating] = useState<number>(currentRating);
  return (
    <div className="border rounded-lg bg-background w-[122px]">
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setRating(1);
        }}
        className={clsx({
          'bg-branding-green-600 text-white': rating === 1,
          'hover:bg-branding-green-700 hover:text-white': rating == 1,
        })}
      >
        <Check />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setRating(2);
        }}
        className={clsx({
          'bg-[#f34062] text-white': rating === 2,
          'hover:bg-[#D11C47] hover:text-white': rating === 2,
        })}
      >
        <X />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setRating(3);
        }}
        className={clsx({
          'bg-[#F59E0B] text-white': rating === 3,
          'hover:bg-[#cc8d20] hover:text-white': rating === 3,
        })}
      >
        <QuestionMark />
      </Button>
    </div>
  );
};