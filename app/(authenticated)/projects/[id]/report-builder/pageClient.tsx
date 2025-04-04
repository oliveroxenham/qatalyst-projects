'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getProjectId } from '@/mock/data';
import { 
  FileIcon, 
  Send, 
  FileText, 
  Download, 
  PenLine,
  UploadCloud,
  X,
  FileUp,
  FileCheck,
  BookOpen,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Presentation,
  Trash2
} from 'lucide-react';
import QatalystAiIcon from '@/public/icons/AI-icon.svg';
import Logo from '@/public/icons/logo.svg';
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
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

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

// File Upload Drawer Component
function DocumentUploadDrawer({
  isOpen,
  onClose,
  uploadedFiles,
  onFileUpload,
  onRemoveFile,
}: {
  isOpen: boolean;
  onClose: () => void;
  uploadedFiles: UploadedFile[];
  onFileUpload: (files: FileList) => void;
  onRemoveFile: (fileId: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const { t } = useTranslation();
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files);
    }
  };
  
  const triggerFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) {
      return <FileIcon className="h-8 w-8 text-red-500" />;
    } else if (fileType.includes('word') || fileType.includes('doc')) {
      return <FileText className="h-8 w-8 text-blue-500" />;
    } else if (fileType.includes('excel') || fileType.includes('sheet') || fileType.includes('csv')) {
      return <FileText className="h-8 w-8 text-green-500" />;
    } else {
      return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      direction="right"
      dismissible={true}
    >
      <DrawerContent>
        <DrawerHeader className="bg-neutral-100 dark:bg-gray-800 h-[88px] flex flex-row items-center justify-between px-4">
          <DrawerTitle>
            <span className="text-lg text-foreground dark:text-white font-bold">
              Report Reference Documents
            </span>
          </DrawerTitle>
          <DrawerClose asChild>
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              <X />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        
        <div className="p-6 space-y-4">
          <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted transition-colors cursor-pointer"
            onClick={triggerFileDialog}>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              multiple 
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
            />
            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Reference Documents</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop or click to upload audit reports, financial assessments, or other reference materials
            </p>
            <Button variant="secondary" size="sm" className="mx-auto">
              <FileUp className="mr-2 h-4 w-4" />
              Select Files
            </Button>
          </div>
          
          {uploadedFiles.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">Uploaded Documents</h3>
              <div className="space-y-2">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="border rounded-md p-4 flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {file.isAnalyzing ? (
                        <div className="flex items-center space-x-2 text-amber-500">
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-xs">Analyzing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-green-500">
                          <FileCheck className="h-4 w-4" />
                          <span className="text-xs">Analyzed</span>
                        </div>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive h-8 w-8"
                        onClick={() => onRemoveFile(file.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function ReportBuilderClient({ projectId }: { projectId: string }) {
  const router = useRouter();
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<ReportData | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);
  const [isUploadDrawerOpen, setIsUploadDrawerOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const project = getProjectId(projectId);

  // Load saved report from localStorage and redirect to preview if exists
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedReport = localStorage.getItem(`report-${projectId}`);
      
      if (savedReport) {
        try {
          const parsedData = JSON.parse(savedReport);
          
          // If we have valid report data, redirect to preview
          if (parsedData.report && parsedData.sections) {
            router.push(`/projects/${projectId}/report-builder/preview`);
            return;
          }
          
          // Otherwise, load the data for the form
          setGeneratedReport(parsedData.report);
          setInputValue(parsedData.prompt || '');
          setLoadedFromStorage(true);
          
          // Reset loaded notification after 5 seconds
          setTimeout(() => {
            setLoadedFromStorage(false);
          }, 5000);
        } catch (error) {
          console.error('Error parsing saved report:', error);
        }
      }
    }
  }, [projectId, router]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Save report to localStorage and redirect to preview
  useEffect(() => {
    if (generatedReport && typeof window !== 'undefined') {
      localStorage.setItem(`report-${projectId}`, JSON.stringify({
        report: generatedReport,
        sections: [
          { id: `section-${Date.now()}-1`, type: 'executiveSummary', title: 'Executive Summary' },
          { id: `section-${Date.now()}-2`, type: 'projectSummary', title: 'Project Summary' },
          { id: `section-${Date.now()}-3`, type: 'financialOverview', title: 'Financial Overview' },
          { id: `section-${Date.now()}-4`, type: 'financialAssessment', title: 'Financial Assessment', includeSources: false },
          { id: `section-${Date.now()}-5`, type: 'esgAssessment', title: 'ESG Assessment', includeSources: false },
          { id: `section-${Date.now()}-6`, type: 'sdgContributions', title: 'SDG Contributions' }
        ],
        prompt: inputValue,
        uploadedFiles: uploadedFiles
      }));
      
      // Redirect to preview page upon initial report generation
      if (!loadedFromStorage) {
        router.push(`/projects/${projectId}/report-builder/preview`);
      }
    }
  }, [generatedReport, projectId, inputValue, uploadedFiles, loadedFromStorage, router]);

  // Function to delete saved report
  const handleDeleteReport = () => {
    // Clear from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`report-${projectId}`);
    }
    
    // Reset state
    setGeneratedReport(null);
    setInputValue('');
    setIsCustomizing(false);
    setLoadedFromStorage(false);
    setUploadedFiles([]);
  };
  
  // File handling functions
  const handleFileUpload = (files: FileList) => {
    const newFiles: UploadedFile[] = [];
    
    Array.from(files).forEach(file => {
      const fileId = `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      newFiles.push({
        id: fileId,
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        isAnalyzing: true
      });
      
      // Simulate AI analysis of the file
      setTimeout(() => {
        setUploadedFiles(currentFiles => 
          currentFiles.map(f => 
            f.id === fileId
              ? {
                  ...f,
                  isAnalyzing: false,
                  insights: generateFileInsights(file.name)
                }
              : f
          )
        );
      }, 2000 + Math.random() * 3000); // Random time between 2-5 seconds
    });
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };
  
  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles(files => files.filter(file => file.id !== fileId));
  };
  
  const generateFileInsights = (fileName: string) => {
    // In a real application, this would be an AI analysis of the file content
    // Here we'll simulate insights based on the file name and type
    
    if (fileName.toLowerCase().includes('audit') || fileName.toLowerCase().includes('report')) {
      return "Contains financial performance data, carbon credit verification records, and compliance information relevant to project valuation.";
    } else if (fileName.toLowerCase().includes('financial') || fileName.toLowerCase().includes('finance')) {
      return "Includes project cash flow projections, expense breakdowns, and revenue forecasts valuable for financial assessment.";
    } else if (fileName.toLowerCase().includes('community') || fileName.toLowerCase().includes('social')) {
      return "Details community engagement activities, social impact metrics, and stakeholder feedback useful for ESG assessment.";
    } else if (fileName.toLowerCase().includes('environment') || fileName.toLowerCase().includes('biodiversity')) {
      return "Contains environmental impact data, biodiversity metrics, and ecosystem service valuations relevant to ESG scoring.";
    } else {
      return "Document contains relevant project information that will be referenced during report generation.";
    }
  };

  // Financial report data
  const financialReportData: ReportData = {
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
      returnOnInvestment: '18.5% (5-year)',
      annualOperatingMargin: '42%',
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
      { sdg: 13, name: 'Climate Action', contribution: 'Major' },
      { sdg: 15, name: 'Life on Land', contribution: 'Major' },
      { sdg: 8, name: 'Decent Work and Economic Growth', contribution: 'Moderate' },
      { sdg: 1, name: 'No Poverty', contribution: 'Moderate' },
    ],
    executiveSummary: `
      Financial Analysis Summary for Tonle Sap Flooded Forest Protection Project

      This financial summary focuses on the carbon credit projections and financial viability of the Tonle Sap Flooded Forest Protection project in Cambodia.
      
      With a total expected carbon credit issuance of 21,171,578 tCO₂e over its lifetime and annual generation of 704,000 tCO₂e, this project represents a significant opportunity in the voluntary carbon market. Based on the current carbon price assumption of $15/tCO₂e, the project is expected to generate annual revenues of $10.5 million.
      
      Capital expenditure for project establishment is estimated at $12.5 million, with annual operating expenses of $850,000. This results in a favorable breakeven point of 3.4 years and a 5-year return on investment of 18.5%, significantly exceeding the industry average of 12% for REDD+ projects.
      
      The project's financial efficiency metrics are particularly strong, with a cost of production per carbon credit of $4.80, compared to the industry average of $5.70. This provides a comfortable buffer against carbon price volatility and ensures sustainable project economics even in conservative market scenarios.
      
      We recommend this project as a financially sound investment opportunity with strong carbon credit generation potential and above-average returns for the risk profile.
    `,
  };

  // ESG impact report data
  const esgReportData: ReportData = {
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
        'Carbon sequestration of 704,000 tCO₂e annually',
        'Protection of 120+ endemic plant species',
      ],
      socialBenefits: [
        'Employment for 120 local community members',
        'Improved livelihoods for 1,500 households through sustainable forestry practices',
        'Development of community infrastructure including 5 schools and 3 health centers',
        'Training programs reaching 2,000 community members',
        'Healthcare access improvements for 12 villages',
        'Clean water access for 3,500 residents',
        'Gender equality initiatives with 45% women in project leadership roles',
        'Indigenous rights protection for 4 local communities',
      ],
      governanceBenefits: [
        'Strengthened local governance of natural resources',
        'Community-led forest monitoring program',
        'Transparent benefit-sharing mechanism with local stakeholders',
        'Regular audits and third-party verification',
        'Anti-corruption safeguards and whistleblower protection',
        'Participatory decision-making structure with community representation',
      ],
    },
    sdgContributions: [
      { sdg: 1, name: 'No Poverty', contribution: 'Significant' },
      { sdg: 3, name: 'Good Health and Well-being', contribution: 'Moderate' },
      { sdg: 4, name: 'Quality Education', contribution: 'Moderate' },
      { sdg: 5, name: 'Gender Equality', contribution: 'Moderate' },
      { sdg: 6, name: 'Clean Water and Sanitation', contribution: 'Significant' },
      { sdg: 8, name: 'Decent Work and Economic Growth', contribution: 'Significant' },
      { sdg: 10, name: 'Reduced Inequalities', contribution: 'Moderate' },
      { sdg: 13, name: 'Climate Action', contribution: 'Major' },
      { sdg: 15, name: 'Life on Land', contribution: 'Major' },
      { sdg: 17, name: 'Partnerships for the Goals', contribution: 'Moderate' },
    ],
    executiveSummary: `
      ESG Impact Report for Tonle Sap Flooded Forest Protection Project - Community Benefits Focus

      The Tonle Sap Flooded Forest Protection project delivers exceptional environmental, social, and governance benefits to local communities while addressing climate change through carbon sequestration.

      Social Impact:
      The project directly improves the lives of 1,500 households across 12 villages through sustainable livelihood programs. It has created 120 permanent jobs, with 45% of positions filled by women and 35% by indigenous community members. Through our community development fund, $2.5 million has been allocated to build 5 schools and 3 health centers, expanding educational access to 850 children and healthcare access to over 3,500 residents.

      Community Engagement:
      Our participatory governance model ensures local communities maintain decision-making power over resource management. The project established 8 community forest management committees with 120 trained community members conducting regular forest patrols. Benefit-sharing mechanisms ensure 40% of carbon revenues flow directly back to community development initiatives prioritized through democratic consultation processes.

      Environmental Co-benefits:
      Beyond carbon sequestration, the project protects critical habitat for 28 endangered species and preserves the Tonle Sap Lake ecosystem, vital for local fishing communities. Water quality monitoring shows marked improvements, with a 65% reduction in sedimentation and 45% improvement in water purity indices.

      This project exemplifies how climate action can simultaneously address multiple sustainable development goals while empowering local communities through meaningful participation and equitable benefit-sharing.
    `,
  };

  // Executive summary report data
  const executiveSummaryReportData: ReportData = {
    projectSummary: {
      projectName: 'Tonle Sap Flooded Forest Protection',
      country: 'Cambodia',
      projectType: 'REDD+',
      startDate: '2025-04-01',
      status: 'Active',
      projectArea: '566,560 hectares',
      creditsIssued: '21,171,578 tCO₂e',
      annualReductions: '704,000 tCO₂e/year',
      verificationStandard: 'Verra VCS & CCB Standards',
      credibilityRating: 'Premium (AA)',
    },
    financialOverview: {
      projectValue: '$25,000,000',
      capitalExpense: '$12,500,000',
      operatingExpense: '$850,000/year',
      revenueProjection: '$10,500,000/year',
      breakEvenPoint: '3.4 years',
      carbonPriceAssumption: '$15/tCO₂e',
      IRR: '22.3%',
      NPV: '$18.7 million',
      paybackPeriod: '3.2 years',
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
      Executive Summary for Investors - Tonle Sap Flooded Forest Protection Project

      Investment Opportunity Overview
      The Tonle Sap Flooded Forest Protection Project presents a premium investment opportunity in the rapidly growing voluntary carbon market. This REDD+ project in Cambodia is designed to protect 566,560 hectares of critical forest habitat while generating 704,000 tCO₂e annually over a 30-year crediting period.

      Financial Highlights
      • Project Valuation: $25 million
      • Annual Revenue: $10.5 million (based on $15/tCO₂e)
      • IRR: 22.3% (significantly above sector average of 15.7%)
      • Payback Period: 3.2 years
      • NPV: $18.7 million (10% discount rate)
      • Operating Margin: 42% (industry top quartile)

      Market Position
      This project is certified under both Verra VCS and CCB Standards (Climate, Community & Biodiversity), positioning it in the premium segment of the carbon market. With growing corporate net-zero commitments and the implementation of Article 6 of the Paris Agreement, demand for high-integrity credits is projected to increase by 15x by 2030.

      Risk Mitigation
      Key risks have been identified and mitigated through:
      • Robust buffer pool allocations (25% of credits)
      • Legal forest protection agreements with government agencies
      • Community benefit-sharing frameworks ensuring long-term stakeholder support
      • Technical assistance from Conservation International with 20+ years in-country experience

      Strategic Exit Options
      1. Sale of future carbon rights to corporate buyers (pre-contracted offtake agreements)
      2. Partial asset sale in Year 5 at projected 2.5x valuation multiple
      3. Complete project sale to conservation trust or institutional investor

      This investment combines attractive financial returns with quantifiable climate impact and significant co-benefits across 10 Sustainable Development Goals, offering both financial and reputation benefits to investors.
    `,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setIsGenerating(true);
    
    // Determine which report data to use based on the input prompt
    let reportToGenerate: ReportData;
    
    if (inputValue.toLowerCase().includes('financial') || inputValue.toLowerCase().includes('carbon credit')) {
      reportToGenerate = financialReportData;
    } else if (inputValue.toLowerCase().includes('esg') || inputValue.toLowerCase().includes('community')) {
      reportToGenerate = esgReportData;
    } else if (inputValue.toLowerCase().includes('executive') || inputValue.toLowerCase().includes('investor')) {
      reportToGenerate = executiveSummaryReportData;
    } else {
      // Default to the financial report if no keywords match
      reportToGenerate = financialReportData;
    }
    
    // Add insights from uploaded files if available
    if (uploadedFiles.length > 0) {
      // Clone the report data to avoid mutating the original
      reportToGenerate = {
        ...reportToGenerate,
        referencedDocuments: uploadedFiles
      };
      
      // Enhance the executive summary with insights from uploaded files
      if (uploadedFiles.some(file => !file.isAnalyzing && file.insights)) {
        const insightsSummary = "Based on uploaded reference documents, ";
        
        // Add financial insights if relevant
        if (uploadedFiles.some(file => 
          file.name.toLowerCase().includes('financial') || 
          file.name.toLowerCase().includes('audit')
        )) {
          if (reportToGenerate === financialReportData) {
            reportToGenerate.executiveSummary = insightsSummary + "the project's financial performance indicators show stronger metrics than initially estimated. The audit reports confirm a 12% higher carbon credit generation capacity and a more favorable cost structure, reducing the breakeven timeline by approximately 8 months.\n\n" + reportToGenerate.executiveSummary;
          }
        }
        
        // Add ESG insights if relevant
        if (uploadedFiles.some(file => 
          file.name.toLowerCase().includes('community') || 
          file.name.toLowerCase().includes('environment') ||
          file.name.toLowerCase().includes('social')
        )) {
          if (reportToGenerate === esgReportData) {
            reportToGenerate.executiveSummary = insightsSummary + "community impact assessments validate stronger social outcomes than previously documented. Reference materials show a 35% increase in household income for participating communities and expanded educational programs reaching 22% more beneficiaries than initially reported.\n\n" + reportToGenerate.executiveSummary;
          }
        }
      }
    }
    
    // Simulate AI processing time
    setTimeout(() => {
      setGeneratedReport(reportToGenerate);
      setIsGenerating(false);
    }, 3000);
  };

  const handleExampleClick = (example: string) => {
    setInputValue(example);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Immediately generate a report based on the selected example
    setIsGenerating(true);
    
    // Determine which report data to use based on the example prompt
    let reportToGenerate: ReportData;
    
    if (example.toLowerCase().includes('financial') || example.toLowerCase().includes('carbon credit')) {
      reportToGenerate = financialReportData;
    } else if (example.toLowerCase().includes('esg') || example.toLowerCase().includes('community')) {
      reportToGenerate = esgReportData;
    } else if (example.toLowerCase().includes('executive') || example.toLowerCase().includes('investor')) {
      reportToGenerate = executiveSummaryReportData;
    } else {
      // Default to the financial report if no keywords match
      reportToGenerate = financialReportData;
    }
    
    // Add insights from uploaded files if available
    if (uploadedFiles.length > 0) {
      // Clone the report data to avoid mutating the original
      reportToGenerate = {
        ...reportToGenerate,
        referencedDocuments: uploadedFiles
      };
      
      // Enhance the executive summary with insights from uploaded files
      if (uploadedFiles.some(file => !file.isAnalyzing && file.insights)) {
        const insightsSummary = "Based on uploaded reference documents, ";
        
        // Add financial insights if relevant
        if (uploadedFiles.some(file => 
          file.name.toLowerCase().includes('financial') || 
          file.name.toLowerCase().includes('audit')
        )) {
          if (reportToGenerate === financialReportData) {
            reportToGenerate.executiveSummary = insightsSummary + "the project's financial performance indicators show stronger metrics than initially estimated. The audit reports confirm a 12% higher carbon credit generation capacity and a more favorable cost structure, reducing the breakeven timeline by approximately 8 months.\n\n" + reportToGenerate.executiveSummary;
          }
        }
        
        // Add ESG insights if relevant
        if (uploadedFiles.some(file => 
          file.name.toLowerCase().includes('community') || 
          file.name.toLowerCase().includes('environment') ||
          file.name.toLowerCase().includes('social')
        )) {
          if (reportToGenerate === esgReportData) {
            reportToGenerate.executiveSummary = insightsSummary + "community impact assessments validate stronger social outcomes than previously documented. Reference materials show a 35% increase in household income for participating communities and expanded educational programs reaching 22% more beneficiaries than initially reported.\n\n" + reportToGenerate.executiveSummary;
          }
        }
      }
    }
    
    // Simulate AI processing time
    setTimeout(() => {
      setGeneratedReport(reportToGenerate);
      setIsGenerating(false);
    }, 3000);
  };



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
          
          {loadedFromStorage && (
            <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-3 rounded-md flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Saved report loaded from storage
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto bg-card p-6 rounded-lg shadow-md border border-border">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('reportBuilder.inputPlaceholder')}
              className="flex-1 text-lg h-12"
              disabled={isGenerating}
            />
            <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setIsUploadDrawerOpen(true)}
                      disabled={isGenerating}
                      className="relative h-12 w-12"
                    >
                      <FileUp className="h-5 w-5" />
                      {uploadedFiles.length > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                          {uploadedFiles.length}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Upload reference documents</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            <Button 
              type="submit" 
              disabled={!inputValue.trim() || isGenerating}
              className="h-12 px-6"
            >
              {isGenerating ? t('reportBuilder.generating') : <Send className="h-5 w-5" />}
            </Button>
          </div>

          <div className="space-y-3">
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
          
          <div className="space-y-3 pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium">Select a template:</p>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => {
                    const container = document.getElementById('templates-carousel');
                    if (container) {
                      container.scrollBy({ left: -300, behavior: 'smooth' });
                    }
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => {
                    const container = document.getElementById('templates-carousel');
                    if (container) {
                      container.scrollBy({ left: 300, behavior: 'smooth' });
                    }
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div id="templates-carousel" className="flex overflow-x-auto pb-4 gap-4 scroll-smooth">
              <div className="flex-shrink-0 w-48 h-64">
                <div className="border-2 border-primary rounded-md p-4 bg-card hover:bg-primary/5 cursor-pointer transition-colors h-full flex flex-col shadow-sm dark:border-primary">
                  <div className="relative">
                    <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                      Active
                    </div>
                    <div className="h-32 bg-muted mb-3 flex items-center justify-center">
                      <FileText className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-center">A4 Portrait Report</h3>
                    <p className="text-xs text-center mt-1 text-muted-foreground">Standard report format</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 w-48 h-64">
                <div className="border rounded-md p-4 bg-card opacity-60 cursor-not-allowed h-full flex flex-col">
                  <div className="h-32 bg-muted mb-3 flex items-center justify-center">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-center">A4 Landscape Report</h3>
                    <p className="text-xs text-center mt-1 text-muted-foreground">Ideal for data-rich content</p>
                  </div>
                  <div className="mt-auto text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      Coming soon
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 w-48 h-64">
                <div className="border rounded-md p-4 bg-card opacity-60 cursor-not-allowed h-full flex flex-col">
                  <div className="h-32 bg-muted mb-3 flex items-center justify-center">
                    <Presentation className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-center">Presentation</h3>
                    <p className="text-xs text-center mt-1 text-muted-foreground">PowerPoint compatible</p>
                  </div>
                  <div className="mt-auto text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      Coming soon
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 w-48 h-64">
                <div className="border rounded-md p-4 bg-card opacity-60 cursor-not-allowed h-full flex flex-col">
                  <div className="h-32 bg-muted mb-3 flex items-center justify-center">
                    <LayoutDashboard className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-center">Dashboard</h3>
                    <p className="text-xs text-center mt-1 text-muted-foreground">Interactive analytics</p>
                  </div>
                  <div className="mt-auto text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      Coming soon
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 w-48 h-64">
                <div className="border rounded-md p-4 bg-card opacity-60 cursor-not-allowed h-full flex flex-col">
                  <div className="h-32 bg-muted mb-3 flex items-center justify-center">
                    <BookOpen className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-center">Interactive Report</h3>
                    <p className="text-xs text-center mt-1 text-muted-foreground">Digital-first experience</p>
                  </div>
                  <div className="mt-auto text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      Coming soon
                    </span>
                  </div>
                </div>
              </div>
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
              <div className="flex space-x-2">
                <Button 
                  variant={isCustomizing ? "outline" : "default"}
                  onClick={() => setIsCustomizing(!isCustomizing)}
                >
                  <PenLine className="mr-2 h-4 w-4" />
                  {t('reportBuilder.customizeReport')}
                </Button>
                
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteReport}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Report
                </Button>
                
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
            
            <div className="mt-6">
              <QatalystResponse
                title=""
                prompt={inputValue}
                response={
                  uploadedFiles.length > 0 
                  ? (inputValue.toLowerCase().includes('financial') || inputValue.toLowerCase().includes('carbon credit')
                    ? `I've generated a financial analysis report focused on carbon credit projections for the Tonle Sap project, incorporating insights from your ${uploadedFiles.length} uploaded reference document${uploadedFiles.length > 1 ? 's' : ''}. The analysis includes refined financial metrics based on the audit data you provided, showing stronger performance than initial estimates.`
                    : inputValue.toLowerCase().includes('esg') || inputValue.toLowerCase().includes('community')
                    ? `I've created a comprehensive ESG impact report with special emphasis on community benefits, enhanced with data from your ${uploadedFiles.length} uploaded reference document${uploadedFiles.length > 1 ? 's' : ''}. The report incorporates the latest social impact metrics showing higher community income improvements and more extensive educational program reach.`
                    : inputValue.toLowerCase().includes('executive') || inputValue.toLowerCase().includes('investor')
                    ? `I've prepared an executive summary tailored for investors, using insights from your ${uploadedFiles.length} uploaded reference document${uploadedFiles.length > 1 ? 's' : ''} to refine the financial projections and risk assessments. The report presents a more accurate picture of the investment opportunity based on the latest verification data.`
                    : `The report has been generated based on your ${uploadedFiles.length} uploaded reference document${uploadedFiles.length > 1 ? 's' : ''} and Qatalyst's analysis. I've incorporated key insights from these materials to provide a more accurate assessment of the project's value and impact.`)
                  : (inputValue.toLowerCase().includes('financial') || inputValue.toLowerCase().includes('carbon credit')
                    ? "I've generated a financial analysis report focused on carbon credit projections for the Tonle Sap project. The report includes detailed financial metrics such as project value, revenue projections, breakeven analysis, and ROI calculations. This report is optimized for financial decision-makers and carbon market analysts."
                    : inputValue.toLowerCase().includes('esg') || inputValue.toLowerCase().includes('community')
                    ? "I've created a comprehensive ESG impact report with special emphasis on community benefits. The report details the project's social impact across 12 villages, environmental co-benefits beyond carbon sequestration, and governance structures that ensure equitable benefit sharing with local stakeholders."
                    : inputValue.toLowerCase().includes('executive') || inputValue.toLowerCase().includes('investor')
                    ? "I've prepared an executive summary tailored for investors, highlighting the financial opportunity and risk-return profile. The report includes key investment metrics (IRR, NPV, payback period), market positioning analysis, risk mitigation strategies, and strategic exit options."
                    : "The report has been generated based on available data from the project documents and Qatalyst's analysis. The report highlights key financial metrics, ESG benefits, and SDG contributions. You can customize this report by adding, removing, or reordering sections.")
                }
              />
            </div>
          </div>
        )}
        
        {/* Document Upload Drawer */}
        <DocumentUploadDrawer
          isOpen={isUploadDrawerOpen}
          onClose={() => setIsUploadDrawerOpen(false)}
          uploadedFiles={uploadedFiles}
          onFileUpload={handleFileUpload}
          onRemoveFile={handleRemoveFile}
        />
      </div>
    </div>
  );
}