import { Project } from '@/types/project';
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from 'next/server';
import { getTranslation } from '@/i18n/i18n';

const redis = Redis.fromEnv();

export async function GET(req:NextRequest) {
  const projectId = req.nextUrl.searchParams.get('id');
  const language = req.nextUrl.searchParams.get('lang') || 'en';
  console.log('projectId=', projectId, 'language=', language);
  
  const projects = await redis.get('projects') as Project[];
  
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
      msg: getTranslation('api.projectNotFound', 'Project not found', language),
      status: 400
    });
  }
  console.log('redis: projects=', projects);
  
  // Return all projects with a flag indicating translated content
  return NextResponse.json(projects.map(project => ({
    ...project,
    translatedContent: true,
    language
  })));
}
