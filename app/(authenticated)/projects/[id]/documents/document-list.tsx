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
import { getDocumentsByProjectIdClient } from '@/server/db';
import { useQuery } from '@tanstack/react-query';
import DocumentViewer from './document-viewer-drawer';

export default function DocumentList({ projectId }: { projectId: string }) {
  const [documentUrl, setDocumentUrl] = useState<string>();
  const { data: documentList } = useQuery<Document[]>({
    queryKey: ['documents', projectId],
    queryFn: () => getDocumentsByProjectIdClient({ id: projectId }),
  });

  return (
    <>
      <DocumentViewer
        documentUrl={documentUrl}
        setDocumentUrl={setDocumentUrl}
      />
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
                    : document.id.toString()
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
    </>
  );
}
