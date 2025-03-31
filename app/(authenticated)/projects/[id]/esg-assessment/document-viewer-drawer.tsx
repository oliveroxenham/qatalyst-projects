'use client';

import { Button } from '@/components/qbutton';
import { X, File } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Document } from '@/types/document';
import { getDocumentsByProjectIdClient } from '@/server/db';
import { useQuery } from '@tanstack/react-query';
import { UnlockMoreDialog } from '@/components/unlock-more-dialog';
import { useTranslation } from 'react-i18next';

export function DocumentViewer({
  documentUrl,
  setDocumentUrl,
  projectId = "1650"
}: {
  documentUrl?: string;
  setDocumentUrl: (url?: string) => void;
  projectId?: string;
}) {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: documentList } = useQuery<Document[]>({
    queryKey: ['documents', projectId],
    queryFn: () => getDocumentsByProjectIdClient({ id: projectId }),
    enabled: documentUrl === 'documents',
  });

  // Handle unlock dialog for documents that aren't available in demo
  useEffect(() => {
    if (documentUrl && documentUrl !== '0' && documentUrl !== '5' && documentUrl !== 'documents') {
      setDialogOpen(true);
    }
  }, [documentUrl]);

  // Render document list view when documentUrl is 'documents', otherwise render specific document
  const isDocumentList = documentUrl === 'documents';

  return (
    <div>
      <UnlockMoreDialog isOpen={dialogOpen} setDialogOpen={setDialogOpen} />
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
                {isDocumentList ? t('documents.title') : '1650 Keo Seima REDD Project'}
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
            {isDocumentList ? (
              // Document list view
              <div className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="flex gap-1 items-center">
                        <File className="w-4 h-4" />
                        {t('documents.filename')}
                      </TableHead>
                      <TableHead>{t('documents.status')}</TableHead>
                      <TableHead>{t('documents.size')}</TableHead>
                      <TableHead>{t('documents.source')}</TableHead>
                      <TableHead>{t('documents.date')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documentList?.map((document) => (
                      <TableRow
                        className="hover:cursor-pointer"
                        key={document.id}
                        onClick={() => setDocumentUrl(document.id === 0 ? '0' : document.id.toString())}
                      >
                        <TableCell className="flex items-center gap-1">
                          <Image
                            src={`/icons/files/${document.type}.svg`}
                            alt={document.type}
                            className="w-7 h-7"
                            width={28}
                            height={28}
                          />
                          {document.name}
                        </TableCell>
                        <TableCell>{document.status}</TableCell>
                        <TableCell>{document.size}</TableCell>
                        <TableCell>{document.source}</TableCell>
                        <TableCell>{document.date}</TableCell>
                      </TableRow>
                    ))}

                    {/* Fallback if no documents are available */}
                    {(!documentList || documentList.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center p-4">
                          <div className="flex flex-col items-center gap-2">
                            <Image 
                              src="/icons/empty-documents.svg"
                              alt="No documents"
                              width={48}
                              height={48}
                            />
                            <p>{t('documents.noDocuments')}</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            ) : (
              // Single document view
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
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}