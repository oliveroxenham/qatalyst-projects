import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import type { Project } from '@/types/project';
import { getInitialMockProjects, importProject } from '@/mock/data';

const redis = Redis.fromEnv();

export async function POST() {
  try {
    const newProject: Project = importProject();

    await redis.del('projects');
    await redis.set('projects', [newProject, ...getInitialMockProjects()]);

    return NextResponse.json(
      { message: 'Project added successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: 'Failed to add project', error },
      { status: 500 }
    );
  }
}
