"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Project } from "@/types/project";

export default function PageClient({ projectData }: { projectData: Project | null }) {
  const params = useParams();
  const projectId = params.id;

  if (!projectData) {
    return <div>Project not found</div>;
  }

  const sections = [
    {
      title: "Project Description & Design",
      link: `/projects/${projectId}/project-overview`,
    },
    {
      title: "Additionality",
      link: `/projects/${projectId}/additionality`,
    },
    {
      title: "Biodiversity & Community Impact",
      link: `/projects/${projectId}/project-overview#biodiversity`,
    },
    {
      title: "Carbon Accounting",
      link: `/projects/${projectId}/carbon-accounting`,
    },
    {
      title: "Additionality",
      link: `/projects/${projectId}/additionality`,
    },
    {
      title: "Permanence",
      link: `/projects/${projectId}/permanence`,
    },
    {
      title: "Co-Benefits & Safeguarding",
      link: `/projects/${projectId}/co-benefits`,
    },
    {
      title: "Financial Assessment",
      link: `/projects/${projectId}/financial-assessment`,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Executive Summary</h1>

      {/* Project Name and Badges */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">
          Project Name: {projectData.projectName}
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-sm bg-gray-100 dark:bg-gray-800 border-gray-300">
            Credit type: {projectData.creditType}
          </Badge>
          <Badge variant="outline" className="text-sm bg-gray-100 dark:bg-gray-800 border-gray-300">
            CCP Label: {projectData.ccpLabel}
          </Badge>
          <Badge variant="outline" className="text-sm bg-gray-100 dark:bg-gray-800 border-gray-300">
            Corsia Label: {projectData.corsiaLabel}
          </Badge>
          <Badge variant="outline" className="text-sm bg-gray-100 dark:bg-gray-800 border-gray-300">
            CCB Gold (s), SD VISta / Abacus: {projectData.ccbGold}
          </Badge>
        </div>
      </div>

      {/* Summary Sections */}
      <div className="space-y-4">
        {sections.map((section, index) => (
          <Card key={index} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{section.title}</CardTitle>
                <Link href={section.link}>
                  <Button 
                    variant="link" 
                    className="text-primary p-0 h-auto font-normal"
                  >
                    See details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  This section provides a comprehensive overview of the {section.title.toLowerCase()} 
                  aspects of the project. The analysis shows that the project meets all necessary 
                  criteria and demonstrates strong potential for achieving its stated objectives.
                </p>
                <p className="text-sm">
                  Key findings indicate positive outcomes across multiple evaluation metrics, 
                  with particular strengths in implementation strategy and stakeholder engagement.
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}