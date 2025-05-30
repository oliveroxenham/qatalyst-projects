"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Project } from "@/types/project";

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState("all");
  const projects = useQuery(api.projects.getAll);

  const tabs = [
    { id: "all", label: "All projects" },
    { id: "marketing", label: "Marketing portfolio" },
    { id: "nbs", label: "NBS" },
    { id: "cookstove", label: "Cookstove" },
    { id: "early", label: "Early stage" },
  ];

  const filteredProjects = projects?.filter((project) => {
    if (activeTab === "all") return true;
    if (activeTab === "nbs" && project.projectType === "REDD+") return true;
    if (activeTab === "cookstove" && project.projectType === "Cookstove") return true;
    if (activeTab === "early" && project.status === "Under Development") return true;
    if (activeTab === "marketing" && project.status === "Registered") return true;
    return false;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My workspace</h1>
      
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:bg-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {!projects ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-lg p-6 shadow-sm">
              <Skeleton className="h-40 w-full mb-4" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects?.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low risk":
        return "text-green-600";
      case "medium risk":
        return "text-yellow-600";
      case "high risk":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "eligible":
        return "text-green-600";
      case "in progress":
        return "text-blue-600";
      case "under review":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
      <div className="h-40 bg-muted rounded-lg mb-4 flex items-center justify-center">
        <div className="text-6xl text-muted-foreground/20">🌍</div>
      </div>
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-lg flex-1 pr-2">{project.projectName}</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.push(`/projects/${project._id}/project-overview`)}
        >
          View Project
        </Button>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Verra / GS #</span>
          <span>{project.verraGsNumber}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Country</span>
          <span>{project.country}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Project type</span>
          <span>{project.projectType}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Methodology</span>
          <span className="truncate ml-2" title={project.methodology}>
            {project.methodology}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Status</span>
          <span>{project.status}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Issuance Timing</span>
          <span className="text-xs">{project.issuanceTiming}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Project Developer</span>
          <span>{project.projectDeveloper}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Project Area</span>
          <span>{project.projectArea}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Project Life</span>
          <span className="text-xs">{project.projectLife}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Credit type</span>
          <span>{project.creditType}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">CCB Gold (s), SD VISta / Abacus</span>
          <span className="text-xs">{project.ccbGold}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">CCP Label</span>
          <span>{project.ccpLabel}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Corsia Label</span>
          <span>{project.corsiaLabel}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">LOA Y/N</span>
          <span>{project.loaYN}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Sylvera / BeZero Rating</span>
          <span className="font-semibold">{project.sylveraBeZeroRating}</span>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-muted-foreground mb-2">SDGs</p>
        <div className="flex gap-1">
          {project.sdgs.map((sdg: string) => (
            <div
              key={sdg}
              className="w-8 h-8 bg-muted rounded flex items-center justify-center text-xs font-semibold"
            >
              {sdg}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 space-y-1 text-sm">
        <div>
          <span className="text-muted-foreground">Est. Emission Reductions / Removal:</span>
        </div>
        <div>Project life: {project.estimatedEmissionReductions.projectLife}</div>
        <div>Annual: {project.estimatedEmissionReductions.annual}</div>
      </div>
      
      <div className="mt-4 pt-4 border-t space-y-1 text-sm">
        <div>
          <span className="text-muted-foreground">Owner:</span>
        </div>
        <div>Created: {project.created}</div>
        <div>
          Collaborators: {project.collaborators.join(", ")}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <h4 className="font-semibold text-sm mb-2">Assessment Status</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Carbon Accounting</span>
            <span className={getStatusColor(project.assessmentStatus.carbonAccounting)}>
              {project.assessmentStatus.carbonAccounting}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Permanence</span>
            <span className={getRiskColor(project.assessmentStatus.permanence)}>
              {project.assessmentStatus.permanence}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Additionality</span>
            <span className={getRiskColor(project.assessmentStatus.additionality)}>
              {project.assessmentStatus.additionality}
            </span>
          </div>
          <div className="flex justify-between">
            <span>CoBenefits / Safeguarding</span>
            <span className={getRiskColor(project.assessmentStatus.coBenefitsSafeguarding)}>
              {project.assessmentStatus.coBenefitsSafeguarding}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Financial Assessment</span>
            <span className={getStatusColor(project.assessmentStatus.financialAssessment)}>
              {project.assessmentStatus.financialAssessment}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}