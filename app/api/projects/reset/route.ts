import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import { getInitialMockProjects, getDocuments } from '@/mock/data';
import { Project } from '@/types/project';

const redis = Redis.fromEnv();

export async function POST() {
  try {
    console.log('Reset endpoint called');
    
    // Delete existing projects
    const deleteResult = await redis.del('projects');
    console.log('Delete result:', deleteResult);
    
    // Clear all Redis keys to ensure clean state
    const keys = await redis.keys('*');
    console.log('Found keys:', keys);
    for (const key of keys) {
      await redis.del(key);
    }
    
    // Get fresh mock data
    const mockProjects = getInitialMockProjects();
    console.log('Mock projects to load:', mockProjects.map(p => ({ id: p.id, name: p.name, type: p.projectType })));
    
    // Set new data
    await redis.set('projects', mockProjects);
    await redis.set('documents', getDocuments());
    
    // Verify the data was set
    const verifyProjects = await redis.get('projects') as Project[];
    console.log('Verified projects in Redis:', verifyProjects?.map(p => ({ id: p.id, name: p.name, type: p.projectType })));

    // Create response with no-cache headers
    const response = NextResponse.json(
      { message: 'Data reset successful', projects: verifyProjects },
      { status: 200 }
    );
    
    // Add headers to prevent caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Reset error:', error);
    return NextResponse.json(
      { msg: 'Failed to reset data', error: String(error) },
      { status: 500 }
    );
  }
}