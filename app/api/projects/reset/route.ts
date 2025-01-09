import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import { getInitialMockProjects, getDocuments } from '@/mock/data';

const redis = Redis.fromEnv();

export async function POST() {
  try {
    await redis.del('projects');
    await redis.set('projects', getInitialMockProjects());
    await redis.set('documents', getDocuments());

    return NextResponse.json(
      { message: 'Data reset successful' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: 'Failed to reset data', error },
      { status: 500 }
    );
  }
}
