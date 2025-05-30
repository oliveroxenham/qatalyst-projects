export type Tag = {
  value: string;
  type: string;
};

export type Activity = {
  id: number;
  date: string;
  name: string;
  description: string;
};

export type Source = {
  name: string;
  url: string;
};

export type Risk = {
  id: string;
  name: string;
  qatalystResponse?: number;
  userRating?: number;
  sources?: Source[];
  qatalystGenerated?: boolean;
  ai?: {
    title: string;
    response: string;
  }
}

export type EsgRisk = Risk

export type IssuanceRecord = {
  year: string;
  totalQuantity: number;
};

export type FAItem = {
  id: string;
  formatted: string;
  value: number | null;
  unit: string;
  sources: Source[],
  qatalystGenerated: boolean;
  ai?: {
    title: string;
    response: string;
  }
}

export type Project = {
  _id: string;
  id?: string;
  name?: string;
  projectName: string;
  verraGsNumber: string;
  country: string;
  projectType: string;
  methodology: string;
  status: string;
  issuanceTiming: string;
  projectDeveloper: string;
  projectArea: string | {
    formatted: string;
    value: number | null;
    unit: string;
  };
  projectLife: string;
  creditType: string;
  ccbGold: string;
  ccpLabel: string;
  corsiaLabel: string;
  loaYN: string;
  sylveraBeZeroRating: string;
  sdgs: string[];
  estimatedEmissionReductions: {
    projectLife: string;
    annual: string;
  };
  created: string;
  collaborators: string[];
  sourceType?: string;
  countryName?: string;
  state?: string;
  latitude?: string;
  longitude?: string;
  background?: string;
  proponent?: string;
  lastUpdated?: string;
  createdBy?: string;
  owner?: string;
  registryStatus?: string;
  estimatedAnnualCredits?: {
    formatted: string;
    value: number;
    unit: string;
  };
  tags?: Tag[];
  imgUrl?: string;
  mapUrl?: string;
  assessmentStatus: {
    carbonAccounting: string;
    permanence: string;
    additionality: string;
    coBenefitsSafeguarding: string;
    financialAssessment: string;
  };
  // Assessment data structures
  additionality?: {
    assignedTo?: string;
    status: string;
    progress: number;
    risks?: Risk[];
  };
  carbonQualityAssessment?: {
    assignedTo?: string;
    status: string;
    progress: number;
    risks?: Risk[];
  };
  permanence?: {
    assignedTo?: string;
    status: string;
    progress: number;
    risks?: Risk[];
  };
  carbonAccounting?: {
    assignedTo?: string;
    status: string;
    progress: number;
    risks?: Risk[];
  };
  reputationalRisk?: {
    assignedTo?: string;
    status: string;
    progress: number;
    risks?: Risk[];
  };
  financialAssessment?: {
    assignedTo?: string;
    status: string;
    progress: number;
    projectValue: FAItem;
    estimatedReductions: FAItem;
    totalEstimatedReductions: FAItem;
    projectDuration: FAItem;
    projectArea: FAItem;
    estimatedReductionsPerUnitAreaPerYear: FAItem;
    estimatedReductionsPerUnitArea: FAItem;
    landAcquisitionCost: FAItem;
    landPerUnitAreaCost: FAItem;
    plantationEstablishmentMaintenanceCost: FAItem;
    costOfGoodsSold: FAItem;
    overheads: FAItem;
    totalGrossCosts: FAItem;
    alternateRevenueSources: FAItem;
    costOfFinancing: FAItem;
    tax: FAItem;
  };
  esgAssessment?: {
    assignedTo?: string;
    status: string;
    progress: number;
    risks?: EsgRisk[];
  };
  kycAssessment?: {
    assignedTo?: string;
    status: string;
    progress: number;
  };
  activities?: Activity[];
};
