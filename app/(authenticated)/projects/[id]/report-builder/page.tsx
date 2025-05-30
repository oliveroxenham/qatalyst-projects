"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import PageClient from "./pageClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReportBuilderPage() {
  const params = useParams();
  const projectId = params.id as Id<"projects">;
  
  const projectData = useQuery(api.projects.getById, { 
    projectId: projectId 
  });

  if (!projectData) {
    return <ReportBuilderSkeleton />;
  }

  return <PageClient />;
}

function ReportBuilderSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-12 w-64" />
      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="space-y-2">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full max-w-2xl" />
          ))}
        </div>
        <Skeleton className="h-12 w-40" />
      </div>
    </div>
  );
}