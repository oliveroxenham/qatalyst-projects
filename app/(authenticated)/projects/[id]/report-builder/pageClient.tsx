'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getProjectId } from '@/mock/data';
import { FileIcon, Send } from 'lucide-react';
import QatalystAiIcon from '@/public/icons/AI-icon.svg';
// Create a custom QatalystResponse component for the report builder
import React from 'react';
import Logo from '@/public/icons/logo.svg';
import Image from 'next/image';

// Custom QatalystResponse component for report builder
function QatalystResponse({ 
  title, 
  prompt, 
  response 
}: { 
  title?: string; 
  prompt: string; 
  response: string;
}) {
  return (
    <div className="border rounded-md p-4 bg-background">
      <div className="flex items-start space-x-3 mb-4">
        <div className="rounded-full bg-blaze-orange-500 flex items-center justify-center p-1.5 mt-1">
          <Logo className="w-4 h-4 fill-white" />
        </div>
        <div>
          {title && <h3 className="font-semibold mb-1">{title}</h3>}
          <p className="text-sm text-muted-foreground font-medium">Prompt: {prompt}</p>
        </div>
      </div>
      <div className="pl-10">
        <p className="text-sm">{response}</p>
      </div>
    </div>
  );
}

// Define TypeScript interfaces for report data
interface SdgContribution {
  sdg: number;
  name: string;
  contribution: string;
}

interface EsgBenefits {
  environmentalBenefits: string[];
  socialBenefits: string[];
  governanceBenefits: string[];
}

interface ReportData {
  projectSummary: Record<string, string>;
  financialOverview: Record<string, string>;
  esgBenefits: EsgBenefits;
  sdgContributions: SdgContribution[];
  executiveSummary: string;
}

// Mock report data
const mockReportData: ReportData = {
  projectSummary: {
    projectName: 'Tonle Sap Flooded Forest Protection',
    country: 'Cambodia',
    projectType: 'REDD+',
    startDate: '2025-04-01',
    status: 'Active',
    projectArea: '566,560 hectares',
    creditsIssued: '21,171,578 tCO₂e',
    annualReductions: '704,000 tCO₂e/year',
  },
  financialOverview: {
    projectValue: '$25,000,000',
    capitalExpense: '$12,500,000',
    operatingExpense: '$850,000/year',
    revenueProjection: '$10,500,000/year',
    breakEvenPoint: '3.4 years',
    carbonPriceAssumption: '$15/tCO₂e',
  },
  esgBenefits: {
    environmentalBenefits: [
      'Protection of 566,560 hectares of critical forest habitat',
      'Conservation of biodiversity including 28 endangered species',
      'Preservation of water quality in the Tonle Sap Lake ecosystem',
      'Reduced deforestation rate by 85% compared to baseline',
    ],
    socialBenefits: [
      'Employment for 120 local community members',
      'Improved livelihoods for 1,500 households through sustainable forestry practices',
      'Development of community infrastructure including 5 schools and 3 health centers',
      'Training programs reaching 2,000 community members',
    ],
    governanceBenefits: [
      'Strengthened local governance of natural resources',
      'Community-led forest monitoring program',
      'Transparent benefit-sharing mechanism with local stakeholders',
      'Regular audits and third-party verification',
    ],
  },
  sdgContributions: [
    { sdg: 1, name: 'No Poverty', contribution: 'Significant' },
    { sdg: 13, name: 'Climate Action', contribution: 'Major' },
    { sdg: 15, name: 'Life on Land', contribution: 'Major' },
    { sdg: 6, name: 'Clean Water and Sanitation', contribution: 'Moderate' },
    { sdg: 8, name: 'Decent Work and Economic Growth', contribution: 'Moderate' },
  ],
  executiveSummary: `
    The Tonle Sap Flooded Forest Protection project represents a significant opportunity to generate carbon credits through the protection of critical forest ecosystems in Cambodia while delivering substantial environmental and social co-benefits.
    
    With an annual carbon credit generation potential of 704,000 tCO₂e and a total expected issuance of 21,171,578 tCO₂e over the project lifetime, this project offers an attractive financial return with a breakeven point of 3.4 years based on current carbon market projections.
    
    Beyond carbon benefits, the project contributes significantly to biodiversity conservation, protecting habitat for 28 endangered species, while also supporting sustainable livelihoods for 1,500 local households through employment, infrastructure development, and capacity building.
    
    The project's strong governance framework, including community-led monitoring and transparent benefit-sharing mechanisms, ensures long-term sustainability and accountability to both investors and local stakeholders.
    
    We recommend this project as a high-quality investment opportunity that aligns environmental and social impact with strong financial returns.
  `,
};

