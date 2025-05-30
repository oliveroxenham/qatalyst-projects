"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

type ReportFormat = "PPT" | "WORD" | "PDF";

export default function PageClient({ projectData }: { projectData: any }) {
  const router = useRouter();
  const [selectedFormat, setSelectedFormat] = useState<ReportFormat>("PPT");
  const [selectedSections, setSelectedSections] = useState<string[]>([
    "Project overview",
    "Executive Summary",
    "Carbon Accounting",
    "Additionality",
    "Permanence",
    "Co-Benefits & Safeguarding",
    "Financial Assessment"
  ]);

  const sections = [
    { id: "1", name: "Project overview" },
    { id: "2", name: "Executive Summary" },
    { id: "3", name: "Carbon Accounting" },
    { id: "4", name: "Additionality" },
    { id: "5", name: "Permanence" },
    { id: "6", name: "Co-Benefits & Safeguarding" },
    { id: "7", name: "Financial Assessment" },
  ];

  const formats: ReportFormat[] = ["PPT", "WORD", "PDF"];

  const handleSectionToggle = (sectionName: string) => {
    setSelectedSections(prev => 
      prev.includes(sectionName)
        ? prev.filter(s => s !== sectionName)
        : [...prev, sectionName]
    );
  };

  const handleGenerateReport = () => {
    // In a real implementation, this would trigger report generation
    console.log("Generating report:", {
      format: selectedFormat,
      sections: selectedSections
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Report builder</h1>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Format Selection */}
            <div>
              <h3 className="text-lg font-medium mb-4">Generate report:</h3>
              <div className="flex gap-2">
                {formats.map((format) => (
                  <Button
                    key={format}
                    variant={selectedFormat === format ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFormat(format)}
                    className={selectedFormat === format ? "bg-gray-200 text-gray-900 hover:bg-gray-300" : ""}
                  >
                    {format}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sections Checklist */}
            <div className="space-y-4">
              {sections.map((section) => (
                <div key={section.id} className="flex items-center space-x-3">
                  <span className="text-sm font-medium w-8">{section.id}.</span>
                  <Checkbox
                    id={section.id}
                    checked={selectedSections.includes(section.name)}
                    onCheckedChange={() => handleSectionToggle(section.name)}
                    className="data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900"
                  />
                  <label
                    htmlFor={section.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {section.name}
                  </label>
                </div>
              ))}
            </div>

            {/* Generate Button */}
            <div>
              <Button 
                onClick={handleGenerateReport}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}