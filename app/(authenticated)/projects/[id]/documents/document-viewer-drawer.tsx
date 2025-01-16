'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/qbutton';
import { X } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';

export default function DocumentViewer({
  documentUrl,
  setDocumentUrl,
}: {
  documentUrl?: string;
  setDocumentUrl: (url?: string) => void;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    if (documentUrl !== '0') {
      setDialogOpen(true);
    } else {
      setDialogOpen(false);
    }
  }, [documentUrl]);
  if (documentUrl && documentUrl !== '0') {
    return (
      <AlertDialog open={dialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unlock More with Qatalyst</AlertDialogTitle>
            <AlertDialogDescription>
              This feature is only available in the full Qatalyst app. Please
              upgrade to unlock it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setDocumentUrl(undefined);
                setDialogOpen(!dialogOpen);
              }}
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  return (
    <div className="mx-auto w-full max-w-sm">
      <Drawer
        open={documentUrl ? true : false}
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
                src="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/page1-E1eFuOHLwlnO7pkD8njQhuSPukKz2N.png"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
              <Image
                src="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/page2-HF06wKLxQdBzMDxMvpz0hBxqMAZBl5.png"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
              <Image
                src="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/page3-K15J3ZwsEs8nSXLv5HABE7VUyLeoye.png"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
              <Image
                src="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/page4-bAqyw34FSUTD9a4JZ6TMaEu0EwTZQd.png"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
              <Image
                src="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/page5-E0uzXrF1iW8Jz07ccDRAwDMv2l3SPX.png"
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
