'use client';

import { useState } from 'react';
import { Files } from 'lucide-react';
import { clsx } from 'clsx';
import Logo from '@/public/icons/logo.svg';

export function QatalystAi() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-row max-h-screen">
      {open && (
        <div className="w-[560px] bg-background border-l p-4 flex flex-col justify-between">
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="bg-neutral-100 w-full h-14 border rounded-lg flex items-center p-2"><span className="text-muted-foreground">Ask Qatalyst AI something...</span></div>
        </div>
      )}
      <div className="w-[72px] bg-background border-l py-4 flex flex-col gap-2">
        <div
          className="flex flex-col items-center justify-center gap-1 hover:cursor-pointer hover:bg-blaze-orange-200/25 py-2 min-h-16"
          onClick={() => setOpen(!open)}
        >
          <div
            className={clsx(
              'w-8 h-8 rounded-full flex items-center justify-center',
              {
                'bg-neutral-400': !open,
                'bg-blaze-orange-600': open,
              }
            )}
          >
            <Logo className="w-[18px] h-[18px] fill-white" />
          </div>
          <span className="text-[10px] text-center text-muted-foreground">
            Qatalyst AI
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 hover:cursor-pointer hover:bg-blaze-orange-200/25 py-2 min-h-16">
          <Files className="w-5 h-5 text-muted-foreground" />
          <span className="text-[10px] text-center text-muted-foreground">
            Documents
          </span>
        </div>
      </div>
    </div>
  );
}
