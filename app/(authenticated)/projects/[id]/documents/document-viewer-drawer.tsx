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

export default function DocumentViewer({
  documentUrl,
  setDocumentUrl,
}: {
  documentUrl?: string;
  setDocumentUrl: (url?: string) => void;
}) {
  // const { t } = useTranslation();
  return (
    <div className="mx-auto w-full max-w-sm">
      <Drawer
        open={documentUrl === '0' || documentUrl === '5'}
        onOpenChange={(open) =>
          open ? setDocumentUrl(documentUrl) : setDocumentUrl(undefined)
        }
        direction="right"
        dismissible={true}
      >
        <DrawerContent>
          <DrawerHeader className="bg-neutral-100 h-[88px] flex flex-row items-center justify-between px-4">
            <DrawerTitle>
              {documentUrl === '0' && (
                <span className="text-lg text-foreground dark:text-gray-800 font-bold">
                  1650 - Keo Seima REDD Project
                </span>
              )}
              {documentUrl === '5' && (
                <span className="text-lg text-foreground dark:text-gray-800 font-bold">
                  2749 - DelAgua Clean Cooking Grouped Project
                </span>
              )}
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
            {documentUrl === '0' && (
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
            )}

            {documentUrl === '5' && (
              <div className="w-full">
                <Image
                  src="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/2749_1_1-MjnSqjoBq6yTCJlCbH9JLezmwtDIah.png"
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
                <Image
                  src="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/2749_1_2-VXsHD6SCzmSo1XhTmutWAZicy5JC0N.png"
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
                <Image
                  src="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/2749_1_3-3EXMKIOXSBwHxhd3OdYt8pewvvd89h.png"
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
                <Image
                  src="https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/2749_1_4-cMm52DWwhCAULS5GKtNMCR7bW3YAE1.png"
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
