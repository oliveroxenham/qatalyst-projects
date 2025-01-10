'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { File } from 'lucide-react';
import type { Document } from '@/types/document';
import { getDocumentsClient } from '@/server/db';
import { useSuspenseQuery } from '@tanstack/react-query';
import DocumentViewer from './document-viewer';

export default function DocumentList() {
  const [documentUrl, setDocumentUrl] = useState<string>();
  const { data: documentList } = useSuspenseQuery<Document[]>({
    queryKey: ['documents'],
    queryFn: getDocumentsClient,
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="flex gap-1 items-center">
              <File />
              Filename
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Last activity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documentList?.map((document) => (
            <TableRow
              className="hover:cursor-pointer"
              key={document.id}
              onClick={() =>
                setDocumentUrl(
                  documentUrl
                    ? undefined
                    : 'https://v3jxx0dboaeguwsf.public.blob.vercel-storage.com/PROJ_DESC_1650_29DEC2014-VyhmiOgjaRAEF7vDr2tPD435gFrLw1.pdf'
                )
              }
            >
              <TableCell className="flex items-center gap-1">
                <Image
                  src={`/icons/${document.type}.svg`}
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
              <TableCell>{document.lastActivity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DocumentViewer documentUrl={documentUrl} setDocumentUrl={setDocumentUrl} />
    </>
  );
}
