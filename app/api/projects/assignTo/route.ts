import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';
import { getInitialMockProjects, getProjectId } from '@/mock/data';

const redis = Redis.fromEnv();

export async function POST(req: NextRequest) {
  const { assignee, projectId, assessment } = await req.json();
  console.log('params=', { assignee, projectId, assessment });
  if (!assignee || !projectId || !assessment) {
    return NextResponse.json(
      { msg: 'Please provide assignee, projectId and assessment' },
      { status: 400 }
    );
  }
  try {
    const currentProject = getProjectId(projectId);
    const allProjects = getInitialMockProjects();
    if (!currentProject) {
      return NextResponse.json({ msg: 'Project not found' }, { status: 404 });
    }
    for (let i = 0; i < allProjects.length; i++) {
      if (allProjects[i].id === currentProject.id) {
        if (assessment === 'financial') {
          allProjects[i].financialAssessment.assignedTo = assignee;
          console.log('project=', allProjects[i])
        } else if (assessment === 'esg') {
          allProjects[i].esgAssessment.assignedTo = assignee;
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
      { message: 'Project updated successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: 'Failed to update project', error },
      { status: 500 }
    );
  }
}
