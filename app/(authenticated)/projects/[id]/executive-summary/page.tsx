"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import PageClient from "./pageClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExecutiveSummaryPage() {
  const params = useParams();
  const projectId = params.id as Id<"projects">;
  
  const projectData = useQuery(api.projects.getById, { 
    projectId: projectId 
  });

  if (!projectData) {
    return <ExecutiveSummarySkeleton />;
  }

  return <PageClient projectData={projectData} />;
}

function ExecutiveSummarySkeleton() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-12 w-64" />
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}