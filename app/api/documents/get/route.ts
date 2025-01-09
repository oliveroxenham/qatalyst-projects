import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = Redis.fromEnv();

export async function GET() {
  const docs = await redis.get('documents');
  return NextResponse.json(docs ? docs : []);
}
