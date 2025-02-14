import { Document } from '@/types/document';
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const redis = Redis.fromEnv();

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get('id');
  const docs = (await redis.get('documents')) as Document[];
  return NextResponse.json(
    docs ? docs.filter((d: Document) => d.projectId === projectId) : []
  );
}
