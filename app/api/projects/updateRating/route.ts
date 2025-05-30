import { Redis } from '@upstash/redis';
import { getProjectsServer } from '@/server/db';
import { NextRequest, NextResponse } from 'next/server';
import { getProjectId } from '@/mock/data';

const redis = Redis.fromEnv();

export async function POST(req: NextRequest) {
  const { rating, projectId, assessment } = await req.json();
  console.log('params=', { rating, projectId, assessment });
  if (!rating || !projectId || !assessment) {
    return NextResponse.json(
      { msg: 'Please provide rating, projectId and assessment' },
      { status: 400 }
    );
  }
  try {
    const currentProject = getProjectId(projectId);
    const allProjects = await getProjectsServer();
    if (!currentProject) {
      return NextResponse.json({ msg: 'Project not found' }, { status: 404 });
    }
    for (let i = 0; i < allProjects.length; i++) {
      if (allProjects[i].id === currentProject.id) {
        if (assessment === 'financial') {
          if (allProjects[i].financialAssessment) { allProjects[i].financialAssessment!.status = rating; }
          console.log('project=', allProjects[i])
        } else if (assessment === 'esg') {
          if (allProjects[i].esgAssessment) { allProjects[i].esgAssessment!.status = rating; }
          console.log('project=', allProjects[i])
        } else if (assessment === 'carbonQuality') {
          if (!allProjects[i].carbonQualityAssessment) {
            allProjects[i].carbonQualityAssessment = {
              status: 'not started',
              progress: 0,
              risks: [],
              assignedTo: ''
            };
          }
          // Use non-null assertion since we just created it if it didn't exist
          allProjects[i].carbonQualityAssessment!.status = rating;
          console.log('project=', allProjects[i])
        } else {
          return NextResponse.json({
            msg: 'Invalid assessment',
            status: 400,
          });
        }
        break;
      }
    }

    console.log('allProjects=', allProjects);
    await redis.set('projects', allProjects);

    return NextResponse.json(
      { message: 'Project rating updated successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: 'Failed to update project rating', error },
      { status: 500 }
    );
  }
}
