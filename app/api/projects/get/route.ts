import { Project } from '@/types/project';
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from 'next/server';
import { getServerTranslation } from '@/i18n/server';
import { getInitialMockProjects } from '@/mock/data';

const redis = Redis.fromEnv();

export async function GET(req:NextRequest) {
  const projectId = req.nextUrl.searchParams.get('id');
  const language = req.nextUrl.searchParams.get('lang') || 'en';
  console.log('projectId=', projectId, 'language=', language);
  
  let projects = await redis.get('projects') as Project[];
  console.log('Projects from Redis:', projects ? projects.length : 'null');
  
  // If Redis is empty, load initial mock data
  if (!projects || projects.length === 0) {
    console.log('Redis empty, loading mock data');
    projects = getInitialMockProjects();
    await redis.set('projects', projects);
  }
  
  if (projectId) {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === projectId) {
        // Return the project with translated content where applicable
        return NextResponse.json({
          ...projects[i],
          translatedContent: true,
          language
        });
      }
    }
    return NextResponse.json({
      msg: getServerTranslation('api.projectNotFound', 'Project not found', language),
      status: 400
    });
  }
  console.log('redis: projects=', projects);
  
  // Return all projects with a flag indicating translated content
  const response = NextResponse.json(projects.map(project => ({
    ...project,
    translatedContent: true,
    language
  })));
  
  // Prevent caching
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  
  return response;
}
