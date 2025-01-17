'use client';

import { useState } from 'react';
import { Files } from 'lucide-react';
import { clsx } from 'clsx';
import Logo from '@/public/icons/logo.svg';
import Image from 'next/image';

export function QatalystAi() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-row max-h-screen">
      {open && (
        <div className="w-[560px] bg-background border-l p-4 flex flex-col justify-between">
          <div className="h-full border overflow-scroll">
            <Image
              src="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/01-estimated-reductions-uEIAfb8tq1KgOetakFg6bmZGuY5s0K.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
            <Image
              src="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/02-total-estimated-reductions-lNhgaGW9kzzhXIyyQzIF2yguvbCMMV.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
            <Image
              src="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/03-project-duration-CkxFEdAuHOhck41I3e0fJtX4f02APH.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
            <Image
              src="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/04-project-area-dg9vMmXo8swZbDVH1q8p59dnwELRHJ.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
            <Image
              src="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/05-tax-msrT6IpYyh6dBNywjmWRKP1xrYuuN3.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div className="bg-neutral-100 w-full h-14 border rounded-lg flex items-center p-2 mt-2">
            <span className="text-muted-foreground">
              Ask Qatalyst AI something...
            </span>
          </div>
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
