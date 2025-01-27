export type Tag = {
  value: string;
  type: string;
};

export type Activity = {
  id: number;
  date: string;
  description: string;
};

export type Source = {
  name: string;
  url: string;
};

export type EsgRisk = {
  id: number;
  name: string;
  qatalystResponse?: number;
  userRating?: number;
  sources?: Source[];
}

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
  id: string;
  imgUrl: string;
  mapUrl?: string;
  name: string;
  country: string;
  countryName: string;
  state?: string;
  lastUpdated: string;
  tags: Tag[];
  creditingStartDate: string;
  creditingEndDate: string;
  proponent: string;
  background: string;
  latitude: string;
  longitude: string;
  createdBy: string;
  owner: string;
  collaborators: string[];
  sourceType: string;
  registryStatus: string;
  projectType: string;
  estimatedAnnualCredits: {
    formatted: string;
    value: number;
    unit: string;
  };
  methodology: string;
  projectArea: {
    formatted: string;
    value: number | null;
    unit: string;
  };
  financialAssessment: {
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
  esgAssessment: {
    assignedTo?: string;
    status: string;
    progress: number;
    risks?: EsgRisk[];
  };
  kycAssessment: {
    assignedTo?: string;
    status: string;
    progress: number;
  };
  sdgs?: number[];
  activities?: Activity[];
};
