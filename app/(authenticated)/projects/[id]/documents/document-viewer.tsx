'use client';
import { Button } from '@/components/qbutton';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { X } from 'lucide-react';

export default function DocumentViewer({
  documentUrl,
  setDocumentUrl,
}: {
  documentUrl?: string;
  setDocumentUrl: (url?: string) => void;
}) {
  return (
    <SidebarProvider
      open={documentUrl ? true : false}
      style={{
        // @ts-expect-error : necessary for custom width in secondary sidebar
        '--sidebar-width': '50%',
        '--sidebar-mobile-width:': '100%',
      }}
    >
      <Sidebar side="right">
        <SidebarHeader className="bg-neutral-100 h-[88px] flex flex-row items-center justify-between px-4">
          <span className="text-lg text-foreground font-bold">
            1650 Keo Seima REDD Project
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setDocumentUrl(undefined)}
          >
            <X />
          </Button>
        </SidebarHeader>
        <SidebarContent></SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
