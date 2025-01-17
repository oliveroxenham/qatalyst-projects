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

export type Project = {
  id: string;
  imgUrl: string;
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
    value: number;
    unit: string;
  };
  financialAssessment: {
    assignedTo?: string;
    status: string;
    progress: number;
    projectValue: {
      formatted: string;
      value: number | null;
      unit: string;
      sources: Source[];
      qatalystGenerated: boolean;
    },
    estimatedReductions: {
      formatted: string;
      value: number | null;
      unit: string;
      sources: Source[],
      qatalystGenerated: boolean;
    },
    totalEstimatedReductions: {
      formatted: string;
      value: number | null;
      unit: string;
      sources: Source[],
      qatalystGenerated: boolean;
    },
    projectDuration: {
      formatted: string;
      value: number | null;
      unit: string;
      sources: Source[],
      qatalystGenerated: boolean;
    }
    projectArea: {
      formatted: string;
      value: number | null;
      unit: string;
      sources: Source[],
      qatalystGenerated: boolean;
    },
    estimatedReductionsPerUnitAreaPerYear: {
      formatted: string;
      value: number | null;
      unit: string;
      sources: Source[],
      qatalystGenerated: boolean;
    },
    estimatedReductionsPerUnitArea: {
      formatted: string;
      value: number | null;
      unit: string;
      sources: Source[],
      qatalystGenerated: boolean;
    },
    landAcquisitionCost: {
      formatted: string;
      value: number | null;
      unit: string;
      sources: Source[],
      qatalystGenerated: boolean;
    },
    landPerUnitAreaCost: {
      formatted: string;
      value: number | null;
      unit: string;
      sources: Source[],
      qatalystGenerated: boolean;
    },
    plantationEstablishmentMaintenanceCost: {
      formatted: string;
      value: number | null;
      unit: string;
      sources: Source[],
      qatalystGenerated: boolean;
    },
    costOfGoodsSold: {
      formatted: string;
      value: number | null;
      unit: string;
      sources: Source[],
      qatalystGenerated: boolean;
    },
    overheads: {
      formatted: string;
      value: number | null;
      unit: string;
      sources: Source[],
      qatalystGenerated: boolean;
    },
    totalGrossCosts: {
      formatted: string;
      value: number | null;
      unit: string;
      sources: Source[],
      qatalystGenerated: boolean;
    },
    alternateRevenueSources: {
      formatted: string;
      value: number | null;
      unit: string;
      sources: Source[],
      qatalystGenerated: boolean;
    },
    costOfFinancing: {
      formatted: string;
      value: number | null;
      unit: string;
      sources: Source[],
      qatalystGenerated: boolean;
    },
    tax: {
      formatted: string;
      value: number | null;
      unit: string;
      sources: Source[],
      qatalystGenerated: boolean;
    }

  };
  esgAssessment: {
    assignedTo?: string;
    status: string;
    progress: number;
  };
  kycAssessment: {
    assignedTo?: string;
    status: string;
    progress: number;
  };
  sdgs?: number[];
  activities?: Activity[];
};
