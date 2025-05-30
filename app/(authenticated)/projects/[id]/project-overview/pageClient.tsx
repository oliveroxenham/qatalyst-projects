"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";

// Mock monthly emissions data
const monthlyEmissionsData = [
  { month: "Jan", emissions: 5000 },
  { month: "Feb", emissions: 7000 },
  { month: "Mar", emissions: 8500 },
  { month: "Apr", emissions: 7500 },
  { month: "May", emissions: 6000 },
  { month: "Jun", emissions: 5500 },
  { month: "Jul", emissions: 6500 },
  { month: "Aug", emissions: 7000 },
  { month: "Sep", emissions: 8000 },
  { month: "Oct", emissions: 8500 },
  { month: "Nov", emissions: 9000 },
  { month: "Dec", emissions: 10000 },
];

export default function PageClient({ projectData }: { projectData: any }) {
  if (!projectData) {
    return <div>Project not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Project Overview</h1>

      {/* Project Information Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Project Name: {projectData.projectName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1 */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Verra / GS #</p>
                <p className="font-medium">{projectData.verraGsNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">{projectData.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Project Life</p>
                <p className="font-medium">{projectData.projectLife}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Corsia Label / Corsia Aligned</p>
                <p className="font-medium">{projectData.corsiaLabel}</p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Country</p>
                <p className="font-medium">{projectData.country}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Issuance Timing</p>
                <p className="font-medium">{projectData.issuanceTiming}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Credit type</p>
                <p className="font-medium">{projectData.creditType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">LOA Y/N</p>
                <p className="font-medium">{projectData.loaYN}</p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Project type</p>
                <p className="font-medium">{projectData.projectType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Project Developer</p>
                <p className="font-medium">{projectData.projectDeveloper}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CCB Gold (s), SD VISta / Abacus</p>
                <p className="font-medium">{projectData.ccbGold}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sylvera / BeZero Rating</p>
                <p className="font-medium text-lg">{projectData.sylveraBeZeroRating}</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Methodology</p>
                <p className="font-medium">{projectData.methodology}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Project Area</p>
                <p className="font-medium">{projectData.projectArea}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">CCP Label</p>
                <p className="font-medium">{projectData.ccpLabel}</p>
              </div>
            </div>
          </div>

          {/* SDGs */}
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-2">SDGs</p>
            <div className="flex gap-2">
              {projectData.sdgs.map((sdg: string) => (
                <div
                  key={sdg}
                  className="w-10 h-10 bg-muted rounded flex items-center justify-center text-sm font-semibold"
                >
                  {sdg}
                </div>
              ))}
            </div>
          </div>

          {/* Emission Reductions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Est. Emission Reductions / Removal</p>
              <p className="font-medium">Project life: {projectData.estimatedEmissionReductions.projectLife}</p>
              <p className="font-medium">Annual: {projectData.estimatedEmissionReductions.annual}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estimated Emission Reductions Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Estimated Emission Reductions /Removal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyEmissionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                <Bar dataKey="emissions" fill="#6B7280" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Project Description & Design */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Project Description & Design</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="min-h-[200px] text-muted-foreground">
            <p>(Text)</p>
            <p className="mt-4">
              This project focuses on protecting and restoring forest areas to reduce carbon emissions 
              and enhance biodiversity. The project implements sustainable forest management practices 
              and works closely with local communities to ensure long-term conservation success.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Biodiversity & Community Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Biodiversity & Community Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="min-h-[200px] text-muted-foreground">
            <p className="mt-4">
              The project area is home to numerous endangered species and provides essential ecosystem 
              services to local communities. Through conservation efforts, the project aims to protect 
              wildlife habitats while creating sustainable livelihood opportunities for local residents.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}