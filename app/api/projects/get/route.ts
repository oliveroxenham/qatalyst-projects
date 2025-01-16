import { Redis } from "@upstash/redis";
import { NextResponse } from 'next/server';

const redis = Redis.fromEnv();

export async function GET() {
  let projects = await redis.get('projects');
  console.log('redis: projects=', projects);
  return NextResponse.json(projects);
}

// export const dynamic = 'force-dynamic'