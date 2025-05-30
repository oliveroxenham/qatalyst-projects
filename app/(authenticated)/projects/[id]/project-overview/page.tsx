"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import PageClient from "./pageClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectOverviewPage() {
  const params = useParams();
  const projectId = params.id as Id<"projects">;
  
  const projectData = useQuery(api.projects.getById, { 
    projectId: projectId 
  });

  if (!projectData) {
    return <ProjectOverviewSkeleton />;
  }

  return <PageClient projectData={projectData} />;
}

function ProjectOverviewSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-12 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-32" />
          </div>
        ))}
      </div>
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  );
}