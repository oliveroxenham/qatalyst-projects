'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getProjectId } from '@/mock/data';
import { 
  FileIcon, 
  Download, 
  Trash2, 
  ArrowLeft,
  PenLine,
  FileText
} from 'lucide-react';
import Image from 'next/image';
import { TopBar } from '@/components/topbar';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ProjectInfoTooltip } from '@/components/project-info-tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Logo from '@/public/icons/logo.svg';
import QatalystAiIcon from '@/public/icons/AI-icon.svg';

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

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  lastModified: number;
  insights?: string;
  isAnalyzing?: boolean;
}

interface ReportData {
  projectSummary: Record<string, string>;
  financialOverview: Record<string, string>;
  esgBenefits: EsgBenefits;
  sdgContributions: SdgContribution[];
  executiveSummary: string;
  referencedDocuments?: UploadedFile[];
}

// Section types for customizable report
type SectionType = 
  | 'coverPage'
  | 'executiveSummary' 
  | 'projectSummary' 
  | 'financialOverview' 
  | 'financialAssessment'
  | 'esgAssessment' 
  | 'sdgContributions' 
  | 'customText'
  | 'aiGenerated';

interface ReportSection {
  id: string;
  type: SectionType;
  title: string;
  content?: string;
  prompt?: string;
  isGenerating?: boolean;
  includeSources?: boolean;
  coverTitle?: string;
  coverSubtitle?: string;
}

// Mock assessment sources data
const mockFinancialAssessmentSources = [
  { id: '1', name: 'Project Financial Statement 2024.pdf', description: 'Annual financial projections document for the Tonle Sap project' },
  { id: '2', name: 'Carbon Credit Market Analysis Q1 2025.xlsx', description: 'Market analysis for carbon credit pricing and volume estimates' },
  { id: '3', name: 'Investment Memorandum - Tonle Sap.docx', description: 'Detailed project investment proposal with financial projections' },
  { id: '4', name: 'Operational Cost Breakdown.pdf', description: 'Detailed breakdown of project operational costs and sustainability metrics' },
];

const mockEsgAssessmentSources = [
  { id: '1', name: 'Environmental Impact Assessment 2024.pdf', description: 'Comprehensive evaluation of environmental impacts and mitigation strategies' },
  { id: '2', name: 'Community Engagement Report.docx', description: 'Documentation of community consultations and social impact projections' },
  { id: '3', name: 'Biodiversity Baseline Study.pdf', description: 'Scientific assessment of biodiversity in the project area' },
  { id: '4', name: 'Governance Structure and Compliance.pdf', description: 'Project governance framework and regulatory compliance documentation' },
];

const mockFinancialAssessmentData = [
  {
    criterion: 'Project Value',
    assessment: 'The project value was calculated to be $25 million based on carbon credit projections, operational costs, and comparable project valuation metrics.',
    value: '$25,000,000'
  },
  {
    criterion: 'Cost of Production',
    assessment: 'The cost of production analysis shows a cost per carbon credit of $4.80, which is below the industry average of $5.70 for comparable REDD+ projects.',
    value: '$4.80 per credit'
  },
  {
    criterion: 'Revenue Projections',
    assessment: 'Based on conservative carbon credit price forecasts, the project is expected to generate $10.5 million in annual revenue with a steady growth trajectory of 4% year-over-year.',
    value: '$10,500,000 per year'
  },
  {
    criterion: 'Capital Expense Intensity',
    assessment: 'The project has a capital expense intensity of $22.06 per tCO₂e, indicating efficient use of capital for carbon reduction.',
    value: '$22.06 per tCO₂e'
  },
  {
    criterion: 'Operating Expense Intensity',
    assessment: 'Annual operating expenses amount to $1.50 per tCO₂e, which is favorable compared to the industry benchmark of $1.85 per tCO₂e.',
    value: '$1.50 per tCO₂e'
  },
  {
    criterion: 'Breakeven Timeline',
    assessment: 'With current carbon pricing and cost projections, the project is expected to reach breakeven in 3.4 years.',
    value: '3.4 years'
  },
];

const mockEsgAssessmentData = {
  environmentalImpact: {
    assessment: 'The project will protect 566,560 hectares of critical forest habitat, conserve biodiversity including 28 endangered species, and preserve water quality in the Tonle Sap Lake ecosystem.',
    rating: 'Satisfactory',
  },
  socialImpact: {
    assessment: 'The project will provide employment for 120 local community members, improve livelihoods for 1,500 households, and develop community infrastructure including schools and health centers.',
    rating: 'Satisfactory',
  },
  governance: {
    assessment: 'The project has established a strong governance framework with community-led monitoring programs and transparent benefit-sharing mechanisms.',
    rating: 'Satisfactory',
  },
  communityEngagement: {
    assessment: 'While community engagement processes have been established, there are concerns about the inclusivity of decision-making processes and representation of indigenous communities.',
    rating: 'Investigate',
  },
};

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

