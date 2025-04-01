'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getProjectId } from '@/mock/data';
import { 
  FileIcon, 
  Send, 
  Plus, 
  Trash2, 
  GripVertical, 
  FileText, 
  Download, 
  Brain,
  PenLine,
  UploadCloud,
  X,
  FileUp,
  FileCheck,
  BookImage
} from 'lucide-react';
import QatalystAiIcon from '@/public/icons/AI-icon.svg';
import React from 'react';
import Logo from '@/public/icons/logo.svg';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { TopBar } from '@/components/topbar';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ProjectInfoTooltip } from '@/components/project-info-tooltip';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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

// Draggable section component
const DraggableSection = ({ 
  section, 
  index, 
  moveItem, 
  toggleSources, 
  removeSection,
}: { 
  section: ReportSection, 
  index: number, 
  moveItem: (dragIndex: number, hoverIndex: number) => void, 
  toggleSources: (id: string) => void,
  removeSection: (id: string) => void,
  moveSection: (id: string, direction: 'up' | 'down') => void
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'REPORT_SECTION',
    item: { id: section.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const [, drop] = useDrop({
    accept: 'REPORT_SECTION',
    hover: (item: { id: string, index: number }, monitor) => {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = item.index;
      const hoverIndex = index;
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      
      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      
      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);
      
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  
  drag(drop(ref));
  
  return (
    <div 
      ref={ref} 
      className={`flex items-center p-2 border rounded-md bg-background ${isDragging ? 'opacity-50 border-dashed border-primary' : ''} hover:border-primary transition-colors duration-200`}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="mr-2 text-muted-foreground cursor-grab flex hover:text-primary">
              <GripVertical className="h-5 w-5" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Drag to reorder</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex-1 font-medium">{section.title}</div>
      <div className="flex items-center space-x-2">
        {(section.type === 'financialAssessment' || section.type === 'esgAssessment') && (
          <div className="flex items-center space-x-1">
            <input 
              type="checkbox" 
              id={`sources-${section.id}`}
              checked={section.includeSources}
              onChange={() => toggleSources(section.id)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor={`sources-${section.id}`} className="text-xs text-muted-foreground">
              Include Sources
            </label>
          </div>
        )}
        <div className="flex space-x-1">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => removeSection(section.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

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


export function ReportBuilderClient({ projectId }: { projectId: string }) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<ReportData | null>(null);
  const [reportSections, setReportSections] = useState<ReportSection[]>([]);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionPrompt, setNewSectionPrompt] = useState('');
  const [newSectionContent, setNewSectionContent] = useState('');
  const [addSectionType, setAddSectionType] = useState<SectionType>('customText');
  const [addSectionDialogOpen, setAddSectionDialogOpen] = useState(false);
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);
  const [isUploadDrawerOpen, setIsUploadDrawerOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const project = getProjectId(projectId);
  
  // Generate a unique ID for sections
  const generateId = () => `section-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  // Load saved report from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedReport = localStorage.getItem(`report-${projectId}`);
      
      if (savedReport) {
        try {
          const parsedData = JSON.parse(savedReport);
          setGeneratedReport(parsedData.report);
          setReportSections(parsedData.sections);
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
  }, [projectId]);

  // Log the project data to ensure we have the image URL
  useEffect(() => {
    if (project) {
      console.log('Project data loaded:', project);
    }
  }, [project]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Create default sections when a report is generated
  useEffect(() => {
    if (generatedReport && reportSections.length === 0) {
      setReportSections([
        { id: generateId(), type: 'executiveSummary', title: 'Executive Summary' },
        { id: generateId(), type: 'projectSummary', title: 'Project Summary' },
        { id: generateId(), type: 'financialOverview', title: 'Financial Overview' },
        { id: generateId(), type: 'financialAssessment', title: 'Financial Assessment', includeSources: false },
        { id: generateId(), type: 'esgAssessment', title: 'ESG Assessment', includeSources: false },
        { id: generateId(), type: 'sdgContributions', title: 'SDG Contributions' }
      ]);
    }
  }, [generatedReport]);
  
  // Save report to localStorage whenever it changes
  useEffect(() => {
    if (generatedReport && reportSections.length > 0 && typeof window !== 'undefined') {
      localStorage.setItem(`report-${projectId}`, JSON.stringify({
        report: generatedReport,
        sections: reportSections,
        prompt: inputValue,
        uploadedFiles: uploadedFiles
      }));
    }
  }, [generatedReport, reportSections, projectId, inputValue, uploadedFiles]);

  // Function to delete saved report
  const handleDeleteReport = () => {
    // Clear from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`report-${projectId}`);
    }
    
    // Reset state
    setGeneratedReport(null);
    setReportSections([]);
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
    setReportSections([]);
    
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
    setReportSections([]);
    
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

  const addSection = () => {
    if ((addSectionType === 'customText' || addSectionType === 'coverPage') && !newSectionTitle) {
      return;
    }

    const newSection: ReportSection = {
      id: generateId(),
      type: addSectionType,
      title: newSectionTitle || t(`reportBuilder.addSectionTypes.${addSectionType}`),
      content: addSectionType === 'customText' ? newSectionContent : undefined,
      prompt: addSectionType === 'aiGenerated' ? newSectionPrompt : undefined,
      isGenerating: addSectionType === 'aiGenerated' ? true : undefined,
      coverTitle: addSectionType === 'coverPage' ? newSectionTitle : undefined,
      coverSubtitle: addSectionType === 'coverPage' ? newSectionContent : undefined
    };

    setReportSections([...reportSections, newSection]);
    setAddSectionDialogOpen(false);
    
    // Reset form
    setNewSectionTitle('');
    setNewSectionPrompt('');
    setNewSectionContent('');
    setAddSectionType('customText');

    // If it's an AI-generated section, simulate generation
    if (addSectionType === 'aiGenerated') {
      setTimeout(() => {
        setReportSections(sections => 
          sections.map(section => 
            section.id === newSection.id 
              ? { 
                  ...section, 
                  isGenerating: false, 
                  content: `This is an AI-generated section based on the prompt: "${newSectionPrompt}"\n\nThe ${project?.name || 'project'} demonstrates strong potential for both environmental impact and financial returns. Based on the assessment of similar projects in the region, we anticipate this initiative will deliver approximately 15% higher carbon credit yields than the regional average, making it an attractive investment opportunity.` 
                } 
              : section
          )
        );
      }, 3000);
    }
  };

  const removeSection = (id: string) => {
    setReportSections(reportSections.filter(section => section.id !== id));
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const index = reportSections.findIndex(section => section.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === reportSections.length - 1)
    ) {
      return;
    }

    const newSections = [...reportSections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const [removed] = newSections.splice(index, 1);
    newSections.splice(newIndex, 0, removed);
    setReportSections(newSections);
  };
  
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const newSections = [...reportSections];
    const dragItem = newSections[dragIndex];
    newSections.splice(dragIndex, 1);
    newSections.splice(hoverIndex, 0, dragItem);
    setReportSections(newSections);
  };
  
  const toggleSources = (id: string) => {
    setReportSections(reportSections.map(section => 
      section.id === id 
        ? { ...section, includeSources: !section.includeSources }
        : section
    ));
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
            <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setIsUploadDrawerOpen(true)}
                      disabled={isGenerating}
                      className="relative"
                    >
                      <FileUp className="h-4 w-4" />
                      {uploadedFiles.length > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-primary text-primary-foreground rounded-full flex items-center justify-center">
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
          
            {isCustomizing && (
              <Card className="p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{t('reportBuilder.reportSections')}</h3>
                  <Dialog open={addSectionDialogOpen} onOpenChange={setAddSectionDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        {t('reportBuilder.addSection')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t('reportBuilder.addSection')}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="font-medium">Section Type</label>
                          <div className="grid grid-cols-2 gap-2">
                            <Button 
                              type="button" 
                              variant={addSectionType === 'coverPage' ? "default" : "outline"}
                              className="justify-start"
                              onClick={() => setAddSectionType('coverPage')}
                            >
                              <BookImage className="mr-2 h-4 w-4" />
                              Cover Page
                            </Button>
                            <Button 
                              type="button" 
                              variant={addSectionType === 'customText' ? "default" : "outline"}
                              className="justify-start"
                              onClick={() => setAddSectionType('customText')}
                            >
                              <PenLine className="mr-2 h-4 w-4" />
                              {t('reportBuilder.addSectionTypes.text')}
                            </Button>
                            <Button 
                              type="button" 
                              variant={addSectionType === 'aiGenerated' ? "default" : "outline"}
                              className="justify-start"
                              onClick={() => setAddSectionType('aiGenerated')}
                            >
                              <Brain className="mr-2 h-4 w-4" />
                              {t('reportBuilder.addSectionTypes.ai')}
                            </Button>
                            <Button 
                              type="button" 
                              variant={addSectionType === 'projectSummary' ? "default" : "outline"}
                              className="justify-start"
                              onClick={() => setAddSectionType('projectSummary')}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              {t('reportBuilder.addSectionTypes.projectSummary')}
                            </Button>
                            <Button 
                              type="button" 
                              variant={addSectionType === 'financialOverview' ? "default" : "outline"}
                              className="justify-start"
                              onClick={() => setAddSectionType('financialOverview')}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              {t('reportBuilder.addSectionTypes.financialOverview')}
                            </Button>
                            <Button 
                              type="button" 
                              variant={addSectionType === 'financialAssessment' ? "default" : "outline"}
                              className="justify-start"
                              onClick={() => setAddSectionType('financialAssessment')}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              {t('reportBuilder.addSectionTypes.financialAssessment')}
                            </Button>
                            <Button 
                              type="button" 
                              variant={addSectionType === 'esgAssessment' ? "default" : "outline"}
                              className="justify-start"
                              onClick={() => setAddSectionType('esgAssessment')}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              {t('reportBuilder.addSectionTypes.esgAssessment')}
                            </Button>
                          </div>
                        </div>
                        
                        {addSectionType === 'coverPage' && (
                          <>
                            <div className="space-y-2">
                              <label className="font-medium">Cover Page Title</label>
                              <Input 
                                value={newSectionTitle}
                                onChange={(e) => setNewSectionTitle(e.target.value)}
                                placeholder="Enter the main title for the cover page..."
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="font-medium">Cover Page Subtitle</label>
                              <Input 
                                value={newSectionContent}
                                onChange={(e) => setNewSectionContent(e.target.value)}
                                placeholder="Enter the subtitle for the cover page..."
                              />
                            </div>
                          </>
                        )}
                        
                        {addSectionType === 'customText' && (
                          <>
                            <div className="space-y-2">
                              <label className="font-medium">{t('reportBuilder.sectionTitle')}</label>
                              <Input 
                                value={newSectionTitle}
                                onChange={(e) => setNewSectionTitle(e.target.value)}
                                placeholder="Enter section title..."
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="font-medium">Content</label>
                              <Textarea 
                                value={newSectionContent}
                                onChange={(e) => setNewSectionContent(e.target.value)}
                                placeholder="Enter section content..."
                                className="min-h-[150px]"
                              />
                            </div>
                          </>
                        )}
                        
                        {addSectionType === 'aiGenerated' && (
                          <>
                            <div className="space-y-2">
                              <label className="font-medium">{t('reportBuilder.sectionTitle')}</label>
                              <Input 
                                value={newSectionTitle}
                                onChange={(e) => setNewSectionTitle(e.target.value)}
                                placeholder="Enter section title..."
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="font-medium">{t('reportBuilder.promptForSection')}</label>
                              <Textarea 
                                value={newSectionPrompt}
                                onChange={(e) => setNewSectionPrompt(e.target.value)}
                                placeholder="E.g. Analyze the carbon credit price projections for this project..."
                                className="min-h-[100px]"
                              />
                            </div>
                          </>
                        )}
                      </div>
                      <DialogFooter>
                        <Button 
                          onClick={addSection}
                          disabled={(addSectionType === 'customText' && !newSectionTitle) || 
                                    (addSectionType === 'aiGenerated' && (!newSectionTitle || !newSectionPrompt))}
                        >
                          {t('reportBuilder.addSection')}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="space-y-2">
                  <DndProvider backend={HTML5Backend}>
                    {reportSections.map((section, index) => (
                      <DraggableSection
                        key={section.id}
                        section={section}
                        index={index}
                        moveItem={moveItem}
                        toggleSources={toggleSources}
                        removeSection={removeSection}
                        moveSection={moveSection}
                      />
                    ))}
                  </DndProvider>
                </div>
              </Card>
            )}
            
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
                        {generatedReport.executiveSummary}
                      </div>
                    </div>
                  );
                }
                
                if (section.type === 'projectSummary') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto">
                      <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">{section.title}</h2>
                      <div className="grid grid-cols-2 gap-6">
                        {Object.entries(generatedReport.projectSummary).map(([key, value]: [string, string]) => (
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
                        {Object.entries(generatedReport.financialOverview).map(([key, value]: [string, string]) => (
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
                        {generatedReport.sdgContributions.map((sdg: SdgContribution) => (
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
              {generatedReport?.referencedDocuments && generatedReport.referencedDocuments.length > 0 && (
                <div className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto">
                  <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">Reference Documents</h2>
                  <div className="space-y-4">
                    {generatedReport.referencedDocuments.map(file => (
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