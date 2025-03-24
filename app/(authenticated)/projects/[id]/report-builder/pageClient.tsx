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
  PenLine
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

// Section types for customizable report
type SectionType = 
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
  const [reportSections, setReportSections] = useState<ReportSection[]>([]);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionPrompt, setNewSectionPrompt] = useState('');
  const [newSectionContent, setNewSectionContent] = useState('');
  const [addSectionType, setAddSectionType] = useState<SectionType>('customText');
  const [addSectionDialogOpen, setAddSectionDialogOpen] = useState(false);
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);
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
        prompt: inputValue
      }));
    }
  }, [generatedReport, reportSections, projectId, inputValue]);

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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setIsGenerating(true);
    setReportSections([]);
    
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

  const addSection = () => {
    if (addSectionType === 'customText' && !newSectionTitle) {
      return;
    }

    const newSection: ReportSection = {
      id: generateId(),
      type: addSectionType,
      title: newSectionTitle || t(`reportBuilder.addSectionTypes.${addSectionType}`),
      content: addSectionType === 'customText' ? newSectionContent : undefined,
      prompt: addSectionType === 'aiGenerated' ? newSectionPrompt : undefined,
      isGenerating: addSectionType === 'aiGenerated' ? true : undefined
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
            
            <Card className="p-6 space-y-6">
              {/* Report Header with Project Image */}
              <div className="space-y-4 border-b pb-6">
                {project?.imgUrl && (
                  <div className="mb-4 w-full h-[200px] relative overflow-hidden rounded-md">
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
                <div>
                  <h1 className="text-2xl font-bold">{project?.name || generatedReport.projectSummary.projectName} - Project Report</h1>
                  <p className="text-muted-foreground">Generated by Qatalyst AI on {new Date().toLocaleDateString()}</p>
                </div>
              </div>
              
              {/* Dynamic Sections */}
              {reportSections.map((section) => {
                if (section.type === 'executiveSummary') {
                  return (
                    <div key={section.id} className="space-y-2">
                      <h2 className="text-xl font-semibold">{section.title}</h2>
                      <div className="whitespace-pre-line text-sm">
                        {generatedReport.executiveSummary}
                      </div>
                    </div>
                  );
                }
                
                if (section.type === 'projectSummary') {
                  return (
                    <div key={section.id} className="space-y-2">
                      <h2 className="text-xl font-semibold">{section.title}</h2>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(generatedReport.projectSummary).map(([key, value]: [string, string]) => (
                          <div key={key} className="space-y-1">
                            <p className="text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</p>
                            <p className="text-sm">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                
                if (section.type === 'financialOverview') {
                  return (
                    <div key={section.id} className="space-y-2">
                      <h2 className="text-xl font-semibold">{section.title}</h2>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(generatedReport.financialOverview).map(([key, value]: [string, string]) => (
                          <div key={key} className="space-y-1">
                            <p className="text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</p>
                            <p className="text-sm">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                
                if (section.type === 'financialAssessment') {
                  return (
                    <div key={section.id} className="space-y-4">
                      <h2 className="text-xl font-semibold">{section.title}</h2>
                      
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
                                <td className="px-4 py-3 text-sm text-muted-foreground">
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
                    <div key={section.id} className="space-y-4">
                      <h2 className="text-xl font-semibold">{section.title}</h2>
                      
                      <div className="space-y-4">
                        {Object.entries(mockEsgAssessmentData).map(([key, value]) => (
                          <div key={key} className="p-3 border rounded-md">
                            <div className="flex justify-between mb-2">
                              <h3 className="text-md font-medium">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                              </h3>
                              <div className={`text-xs px-2 py-1 rounded-full ${
                                value.rating === 'Satisfactory' 
                                  ? 'bg-green-100 text-green-800' 
                                  : value.rating === 'Investigate' 
                                    ? 'bg-orange-100 text-orange-800' 
                                    : 'bg-red-100 text-red-800'
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
                
                if (section.type === 'sdgContributions') {
                  return (
                    <div key={section.id} className="space-y-2">
                      <h2 className="text-xl font-semibold">{section.title}</h2>
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
                  );
                }
                
                if (section.type === 'customText') {
                  return (
                    <div key={section.id} className="space-y-2">
                      <h2 className="text-xl font-semibold">{section.title}</h2>
                      <div className="whitespace-pre-line text-sm">{section.content}</div>
                    </div>
                  );
                }
                
                if (section.type === 'aiGenerated') {
                  return (
                    <div key={section.id} className="space-y-2">
                      <h2 className="text-xl font-semibold">{section.title}</h2>
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
            </Card>
            
            <div className="mt-6">
              <QatalystResponse
                title=""
                prompt={inputValue}
                response="The report has been generated based on available data from the project documents and Qatalyst's analysis. The report highlights key financial metrics, ESG benefits, and SDG contributions. You can customize this report by adding, removing, or reordering sections."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}