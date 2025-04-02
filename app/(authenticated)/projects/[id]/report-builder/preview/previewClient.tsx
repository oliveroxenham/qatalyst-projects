'use client';

import { useState, useEffect, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getProjectId } from '@/mock/data';
import { 
  FileIcon, 
  Download, 
  Trash2, 
  PenLine,
  FileText,
  Eye,
  EyeOff,
  Plus,
  MoveVertical,
  LayoutGrid
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
  coverImage?: string; // Base64 string for uploaded cover image
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

// Draggable section component
const DraggableSection = ({ 
  section, 
  index, 
  moveItem, 
  toggleSources,
  deleteSection
}: { 
  section: ReportSection, 
  index: number, 
  moveItem: (dragIndex: number, hoverIndex: number) => void, 
  toggleSources: (id: string) => void,
  deleteSection: (id: string) => void
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
      <div className="mr-2 text-muted-foreground cursor-grab flex hover:text-primary">
        <MoveVertical className="h-5 w-5" />
      </div>
      <div className="flex-1 font-medium">{section.title}</div>
      {(section.type === 'financialAssessment' || section.type === 'esgAssessment') && (
        <div className="flex items-center space-x-1 mr-2">
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
      <Button
        size="sm"
        variant="ghost"
        className="ml-2 text-muted-foreground hover:text-destructive"
        onClick={() => deleteSection(section.id)}
        title="Delete section"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

// Page Number component
function PageNumber({ 
  pageNumber, 
  showPageNumbers
}: { 
  pageNumber: number;
  showPageNumbers: boolean;
}) {
  if (!showPageNumbers) return null;
  
  return (
    <>
      {/* Add a spacer to ensure content doesn't overlap with page number */}
      <div className="h-8"></div>
      <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-400 pointer-events-none">
        {pageNumber}
      </div>
    </>
  );
}

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
  const [addSectionDialogOpen, setAddSectionDialogOpen] = useState(false);
  const [addSectionType, setAddSectionType] = useState<SectionType>('coverPage');
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionContent, setNewSectionContent] = useState('');
  const [newSectionPrompt, setNewSectionPrompt] = useState('');
  const [newCoverImage, setNewCoverImage] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showPageNumbers, setShowPageNumbers] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [sectionToDelete, setSectionToDelete] = useState<string | null>(null);
  const project = getProjectId(projectId);
  
  // Generate a unique ID for sections
  const generateId = () => `section-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  
  // Handle cover image uploads
  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setNewCoverImage(base64String);
    };
    reader.readAsDataURL(file);
  };
  
  // Function to add a new section
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
      coverSubtitle: addSectionType === 'coverPage' ? newSectionContent : undefined,
      coverImage: addSectionType === 'coverPage' ? newCoverImage || undefined : undefined
    };

    const updatedSections = [newSection, ...reportSections];
    setReportSections(updatedSections);
    setAddSectionDialogOpen(false);
    
    // Reset form
    setNewSectionTitle('');
    setNewSectionPrompt('');
    setNewSectionContent('');
    setNewCoverImage(null);
    setAddSectionType('coverPage');

    // Save to localStorage
    if (typeof window !== 'undefined') {
      const savedReport = localStorage.getItem(`report-${projectId}`);
      if (savedReport) {
        try {
          const parsedData = JSON.parse(savedReport);
          localStorage.setItem(`report-${projectId}`, JSON.stringify({
            ...parsedData,
            sections: updatedSections
          }));
        } catch (error) {
          console.error('Error updating report:', error);
        }
      }
    }

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
        
        // Update in localStorage
        if (typeof window !== 'undefined') {
          const savedReport = localStorage.getItem(`report-${projectId}`);
          if (savedReport) {
            try {
              const parsedData = JSON.parse(savedReport);
              const updatedSections = parsedData.sections.map((section: ReportSection) => 
                section.id === newSection.id 
                  ? {
                      ...section,
                      isGenerating: false,
                      content: `This is an AI-generated section based on the prompt: "${newSectionPrompt}"\n\nThe ${project?.name || 'project'} demonstrates strong potential for both environmental impact and financial returns. Based on the assessment of similar projects in the region, we anticipate this initiative will deliver approximately 15% higher carbon credit yields than the regional average, making it an attractive investment opportunity.`
                    }
                  : section
              );
              
              localStorage.setItem(`report-${projectId}`, JSON.stringify({
                ...parsedData,
                sections: updatedSections
              }));
            } catch (error) {
              console.error('Error updating AI content:', error);
            }
          }
        }
      }, 3000);
    }
  };
  
  // Function to move sections when dragging
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const newSections = [...reportSections];
    const dragItem = newSections[dragIndex];
    
    newSections.splice(dragIndex, 1);
    newSections.splice(hoverIndex, 0, dragItem);
    
    setReportSections(newSections);
    
    // Save to localStorage after reordering
    if (typeof window !== 'undefined') {
      const savedReport = localStorage.getItem(`report-${projectId}`);
      if (savedReport) {
        try {
          const parsedData = JSON.parse(savedReport);
          localStorage.setItem(`report-${projectId}`, JSON.stringify({
            ...parsedData,
            sections: newSections
          }));
        } catch (error) {
          console.error('Error updating report order:', error);
        }
      }
    }
  };
  
  // Function to set a section for deletion (shows confirmation dialog)
  const deleteSection = (sectionId: string) => {
    setSectionToDelete(sectionId);
  };
  
  // Function to confirm and execute section deletion
  const confirmDeleteSection = () => {
    if (!sectionToDelete) return;
    
    // Filter out the section to be deleted
    const newSections = reportSections.filter(section => section.id !== sectionToDelete);
    
    // Update state
    setReportSections(newSections);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      const savedReport = localStorage.getItem(`report-${projectId}`);
      if (savedReport) {
        try {
          const parsedData = JSON.parse(savedReport);
          localStorage.setItem(`report-${projectId}`, JSON.stringify({
            ...parsedData,
            sections: newSections
          }));
        } catch (error) {
          console.error('Error updating report after deletion:', error);
        }
      }
    }
    
    // Clear the section to delete
    setSectionToDelete(null);
  };
  
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
          setShowPageNumbers(parsedData.showPageNumbers || false);
        } catch (error) {
          console.error('Error parsing saved report:', error);
          // If there's an error parsing the report, redirect back to builder
          router.push(`/projects/${projectId}/report-builder`);
        }
      } else {
        // If no report data exists, redirect back to builder
        router.push(`/projects/${projectId}/report-builder`);
      }
    }
  }, [projectId, router]);

  const handleDeleteReport = () => {
    // Clear from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`report-${projectId}`);
      
      // Redirect to report builder
      router.push(`/projects/${projectId}/report-builder`);
    }
  };


  if (!reportData || reportSections.length === 0) {
    return (
      <div className="flex flex-col h-screen">
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
        <div className="p-6 flex flex-col flex-grow overflow-hidden">
          <div className="flex items-center justify-center h-full">
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
    <div className="flex flex-col h-screen">
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
      <div className="p-6 flex flex-col flex-grow overflow-hidden">
        <div className="space-y-2 mb-4">
          <p className="text-muted-foreground">
            {t('reportBuilder.description')}
          </p>
        </div>

        <div className="flex flex-col flex-grow overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">{t('reportBuilder.reportPreview')}</h2>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                onClick={() => setAddSectionDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Section
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setIsCustomizing(true)}
              >
                <LayoutGrid className="mr-2 h-4 w-4" />
                Customize Report
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
          
          <Dialog 
            open={addSectionDialogOpen} 
            onOpenChange={setAddSectionDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Section</DialogTitle>
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
                      <Image 
                        src="/icons/document.svg" 
                        alt="Cover Page"
                        width={20}
                        height={20}
                        className="mr-2 h-4 w-4" 
                      />
                      Cover Page
                    </Button>
                    <Button 
                      type="button" 
                      variant={addSectionType === 'customText' ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setAddSectionType('customText')}
                    >
                      <PenLine className="mr-2 h-4 w-4" />
                      Custom Text
                    </Button>
                    <Button 
                      type="button" 
                      variant={addSectionType === 'aiGenerated' ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setAddSectionType('aiGenerated')}
                    >
                      <Image 
                        src="/icons/AI-icon.svg" 
                        alt="AI Generated"
                        width={20}
                        height={20}
                        className="mr-2 h-4 w-4" 
                      />
                      AI Generated
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
                    <div className="space-y-2">
                      <label className="font-medium">Cover Image</label>
                      <div className="flex flex-col gap-2">
                        <input 
                          type="file" 
                          accept="image/*"
                          className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-primary
                            hover:file:bg-violet-100"
                          onChange={handleCoverImageUpload}
                        />
                        {newCoverImage && (
                          <div className="relative w-full h-64 mt-2">
                            <Image 
                              src={newCoverImage}
                              alt="Cover preview" 
                              fill
                              style={{ objectFit: 'contain' }}
                              className="rounded-md"
                            />
                            <Button
                              size="sm"
                              variant="destructive"
                              className="absolute top-2 right-2"
                              onClick={() => setNewCoverImage(null)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
                
                {addSectionType === 'customText' && (
                  <>
                    <div className="space-y-2">
                      <label className="font-medium">Section Title</label>
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
                      <label className="font-medium">Section Title</label>
                      <Input 
                        value={newSectionTitle}
                        onChange={(e) => setNewSectionTitle(e.target.value)}
                        placeholder="Enter section title..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-medium">Prompt for AI</label>
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
                            (addSectionType === 'aiGenerated' && (!newSectionTitle || !newSectionPrompt)) ||
                            (addSectionType === 'coverPage' && !newSectionTitle)}
                >
                  Add Section
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog 
            open={isCustomizing} 
            onOpenChange={setIsCustomizing}
          >
            <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Customize Report</DialogTitle>
                <DialogDescription>
                  Drag and drop sections to reorder them or adjust report settings. Changes are saved automatically.
                </DialogDescription>
              </DialogHeader>
              
              <DndProvider backend={HTML5Backend}>
                <div className="space-y-2 py-4">
                  {reportSections.map((section, index) => (
                    <DraggableSection
                      key={section.id}
                      section={section}
                      index={index}
                      moveItem={moveItem}
                      deleteSection={deleteSection}
                      toggleSources={(id) => {
                        const updatedSections = reportSections.map(s => 
                          s.id === id 
                            ? { ...s, includeSources: !s.includeSources }
                            : s
                        );
                        
                        setReportSections(updatedSections);
                        
                        // Save to localStorage after updating
                        if (typeof window !== 'undefined') {
                          const savedReport = localStorage.getItem(`report-${projectId}`);
                          if (savedReport) {
                            try {
                              const parsedData = JSON.parse(savedReport);
                              localStorage.setItem(`report-${projectId}`, JSON.stringify({
                                ...parsedData,
                                sections: updatedSections
                              }));
                            } catch (error) {
                              console.error('Error updating report:', error);
                            }
                          }
                        }
                      }}
                    />
                  ))}
                </div>
              </DndProvider>
              
              <div className="py-4 border-t mt-4">
                <h3 className="font-medium mb-3">Report Settings</h3>
                
                <div className="flex items-center space-x-2">
                  <div className="flex h-5 items-center">
                    <input
                      id="page-numbers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={showPageNumbers}
                      onChange={() => {
                        setShowPageNumbers(!showPageNumbers);
                        
                        // Save to localStorage
                        if (typeof window !== 'undefined') {
                          const savedReport = localStorage.getItem(`report-${projectId}`);
                          if (savedReport) {
                            try {
                              const parsedData = JSON.parse(savedReport);
                              localStorage.setItem(`report-${projectId}`, JSON.stringify({
                                ...parsedData,
                                showPageNumbers: !showPageNumbers
                              }));
                            } catch (error) {
                              console.error('Error updating report settings:', error);
                            }
                          }
                        }
                      }}
                    />
                  </div>
                  <div className="ml-2 text-sm">
                    <label htmlFor="page-numbers" className="font-medium text-gray-900 dark:text-gray-100">
                      Show Page Numbers
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Add page numbers at the bottom of each page
                    </p>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={() => setIsCustomizing(false)}>
                  Done
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Section Delete Confirmation Dialog */}
          <Dialog
            open={sectionToDelete !== null}
            onOpenChange={(open) => {
              if (!open) setSectionToDelete(null);
            }}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete Section</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this section? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() => setSectionToDelete(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmDeleteSection}
                >
                  Delete Section
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        
          <div className="flex justify-center flex-grow overflow-y-auto">
            <div className="w-full max-w-[210mm] mx-auto space-y-8">
            
              {/* Dynamic A4 Page Sections */}
              {reportSections.map((section, index) => {
                // Calculate page number - only increment for non-cover pages
                // We pre-calculate the page number by counting how many non-cover pages come before this one
                const pageNumber = reportSections
                  .slice(0, index)
                  .filter(s => s.type !== 'coverPage')
                  .length + 1;
                  
                if (section.type === 'coverPage') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-6 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid flex flex-col justify-between items-center relative">
                      <div className="w-full flex flex-col items-center space-y-8">
                        <div className="text-center mb-2">
                          <h1 className="text-4xl font-bold">{section.coverTitle}</h1>
                          <h2 className="text-2xl text-muted-foreground mt-3">{section.coverSubtitle}</h2>
                        </div>
                        {section.coverImage ? (
                          <div className="w-full h-[500px] relative overflow-hidden rounded-md">
                            <Image
                              src={section.coverImage}
                              alt="Cover Image"
                              fill
                              style={{ objectFit: 'cover' }}
                              className="rounded-md"
                              priority
                            />
                          </div>
                        ) : project?.imgUrl && (
                          <div className="w-full h-[500px] relative overflow-hidden rounded-md">
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
                        <p className="text-muted-foreground mt-auto">Generated by Qatalyst AI on {new Date().toLocaleDateString()}</p>
                      </div>
                      {/* No page number on cover page */}
                    </div>
                  );
                }
                
                if (section.type === 'executiveSummary') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto relative">
                      <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">{section.title}</h2>
                      <div className="whitespace-pre-line text-sm">
                        {reportData.executiveSummary}
                      </div>
                      <PageNumber pageNumber={pageNumber} showPageNumbers={showPageNumbers} />
                    </div>
                  );
                }
                
                if (section.type === 'projectSummary') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto relative">
                      <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">{section.title}</h2>
                      <div className="grid grid-cols-2 gap-6">
                        {Object.entries(reportData.projectSummary).map(([key, value]: [string, string]) => (
                          <div key={key} className="space-y-2 p-3 border rounded-md bg-muted/20">
                            <p className="text-sm font-semibold">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</p>
                            <p className="text-sm">{value}</p>
                          </div>
                        ))}
                      </div>
                      <PageNumber pageNumber={pageNumber} showPageNumbers={showPageNumbers} />
                    </div>
                  );
                }
                
                if (section.type === 'financialOverview') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto relative">
                      <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">{section.title}</h2>
                      <div className="grid grid-cols-2 gap-6">
                        {Object.entries(reportData.financialOverview).map(([key, value]: [string, string]) => (
                          <div key={key} className="space-y-2 p-3 border rounded-md bg-muted/20">
                            <p className="text-sm font-semibold">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</p>
                            <p className="text-sm font-medium text-primary">{value}</p>
                          </div>
                        ))}
                      </div>
                      <PageNumber pageNumber={pageNumber} showPageNumbers={showPageNumbers} />
                    </div>
                  );
                }
                
                if (section.type === 'financialAssessment') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto relative">
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
                      <PageNumber pageNumber={pageNumber} showPageNumbers={showPageNumbers} />
                    </div>
                  );
                }
                
                if (section.type === 'esgAssessment') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto relative">
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
                      <PageNumber pageNumber={pageNumber} showPageNumbers={showPageNumbers} />
                    </div>
                  );
                }
                
                if (section.type === 'sdgContributions') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto relative">
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
                      <PageNumber pageNumber={pageNumber} showPageNumbers={showPageNumbers} />
                    </div>
                  );
                }
                
                if (section.type === 'customText') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto relative">
                      <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">{section.title}</h2>
                      <div className="whitespace-pre-line text-sm">{section.content}</div>
                      <PageNumber pageNumber={pageNumber} showPageNumbers={showPageNumbers} />
                    </div>
                  );
                }
                
                if (section.type === 'aiGenerated') {
                  return (
                    <div key={section.id} className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto relative">
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
                      <PageNumber pageNumber={pageNumber} showPageNumbers={showPageNumbers} />
                    </div>
                  );
                }
                
                return null;
              })}
              
              {/* Reference Documents Section */}
              {reportData?.referencedDocuments && reportData.referencedDocuments.length > 0 && (
                <div className="bg-white dark:bg-gray-900 shadow-lg p-8 aspect-[1/1.4142] w-full max-w-[210mm] mx-auto rounded-md mb-8 break-inside-avoid overflow-y-auto relative">
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
                  {/* Calculate the page number by counting non-cover pages */}
                  <PageNumber 
                    pageNumber={reportSections.filter(s => s.type !== 'coverPage').length + 1} 
                    showPageNumbers={showPageNumbers} 
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex flex-col gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="self-start flex items-center gap-2 text-muted-foreground"
              onClick={() => setShowPrompt(!showPrompt)}
            >
              {showPrompt ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Hide Prompt
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Show Prompt
                </>
              )}
            </Button>
            
            {showPrompt && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}