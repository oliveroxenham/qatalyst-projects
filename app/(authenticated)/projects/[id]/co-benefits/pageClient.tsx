"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

import { Project } from "@/types/project";

export default function PageClient({ projectData }: { projectData: Project | null }) {
  if (!projectData) {
    return <div>Project not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Co-benefits & Safeguarding</h1>

      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Coming Soon</p>
                <p className="text-sm text-gray-500">
                  This feature will be available in a future update.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}