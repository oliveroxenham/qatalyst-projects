import { Document } from '@/types/document';
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';
import { getTranslation } from '@/i18n/i18n';

const redis = Redis.fromEnv();

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get('id');
  const language = req.nextUrl.searchParams.get('lang') || 'en';
  const docs = (await redis.get('documents')) as Document[];
  
  const filteredDocs = docs ? docs.filter((d: Document) => d.projectId === projectId) : [];
  
  // Return documents with language metadata
  return NextResponse.json(
    filteredDocs.map(doc => ({
      ...doc,
      translatedContent: true,
      language
    }))
  );
}