export function ReportBuilderClient({ projectId }: { projectId: string }) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<ReportData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const project = getProjectId(projectId);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      setGeneratedReport(mockReportData);
      setIsGenerating(false);
    }, 3000);
  };

  const handleExampleClick = (example: string) => {
    setInputValue(example);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{t('reportBuilder.title')}</h1>
        <p className="text-muted-foreground">
          {t('reportBuilder.description')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('reportBuilder.inputPlaceholder')}
            className="flex-1"
            disabled={isGenerating}
          />
          <Button type="submit" disabled={!inputValue.trim() || isGenerating}>
            {isGenerating ? t('reportBuilder.generating') : <Send className="h-4 w-4" />}
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">{t('reportBuilder.examples')}:</p>
          <div className="flex flex-wrap gap-2">
            {(t('reportBuilder.examplePrompts', { returnObjects: true }) as string[]).map((example, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                onClick={() => handleExampleClick(example)}
                disabled={isGenerating}
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      </form>

      {isGenerating && (
        <div className="flex items-center justify-center p-12">
          <div className="flex flex-col items-center gap-4">
            <QatalystAiIcon className="h-12 w-12 animate-pulse" />
            <p>{t('reportBuilder.generating')}</p>
          </div>
        </div>
      )}

      {generatedReport && !isGenerating && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{t('reportBuilder.reportPreview')}</h2>
            <Button>
              <FileIcon className="mr-2 h-4 w-4" />
              {t('reportBuilder.downloadReport')}
            </Button>
          </div>
          
          <Card className="p-6 space-y-6">
            {/* Report Header */}
            <div className="space-y-2 border-b pb-4">
              <h1 className="text-2xl font-bold">{project?.name || generatedReport.projectSummary.projectName} - Project Report</h1>
              <p className="text-muted-foreground">Generated by Qatalyst AI on {new Date().toLocaleDateString()}</p>
            </div>
            
            {/* Executive Summary */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Executive Summary</h2>
              <div className="whitespace-pre-line text-sm">
                {generatedReport.executiveSummary}
              </div>
            </div>
            
            {/* Project Summary */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Project Summary</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(generatedReport.projectSummary).map(([key, value]: [string, string]) => (
                  <div key={key} className="space-y-1">
                    <p className="text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</p>
                    <p className="text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Financial Overview */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Financial Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(generatedReport.financialOverview).map(([key, value]: [string, string]) => (
                  <div key={key} className="space-y-1">
                    <p className="text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</p>
                    <p className="text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* ESG Benefits */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">ESG Benefits</h2>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Environmental Benefits</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {generatedReport.esgBenefits.environmentalBenefits.map((benefit: string, i: number) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Social Benefits</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {generatedReport.esgBenefits.socialBenefits.map((benefit: string, i: number) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Governance Benefits</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {generatedReport.esgBenefits.governanceBenefits.map((benefit: string, i: number) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* SDG Contributions */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">SDG Contributions</h2>
              <div className="grid grid-cols-2 gap-4">
                {generatedReport.sdgContributions.map((sdg: SdgContribution) => (
                  <div key={sdg.sdg} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Image
                        src={`/icons/goal-${sdg.sdg.toString().padStart(2, '0')}.svg`}
                        alt={`SDG ${sdg.sdg}`}
                        width={40}
                        height={40}
                        className="h-10 w-10"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">SDG {sdg.sdg}: {sdg.name}</p>
                      <p className="text-sm text-muted-foreground">Contribution: {sdg.contribution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
          <div className="mt-6">
            <QatalystResponse
              title=""
              prompt={inputValue}
              response="The report has been generated based on available data from the project documents and Qatalyst's analysis. The report highlights key financial metrics, ESG benefits, and SDG contributions. Additional customization options are available in the full version of Qatalyst."
            />
          </div>
        </div>
      )}
    </div>
  );
}