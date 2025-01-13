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

export default function DocumentViewer({
  documentUrl,
  setDocumentUrl,
}: {
  documentUrl?: string;
  setDocumentUrl: (url?: string) => void;
}) {
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
          <div className="w-[calc(50vw)]">Main content</div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