export function ReportPreviewClient({ projectId }: { projectId: string }) {
  const router = useRouter();
  const { t } = useTranslation();
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [reportSections, setReportSections] = useState<ReportSection[]>([]);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const project = getProjectId(projectId);
  
  // Load saved report from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedReport = localStorage.getItem(`report-${projectId}`);
      
      if (savedReport) {
        try {
          const parsedData = JSON.parse(savedReport);
          if (!parsedData.report || !parsedData.sections) {
            throw new Error('Invalid report data format');
          }
          setReportData(parsedData.report);
          setReportSections(parsedData.sections);
          setPrompt(parsedData.prompt || '');
        } catch (error) {
          console.error('Error parsing saved report:', error);
          // If there's an error parsing the report, delete the cookie
          handleDeleteReport();
        }
      } else {
        // If no report data exists, delete the cookie
        handleDeleteReport();
      }
    }
  }, [projectId]);

  const handleDeleteReport = () => {
    // Clear from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`report-${projectId}`);
      
      // Set cookie to indicate report no longer exists
      document.cookie = `report-exists-${projectId}=false; path=/`;
      
      // Redirect to report builder
      router.push(`/projects/${projectId}/report-builder`);
    }
  };

  const handleBack = () => {
    router.push(`/projects/${projectId}/report-builder`);
  };

  if (!reportData || reportSections.length === 0) {
    return (
      <div>
        <TopBar title="reportBuilder.title">
          <div className="flex justify-between items-center w-full gap-2">
            {project && (
              <ProjectInfoTooltip
                name={project.name}
                sourceType={project.sourceType}
                originalId={project.id}
                projectType={project.projectType}
              />
            )}
            <div className="flex flex-row gap-2">
              <ThemeSwitcher />
            </div>
          </div>
        </TopBar>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-center p-12">
            <div className="flex flex-col items-center gap-4">
              <QatalystAiIcon className="h-12 w-12" />
              <p>Loading report...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <TopBar title="reportBuilder.title">
        <div className="flex justify-between items-center w-full gap-2">
          {project && (
            <ProjectInfoTooltip
              name={project.name}
              sourceType={project.sourceType}
              originalId={project.id}
              projectType={project.projectType}
            />
          )}
          <div className="flex flex-row gap-2">
            <ThemeSwitcher />
          </div>
        </div>
      </TopBar>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <p className="text-muted-foreground">
            {t('reportBuilder.description')}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Button 
                variant="outline" 
                className="mr-4"
                onClick={handleBack}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Report Builder
              </Button>
              <h2 className="text-xl font-semibold">{t('reportBuilder.reportPreview')}</h2>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                onClick={() => setIsCustomizing(!isCustomizing)}
              >
                <PenLine className="mr-2 h-4 w-4" />
                {t('reportBuilder.customizeReport')}
              </Button>
              
              <Dialog 
                open={isDeleteDialogOpen} 
                onOpenChange={setIsDeleteDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Report
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Report</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this report? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteReport}>
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    {t('reportBuilder.downloadReport')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    {t('reportBuilder.downloadAsWord')}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileIcon className="mr-2 h-4 w-4" />
                    {t('reportBuilder.downloadAsPdf')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        
          <div className="flex justify-center">
            <div className="w-full max-w-[210mm] mx-auto space-y-8">
            
              {/* Dynamic A4 Page Sections */}
              {reportSections.map((section) => {
                if (section.type === 'coverPage') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid flex flex-col justify-center items-center">
                      <div className="space-y-6 text-center">
                        <h1 className="text-4xl font-bold">{section.coverTitle}</h1>
                        <h2 className="text-2xl text-muted-foreground">{section.coverSubtitle}</h2>
                        {project?.imgUrl && (
                          <div className="mt-8 w-full h-[350px] relative overflow-hidden rounded-md mx-auto">
                            <Image
                              src={project.imgUrl}
                              alt={project?.name || "Project Image"}
                              fill
                              style={{ objectFit: 'cover' }}
                              className="rounded-md"
                              priority
                            />
                          </div>
                        )}
                        <p className="mt-8 text-muted-foreground pt-8">Generated by Qatalyst AI on {new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  );
                }
                
                if (section.type === 'executiveSummary') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto">
                      <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">{section.title}</h2>
                      <div className="whitespace-pre-line text-sm">
                        {reportData.executiveSummary}
                      </div>
                    </div>
                  );
                }
                
                if (section.type === 'projectSummary') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto">
                      <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">{section.title}</h2>
                      <div className="grid grid-cols-2 gap-6">
                        {Object.entries(reportData.projectSummary).map(([key, value]: [string, string]) => (
                          <div key={key} className="space-y-2 p-3 border rounded-md bg-muted/20">
                            <p className="text-sm font-semibold">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</p>
                            <p className="text-sm">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                
                if (section.type === 'financialOverview') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto">
                      <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">{section.title}</h2>
                      <div className="grid grid-cols-2 gap-6">
                        {Object.entries(reportData.financialOverview).map(([key, value]: [string, string]) => (
                          <div key={key} className="space-y-2 p-3 border rounded-md bg-muted/20">
                            <p className="text-sm font-semibold">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</p>
                            <p className="text-sm font-medium text-primary">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                
                if (section.type === 'financialAssessment') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto">
                      <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">{section.title}</h2>
                      
                      <div className="overflow-hidden border rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-muted">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-1/4">
                                Criterion
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-1/4">
                                Value
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-2/4">
                                Assessment
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-background divide-y divide-gray-200">
                            {mockFinancialAssessmentData.map((item, i) => (
                              <tr key={i} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                                <td className="px-4 py-3 text-sm font-medium">
                                  {item.criterion}
                                </td>
                                <td className="px-4 py-3 text-sm text-primary font-medium">
                                  {item.value}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  {item.assessment}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {section.includeSources && (
                        <div className="mt-6 pt-4 border-t">
                          <h3 className="text-lg font-medium mb-2">{t('reportBuilder.appendices')}: {t('reportBuilder.financialAssessmentSources')}</h3>
                          <div className="space-y-2">
                            {mockFinancialAssessmentSources.map(source => (
                              <div key={source.id} className="p-2 bg-muted rounded-md">
                                <p className="text-sm font-medium">{source.name}</p>
                                <p className="text-xs text-muted-foreground">{source.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                
                if (section.type === 'esgAssessment') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto">
                      <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">{section.title}</h2>
                      
                      <div className="space-y-4">
                        {Object.entries(mockEsgAssessmentData).map(([key, value]) => (
                          <div key={key} className="p-4 border rounded-md bg-muted/10">
                            <div className="flex justify-between mb-3">
                              <h3 className="text-md font-medium">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                              </h3>
                              <div className={`text-xs px-3 py-1 rounded-full ${
                                value.rating === 'Satisfactory' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' 
                                  : value.rating === 'Investigate' 
                                    ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200' 
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                              }`}>
                                {value.rating}
                              </div>
                            </div>
                            <p className="text-sm">{value.assessment}</p>
                          </div>
                        ))}
                      </div>
                      
                      {section.includeSources && (
                        <div className="mt-6 pt-4 border-t">
                          <h3 className="text-lg font-medium mb-2">{t('reportBuilder.appendices')}: {t('reportBuilder.esgAssessmentSources')}</h3>
                          <div className="space-y-2">
                            {mockEsgAssessmentSources.map(source => (
                              <div key={source.id} className="p-3 bg-muted rounded-md">
                                <p className="text-sm font-medium">{source.name}</p>
                                <p className="text-xs text-muted-foreground">{source.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                
                if (section.type === 'sdgContributions') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto">
                      <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">{section.title}</h2>
                      <div className="grid grid-cols-2 gap-6">
                        {reportData.sdgContributions.map((sdg: SdgContribution) => (
                          <div key={sdg.sdg} className="flex items-center space-x-4 p-3 border rounded-md bg-muted/10">
                            <div className="flex-shrink-0">
                              <Image
                                src={`/icons/goal-${sdg.sdg.toString().padStart(2, '0')}.svg`}
                                alt={`SDG ${sdg.sdg}`}
                                width={50}
                                height={50}
                                className="h-12 w-12"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium">SDG {sdg.sdg}: {sdg.name}</p>
                              <p className="text-sm font-semibold mt-1">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                  sdg.contribution === 'Major' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' 
                                    : sdg.contribution === 'Significant' 
                                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                                }`}>
                                  Contribution: {sdg.contribution}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                
                if (section.type === 'customText') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto">
                      <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">{section.title}</h2>
                      <div className="whitespace-pre-line text-sm">{section.content}</div>
                    </div>
                  );
                }
                
                if (section.type === 'aiGenerated') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto">
                      <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">{section.title}</h2>
                      {section.isGenerating ? (
                        <div className="flex items-center justify-center p-8">
                          <div className="flex flex-col items-center gap-4">
                            <QatalystAiIcon className="h-8 w-8 animate-pulse" />
                            <p className="text-sm">{t('reportBuilder.generating')}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="whitespace-pre-line text-sm">{section.content}</div>
                      )}
                    </div>
                  );
                }
                
                return null;
              })}
              
              {/* Reference Documents Section */}
              {reportData?.referencedDocuments && reportData.referencedDocuments.length > 0 && (
                <div className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto">
                  <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">Reference Documents</h2>
                  <div className="space-y-4">
                    {reportData?.referencedDocuments?.map(file => (
                      <div key={file.id} className="border rounded-md p-4 bg-muted/10 hover:bg-muted/20 transition-colors">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            {file.type.includes('pdf') ? (
                              <FileIcon className="h-8 w-8 text-red-500" />
                            ) : file.type.includes('word') || file.type.includes('doc') ? (
                              <FileText className="h-8 w-8 text-blue-500" />
                            ) : file.type.includes('excel') || file.type.includes('sheet') ? (
                              <FileText className="h-8 w-8 text-green-500" />
                            ) : (
                              <FileText className="h-8 w-8 text-gray-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{file.name}</p>
                            {file.insights && (
                              <p className="text-sm text-muted-foreground mt-2">{file.insights}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <QatalystResponse
              title=""
              prompt={prompt}
              response={
                reportData?.referencedDocuments && reportData?.referencedDocuments?.length > 0 
                ? (prompt.toLowerCase().includes('financial') || prompt.toLowerCase().includes('carbon credit')
                  ? `I've generated a financial analysis report focused on carbon credit projections for the Tonle Sap project, incorporating insights from your ${reportData?.referencedDocuments?.length} uploaded reference document${reportData?.referencedDocuments?.length > 1 ? 's' : ''}. The analysis includes refined financial metrics based on the audit data you provided, showing stronger performance than initial estimates.`
                  : prompt.toLowerCase().includes('esg') || prompt.toLowerCase().includes('community')
                  ? `I've created a comprehensive ESG impact report with special emphasis on community benefits, enhanced with data from your ${reportData?.referencedDocuments?.length} uploaded reference document${reportData?.referencedDocuments?.length > 1 ? 's' : ''}. The report incorporates the latest social impact metrics showing higher community income improvements and more extensive educational program reach.`
                  : prompt.toLowerCase().includes('executive') || prompt.toLowerCase().includes('investor')
                  ? `I've prepared an executive summary tailored for investors, using insights from your ${reportData?.referencedDocuments?.length} uploaded reference document${reportData?.referencedDocuments?.length > 1 ? 's' : ''} to refine the financial projections and risk assessments. The report presents a more accurate picture of the investment opportunity based on the latest verification data.`
                  : `The report has been generated based on your ${reportData?.referencedDocuments?.length} uploaded reference document${reportData?.referencedDocuments?.length > 1 ? 's' : ''} and Qatalyst's analysis. I've incorporated key insights from these materials to provide a more accurate assessment of the project's value and impact.`)
                : (prompt.toLowerCase().includes('financial') || prompt.toLowerCase().includes('carbon credit')
                  ? "I've generated a financial analysis report focused on carbon credit projections for the Tonle Sap project. The report includes detailed financial metrics such as project value, revenue projections, breakeven analysis, and ROI calculations. This report is optimized for financial decision-makers and carbon market analysts."
                  : prompt.toLowerCase().includes('esg') || prompt.toLowerCase().includes('community')
                  ? "I've created a comprehensive ESG impact report with special emphasis on community benefits. The report details the project's social impact across 12 villages, environmental co-benefits beyond carbon sequestration, and governance structures that ensure equitable benefit sharing with local stakeholders."
                  : prompt.toLowerCase().includes('executive') || prompt.toLowerCase().includes('investor')
                  ? "I've prepared an executive summary tailored for investors, highlighting the financial opportunity and risk-return profile. The report includes key investment metrics (IRR, NPV, payback period), market positioning analysis, risk mitigation strategies, and strategic exit options."
                  : "The report has been generated based on available data from the project documents and Qatalyst's analysis. The report highlights key financial metrics, ESG benefits, and SDG contributions. You can customize this report by adding, removing, or reordering sections.")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}