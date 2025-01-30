import { Project } from '@/types/project';
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from 'next/server';

const redis = Redis.fromEnv();

export async function GET(req:NextRequest) {
  const projectId = req.nextUrl.searchParams.get('id');
  console.log('projectId=', projectId);
  const projects = await redis.get('projects') as Project[];
  if (projectId) {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === projectId) {
        return NextResponse.json(projects[i])
      }
    }
    return NextResponse.json({
      msg: 'Project not found',
      status: 400
    });
  }
  console.log('redis: projects=', projects);
  return NextResponse.json(projects);
}
