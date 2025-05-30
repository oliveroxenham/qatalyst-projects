"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import PageClient from "./pageClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function CarbonAccountingPage() {
  const params = useParams();
  const projectId = params.id as Id<"projects">;
  
  const projectData = useQuery(api.projects.getById, { 
    projectId: projectId 
  });

  if (!projectData) {
    return <CarbonAccountingSkeleton />;
  }

  return <PageClient projectData={projectData} />;
}

function CarbonAccountingSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-12 w-64" />
      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-96 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  );
}