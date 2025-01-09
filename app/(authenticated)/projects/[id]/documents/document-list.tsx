'use client';

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

export default function DocumentList() {
  const { data: documentList } = useSuspenseQuery<Document[]>({
    queryKey: ['documents'],
    queryFn: getDocumentsClient,
  }); 
   
  return (
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
          <TableRow key={document.id}>
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
  );
}
