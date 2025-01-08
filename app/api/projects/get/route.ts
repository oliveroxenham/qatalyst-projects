import { Redis } from "@upstash/redis";
import { NextResponse } from 'next/server';

const redis = Redis.fromEnv();

export async function GET() {
  const projects = await redis.get('projects');
  return NextResponse.json(projects);
}

// export const dynamic = 'force-dynamic'