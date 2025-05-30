"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import PageClient from "./pageClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function DataRoomPage() {
  const params = useParams();
  const projectId = params.id as Id<"projects">;
  
  const projectData = useQuery(api.projects.getById, { 
    projectId: projectId 
  });

  if (!projectData) {
    return <DataRoomSkeleton />;
  }

  return <PageClient projectData={projectData} />;
}

function DataRoomSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-12 w-64" />
      <div className="flex items-center justify-center h-[400px]">
        <Skeleton className="h-32 w-96" />
      </div>
    </div>
  );
}