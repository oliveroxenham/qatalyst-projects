'use client';

import { Button } from '@/components/qbutton';
import { X } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import Image from 'next/image';
// import { useTranslation } from 'react-i18next';

export function DocumentViewer({
  documentUrl,
  setDocumentUrl,
}: {
  documentUrl?: string;
  setDocumentUrl: (url?: string) => void;
}) {
  // const { t } = useTranslation();
  return (
    <div>
      <Drawer
        open={typeof (documentUrl) !== 'undefined'}
        onOpenChange={(open) =>
          open ? setDocumentUrl(documentUrl) : setDocumentUrl(undefined)
        }
        direction="right"
        dismissible={true}
      >
        <DrawerContent>
          <DrawerHeader className="bg-neutral-100 h-[88px] flex flex-row items-center justify-between px-4">
            <DrawerTitle>
              <span className="text-lg text-foreground font-bold">
                1650 Keo Seima REDD Project
              </span>
            </DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setDocumentUrl(undefined)}
              >
                <X />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="w-[calc(50vw)] overflow-scroll">
            <div className="w-full">
              <Image
                src="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/source-1.pdf-CZmpmbbWK9t0J3FCkgx5FqFVdJuSi6.png"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
